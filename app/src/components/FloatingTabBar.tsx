import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { F } from '@/theme/fonts';
import { useTheme } from '@/theme/ThemeProvider';
import { Icon, type IconName } from './Icon';

/** Wysokość menu + odstęp od dołu — ekrany dodają tyle miejsca na końcu przewijania. */
export const TAB_BAR_SPACE = 64 + 24 + 16;

export const TAB_META: Record<string, { title: string; icon: IconName }> = {
  index: { title: 'Start', icon: 'home' },
  odkrywaj: { title: 'Odkrywaj', icon: 'compass' },
  'os-czasu': { title: 'Oś czasu', icon: 'timeline' },
  mapa: { title: 'Mapa', icon: 'pin' },
  profil: { title: 'Profil', icon: 'person' },
};

type Route = { key: string; name: string };
type Props = {
  state: { index: number; routes: Route[] };
  navigation: {
    emit: (e: { type: 'tabPress'; target: string; canPreventDefault: true }) => { defaultPrevented: boolean };
    navigate: (name: string) => void;
  };
};

/**
 * Pływające menu w kształcie pigułki. Aktywna zakładka: złote (w Bieli czerwone) tło + podpis,
 * pozostałe: same ikony z opisem dla czytników ekranu.
 */
export function FloatingTabBar({ state, navigation }: Props) {
  const { t } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      pointerEvents="box-none"
      style={{ position: 'absolute', left: 20, right: 20, bottom: Math.max(insets.bottom, 12) + 8 }}
    >
      <View
        accessibilityRole="tablist"
        style={{
          height: 64, borderRadius: 32, paddingHorizontal: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
          backgroundColor: t.navBg, borderWidth: 1, borderColor: t.navBorder,
          shadowColor: '#000', shadowOpacity: t.statusBar === 'dark' ? 0.12 : 0.45, shadowRadius: 20, shadowOffset: { width: 0, height: 12 },
          elevation: 12,
        }}
      >
        {state.routes.map((route, i) => {
          const meta = TAB_META[route.name];
          if (!meta) return null;
          const focused = state.index === i;
          const onPress = () => {
            const e = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!focused && !e.defaultPrevented) navigation.navigate(route.name);
          };
          return (
            <Pressable
              key={route.key}
              accessibilityRole="tab"
              accessibilityState={{ selected: focused }}
              accessibilityLabel={meta.title}
              onPress={onPress}
              style={({ pressed }) => ({
                height: 48, minWidth: 48, borderRadius: 24, paddingHorizontal: focused ? 16 : 0,
                flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
                backgroundColor: focused ? t.chipOnBg : 'transparent', opacity: pressed ? 0.7 : 1,
              })}
            >
              <Icon name={meta.icon} size={focused ? 20 : 22} color={focused ? t.chipOnText : t.textMuted} strokeWidth={focused ? 2 : 1.8} />
              {focused && <Text style={{ fontFamily: F.bodyHeavy, fontSize: 13, color: t.chipOnText }}>{meta.title}</Text>}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
