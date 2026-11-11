import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { F } from '@/theme/fonts';
import { useTheme } from '@/theme/ThemeProvider';
import { Eyebrow, IconButton } from './ui';

/** Tymczasowy ekran dla sekcji, które powstaną w kolejnych krokach. */
export function Wkrotce({ tytul, nadtytul, opis, wstecz }: { tytul: string; nadtytul: string; opis: string; wstecz?: boolean }) {
  const { t } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: t.bg, paddingTop: insets.top + 22, paddingHorizontal: 20 }}>
      {wstecz && (
        <View style={{ marginBottom: 20 }}>
          <IconButton icon="back" label="Wróć" onPress={() => router.back()} />
        </View>
      )}
      <Eyebrow>{nadtytul}</Eyebrow>
      <Text accessibilityRole="header" style={{ marginTop: 6, fontFamily: F.display, fontSize: 34, color: t.text }}>{tytul}</Text>
      <Text style={{ marginTop: 10, fontFamily: F.body, fontSize: 15, lineHeight: 22, color: t.textMuted }}>{opis}</Text>
    </View>
  );
}
