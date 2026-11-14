import type { Miejsce } from '@/data/miejsca';

/**
 * Strona z mapą (MapLibre) uruchamiana wewnątrz aplikacji.
 * Styl: granat ze złotą granicą Polski — „rycina, którą da się przybliżać”.
 * Kafelki: na razie OpenFreeMap (darmowe, OpenStreetMap); docelowo własny plik Polski na Cloudflare R2.
 */
export function mapaHtml(miejsca: Miejsce[], kolory: { tlo: string; lad: string; woda: string; zloto: string; czerwien: string; tekst: string; tekstCichy: string }) {
  const punkty = {
    type: 'FeatureCollection',
    features: miejsca.map((m) => ({ type: 'Feature', properties: { id: m.id }, geometry: { type: 'Point', coordinates: [m.lon, m.lat] } })),
  };
  const k = kolory;
  return `<!DOCTYPE html><html><head>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<link href="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css" rel="stylesheet">
<script src="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js"></script>
<style>html,body,#m{margin:0;height:100%;background:${k.tlo}}
.maplibregl-ctrl-attrib{background:transparent!important;font:10px sans-serif}
.maplibregl-ctrl-attrib a{color:${k.tekstCichy}!important}
.maplibregl-ctrl-attrib-button{display:none}</style></head>
<body><div id="m"></div><script>
const PUNKTY=${JSON.stringify(punkty)};
const wyslij=(o)=>window.ReactNativeWebView&&window.ReactNativeWebView.postMessage(JSON.stringify(o));
const nazwa=['coalesce',['get','name:pl'],['get','name']];
const map=new maplibregl.Map({container:'m',attributionControl:{compact:false},
 bounds:[[14.0,48.9],[24.3,54.95]],fitBoundsOptions:{padding:{top:20,bottom:150,left:14,right:14}},
 maxBounds:[[8,45.5],[30,58.5]],minZoom:4.5,maxZoom:16,dragRotate:false,pitchWithRotate:false,
 style:{version:8,glyphs:'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf',
  sources:{t:{type:'vector',url:'https://tiles.openfreemap.org/planet'},
   p:{type:'geojson',data:PUNKTY}},
  layers:[
   {id:'tlo',type:'background',paint:{'background-color':'${k.lad}'}},
   {id:'las',type:'fill',source:'t','source-layer':'landcover',filter:['==',['get','class'],'wood'],paint:{'fill-color':'${k.tlo}','fill-opacity':0.35}},
   {id:'woda',type:'fill',source:'t','source-layer':'water',paint:{'fill-color':'${k.woda}'}},
   {id:'rzeki',type:'line',source:'t','source-layer':'waterway',minzoom:6,paint:{'line-color':'${k.woda}','line-width':['interpolate',['linear'],['zoom'],6,0.6,12,2]}},
   {id:'drogi',type:'line',source:'t','source-layer':'transportation',minzoom:7,filter:['in',['get','class'],['literal',['motorway','trunk','primary','secondary','tertiary','minor','street']]],
    paint:{'line-color':'${k.tekstCichy}','line-opacity':['interpolate',['linear'],['zoom'],7,0.12,13,0.35],'line-width':['interpolate',['linear'],['zoom'],7,0.5,14,2.5]}},
   {id:'budynki',type:'fill',source:'t','source-layer':'building',minzoom:13,paint:{'fill-color':'${k.tlo}','fill-opacity':0.6}},
   {id:'wojewodztwa',type:'line',source:'t','source-layer':'boundary',filter:['all',['==',['get','admin_level'],4],['!=',['get','maritime'],1]],
    paint:{'line-color':'${k.zloto}','line-opacity':0.25,'line-width':0.8,'line-dasharray':[3,2]}},
   {id:'granica-poswiata',type:'line',source:'t','source-layer':'boundary',filter:['all',['==',['get','admin_level'],2],['!=',['get','maritime'],1]],
    paint:{'line-color':'${k.zloto}','line-opacity':0.25,'line-width':6,'line-blur':3}},
   {id:'granica',type:'line',source:'t','source-layer':'boundary',filter:['all',['==',['get','admin_level'],2],['!=',['get','maritime'],1]],
    paint:{'line-color':'${k.zloto}','line-width':1.6}},
   {id:'miasta',type:'symbol',source:'t','source-layer':'place',filter:['in',['get','class'],['literal',['city','town','village']]],
    layout:{'text-field':nazwa,'text-font':['Noto Sans Regular'],'text-size':['match',['get','class'],'city',13,'town',11,10]},
    paint:{'text-color':'${k.tekstCichy}','text-halo-color':'${k.lad}','text-halo-width':1.4}},
   {id:'kraje',type:'symbol',source:'t','source-layer':'place',filter:['==',['get','class'],'country'],maxzoom:7,
    layout:{'text-field':['upcase',nazwa],'text-font':['Noto Sans Regular'],'text-size':11,'text-letter-spacing':0.3},
    paint:{'text-color':'${k.tekstCichy}','text-opacity':0.6}},
   {id:'punkty-halo',type:'circle',source:'p',filter:['==',['get','id'],''],paint:{'circle-radius':18,'circle-color':'${k.czerwien}','circle-opacity':0.25}},
   {id:'punkty',type:'circle',source:'p',paint:{'circle-radius':['case',['==',['get','id'],''],9,7],
    'circle-color':['case',['==',['get','id'],''],'${k.czerwien}','${k.zloto}'],'circle-stroke-color':'${k.tlo}','circle-stroke-width':3}}
  ]}});
let wybrany='',widoczne=null;
function rysuj(){
 const f=widoczne?['in',['get','id'],['literal',widoczne]]:true;
 map.setFilter('punkty',f===true?null:f);
 map.setFilter('punkty-halo',['==',['get','id'],wybrany]);
 map.setPaintProperty('punkty','circle-radius',['case',['==',['get','id'],wybrany],9,7]);
 map.setPaintProperty('punkty','circle-color',['case',['==',['get','id'],wybrany],'${k.czerwien}','${k.zloto}']);
}
window.ustaw=(o)=>{ if(o.widoczne!==undefined)widoczne=o.widoczne; if(o.wybrany!==undefined)wybrany=o.wybrany;
 if(map.loaded())rysuj(); if(o.lec){map.easeTo({center:o.lec,zoom:Math.max(map.getZoom(),7),duration:600});} };
map.on('load',()=>{rysuj();wyslij({typ:'gotowa'});});
map.on('click',(e)=>{
 const b=10,f=map.queryRenderedFeatures([[e.point.x-b,e.point.y-b],[e.point.x+b,e.point.y+b]],{layers:['punkty']});
 if(f.length){wybrany=f[0].properties.id;rysuj();wyslij({typ:'wybor',id:wybrany});}
});
map.on('error',(e)=>wyslij({typ:'blad',tekst:String(e&&e.error&&e.error.message||e)}));
</script></body></html>`;
}
