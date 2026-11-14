import { useMemo, useRef, useState } from 'react';
import { Linking, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon, type IconName } from '@/components/Icon';
import { mapaHtml } from '@/components/mapaHtml';
import { KATEGORIE_MIEJSC, miejsca, type KategoriaMiejsca } from '@/data/miejsca';
import { szlaki, wyprawy } from '@/data/trasy';
import { F } from '@/theme/fonts';
import { useTheme } from '@/theme/ThemeProvider';

type Tryb = 'punkty' | 'szlaki' | 'wyprawy';

// Mapa zawsze w granacie — jak rycina, niezależnie od motywu aplikacji.
const K = { tlo: '#0C1D36', lad: '#132A4D', woda: '#071222', zloto: '#C9A24A', czerwien: '#C8102E', tekst: '#F6F2E8', tekstCichy: '#8E9BB3' };
const PANEL = 'rgba(19,42,77,0.97)';
const PASEK_H = 62;
const NAV_BG = '#071222';

const nawigacja = (lat: number, lon: number, nazwa: string) =>
  Linking.openURL(
    Platform.OS === 'ios'
      ? `http://maps.apple.com/?daddr=${lat},${lon}&q=${encodeURIComponent(nazwa)}`
      : `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`,
  );

export default function Mapa() {
  const { t } = useTheme();
  const insets = useSafeAreaInsets();
  const web = useRef<WebView>(null);
  const [gotowa, setGotowa] = useState(false);
  const [tryb, setTryb] = useState<Tryb>('punkty');
  const [kategoria, setKategoria] = useState<KategoriaMiejsca | null>(null);
  const [unesco, setUnesco] = useState(false);
  const [wybrany, setWybrany] = useState<string | null>(null);
  const [szlakId, setSzlakId] = useState<string | null>(null);
  const [przystanek, setPrzystanek] = useState<number | null>(null);
  const [wyprawaId, setWyprawaId] = useState<string | null>(null);
  const [etap, setEtap] = useState(0);
  const [gra, setGra] = useState(false);

  const html = useMemo(() => mapaHtml(miejsca, szlaki, wyprawy, K), []);
  const js = (kod: string) => web.current?.injectJavaScript(`${kod}; true;`);

  const widoczne = miejsca.filter((m) => (!kategoria || m.kategoria === kategoria) && (!unesco || m.unesco));
  const m = miejsca.find((x) => x.id === wybrany);
  const szlak = szlaki.find((s) => s.id === szlakId);
  const wyprawa = wyprawy.find((w) => w.id === wyprawaId);

  const pokazPunkty = (kat: KategoriaMiejsca | null, u = unesco) => {
    setTryb('punkty'); setKategoria(kat); setWybrany(null); setSzlakId(null); setWyprawaId(null); setGra(false);
    js(`window.punkty(${JSON.stringify({ kategoria: kat, unesco: u, wybrany: '' })})`);
  };
  const otworzSzlaki = () => {
    setTryb('szlaki'); setSzlakId(null); setPrzystanek(null); setWybrany(null); setWyprawaId(null); setGra(false);
    js('window.szlak(null)');
  };
  const otworzWyprawy = () => {
    setTryb('wyprawy'); setWyprawaId(null); setWybrany(null); setSzlakId(null); setGra(false);
    js('window.wyprawa(null)');
  };
  const wybierzSzlak = (id: string | null) => { setSzlakId(id); setPrzystanek(null); js(`window.szlak(${JSON.stringify(id)})`); };
  const wybierzWyprawe = (id: string | null) => {
    setWyprawaId(id); setEtap(0); setGra(false);
    js(`window.wyprawa(${JSON.stringify(id)})`);
    if (id) setTimeout(() => { setGra(true); js('window.graj()'); }, 1100);
  };
  const graj = () => { if (gra) { setGra(false); js('window.pauza()'); } else { setGra(true); js('window.graj()'); } };
  const idzDoEtapu = (i: number) => { if (!wyprawa) return; const n = Math.max(0, Math.min(i, wyprawa.etapy.length - 1)); setGra(false); setEtap(n); js(`window.etap(${n})`); };

  // Pasek kategorii tuż nad głównym menu (menu: dół = max(insets,12)+8, wysokość 68).
  const dolPaska = Math.max(insets.bottom, 12) + 8 + 68 + 8;
  const dolPanelu = dolPaska + PASEK_H + 10;

  const Kafel = ({ on, ikona, nazwa, onPress }: { on: boolean; ikona: IconName; nazwa: string; onPress: () => void }) => (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: on }}
      onPress={onPress}
      style={({ pressed }) => ({
        width: 62, height: PASEK_H - 12, borderRadius: (PASEK_H - 12) / 2, alignItems: 'center', justifyContent: 'center', gap: 2,
        backgroundColor: on ? K.tekst : 'transparent', opacity: pressed ? 0.7 : 1,
      })}
    >
      <Icon name={ikona} size={20} color={on ? K.czerwien : t.textMuted} strokeWidth={on ? 2 : 1.8} />
      <Text numberOfLines={1} style={{ fontFamily: on ? F.bodyHeavy : F.bodySemi, fontSize: 10, color: on ? K.tlo : t.textMuted }}>{nazwa}</Text>
    </Pressable>
  );

  const naglowek =
    tryb === 'szlaki' ? (szlak ? szlak.nazwa.toUpperCase() : `${szlaki.length} SZLAKI`)
    : tryb === 'wyprawy' ? (wyprawa ? `WYPRAWA · ${wyprawa.rok}` : `${wyprawy.length} WYPRAWY`)
    : `${widoczne.length} MIEJSC`;

  return (
    <View style={{ flex: 1, backgroundColor: K.tlo }}>
      <WebView
        ref={web}
        source={{ html }}
        originWhitelist={['*']}
        style={{ flex: 1, backgroundColor: K.tlo }}
        containerStyle={{ backgroundColor: K.tlo }}
        onMessage={(e) => {
          try {
            const d = JSON.parse(e.nativeEvent.data);
            if (d.typ === 'gotowa') setGotowa(true);
            if (d.typ === 'wybor') setWybrany(d.id);
            if (d.typ === 'przystanek') setPrzystanek(d.i);
            if (d.typ === 'etap') setEtap(d.i);
            if (d.typ === 'koniec') setGra(false);
          } catch {}
        }}
        setSupportMultipleWindows={false}
        bounces={false}
        overScrollMode="never"
      />

      {/* Nagłówek */}
      <View pointerEvents="box-none" style={{ position: 'absolute', left: 0, right: 0, top: 0, paddingTop: insets.top + 10, paddingHorizontal: 20 }}>
        <View pointerEvents="box-none" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View pointerEvents="none">
            <Text accessibilityRole="header" style={{ fontFamily: F.display, fontSize: 34, color: K.tekst }}>Mapa</Text>
            <Text style={{ marginTop: -2, fontFamily: F.bodyHeavy, fontSize: 11, letterSpacing: 1.6, color: t.gold }}>{naglowek}</Text>
          </View>
          {tryb === 'punkty' && (
            <Pressable
              accessibilityRole="switch"
              accessibilityState={{ checked: unesco }}
              onPress={() => { const u = !unesco; setUnesco(u); setWybrany(null); js(`window.punkty(${JSON.stringify({ kategoria, unesco: u, wybrany: '' })})`); }}
              style={{ height: 34, paddingHorizontal: 14, borderRadius: 17, justifyContent: 'center', backgroundColor: unesco ? K.tekst : PANEL }}
            >
              <Text style={{ fontFamily: F.bodyHeavy, fontSize: 11.5, letterSpacing: 1.2, color: unesco ? K.tlo : '#C9D1E0' }}>UNESCO</Text>
            </Pressable>
          )}
        </View>
      </View>

      {!gotowa && (
        <View pointerEvents="none" style={{ position: 'absolute', left: 0, right: 0, top: '42%', alignItems: 'center' }}>
          <Text style={{ fontFamily: F.bodySemi, fontSize: 13, color: K.tekstCichy }}>Wczytuję mapę…</Text>
        </View>
      )}

      {/* Karta miejsca */}
      {tryb === 'punkty' && m && (
        <View style={{ position: 'absolute', left: 14, right: 14, bottom: dolPanelu, backgroundColor: PANEL, borderRadius: 24, padding: 16 }}>
          <Text style={{ fontFamily: F.bodyHeavy, fontSize: 10.5, letterSpacing: 1.6, color: t.gold }}>
            {m.miasto.toUpperCase()}{m.unesco ? ' · UNESCO' : ''}
          </Text>
          <Text style={{ marginTop: 3, fontFamily: F.lista, fontSize: 19, color: K.tekst }}>{m.nazwa}</Text>
          <Text style={{ marginTop: 3, fontFamily: F.body, fontSize: 13, lineHeight: 18, color: '#A9B4CC' }}>{m.opis}</Text>
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 14 }}>
            <Przycisk glowny ikona="pin" tekst="Prowadź" onPress={() => nawigacja(m.lat, m.lon, m.nazwa)} />
            <Okragly ikona="close" etykieta="Zamknij" onPress={() => { setWybrany(null); js(`window.punkty({wybrany:''})`); }} />
          </View>
        </View>
      )}

      {/* Lista szlaków / wypraw */}
      {((tryb === 'szlaki' && !szlak) || (tryb === 'wyprawy' && !wyprawa)) && (
        <View style={{ position: 'absolute', left: 14, right: 14, bottom: dolPanelu, backgroundColor: PANEL, borderRadius: 24, paddingVertical: 8, paddingHorizontal: 16 }}>
          <Text style={{ marginTop: 6, marginBottom: 2, fontFamily: F.bodyHeavy, fontSize: 10.5, letterSpacing: 1.6, color: t.gold }}>
            {tryb === 'szlaki' ? 'SZLAKI DO ZWIEDZANIA' : 'WYPRAWY, KTÓRE ZMIENIŁY HISTORIĘ'}
          </Text>
          {(tryb === 'szlaki'
            ? szlaki.map((s) => ({ id: s.id, nazwa: s.nazwa, pod: `${s.przystanki[0].miasto} → ${s.przystanki[s.przystanki.length - 1].miasto} · ${s.przystanki.length} przyst.` }))
            : wyprawy.map((w) => ({ id: w.id, nazwa: w.nazwa, pod: `${w.rok} · ${w.etapy[0].miejsce.split(',')[0]} → ${w.etapy[w.etapy.length - 1].miejsce.split(' (')[0]}` }))
          ).map((r, i) => (
            <Pressable
              key={r.id}
              accessibilityRole="button"
              onPress={() => (tryb === 'szlaki' ? wybierzSzlak(r.id) : wybierzWyprawe(r.id))}
              style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 11, borderTopWidth: i ? 1 : 0, borderTopColor: '#1E365E', opacity: pressed ? 0.7 : 1 })}
            >
              <Icon name={tryb === 'szlaki' ? 'route' : 'march'} size={20} color={K.zloto} strokeWidth={1.7} />
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text numberOfLines={1} style={{ fontFamily: F.lista, fontSize: 16, color: K.tekst }}>{r.nazwa}</Text>
                <Text numberOfLines={1} style={{ marginTop: 1, fontFamily: F.body, fontSize: 11.5, color: '#8E9BB3' }}>{r.pod}</Text>
              </View>
              <Icon name="chevron" size={16} color="#5D6E8C" strokeWidth={2} />
            </Pressable>
          ))}
        </View>
      )}

      {/* Wybrany szlak */}
      {tryb === 'szlaki' && szlak && (
        <View style={{ position: 'absolute', left: 14, right: 14, bottom: dolPanelu, backgroundColor: PANEL, borderRadius: 24, padding: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Okragly ikona="back" etykieta="Wszystkie szlaki" maly onPress={() => wybierzSzlak(null)} />
            <Text numberOfLines={1} style={{ flex: 1, fontFamily: F.lista, fontSize: 17, color: K.tekst }}>{szlak.nazwa}</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6, paddingTop: 12 }}>
            {szlak.przystanki.map((p, i) => {
              const on = i === przystanek;
              return (
                <Pressable
                  key={i}
                  onPress={() => { setPrzystanek(i); js(`window.etap(${i})`); }}
                  style={{ height: 30, paddingHorizontal: 10, borderRadius: 15, flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: on ? K.czerwien : K.tlo }}
                >
                  <Text style={{ fontFamily: F.liczby, fontSize: 11, color: on ? '#FFF' : K.zloto }}>{i + 1}</Text>
                  <Text style={{ fontFamily: F.bodySemi, fontSize: 11.5, color: on ? '#FFF' : '#C9D1E0' }}>{p.miasto.split(' ')[0]}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
          {przystanek != null && (
            <>
              <Text style={{ marginTop: 12, fontFamily: F.lista, fontSize: 18, color: K.tekst }}>{przystanek + 1}. {szlak.przystanki[przystanek].nazwa}</Text>
              <Text style={{ marginTop: 2, fontFamily: F.body, fontSize: 13, lineHeight: 18, color: '#A9B4CC' }}>
                {szlak.przystanki[przystanek].miasto} · {szlak.przystanki[przystanek].opis}
              </Text>
              <View style={{ flexDirection: 'row', marginTop: 12 }}>
                <Przycisk glowny ikona="pin" tekst="Prowadź" onPress={() => { const p = szlak.przystanki[przystanek]; nawigacja(p.lat, p.lon, p.nazwa); }} />
              </View>
            </>
          )}
        </View>
      )}

      {/* Wybrana wyprawa */}
      {tryb === 'wyprawy' && wyprawa && (
        <View style={{ position: 'absolute', left: 14, right: 14, bottom: dolPanelu, backgroundColor: PANEL, borderRadius: 24, padding: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Okragly ikona="back" etykieta="Wszystkie wyprawy" maly onPress={() => wybierzWyprawe(null)} />
            <Text numberOfLines={1} style={{ flex: 1, fontFamily: F.lista, fontSize: 17, color: K.tekst }}>{wyprawa.nazwa}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 10, marginTop: 12 }}>
            <Text style={{ fontFamily: F.liczby, fontSize: 22, color: K.zloto }}>{wyprawa.etapy[etap].data}</Text>
            <Text numberOfLines={1} style={{ flex: 1, fontFamily: F.bodySemi, fontSize: 13, color: K.tekst }}>{wyprawa.etapy[etap].miejsce}</Text>
          </View>
          <Text style={{ marginTop: 4, minHeight: 36, fontFamily: F.body, fontSize: 13, lineHeight: 18, color: '#A9B4CC' }}>{wyprawa.etapy[etap].opis}</Text>
          {/* Postęp: kropki etapów */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
            {wyprawa.etapy.map((_, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'center', flex: i ? 1 : 0 }}>
                {i > 0 && <View style={{ flex: 1, height: 2, backgroundColor: i <= etap ? K.czerwien : '#26416E' }} />}
                <Pressable hitSlop={8} onPress={() => idzDoEtapu(i)}>
                  <View style={{ width: i === etap ? 14 : 10, height: i === etap ? 14 : 10, borderRadius: 7, backgroundColor: i <= etap ? K.czerwien : '#26416E', borderWidth: i === etap ? 2 : 0, borderColor: K.tekst }} />
                </Pressable>
              </View>
            ))}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 14 }}>
            <Okragly ikona="prev" etykieta="Poprzedni etap" onPress={() => idzDoEtapu(etap - 1)} />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={gra ? 'Pauza' : 'Odtwórz'}
              onPress={graj}
              style={({ pressed }) => ({ width: 54, height: 54, borderRadius: 27, backgroundColor: K.czerwien, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.85 : 1 })}
            >
              <Icon name={gra ? 'pause' : 'play'} size={22} color="#FFFFFF" strokeWidth={2.2} />
            </Pressable>
            <Okragly ikona="next" etykieta="Następny etap" onPress={() => idzDoEtapu(etap + 1)} />
          </View>
        </View>
      )}

      {/* Pasek kategorii — w kolorach głównego menu */}
      <View
        style={{
          position: 'absolute', left: 16, right: 16, bottom: dolPaska, height: PASEK_H, borderRadius: PASEK_H / 2, overflow: 'hidden',
          backgroundColor: NAV_BG, borderWidth: 1, borderColor: 'rgba(246,242,232,0.14)',
        }}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 6, alignItems: 'center' }}>
          {KATEGORIE_MIEJSC.map((c) => (
            <Kafel
              key={c.id}
              on={tryb === 'punkty' && kategoria === c.id}
              ikona={c.ikona}
              nazwa={c.nazwa}
              onPress={() => pokazPunkty(tryb === 'punkty' && kategoria === c.id ? null : c.id)}
            />
          ))}
          <View style={{ width: 1, height: 30, marginHorizontal: 6, backgroundColor: 'rgba(246,242,232,0.14)' }} />
          <Kafel on={tryb === 'szlaki'} ikona="route" nazwa="Szlaki" onPress={() => (tryb === 'szlaki' ? pokazPunkty(null) : otworzSzlaki())} />
          <Kafel on={tryb === 'wyprawy'} ikona="march" nazwa="Wyprawy" onPress={() => (tryb === 'wyprawy' ? pokazPunkty(null) : otworzWyprawy())} />
        </ScrollView>
      </View>
    </View>
  );
}

function Przycisk({ ikona, tekst, onPress, glowny }: { ikona: IconName; tekst: string; onPress: () => void; glowny?: boolean }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => ({
        flex: 1, height: 42, borderRadius: 21, backgroundColor: glowny ? K.czerwien : K.tlo,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: pressed ? 0.8 : 1,
      })}
    >
      <Icon name={ikona} size={17} color="#FFFFFF" strokeWidth={2} />
      <Text style={{ fontFamily: F.bodyBold, fontSize: 14, color: '#FFFFFF' }}>{tekst}</Text>
    </Pressable>
  );
}

function Okragly({ ikona, etykieta, onPress, maly }: { ikona: IconName; etykieta: string; onPress: () => void; maly?: boolean }) {
  const r = maly ? 34 : 42;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={etykieta}
      onPress={onPress}
      style={({ pressed }) => ({ width: r, height: r, borderRadius: r / 2, backgroundColor: K.tlo, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.8 : 1 })}
    >
      <Icon name={ikona} size={maly ? 16 : 18} color="#C9D1E0" strokeWidth={2} />
    </Pressable>
  );
}
