import { Link, useRouter, type Href } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Text as SvgText } from 'react-native-svg';
import { Emblem, Icon, type IconName } from '@/components/Icon';
import { Card, Eyebrow, IconButton, Medallion } from '@/components/ui';
import { postacDnia } from '@/data/postacie';
import { dataPoPolsku, swietoNaDzien } from '@/data/swieta';
import { F } from '@/theme/fonts';
import { useTheme } from '@/theme/ThemeProvider';

const KAFLE: { label: string; icon: IconName; href: Href; highlight?: boolean }[] = [
  { label: 'Postacie', icon: 'person', href: '/odkrywaj' },
  { label: 'Miejsca', icon: 'castle', href: '/mapa' },
  { label: 'Oś czasu', icon: 'timeline', href: '/os-czasu' },
  { label: 'Symbole', icon: 'crown', href: '/odkrywaj' },
  { label: 'Kultura', icon: 'music', href: '/odkrywaj' },
  { label: 'Quiz', icon: 'quiz', href: '/wyzwania', highlight: true },
];

export default function Start() {
  const { t } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const dzis = new Date();
  const swieto = swietoNaDzien(dzis);
  const postac = postacDnia(dzis);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: t.bg }}
      contentContainerStyle={{ paddingTop: insets.top + 16, paddingHorizontal: 22, paddingBottom: 32 }}
    >
      {/* Nagłówek */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Emblem size={40} gold={t.gold} white="#FFFFFF" red={t.red} />
          <View>
            <Text style={{ fontFamily: F.displayHeavy, fontSize: 20, letterSpacing: 4.4, color: t.text }}>POLSKA</Text>
            <Text style={{ fontFamily: F.displayItalicLight, fontSize: 13, color: t.accentText, marginTop: 2 }}>Moja Ojczyzna</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <IconButton icon="search" label="Szukaj" />
          <IconButton icon="settings" label="Ustawienia" onPress={() => router.push('/ustawienia')} />
        </View>
      </View>

      {/* Powitanie */}
      <View style={{ marginTop: 26 }}>
        <Text style={{ fontFamily: F.bodyBold, fontSize: 12, letterSpacing: 1.9, textTransform: 'uppercase', color: t.textMuted }}>
          {dataPoPolsku(dzis)}
        </Text>
        <Text style={{ marginTop: 8, fontFamily: F.displaySemi, fontSize: 30, lineHeight: 35, color: t.text }}>
          Odkrywaj historię,{'\n'}
          <Text style={{ fontFamily: F.displayItalic, color: t.name === 'biel' ? t.red : t.accentText }}>która nas łączy.</Text>
        </Text>
      </View>

      {/* Karta dnia: święto albo zaproszenie na oś czasu */}
      <View style={{ marginTop: 22, borderRadius: 24, backgroundColor: t.feature, padding: 20, overflow: 'hidden' }}>
        {swieto?.rok && (
          <Svg width={190} height={120} style={{ position: 'absolute', right: -10, top: -16 }} accessibilityElementsHidden importantForAccessibility="no">
            <SvgText x={185} y={110} textAnchor="end" fontFamily={F.displayHeavy} fontSize={128} fill="none" stroke={t.gold} strokeWidth={1.5}>
              {String(dzis.getFullYear() - swieto.rok)}
            </SvgText>
          </Svg>
        )}
        <Eyebrow color={t.featureEyebrow}>{swieto ? 'Dziś · Święto narodowe' : 'Dziś w aplikacji'}</Eyebrow>
        <Text style={{ marginTop: 14, maxWidth: 240, fontFamily: F.display, fontSize: 24, lineHeight: 28, color: t.onFeature }}>
          {swieto ? swieto.nazwa : 'Ponad tysiąc lat historii w kieszeni'}
        </Text>
        <Text style={{ marginTop: 10, maxWidth: 290, fontFamily: F.body, fontSize: 14, lineHeight: 21, color: t.onFeatureMuted }}>
          {swieto ? swieto.opis : 'Od chrztu Polski w 966 r. po dzisiejsze czasy — krok po kroku.'}
        </Text>
        <Link href="/os-czasu" asChild>
          <Pressable
            accessibilityRole="link"
            style={({ pressed }) => ({
              marginTop: 16, alignSelf: 'flex-start', height: 44, paddingHorizontal: 18, borderRadius: 22,
              backgroundColor: t.featureButtonBg, flexDirection: 'row', alignItems: 'center', gap: 8, opacity: pressed ? 0.8 : 1,
            })}
          >
            <Text style={{ fontFamily: F.bodyBold, fontSize: 14, color: t.featureButtonText }}>
              {swieto ? 'Poznaj tę historię' : 'Otwórz oś czasu'}
            </Text>
            <Icon name="arrowRight" size={16} color={t.featureButtonIcon} strokeWidth={2} />
          </Pressable>
        </Link>
      </View>

      {/* Odkrywaj */}
      <View style={{ marginTop: 26, flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <Text accessibilityRole="header" style={{ fontFamily: F.displaySemi, fontSize: 20, color: t.text }}>Odkrywaj</Text>
        <Link href="/odkrywaj" style={{ fontFamily: F.bodyBold, fontSize: 13, color: t.accentText }}>Wszystko</Link>
      </View>
      <View style={{ marginTop: 14, flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
        {KAFLE.map((k) => (
          <Link key={k.label} href={k.href} asChild>
            <Pressable
              accessibilityRole="link"
              style={({ pressed }) => ({
                flexBasis: '31%', flexGrow: 1, height: 84, borderRadius: 18, padding: 14, justifyContent: 'space-between',
                backgroundColor: k.highlight ? t.red : t.surface, borderWidth: k.highlight ? 0 : 1, borderColor: t.border,
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Icon name={k.icon} size={24} color={k.highlight ? t.onRed : t.accentIcon} strokeWidth={1.7} />
              <Text style={{ fontFamily: F.bodyBold, fontSize: 13, color: k.highlight ? t.onRed : t.text }}>{k.label}</Text>
            </Pressable>
          </Link>
        ))}
      </View>

      {/* Postać dnia */}
      <Card style={{ marginTop: 14, padding: 12, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 14 }} onPress={() => router.push('/odkrywaj')}>
        <Medallion initials={postac.inicjaly} />
        <View style={{ flex: 1, gap: 3 }}>
          <Eyebrow>Postać dnia</Eyebrow>
          <Text style={{ fontFamily: F.displaySemi, fontSize: 17, color: t.text }}>{postac.imie}</Text>
          <Text style={{ fontFamily: F.body, fontSize: 12, color: t.textMuted }}>{postac.lata} · {postac.rola}</Text>
        </View>
      </Card>
    </ScrollView>
  );
}
