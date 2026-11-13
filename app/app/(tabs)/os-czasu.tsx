import { useRouter } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import { Platform, Pressable, ScrollView, StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TAB_BAR_SPACE } from '@/components/FloatingTabBar';
import { PortretAvatar } from '@/components/Portret';
import { postacPoId } from '@/data/postacie';
import { EPOKI, wydarzenia } from '@/data/wydarzenia';
import { F } from '@/theme/fonts';
import { useTheme } from '@/theme/ThemeProvider';

const RZYMSKIE = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

export default function OsCzasu() {
  const { t } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [epokaId, setEpokaId] = useState(EPOKI[0].id);
  const lista = useRef<ScrollView>(null);

  const ei = EPOKI.findIndex((e) => e.id === epokaId);
  const epoka = EPOKI[ei];
  const zdarzenia = useMemo(() => wydarzenia.filter((w) => w.epoka === epokaId).sort((a, b) => a.rok - b.rok), [epokaId]);

  const wybierz = (id: string) => {
    setEpokaId(id);
    lista.current?.scrollTo({ y: 0, animated: false });
  };

  // Android: gdy system nie poda wcięcia, bierzemy wysokość paska statusu wprost.
  const gornyPas = Math.max(insets.top, Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0);
  // Lista zaczyna się pod paskiem statusu (notch, godzina, zasięg), więc przyklejone
  // zakładki epok zatrzymują się tuż pod nim, a nie nachodzą na niego.
  return (
    <View style={{ flex: 1, backgroundColor: t.bg, paddingTop: gornyPas }}>
    <ScrollView
      ref={lista}
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingTop: 18, paddingBottom: TAB_BAR_SPACE + insets.bottom }}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[1]}
    >
      <View style={{ paddingHorizontal: 20, flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <Text accessibilityRole="header" style={{ fontFamily: F.display, fontSize: 36, lineHeight: 40, color: t.text }}>Oś czasu</Text>
        <Text style={{ fontFamily: F.bodyBold, fontSize: 12, color: t.textMuted }}>966 — dziś</Text>
      </View>

      {/* Epoki (przyklejone u góry przy przewijaniu) */}
      <View style={{ backgroundColor: t.bg, paddingTop: 10 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 22 }} accessibilityRole="tablist">
          {EPOKI.map((e) => {
            const on = e.id === epokaId;
            return (
              <Pressable key={e.id} accessibilityRole="tab" accessibilityState={{ selected: on }} onPress={() => wybierz(e.id)} style={{ paddingTop: 6, paddingBottom: 12 }}>
                <Text style={{ fontFamily: F.lista, fontSize: 16, color: on ? t.text : t.textMuted }}>{e.nazwa}</Text>
                <Text style={{ marginTop: 2, fontFamily: F.bodySemi, fontSize: 11, color: on ? t.accentText : t.textMuted }}>
                  {e.od}–{e.do ?? 'dziś'}
                </Text>
                {on && <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 2.5, borderRadius: 2, backgroundColor: t.red }} />}
              </Pressable>
            );
          })}
        </ScrollView>
        <View style={{ height: 1, backgroundColor: t.border }} />
      </View>

      {/* Nagłówek epoki */}
      <View style={{ paddingHorizontal: 20, marginTop: 18 }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 10 }}>
          <Text style={{ fontFamily: F.marka, fontSize: 13, letterSpacing: 1.3, color: t.gold }}>{RZYMSKIE[ei]}</Text>
          <Text style={{ fontFamily: F.display, fontSize: 24, color: t.text }}>{epoka.nazwa}</Text>
        </View>
        <Text style={{ marginTop: 4, fontFamily: F.body, fontSize: 13, lineHeight: 19, color: t.textMuted }}>{epoka.wstep}</Text>
      </View>

      {/* Wydarzenia */}
      <View style={{ paddingLeft: 6, paddingRight: 20, marginTop: 8 }}>
        {zdarzenia.map((w, i) => {
          const osoby = (w.postacie ?? []).map(postacPoId).filter(Boolean);
          return (
            <View key={w.id} style={{ flexDirection: 'row', gap: 12 }}>
              <Text style={{ width: 52, textAlign: 'right', paddingTop: 16, fontFamily: F.liczby, fontSize: 16, color: t.accentText }}>{w.rok}</Text>
              <View style={{ width: 14, alignItems: 'center' }}>
                <View style={{ width: 1, height: 20, backgroundColor: i === 0 ? 'transparent' : t.borderStrong }} />
                <View style={{ width: w.wazne ? 12 : 8, height: w.wazne ? 12 : 8, borderRadius: 6, backgroundColor: w.wazne ? t.red : t.gold }} />
                <View style={{ flex: 1, width: 1, backgroundColor: i === zdarzenia.length - 1 ? 'transparent' : t.borderStrong }} />
              </View>
              <Pressable
                accessibilityRole="link"
                accessibilityLabel={`${w.rok}. ${w.tytul}`}
                onPress={() => router.push(`/wydarzenia/${w.id}`)}
                style={({ pressed }) => ({
                  flex: 1, minWidth: 0, marginTop: 6, marginBottom: 8, paddingHorizontal: 14, paddingVertical: 12, borderRadius: 18,
                  backgroundColor: w.wazne ? t.surface : 'transparent', opacity: pressed ? 0.7 : 1,
                })}
              >
                <Text style={{ fontFamily: F.lista, fontSize: 17, lineHeight: 22, color: t.text }}>{w.tytul}</Text>
                <Text style={{ marginTop: 4, fontFamily: F.body, fontSize: 13, lineHeight: 19, color: t.textMuted }}>{w.opis}</Text>
                {osoby.map((p) => (
                  <Pressable
                    key={p!.id}
                    accessibilityRole="link"
                    onPress={() => router.push(`/postacie/${p!.id}`)}
                    style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start' }}
                  >
                    <PortretAvatar postac={p!} size={28} />
                    <Text style={{ fontFamily: F.bodySemi, fontSize: 12, color: t.textSoft }}>{p!.imie}</Text>
                  </Pressable>
                ))}
              </Pressable>
            </View>
          );
        })}
      </View>

      {/* Następna epoka */}
      {ei < EPOKI.length - 1 && (
        <Pressable onPress={() => wybierz(EPOKI[ei + 1].id)} style={{ marginTop: 10, marginHorizontal: 20, height: 52, borderRadius: 26, borderWidth: 1, borderColor: t.borderStrong, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: F.bodyBold, fontSize: 14, color: t.text }}>Dalej: {EPOKI[ei + 1].nazwa} →</Text>
        </Pressable>
      )}
    </ScrollView>
    </View>
  );
}
