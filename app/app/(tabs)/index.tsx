import { Link, type Href } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, ScrollView, Text, View, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Defs, Pattern, Rect } from 'react-native-svg';
import { TAB_BAR_SPACE } from '@/components/FloatingTabBar';
import { Emblem, Icon } from '@/components/Icon';
import { postacDnia, postacie } from '@/data/postacie';
import { dataKrotka, swietoNaDzien } from '@/data/swieta';
import { F } from '@/theme/fonts';
import { useTheme } from '@/theme/ThemeProvider';

const R = 28; // zaokrąglenie kafli
const GAP = 10;

/** Kafel = cały klikalny prostokąt, prowadzący do sekcji. */
function Kafel({ href, label, style, children }: { href: Href; label: string; style: ViewStyle; children: ReactNode }) {
  return (
    <Link href={href} asChild>
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={label}
        style={({ pressed }) => [{ borderRadius: R, overflow: 'hidden', transform: [{ scale: pressed ? 0.98 : 1 }] }, style]}
      >
        {children}
      </Pressable>
    </Link>
  );
}

export default function Start() {
  const { t } = useTheme();
  const insets = useSafeAreaInsets();
  const dzis = new Date();
  const swieto = swietoNaDzien(dzis);
  const postac = postacDnia(dzis);
  const lata = swieto?.rok ? dzis.getFullYear() - swieto.rok : undefined;
  const stos = [postac, ...postacie.filter((p) => p.id !== postac.id)].slice(0, 3);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: t.bg }}
      contentContainerStyle={{ paddingTop: insets.top + 14, paddingHorizontal: 20, paddingBottom: TAB_BAR_SPACE + insets.bottom }}
      showsVerticalScrollIndicator={false}
    >
      {/* Nagłówek: znak + nazwa */}
      <View style={{ height: 44, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Emblem size={34} gold={t.gold} white="#FFFFFF" red={t.red} />
        <Text style={{ fontFamily: F.displayHeavy, fontSize: 15, letterSpacing: 3.6, color: t.text }}>POLSKA</Text>
      </View>

      {/* Kafel główny: rocznica dnia albo początek historii */}
      <Kafel
        href="/os-czasu"
        label={swieto ? `${swieto.nazwa}. ${lata ? `${lata} ${swieto.podpis ?? 'lat'}` : ''}` : 'Oś czasu: od roku 966'}
        style={{ marginTop: 20, height: 210, backgroundColor: t.feature }}
      >
        <View style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 14 }}>
          <View style={{ flex: 1, backgroundColor: '#FFFFFF' }} />
          <View style={{ flex: 1, backgroundColor: t.name === 'biel' ? '#8E0B21' : t.red }} />
        </View>
        <Text style={{ position: 'absolute', left: 24, top: 22, fontFamily: F.bodyHeavy, fontSize: 11, letterSpacing: 2, color: t.featureEyebrow }}>
          {swieto ? `DZIŚ · ${dataKrotka(dzis)}` : 'TU ZACZYNA SIĘ HISTORIA'}
        </Text>
        <Text
          style={{ position: 'absolute', left: 18, right: 64, top: 40, fontFamily: F.displayHeavy, fontSize: 120, lineHeight: 132, letterSpacing: -4, color: t.onFeature }}
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          {lata ?? 966}
        </Text>
        <Text style={{ position: 'absolute', left: 24, bottom: 22, fontFamily: F.displayItalic, fontSize: 22, color: t.featureEyebrow }}>
          {swieto?.podpis ?? 'chrzest Polski'}
        </Text>
        <View style={{ position: 'absolute', right: 34, bottom: 20, width: 48, height: 48, borderRadius: 24, backgroundColor: t.featureButtonBg, alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="arrowRight" size={20} color={t.featureButtonIcon} strokeWidth={2.2} />
        </View>
      </Kafel>

      {/* Postacie | Quiz + Oś czasu */}
      <View style={{ marginTop: GAP, flexDirection: 'row', gap: GAP }}>
        <Kafel href="/odkrywaj" label={`Postacie. Postać dnia: ${postac.imie}`} style={{ flex: 1, height: 230, backgroundColor: t.surface, padding: 20, justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            {stos.map((p, i) => (
              <View
                key={p.id}
                style={{
                  width: 54, height: 54, borderRadius: 27, marginLeft: i === 0 ? 0 : -16, borderWidth: 1.5, borderColor: t.gold,
                  backgroundColor: t.medalBg, alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Text style={{ fontFamily: F.display, fontSize: 17, color: t.medalText }}>{p.inicjaly}</Text>
              </View>
            ))}
          </View>
          <View>
            <Text style={{ fontFamily: F.display, fontSize: 24, color: t.text }}>Postacie</Text>
            <Text numberOfLines={1} style={{ marginTop: 4, fontFamily: F.bodySemi, fontSize: 12, color: t.textMuted }}>
              Postać dnia: {postac.imie.split(' ').slice(-1)[0]}
            </Text>
          </View>
        </Kafel>

        <View style={{ flex: 1, gap: GAP }}>
          <Kafel href="/quiz" label="Quiz dnia" style={{ height: 110, backgroundColor: t.red, paddingHorizontal: 18, paddingVertical: 16, justifyContent: 'space-between' }}>
            <Icon name="quiz" size={24} color={t.onRed} strokeWidth={1.8} />
            <Text style={{ fontFamily: F.display, fontSize: 20, color: t.onRed }}>Quiz dnia</Text>
          </Kafel>
          <Kafel href="/os-czasu" label="Oś czasu" style={{ height: 110, backgroundColor: t.surface, paddingHorizontal: 18, paddingVertical: 16, justifyContent: 'space-between' }}>
            <View style={{ height: 24, justifyContent: 'center' }}>
              <View style={{ height: 2, backgroundColor: t.borderStrong }} />
              <View style={{ position: 'absolute', left: 0, width: '70%', height: 2, backgroundColor: t.gold }} />
              <View style={{ position: 'absolute', left: 0, width: 10, height: 10, borderRadius: 5, backgroundColor: t.gold }} />
              <View style={{ position: 'absolute', left: '36%', width: 10, height: 10, borderRadius: 5, backgroundColor: t.gold }} />
              <View style={{ position: 'absolute', left: '64%', width: 14, height: 14, borderRadius: 7, backgroundColor: t.red, borderWidth: 2, borderColor: t.surface }} />
              <View style={{ position: 'absolute', right: 0, width: 10, height: 10, borderRadius: 5, backgroundColor: t.borderStrong }} />
            </View>
            <Text style={{ fontFamily: F.display, fontSize: 20, color: t.text }}>Oś czasu</Text>
          </Kafel>
        </View>
      </View>

      {/* Miejsca: kropkowa „mapa” */}
      <Kafel href="/mapa" label="Miejsca" style={{ marginTop: GAP, height: 130, backgroundColor: t.surface }}>
        <Svg width="100%" height="100%" style={{ position: 'absolute' }} accessibilityElementsHidden importantForAccessibility="no">
          <Defs>
            <Pattern id="kropki" width={12} height={12} patternUnits="userSpaceOnUse">
              <Circle cx={6} cy={6} r={1.2} fill={t.borderStrong} />
            </Pattern>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#kropki)" />
          <Circle cx="50%" cy={27} r={5} fill={t.gold} />
          <Circle cx="68%" cy={57} r={5} fill={t.gold} />
          <Circle cx="84%" cy={39} r={5} fill={t.gold} />
          <Circle cx="62%" cy={97} r={8} fill={t.red} stroke={t.text} strokeWidth={3} />
        </Svg>
        <View style={{ position: 'absolute', left: 20, bottom: 18 }}>
          <Text style={{ fontFamily: F.display, fontSize: 24, color: t.text }}>Miejsca</Text>
          <Text style={{ marginTop: 2, fontFamily: F.bodySemi, fontSize: 12, color: t.textMuted }}>Od Bałtyku po Tatry</Text>
        </View>
      </Kafel>
    </ScrollView>
  );
}
