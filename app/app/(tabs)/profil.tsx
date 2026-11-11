import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TAB_BAR_SPACE } from '@/components/FloatingTabBar';
import { ThemePicker } from '@/components/ThemePicker';
import { Eyebrow } from '@/components/ui';
import { F } from '@/theme/fonts';
import { useTheme } from '@/theme/ThemeProvider';

export default function Profil() {
  const { t } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: t.bg }}
      contentContainerStyle={{ paddingTop: insets.top + 22, paddingHorizontal: 20, paddingBottom: TAB_BAR_SPACE + insets.bottom }}
    >
      <Text accessibilityRole="header" style={{ fontFamily: F.display, fontSize: 34, color: t.text }}>Profil</Text>
      <View style={{ marginTop: 28, marginBottom: 12 }}>
        <Eyebrow>Wygląd</Eyebrow>
      </View>
      <ThemePicker />
    </ScrollView>
  );
}
