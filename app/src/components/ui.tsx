import type { ReactNode } from 'react';
import { Pressable, Text, View, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { F } from '@/theme/fonts';
import { Icon, type IconName } from './Icon';

/** Okrągły przycisk z ikoną (min. 44×44 — wygodny pod palec). */
export function IconButton({ icon, label, onPress, dot }: { icon: IconName; label: string; onPress?: () => void; dot?: boolean }) {
  const { t } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      hitSlop={4}
      style={({ pressed }) => ({
        width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center',
        backgroundColor: t.surface, borderWidth: 1, borderColor: t.borderStrong, opacity: pressed ? 0.7 : 1,
      })}
    >
      <Icon name={icon} size={20} color={t.text} />
      {dot && (
        <View style={{ position: 'absolute', top: 10, right: 11, width: 8, height: 8, borderRadius: 4, backgroundColor: t.red, borderWidth: 2, borderColor: t.surface }} />
      )}
    </Pressable>
  );
}

/** Medalion z inicjałami — zastępuje portret, dopóki nie ma zdjęcia. */
export function Medallion({ initials, size = 52 }: { initials: string; size?: number }) {
  const { t } = useTheme();
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no"
      style={{ width: size, height: size, borderRadius: size / 2, borderWidth: 1.5, borderColor: t.gold, backgroundColor: t.medalBg, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text style={{ fontFamily: F.display, fontSize: size * 0.34, color: t.medalText }}>{initials}</Text>
    </View>
  );
}

export function Eyebrow({ children, color }: { children: string; color?: string }) {
  const { t } = useTheme();
  return (
    <Text style={{ fontFamily: F.bodyHeavy, fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: color ?? t.accentText }}>
      {children}
    </Text>
  );
}

export function Card({ children, style, ...rest }: PressableProps & { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  const { t } = useTheme();
  return (
    <Pressable
      {...rest}
      style={({ pressed }) => [
        { backgroundColor: t.surface, borderWidth: 1, borderColor: t.border, borderRadius: 18, opacity: pressed && rest.onPress ? 0.8 : 1 },
        style,
      ]}
    >
      {children}
    </Pressable>
  );
}
