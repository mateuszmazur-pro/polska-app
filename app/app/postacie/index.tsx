import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PasekListy } from '@/components/PasekListy';
import { Icon } from '@/components/Icon';
import { PORTRET_BG, PortretAvatar, PortretWKarcie } from '@/components/Portret';
import { IconButton } from '@/components/ui';
import { KATEGORIE, postacie, type Kategoria } from '@/data/postacie';
import { F } from '@/theme/fonts';
import { useTheme } from '@/theme/ThemeProvider';

type Filtr = 'Wszyscy' | Kategoria;
const KARTA_W = 290;
const KARTA_H = 220;

export default function Postacie() {
  const { t } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [filtr, setFiltr] = useState<Filtr>('Wszyscy');

  const polecane = postacie.filter((p) => p.polecana).sort((a, b) => Number(!!b.portret) - Number(!!a.portret));

  const grupy = useMemo(() => {
    const lista = postacie
      .filter((p) => filtr === 'Wszyscy' || p.kategoria === filtr)
      .sort((a, b) => a.imie.localeCompare(b.imie, 'pl'));
    const wynik: { litera: string; osoby: typeof lista }[] = [];
    for (const p of lista) {
      const l = p.imie.charAt(0).toUpperCase();
      const g = wynik.find((x) => x.litera === l);
      if (g) g.osoby.push(p);
      else wynik.push({ litera: l, osoby: [p] });
    }
    return wynik;
  }, [filtr]);

  let numer = 0;
  return (
    <ScrollView style={{ flex: 1, backgroundColor: t.bg }} contentContainerStyle={{ paddingTop: insets.top + 14, paddingBottom: insets.bottom + 40 }} showsVerticalScrollIndicator={false}>
      <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
        <IconButton icon="back" label="Wróć" onPress={() => router.back()} />
        <IconButton icon="search" label="Szukaj postaci" />
      </View>
      <Text accessibilityRole="header" style={{ marginTop: 14, marginHorizontal: 20, fontFamily: F.display, fontSize: 34, color: t.text }}>Wielcy Polacy</Text>

      {/* Polecane */}
      <Text style={{ marginTop: 18, marginHorizontal: 20, fontFamily: F.bodyHeavy, fontSize: 12, letterSpacing: 1.9, color: t.accentText }}>POLECANE</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 12, marginTop: 12 }} snapToInterval={KARTA_W + 25} decelerationRate="fast">
        {polecane.map((p, i) => (
          <View key={p.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          {i > 0 && <View style={{ width: 1, height: KARTA_H * 0.6, backgroundColor: 'rgba(246,242,232,0.14)' }} />}
          <Pressable
            accessibilityRole="link"
            accessibilityLabel={`${p.imie}, ${p.lata}`}
            onPress={() => router.push(`/postacie/${p.id}`)}
            style={({ pressed }) => ({ width: KARTA_W, height: KARTA_H, borderRadius: 28, overflow: 'hidden', backgroundColor: p.tlo ?? PORTRET_BG, transform: [{ scale: pressed ? 0.98 : 1 }] })}
          >
            <PortretWKarcie postac={p} width={KARTA_W} height={KARTA_H} />
            <Text style={{ position: 'absolute', left: 20, top: 20, fontFamily: F.bodyHeavy, fontSize: 11, letterSpacing: 1.8, color: '#E2C47A' }}>{p.kategoria.toUpperCase()}</Text>
            <View style={{ position: 'absolute', left: 20, bottom: 20, maxWidth: 130 }}>
              <Text style={{ fontFamily: F.display, fontSize: 22, lineHeight: 25, color: '#F6F2E8' }}>{p.imie}</Text>
              <Text style={{ marginTop: 5, fontFamily: F.bodySemi, fontSize: 12, color: '#A9B4CC' }}>{p.lata}</Text>
            </View>
          </Pressable>
          </View>
        ))}
      </ScrollView>

      {/* Filtry */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 8, marginTop: 22 }}>
        {(['Wszyscy', ...KATEGORIE] as Filtr[]).map((f) => {
          const on = f === filtr;
          return (
            <Pressable
              key={f}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              onPress={() => setFiltr(f)}
              style={{ height: 40, paddingHorizontal: 16, borderRadius: 20, justifyContent: 'center', backgroundColor: on ? t.chipOnBg : t.surface }}
            >
              <Text style={{ fontFamily: on ? F.bodyHeavy : F.bodySemi, fontSize: 13, color: on ? t.chipOnText : t.textSoft }}>{f}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Lista A–Z — pasek co drugi wiersz, liczony przez całą listę */}
      <View style={{ paddingHorizontal: 20, paddingTop: 6 }}>
        {grupy.map((g) => (
          <View key={g.litera}>
            <Text style={{ marginTop: 14, fontFamily: F.display, fontSize: 15, color: t.gold }}>{g.litera}</Text>
            {g.osoby.map((p) => {
              const nr = numer++;
              return (
              <Pressable
                key={p.id}
                accessibilityRole="link"
                accessibilityLabel={`${p.imie}, ${p.lata}, ${p.rola}`}
                onPress={() => router.push(`/postacie/${p.id}`)}
                style={({ pressed }) => ({ height: 68, marginHorizontal: -20, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', gap: 14, opacity: pressed ? 0.7 : 1 })}
              >
                {nr % 2 === 1 && <PasekListy />}
                <PortretAvatar postac={p} />
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Text style={{ fontFamily: F.lista, fontSize: 16, color: t.text }}>{p.imie}</Text>
                  <Text numberOfLines={1} style={{ marginTop: 2, fontFamily: F.body, fontSize: 12, color: t.textMuted }}>{p.lata} · {p.rola}</Text>
                </View>
                <Icon name="chevron" size={18} color={t.textMuted} strokeWidth={2} />
              </Pressable>
              );
            })}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
