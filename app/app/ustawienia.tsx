import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/Icon';
import { Eyebrow, IconButton } from '@/components/ui';
import { F } from '@/theme/fonts';
import { useTheme } from '@/theme/ThemeProvider';
import { themes, type ThemeMode } from '@/theme/themes';

const OPCJE: { mode: ThemeMode; label: string; opis: string }[] = [
  { mode: 'auto', label: 'Automatycznie', opis: 'Jak w telefonie: jasny → Biel, ciemny → Granat' },
  { mode: 'granat', label: 'Granat', opis: 'Granat, kość słoniowa i złoto' },
  { mode: 'biel', label: 'Biel', opis: 'Biel, czerwień i złoto' },
  { mode: 'grafit', label: 'Grafit', opis: 'Szarości, złoto i czerwień' },
];

/** Mała próbka motywu: tło, wyróżnienie i złota obwódka. */
function Probka({ mode }: { mode: ThemeMode }) {
  const a = mode === 'auto' ? themes.biel : themes[mode];
  const b = mode === 'auto' ? themes.granat : themes[mode];
  return (
    <View style={{ width: 44, height: 44, borderRadius: 22, borderWidth: 1.5, borderColor: a.gold, overflow: 'hidden', flexDirection: 'row' }}>
      <View style={{ flex: 1, backgroundColor: a.bg }} />
      <View style={{ flex: 1, backgroundColor: mode === 'auto' ? b.bg : a.feature }} />
    </View>
  );
}

export default function Ustawienia() {
  const { t, mode, setMode } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: t.bg }} contentContainerStyle={{ paddingTop: insets.top + 16, paddingHorizontal: 22, paddingBottom: 40 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
        <IconButton icon="back" label="Wróć" onPress={() => router.back()} />
        <Text accessibilityRole="header" style={{ fontFamily: F.display, fontSize: 28, color: t.text }}>Ustawienia</Text>
      </View>

      <View style={{ marginTop: 28 }}>
        <Eyebrow>Wygląd</Eyebrow>
      </View>
      <View accessibilityRole="radiogroup" style={{ marginTop: 12, gap: 10 }}>
        {OPCJE.map((o) => {
          const on = o.mode === mode;
          return (
            <Pressable
              key={o.mode}
              accessibilityRole="radio"
              accessibilityState={{ checked: on }}
              onPress={() => setMode(o.mode)}
              style={({ pressed }) => ({
                minHeight: 72, borderRadius: 18, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 14,
                backgroundColor: t.surface, borderWidth: on ? 2 : 1, borderColor: on ? t.active : t.border, opacity: pressed ? 0.85 : 1,
              })}
            >
              <Probka mode={o.mode} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: F.bodyBold, fontSize: 16, color: t.text }}>{o.label}</Text>
                <Text style={{ marginTop: 2, fontFamily: F.body, fontSize: 13, color: t.textMuted }}>{o.opis}</Text>
              </View>
              {on && <Icon name="check" size={22} color={t.active} strokeWidth={2.2} />}
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}
