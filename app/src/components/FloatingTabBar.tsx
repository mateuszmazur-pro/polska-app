import { useRouter, type Href } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { F } from '@/theme/fonts';
import { useTheme } from '@/theme/ThemeProvider';
import { Icon, type IconName } from './Icon';

const WYSOKOSC = 68;
const MARGINES = 6;
/** krycie kolejnych pasów poświaty (od góry do dołu) */
const POSWIATA = Array.from({ length: 14 }, (_, i) => 0.42 * Math.pow((i + 1) / 14, 2.2));

/** Miejsce, które ekrany zostawiają na końcu przewijania pod pływającym menu. */
export const TAB_BAR_SPACE = WYSOKOSC + 24 + 16;

export const TAB_META: Record<string, { title: string; icon: IconName }> = {
  index: { title: 'Start', icon: 'home' },
  odkrywaj: { title: 'Odkrywaj', icon: 'compass' },
  'os-czasu': { title: 'Oś czasu', icon: 'timeline' },
  mapa: { title: 'Mapa', icon: 'pin' },
};

type Route = { key: string; name: string };
type Props = { state: { index: number; routes: Route[] } };

const sciezka = (name: string): Href => (name === 'index' ? '/' : `/${name}`) as Href;

/**
 * Pływające menu: pod aktywną zakładką przesuwa się pigułka z czerwoną poświatą
 * i kreską światła u dołu (sprężysta animacja jak w iOS). Aktywna ikona — biała.
 */
export function FloatingTabBar({ state }: Props) {
  const { t } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const trasy = state.routes.filter((r) => TAB_META[r.name]);
  const aktywna = Math.max(0, trasy.findIndex((r) => r.key === state.routes[state.index]?.key));

  const [szer, setSzer] = useState(0);
  const x = useRef(new Animated.Value(0)).current;
  const nacisk = useRef(new Animated.Value(1)).current;
  const kafel = szer > 0 ? (szer - MARGINES * 2) / trasy.length : 0;

  useEffect(() => {
    if (!kafel) return;
    Animated.spring(x, { toValue: aktywna * kafel, useNativeDriver: true, damping: 18, stiffness: 180, mass: 0.9 }).start();
    nacisk.setValue(0.92);
    Animated.spring(nacisk, { toValue: 1, useNativeDriver: true, damping: 10, stiffness: 220 }).start();
  }, [aktywna, kafel, x, nacisk]);

  const ciemny = t.statusBar === 'light';

  return (
    <View pointerEvents="box-none" style={{ position: 'absolute', left: 16, right: 16, bottom: Math.max(insets.bottom, 12) + 8 }}>
      <View
        accessibilityRole="tablist"
        onLayout={(e) => setSzer(e.nativeEvent.layout.width)}
        style={{
          height: WYSOKOSC, borderRadius: WYSOKOSC / 2, overflow: 'hidden',
          borderWidth: 1, borderColor: ciemny ? 'rgba(246,242,232,0.14)' : 'rgba(22,24,29,0.08)',
          shadowColor: '#000', shadowOpacity: ciemny ? 0.45 : 0.15, shadowRadius: 24, shadowOffset: { width: 0, height: 14 }, elevation: 14,
        }}
      >
        <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: ciemny ? t.navBg : '#FFFFFF' }} />

        {/* Szklana pigułka pod aktywną zakładką: jasne szkło u góry, czerwona poświata u dołu */}
        {kafel > 0 && (
          <Animated.View
            pointerEvents="none"
            style={{
              position: 'absolute', top: MARGINES, left: MARGINES, width: kafel, height: WYSOKOSC - MARGINES * 2,
              borderRadius: (WYSOKOSC - MARGINES * 2) / 2, overflow: 'hidden',
                            transform: [{ translateX: x }, { scale: nacisk }],
            }}
          >
            {/* poświata: pasy o rosnącym kryciu ku dołowi */}
            <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '62%' }}>
              {POSWIATA.map((k, i) => (
                <View key={i} style={{ flex: 1, backgroundColor: t.red, opacity: k * (ciemny ? 1 : 0.8) }} />
              ))}
            </View>
            {/* jasna kreska światła na dole */}
            <View
              style={{
                position: 'absolute', bottom: 0, alignSelf: 'center', width: '46%', height: 2.5, borderRadius: 2,
                backgroundColor: '#FF4D66',
                shadowColor: '#FF1F3D', shadowOpacity: 0.9, shadowRadius: 6, shadowOffset: { width: 0, height: 0 },
              }}
            />
          </Animated.View>
        )}

        <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: MARGINES }}>
          {trasy.map((route, i) => {
            const meta = TAB_META[route.name];
            const on = i === aktywna;
            const kolor = on ? (ciemny ? '#FFFFFF' : t.text) : t.textMuted;
            return (
              <Pressable
                key={route.key}
                accessibilityRole="tab"
                accessibilityState={{ selected: on }}
                accessibilityLabel={meta.title}
                onPress={() => { if (!on) router.navigate(sciezka(route.name)); }}
                style={({ pressed }) => ({ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 3, opacity: pressed ? 0.7 : 1 })}
              >
                <Icon name={meta.icon} size={22} color={kolor} strokeWidth={on ? 2 : 1.8} />
                <Text style={{ fontFamily: on ? F.bodyHeavy : F.bodySemi, fontSize: 10.5, color: kolor }}>{meta.title}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}
