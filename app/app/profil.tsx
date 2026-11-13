import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import * as Updates from 'expo-updates';
import { ThemePicker } from '@/components/ThemePicker';
import { Eyebrow, IconButton } from '@/components/ui';
import { F } from '@/theme/fonts';
import { useTheme } from '@/theme/ThemeProvider';

export default function Profil() {
  const { t } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: t.bg }}
      contentContainerStyle={{ paddingTop: insets.top + 22, paddingHorizontal: 20, paddingBottom: insets.bottom + 40 }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
        <IconButton icon="back" label="Wróć" onPress={() => router.back()} />
        <Text accessibilityRole="header" style={{ fontFamily: F.display, fontSize: 34, color: t.text }}>Profil</Text>
      </View>
      <View style={{ marginTop: 28, marginBottom: 12 }}>
        <Eyebrow>Wygląd</Eyebrow>
      </View>
      <ThemePicker />

      <Text style={{ marginTop: 32, fontFamily: F.body, fontSize: 12, lineHeight: 18, color: t.textMuted, textAlign: 'center' }}>
        Wersja {Constants.expoConfig?.version ?? '—'}
        {Updates.createdAt ? ` · aktualizacja z ${Updates.createdAt.toLocaleDateString('pl-PL')}, ${Updates.createdAt.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}` : ' · tryb deweloperski'}
      </Text>
    </ScrollView>
  );
}
