import { useMemo, useRef, useState } from 'react';
import { Linking, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TAB_BAR_SPACE } from '@/components/FloatingTabBar';
import { Icon } from '@/components/Icon';
import { mapaHtml } from '@/components/mapaHtml';
import { KATEGORIE_MIEJSC, miejsca } from '@/data/miejsca';
import { F } from '@/theme/fonts';
import { useTheme } from '@/theme/ThemeProvider';

type Filtr = (typeof KATEGORIE_MIEJSC)[number]['id'];

// Mapa zawsze w granacie — jak rycina, niezależnie od motywu aplikacji.
const KOLORY = { tlo: '#0C1D36', lad: '#132A4D', woda: '#071222', zloto: '#C9A24A', czerwien: '#C8102E', tekst: '#F6F2E8', tekstCichy: '#8E9BB3' };

export default function Mapa() {
  const { t } = useTheme();
  const insets = useSafeAreaInsets();
  const web = useRef<WebView>(null);
  const [filtr, setFiltr] = useState<Filtr>('wszystko');
  const [wybrany, setWybrany] = useState<string | null>(null);
  const [gotowa, setGotowa] = useState(false);

  const html = useMemo(() => mapaHtml(miejsca, KOLORY), []);
  const widoczne = miejsca.filter((m) => filtr === 'wszystko' || (filtr === 'unesco' ? m.unesco : m.kategoria === filtr));
  const m = miejsca.find((x) => x.id === wybrany && widoczne.includes(x));

  const ustaw = (o: object) => web.current?.injectJavaScript(`window.ustaw && window.ustaw(${JSON.stringify(o)}); true;`);

  const zmienFiltr = (f: Filtr) => {
    setFiltr(f);
    const ids = miejsca.filter((x) => f === 'wszystko' || (f === 'unesco' ? x.unesco : x.kategoria === f)).map((x) => x.id);
    const zostaje = wybrany && ids.includes(wybrany) ? wybrany : '';
    if (!zostaje) setWybrany(null);
    ustaw({ widoczne: f === 'wszystko' ? null : ids, wybrany: zostaje });
  };

  const prowadz = () => {
    if (!m) return;
    const url = Platform.OS === 'ios'
      ? `http://maps.apple.com/?daddr=${m.lat},${m.lon}&q=${encodeURIComponent(m.nazwa)}`
      : `https://www.google.com/maps/dir/?api=1&destination=${m.lat},${m.lon}`;
    Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1, backgroundColor: KOLORY.tlo }}>
      <WebView
        ref={web}
        source={{ html }}
        originWhitelist={['*']}
        style={{ flex: 1, backgroundColor: KOLORY.tlo }}
        containerStyle={{ backgroundColor: KOLORY.tlo }}
        onMessage={(e) => {
          try {
            const d = JSON.parse(e.nativeEvent.data);
            if (d.typ === 'gotowa') setGotowa(true);
            if (d.typ === 'wybor') setWybrany(d.id);
          } catch {}
        }}
        setSupportMultipleWindows={false}
        bounces={false}
        overScrollMode="never"
      />

      {/* Nagłówek i filtry nad mapą */}
      <View pointerEvents="box-none" style={{ position: 'absolute', left: 0, right: 0, top: 0, paddingTop: insets.top + 10 }}>
        <View pointerEvents="none" style={{ paddingHorizontal: 20, flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <Text accessibilityRole="header" style={{ fontFamily: F.display, fontSize: 34, color: KOLORY.tekst }}>Mapa</Text>
          <Text style={{ fontFamily: F.bodyHeavy, fontSize: 11, letterSpacing: 1.6, color: t.gold }}>{widoczne.length} MIEJSC</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 8, paddingTop: 10 }}>
          {KATEGORIE_MIEJSC.map((k) => {
            const on = k.id === filtr;
            return (
              <Pressable
                key={k.id}
                accessibilityRole="button"
                accessibilityState={{ selected: on }}
                onPress={() => zmienFiltr(k.id)}
                style={{ height: 36, paddingHorizontal: 15, borderRadius: 18, justifyContent: 'center', backgroundColor: on ? KOLORY.tekst : 'rgba(19,42,77,0.92)' }}
              >
                <Text style={{ fontFamily: on ? F.bodyHeavy : F.bodySemi, fontSize: 13, color: on ? KOLORY.tlo : '#D5DBE8' }}>{k.nazwa}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {!gotowa && (
        <View pointerEvents="none" style={{ position: 'absolute', left: 0, right: 0, top: '45%', alignItems: 'center' }}>
          <Text style={{ fontFamily: F.bodySemi, fontSize: 13, color: KOLORY.tekstCichy }}>Wczytuję mapę…</Text>
        </View>
      )}

      {/* Karta wybranego miejsca */}
      {m && (
        <View style={{ position: 'absolute', left: 14, right: 14, bottom: TAB_BAR_SPACE + insets.bottom - 4, backgroundColor: KOLORY.lad, borderRadius: 24, padding: 16 }}>
          <Text style={{ fontFamily: F.bodyHeavy, fontSize: 10.5, letterSpacing: 1.6, color: t.gold }}>
            {m.miasto.toUpperCase()}{m.unesco ? ' · UNESCO' : ''}
          </Text>
          <Text style={{ marginTop: 3, fontFamily: F.lista, fontSize: 19, color: KOLORY.tekst }}>{m.nazwa}</Text>
          <Text style={{ marginTop: 3, fontFamily: F.body, fontSize: 13, lineHeight: 18, color: '#A9B4CC' }}>{m.opis}</Text>
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 14 }}>
            <Pressable
              accessibilityRole="button"
              onPress={prowadz}
              style={({ pressed }) => ({ flex: 1, height: 42, borderRadius: 21, backgroundColor: t.red, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: pressed ? 0.8 : 1 })}
            >
              <Icon name="pin" size={17} color="#FFFFFF" strokeWidth={2} />
              <Text style={{ fontFamily: F.bodyBold, fontSize: 14, color: '#FFFFFF' }}>Prowadź</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Zamknij"
              onPress={() => { setWybrany(null); ustaw({ wybrany: '' }); }}
              style={({ pressed }) => ({ width: 42, height: 42, borderRadius: 21, backgroundColor: KOLORY.tlo, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.8 : 1 })}
            >
              <Text style={{ fontFamily: F.bodyBold, fontSize: 18, color: '#A9B4CC', marginTop: -2 }}>×</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}
