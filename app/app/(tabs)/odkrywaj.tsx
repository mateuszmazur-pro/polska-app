import { useRouter, type Href } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TAB_BAR_SPACE } from '@/components/FloatingTabBar';
import { Icon, type IconName } from '@/components/Icon';
import { PORTRET_BG, PortretWKarcie } from '@/components/Portret';
import { postacPoId } from '@/data/postacie';
import { F } from '@/theme/fonts';
import { useTheme } from '@/theme/ThemeProvider';

const KATEGORIE: { t: string; d: string; icon: IconName; href?: Href }[] = [
  { t: 'Oś czasu', d: 'Od 966 do dziś', icon: 'timeline', href: '/os-czasu' },
  { t: 'Epoki', d: 'Okresy dziejów', icon: 'crown' },
  { t: 'Wydarzenia', d: 'Bitwy i przełomy', icon: 'swords' },
  { t: 'Miejsca', d: 'Zabytki i pamięć', icon: 'castle', href: '/mapa' },
  { t: 'Kultura', d: 'Sztuka i tradycje', icon: 'music' },
  { t: 'Symbole', d: 'Flaga, godło, hymn', icon: 'flag' },
  { t: 'Święta', d: 'Rocznice i obchody', icon: 'calendar' },
  { t: 'Ciekawostki', d: 'Fakty i rekordy', icon: 'bulb' },
];

export default function Odkrywaj() {
  const { t } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [szukaj, setSzukaj] = useState('');
  const kafelW = width - 40;
  const twarz = postacPoId('mikolaj-kopernik')!;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: t.bg }}
      contentContainerStyle={{ paddingTop: insets.top + 18, paddingHorizontal: 20, paddingBottom: TAB_BAR_SPACE + insets.bottom }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Text accessibilityRole="header" style={{ fontFamily: F.display, fontSize: 34, color: t.text }}>Odkrywaj</Text>

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

      {/* Wyróżniony kafel: Wielcy Polacy */}
      <Pressable
        accessibilityRole="link"
        accessibilityLabel="Wielcy Polacy"
        onPress={() => router.push('/postacie')}
        style={({ pressed }) => ({
          marginTop: 16, height: 168, borderRadius: 28, overflow: 'hidden', backgroundColor: PORTRET_BG,
          borderWidth: 1, borderColor: '#1C3166', transform: [{ scale: pressed ? 0.98 : 1 }],
        })}
      >
        <PortretWKarcie postac={twarz} width={kafelW} height={168} />
        <Text style={{ position: 'absolute', left: 20, top: 20, fontFamily: F.bodyHeavy, fontSize: 11, letterSpacing: 1.8, color: '#E2C47A' }}>POSTACIE</Text>
        <Text style={{ position: 'absolute', left: 20, bottom: 20, fontFamily: F.display, fontSize: 26, lineHeight: 28, color: '#F6F2E8' }}>Wielcy{'\n'}Polacy</Text>
      </Pressable>

      {/* Siatka kategorii */}
      <View style={{ marginTop: 10, flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
        {KATEGORIE.map((k) => (
          <Pressable
            key={k.t}
            accessibilityRole="button"
            accessibilityLabel={`${k.t}. ${k.d}`}
            onPress={k.href ? () => router.push(k.href!) : undefined}
            style={({ pressed }) => ({
              width: (kafelW - 10) / 2, height: 104, borderRadius: 24, padding: 16, justifyContent: 'space-between',
              backgroundColor: t.surface, opacity: pressed ? 0.85 : 1,
            })}
          >
            <View style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: t.bg, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={k.icon} size={20} color={t.accentIcon} />
            </View>
            <View>
              <Text style={{ fontFamily: F.display, fontSize: 17, color: t.text }}>{k.t}</Text>
              <Text style={{ marginTop: 2, fontFamily: F.bodySemi, fontSize: 11, color: t.textMuted }}>{k.d}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
