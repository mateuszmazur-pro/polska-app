import type { Miejsce } from '@/data/miejsca';
import type { Szlak, Wyprawa } from '@/data/trasy';

export type KoloryMapy = { tlo: string; lad: string; woda: string; zloto: string; czerwien: string; tekst: string; tekstCichy: string };

/**
 * Strona z mapą (MapLibre) uruchamiana wewnątrz aplikacji.
 * Styl: granat ze złotą granicą Polski — „rycina, którą da się przybliżać”.
 * Kafelki: na razie OpenFreeMap (darmowe, OpenStreetMap); docelowo własny plik Polski na Cloudflare R2.
 *
 * Sterowanie z aplikacji (injectJavaScript):
 *   window.punkty({kategoria, unesco, wybrany})   — pinezki (kategoria null = wszystkie)
 *   window.szlak(id | null)                        — trasa szlaku z numerami przystanków
 *   window.wyprawa(id | null)                      — trasa wyprawy, rysowana etap po etapie
 *   window.graj() / window.pauza() / window.etap(i)
 * Wiadomości do aplikacji: gotowa, wybor {id}, przystanek {i}, etap {i}, koniec, blad.
 */
export function mapaHtml(miejsca: Miejsce[], szlaki: Szlak[], wyprawy: Wyprawa[], k: KoloryMapy) {
  const dane = {
    punkty: {
      type: 'FeatureCollection',
      features: miejsca.map((m) => ({
        type: 'Feature',
        properties: { id: m.id, kat: m.kategoria, unesco: m.unesco ? 1 : 0 },
        geometry: { type: 'Point', coordinates: [m.lon, m.lat] },
      })),
    },
    szlaki: Object.fromEntries(szlaki.map((s) => [s.id, s.przystanki.map((p) => [p.lon, p.lat])])),
    wyprawy: Object.fromEntries(wyprawy.map((w) => [w.id, w.etapy.map((e) => [e.lon, e.lat])])),
  };
  return `<!DOCTYPE html><html><head>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<link href="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css" rel="stylesheet">
<script src="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js"></script>
<style>html,body,#m{margin:0;height:100%;background:${k.tlo}}
.maplibregl-ctrl-attrib{background:transparent!important;font:10px sans-serif}
.maplibregl-ctrl-attrib a{color:${k.tekstCichy}!important}
.maplibregl-ctrl-attrib-button{display:none}
.maplibregl-ctrl-bottom-right{bottom:150px}</style></head>
<body><div id="m"></div><script>
const D=${JSON.stringify(dane)};
const wyslij=(o)=>window.ReactNativeWebView&&window.ReactNativeWebView.postMessage(JSON.stringify(o));
const nazwa=['coalesce',['get','name:pl'],['get','name']];
const PUSTE={type:'FeatureCollection',features:[]};
const POLSKA=[[14.0,48.9],[24.3,54.95]];
const DOL=230, GORA=140;
const map=new maplibregl.Map({container:'m',attributionControl:{compact:false},
 bounds:POLSKA,fitBoundsOptions:{padding:{top:GORA,bottom:DOL,left:14,right:14}},
 maxBounds:[[-15,28],[45,64]],minZoom:3,maxZoom:16,dragRotate:false,pitchWithRotate:false,
 style:{version:8,glyphs:'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf',
  sources:{t:{type:'vector',url:'https://tiles.openfreemap.org/planet'},
   p:{type:'geojson',data:D.punkty},
   trasa:{type:'geojson',data:PUSTE},
   postep:{type:'geojson',data:PUSTE},
   stacje:{type:'geojson',data:PUSTE},
   znacznik:{type:'geojson',data:PUSTE}},
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
   {id:'trasa-tlo',type:'line',source:'trasa',layout:{'line-cap':'round','line-join':'round'},paint:{'line-color':'${k.zloto}','line-width':3,'line-opacity':0.9,'line-dasharray':[2,1.6]}},
   {id:'postep',type:'line',source:'postep',layout:{'line-cap':'round','line-join':'round'},paint:{'line-color':'${k.czerwien}','line-width':4}},
   {id:'stacje',type:'circle',source:'stacje',paint:{'circle-radius':11,'circle-color':['case',['==',['get','on'],1],'${k.czerwien}','${k.zloto}'],'circle-stroke-color':'${k.tlo}','circle-stroke-width':2.5}},
   {id:'stacje-nr',type:'symbol',source:'stacje',layout:{'text-field':['to-string',['get','nr']],'text-font':['Noto Sans Regular'],'text-size':11,'text-allow-overlap':true,'icon-allow-overlap':true},
    paint:{'text-color':['case',['==',['get','on'],1],'#FFFFFF','${k.tlo}']}},
   {id:'znacznik-halo',type:'circle',source:'znacznik',paint:{'circle-radius':16,'circle-color':'${k.czerwien}','circle-opacity':0.25}},
   {id:'znacznik',type:'circle',source:'znacznik',paint:{'circle-radius':7,'circle-color':'${k.tekst}','circle-stroke-color':'${k.czerwien}','circle-stroke-width':3}},
   {id:'punkty-halo',type:'circle',source:'p',filter:['==',['get','id'],''],paint:{'circle-radius':18,'circle-color':'${k.czerwien}','circle-opacity':0.25}},
   {id:'punkty',type:'circle',source:'p',paint:{'circle-radius':['interpolate',['linear'],['zoom'],5,4.5,9,7],
    'circle-color':'${k.zloto}','circle-stroke-color':'${k.tlo}','circle-stroke-width':2}}
  ]}});

let filtr={kategoria:null,unesco:false,wybrany:''};
let tryb='punkty', trasaId=null, pkt=[], dl=[], suma=0, postep=0, gra=null, aktywny=-1;

function rysujPunkty(){
 const f=['all'];
 if(filtr.kategoria)f.push(['==',['get','kat'],filtr.kategoria]);
 if(filtr.unesco)f.push(['==',['get','unesco'],1]);
 const widac=tryb==='punkty';
 map.setLayoutProperty('punkty','visibility',widac?'visible':'none');
 map.setLayoutProperty('punkty-halo','visibility',widac?'visible':'none');
 map.setFilter('punkty',f.length>1?f:null);
 map.setFilter('punkty-halo',['==',['get','id'],filtr.wybrany||'']);
 map.setPaintProperty('punkty','circle-color',['case',['==',['get','id'],filtr.wybrany||''],'${k.czerwien}','${k.zloto}']);
}
function czysc(){
 clearInterval(gra);gra=null;
 ['trasa','postep','stacje','znacznik'].forEach(s=>map.getSource(s).setData(PUSTE));
 aktywny=-1;
}
function linia(c){return {type:'Feature',geometry:{type:'LineString',coordinates:c}}}
function stacje(c,on){return {type:'FeatureCollection',features:c.map((x,i)=>({type:'Feature',properties:{nr:i+1,i:i,on:i===on?1:0},geometry:{type:'Point',coordinates:x}}))}}
function dopasuj(c){
 const b=c.reduce((b,x)=>b.extend(x),new maplibregl.LngLatBounds(c[0],c[0]));
 map.fitBounds(b,{padding:{top:GORA,bottom:DOL+40,left:40,right:40},maxZoom:12,duration:900});
}
function przelicz(c){
 pkt=c;dl=[0];suma=0;
 for(let i=1;i<c.length;i++){const dx=c[i][0]-c[i-1][0],dy=c[i][1]-c[i-1][1];suma+=Math.hypot(dx,dy);dl.push(suma)}
}
function wPunkcie(p){
 const d=p*suma;let i=1;while(i<dl.length-1&&dl[i]<d)i++;
 const s=dl[i]-dl[i-1]||1,t=Math.min(1,Math.max(0,(d-dl[i-1])/s));
 const a=pkt[i-1],b=pkt[i];
 return {xy:[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t],i:i};
}
function rysujPostep(){
 const w=wPunkcie(postep);
 const c=pkt.slice(0,w.i).concat([w.xy]);
 map.getSource('postep').setData(linia(c.length>1?c:[pkt[0],pkt[0]]));
 map.getSource('znacznik').setData({type:'Feature',geometry:{type:'Point',coordinates:w.xy}});
 let e=0;for(let j=0;j<dl.length;j++)if(dl[j]<=postep*suma+1e-9)e=j;
 if(e!==aktywny){aktywny=e;map.getSource('stacje').setData(stacje(pkt,e));wyslij({typ:'etap',i:e})}
}

window.punkty=(o)=>{tryb='punkty';Object.assign(filtr,o||{});czysc();rysujPunkty()};
window.szlak=(id)=>{
 czysc();tryb=id?'szlak':'punkty';rysujPunkty();
 if(!id){map.fitBounds(POLSKA,{padding:{top:GORA,bottom:DOL,left:14,right:14},duration:800});return}
 const c=D.szlaki[id];trasaId=id;
 map.getSource('trasa').setData(linia(c));map.getSource('stacje').setData(stacje(c,-1));dopasuj(c);
};
window.wyprawa=(id)=>{
 czysc();tryb=id?'wyprawa':'punkty';rysujPunkty();
 if(!id){map.fitBounds(POLSKA,{padding:{top:GORA,bottom:DOL,left:14,right:14},duration:800});return}
 const c=D.wyprawy[id];trasaId=id;przelicz(c);postep=0;
 map.getSource('trasa').setData(linia(c));dopasuj(c);rysujPostep();
};
window.graj=()=>{
 if(tryb!=='wyprawa')return;
 if(postep>=1)postep=0;
 clearInterval(gra);
 const krok=1/(Math.max(6,pkt.length*1.6)*30);
 gra=setInterval(()=>{postep=Math.min(1,postep+krok);rysujPostep();if(postep>=1){clearInterval(gra);gra=null;wyslij({typ:'koniec'})}},33);
};
window.pauza=()=>{clearInterval(gra);gra=null};
window.etap=(i)=>{
 if(tryb==='wyprawa'){clearInterval(gra);gra=null;postep=suma?dl[Math.max(0,Math.min(i,dl.length-1))]/suma:0;rysujPostep();}
 if(tryb==='szlak'){const c=D.szlaki[trasaId];map.getSource('stacje').setData(stacje(c,i));map.easeTo({center:c[i],zoom:Math.max(map.getZoom(),10),duration:700});}
};

map.on('load',()=>{rysujPunkty();wyslij({typ:'gotowa'})});
map.on('click',(e)=>{
 const b=12,box=[[e.point.x-b,e.point.y-b],[e.point.x+b,e.point.y+b]];
 if(tryb!=='punkty'){
  const s=map.queryRenderedFeatures(box,{layers:['stacje']});
  if(s.length){const i=s[0].properties.i;
   if(tryb==='szlak'){window.etap(i);wyslij({typ:'przystanek',i:i})}else{window.etap(i)}}
  return;
 }
 const f=map.queryRenderedFeatures(box,{layers:['punkty']});
 if(f.length){filtr.wybrany=f[0].properties.id;rysujPunkty();wyslij({typ:'wybor',id:filtr.wybrany});}
});
map.on('error',(e)=>wyslij({typ:'blad',tekst:String(e&&e.error&&e.error.message||e)}));
</script></body></html>`;
}
