import { useRouter } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, Text, View } from 'react-native';
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
const WIERSZ_H = 72;
const LITERA = 34;

export default function Postacie() {
  const { t } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [filtr, setFiltr] = useState<Filtr>('Wszyscy');

  const polecane = postacie.filter((p) => p.polecana).sort((a, b) => Number(!!b.portret) - Number(!!a.portret));

  const lista = useMemo(
    () => postacie
      .filter((p) => filtr === 'Wszyscy' || p.kategoria === filtr)
      .sort((a, b) => a.imie.localeCompare(b.imie, 'pl')),
    [filtr],
  );
  const litery = lista.map((p) => p.imie.charAt(0).toUpperCase());

  // Pływająca litera z boku (jak w kontaktach iPhone'a): stoi przy pierwszym wierszu,
  // przykleja się u góry ekranu i zmienia się, gdy lista wchodzi w kolejną literę.
  const scrollY = useRef(new Animated.Value(0)).current;
  const [listaY, setListaY] = useState(0);
  const [idx, setIdx] = useState(0);
  const litera = litery[Math.min(idx, litery.length - 1)] ?? '';
  const gora = insets.top + 12;
  const startLitery = listaY + (WIERSZ_H - LITERA) / 2;
  const literaY = scrollY.interpolate({
    inputRange: [0, Math.max(1, startLitery - gora)],
    outputRange: [startLitery, gora],
    extrapolate: 'clamp',
  });
  const aktualna = (y: number) => {
    const i = Math.min(lista.length - 1, Math.max(0, Math.floor((y + gora + LITERA / 2 - listaY) / WIERSZ_H)));
    if (i !== idx) setIdx(i);
  };

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
    <Animated.ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingTop: insets.top + 14, paddingBottom: insets.bottom + 40 }}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
        useNativeDriver: true,
        listener: (e: any) => aktualna(e.nativeEvent.contentOffset.y),
      })}
    >
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

      {/* Lista A–Z — bez przerywników liter, pasek co drugi wiersz */}
      <View
        style={{ marginTop: 14 }}
        onLayout={(e) => setListaY(e.nativeEvent.layout.y)}
      >
        {lista.map((p, nr) => (
          <Pressable
            key={p.id}
            accessibilityRole="link"
            accessibilityLabel={`${p.imie}, ${p.lata}, ${p.rola}`}
            onPress={() => router.push(`/postacie/${p.id}`)}
            style={({ pressed }) => ({ height: WIERSZ_H, paddingLeft: 20, paddingRight: 60, flexDirection: 'row', alignItems: 'center', gap: 14, opacity: pressed ? 0.7 : 1 })}
          >
            {nr % 2 === 1 && <PasekListy />}
            <PortretAvatar postac={p} />
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text numberOfLines={1} style={{ fontFamily: F.lista, fontSize: 18, color: t.text }}>{p.imie}</Text>
              <Text numberOfLines={1} style={{ marginTop: 2, fontFamily: F.body, fontSize: 12, color: t.textMuted }}>{p.lata} · {p.rola}</Text>
            </View>
            <Icon name="chevron" size={18} color={t.textMuted} strokeWidth={2} />
          </Pressable>
        ))}
      </View>
    </Animated.ScrollView>

    {lista.length > 0 && listaY > 0 && (
      <Animated.View
        pointerEvents="none"
        style={{
          position: 'absolute', right: 14, top: 0, width: LITERA, height: LITERA, borderRadius: LITERA / 2,
          alignItems: 'center', justifyContent: 'center',
          backgroundColor: t.surface, borderWidth: 1, borderColor: t.borderStrong,
          transform: [{ translateY: literaY }],
        }}
      >
        <Text style={{ fontFamily: F.liczby, fontSize: 15, color: t.gold }}>{litera}</Text>
      </Animated.View>
    )}
    </View>
  );
}
