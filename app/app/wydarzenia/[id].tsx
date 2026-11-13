import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import { PanResponder, Pressable, ScrollView, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import { Icon } from '@/components/Icon';
import { PortretAvatar } from '@/components/Portret';
import { IconButton } from '@/components/ui';
import { postacPoId } from '@/data/postacie';
import { EPOKI, ROK_POCZATKU, epokaPoId, rokKonca, wydarzenia } from '@/data/wydarzenia';
import { F } from '@/theme/fonts';
import { useTheme } from '@/theme/ThemeProvider';

const WSZYSTKIE = [...wydarzenia].sort((a, b) => a.rok - b.rok);

export default function WydarzenieSzczegoly() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { width: W } = useWindowDimensions();
  const [idx, setIdx] = useState(() => Math.max(0, WSZYSTKIE.findIndex((w) => w.id === id)));
  const [szerSuwaka, setSzerSuwaka] = useState(0);

  const w = WSZYSTKIE[idx];
  const epoka = epokaPoId(w.epoka);
  const osoby = (w.postacie ?? []).map(postacPoId).filter(Boolean);
  const koniec = rokKonca();
  const zakres = koniec - ROK_POCZATKU;

  const idz = (krok: number) => setIdx((i) => Math.min(WSZYSTKIE.length - 1, Math.max(0, i + krok)));

  // Przesunięcie palcem w lewo/prawo = następne/poprzednie wydarzenie
  const gest = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 20 && Math.abs(g.dx) > Math.abs(g.dy) * 1.5,
      onPanResponderRelease: (_, g) => {
        if (g.dx < -50) idz(1);
        else if (g.dx > 50) idz(-1);
      },
    }),
  ).current;

  const skoczDoRoku = (rok: number) => {
    let naj = 0;
    WSZYSTKIE.forEach((x, i) => {
      if (Math.abs(x.rok - rok) < Math.abs(WSZYSTKIE[naj].rok - rok)) naj = i;
    });
    setIdx(naj);
  };

  const segmenty = useMemo(
    () => EPOKI.map((e) => ({ id: e.id, szer: (((e.do ?? koniec) - e.od) / zakres) * 100 })),
    [koniec, zakres],
  );
  const pozycja = ((w.rok - ROK_POCZATKU) / zakres) * 100;

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }} {...gest.panHandlers}>
      <Svg width={W} height={W * 1.3} style={{ position: 'absolute', top: insets.top - 10 }} accessibilityElementsHidden importantForAccessibility="no">
        <Circle cx={W / 2} cy={W * 0.64} r={W * 0.54} stroke={t.surface} fill="none" />
        <Circle cx={W / 2} cy={W * 0.64} r={W * 0.41} stroke={t.surface} fill="none" />
        <Circle cx={W / 2} cy={W * 0.64} r={W * 0.28} stroke={t.gold} strokeOpacity={0.3} fill="none" />
      </Svg>

      <View style={{ paddingTop: insets.top + 12, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton icon="back" label="Wróć do osi czasu" onPress={() => router.back()} />
        <Text style={{ fontFamily: F.bodyHeavy, fontSize: 11, letterSpacing: 1.8, color: t.accentText }}>{epoka?.nazwa.toUpperCase()}</Text>
      </View>

      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 30, paddingTop: 40, paddingBottom: 200 }} showsVerticalScrollIndicator={false}>
        <Text accessibilityRole="header" style={{ fontFamily: F.liczby, fontSize: 92, lineHeight: 100, color: t.text }}>{w.rok}</Text>
        {w.data ? <Text style={{ marginTop: 4, fontFamily: F.bodyBold, fontSize: 12, letterSpacing: 1.6, color: t.textMuted }}>{w.data.toUpperCase()}</Text> : null}
        <Text style={{ marginTop: 18, textAlign: 'center', fontFamily: F.display, fontSize: 30, lineHeight: 35, color: t.text }}>{w.tytul}</Text>
        <Text style={{ marginTop: 12, textAlign: 'center', fontFamily: F.body, fontSize: 15, lineHeight: 23, color: t.textSoft }}>{w.opis}</Text>

        {osoby.length > 0 && (
          <View style={{ marginTop: 22, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
            {osoby.map((p) => (
              <Pressable
                key={p!.id}
                accessibilityRole="link"
                onPress={() => router.push(`/postacie/${p!.id}`)}
                style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 8, paddingLeft: 4, paddingRight: 14, height: 44, borderRadius: 22, backgroundColor: t.surface, opacity: pressed ? 0.7 : 1 })}
              >
                <PortretAvatar postac={p!} size={36} />
                <Text style={{ fontFamily: F.bodySemi, fontSize: 13, color: t.text }}>{p!.imie}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Poprzednie / następne */}
      <View pointerEvents="box-none" style={{ position: 'absolute', left: 8, right: 8, top: insets.top + 190, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Pressable accessibilityRole="button" accessibilityLabel="Poprzednie wydarzenie" disabled={idx === 0} onPress={() => idz(-1)} style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center', opacity: idx === 0 ? 0.25 : 1 }}>
          <Icon name="back" size={22} color={t.textMuted} strokeWidth={2} />
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel="Następne wydarzenie" disabled={idx === WSZYSTKIE.length - 1} onPress={() => idz(1)} style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center', opacity: idx === WSZYSTKIE.length - 1 ? 0.25 : 1 }}>
          <Icon name="chevron" size={22} color={t.textMuted} strokeWidth={2} />
        </Pressable>
      </View>

      {/* Suwak czasu */}
      <View style={{ position: 'absolute', left: 20, right: 20, bottom: insets.bottom + 30 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
          <Text style={{ fontFamily: F.bodyBold, fontSize: 11, color: t.textMuted }}>{ROK_POCZATKU}</Text>
          <Text style={{ fontFamily: F.bodyBold, fontSize: 11, color: t.accentText }}>Dotknij, by podróżować w czasie</Text>
          <Text style={{ fontFamily: F.bodyBold, fontSize: 11, color: t.textMuted }}>dziś</Text>
        </View>
        <Pressable
          accessibilityRole="adjustable"
          accessibilityLabel={`Suwak czasu, rok ${w.rok}`}
          onLayout={(e) => setSzerSuwaka(e.nativeEvent.layout.width)}
          onPress={(e) => szerSuwaka && skoczDoRoku(ROK_POCZATKU + (e.nativeEvent.locationX / szerSuwaka) * zakres)}
          style={{ height: 44, justifyContent: 'center' }}
        >
          <View style={{ height: 10, borderRadius: 5, overflow: 'hidden', flexDirection: 'row' }}>
            {segmenty.map((s) => (
              <View key={s.id} style={{ width: `${s.szer}%`, backgroundColor: s.id === w.epoka ? t.borderStrong : t.surface, borderRightWidth: 1, borderRightColor: t.bg }} />
            ))}
          </View>
          <View style={{ position: 'absolute', left: `${pozycja}%`, marginLeft: -2, width: 4, height: 24, borderRadius: 2, backgroundColor: t.red }} />
        </Pressable>
      </View>
    </View>
  );
}
