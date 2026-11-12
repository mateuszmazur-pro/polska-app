import { useRouter, type Href } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TAB_BAR_SPACE } from '@/components/FloatingTabBar';
import { Icon } from '@/components/Icon';
import { F } from '@/theme/fonts';
import { useTheme } from '@/theme/ThemeProvider';

const RZYMSKIE = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];

const SPIS: { t: string; d: string; href?: Href }[] = [
  { t: 'Wielcy Polacy', d: 'Postacie, które zmieniły świat', href: '/postacie' },
  { t: 'Oś czasu', d: 'Od 966 do dziś', href: '/os-czasu' },
  { t: 'Epoki', d: 'Okresy dziejów' },
  { t: 'Wydarzenia', d: 'Bitwy i przełomy' },
  { t: 'Miejsca', d: 'Zabytki i pamięć', href: '/mapa' },
  { t: 'Kultura', d: 'Sztuka i tradycje' },
  { t: 'Symbole', d: 'Flaga, godło, hymn' },
  { t: 'Święta', d: 'Rocznice i obchody' },
  { t: 'Ciekawostki', d: 'Fakty i rekordy' },
];

export default function Odkrywaj() {
  const { t } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [szukaj, setSzukaj] = useState('');

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: t.bg }}
      contentContainerStyle={{ paddingTop: insets.top + 18, paddingHorizontal: 20, paddingBottom: TAB_BAR_SPACE + insets.bottom }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Text accessibilityRole="header" style={{ fontFamily: F.display, fontSize: 36, lineHeight: 40, color: t.text }}>Odkrywaj</Text>

      <View style={{ marginTop: 16, height: 48, borderRadius: 24, backgroundColor: t.surface, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, gap: 10 }}>
        <Icon name="search" size={18} color={t.textMuted} />
        <TextInput
          value={szukaj}
          onChangeText={setSzukaj}
          placeholder="Postać, miejsce, wydarzenie…"
          placeholderTextColor={t.textMuted}
          accessibilityLabel="Szukaj"
          style={{ flex: 1, height: 48, fontFamily: F.body, fontSize: 14, color: t.text }}
        />
      </View>

      <Text style={{ marginTop: 22, fontFamily: F.bodyHeavy, fontSize: 11, letterSpacing: 2, color: t.accentText }}>SPIS TREŚCI</Text>

      <View style={{ marginTop: 6, borderTopWidth: 1, borderTopColor: t.border }}>
        {SPIS.map((k, i) => (
          <Pressable
            key={k.t}
            accessibilityRole="link"
            accessibilityLabel={`${k.t}. ${k.d}`}
            onPress={k.href ? () => router.push(k.href!) : undefined}
            style={({ pressed }) => ({
              height: 76, flexDirection: 'row', alignItems: 'center', gap: 16,
              borderBottomWidth: 1, borderBottomColor: t.border, opacity: pressed ? 0.6 : 1,
            })}
          >
            <Text style={{ width: 44, fontFamily: F.marka, fontSize: 15, letterSpacing: 1, color: t.gold }}>{RZYMSKIE[i]}</Text>
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={{ fontFamily: F.display, fontSize: 22, lineHeight: 26, color: t.text }}>{k.t}</Text>
              <Text numberOfLines={1} style={{ marginTop: 3, fontFamily: F.body, fontSize: 12, color: t.textMuted }}>{k.d}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
