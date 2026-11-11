import { Pressable, Text, View } from 'react-native';
import { F } from '@/theme/fonts';
import { useTheme } from '@/theme/ThemeProvider';
import { themes, type ThemeMode } from '@/theme/themes';
import { Icon } from './Icon';

const OPCJE: { mode: ThemeMode; label: string; opis: string }[] = [
  { mode: 'auto', label: 'Automatycznie', opis: 'Jak w telefonie' },
  { mode: 'granat', label: 'Granat', opis: 'Granat i złoto' },
  { mode: 'biel', label: 'Biel', opis: 'Biel, czerwień i złoto' },
  { mode: 'grafit', label: 'Grafit', opis: 'Szarości i złoto' },
];

function Probka({ mode }: { mode: ThemeMode }) {
  const a = mode === 'auto' ? themes.biel : themes[mode];
  const b = mode === 'auto' ? themes.granat : themes[mode];
  return (
    <View style={{ width: 40, height: 40, borderRadius: 20, borderWidth: 1.5, borderColor: a.gold, overflow: 'hidden', flexDirection: 'row' }}>
      <View style={{ flex: 1, backgroundColor: a.bg }} />
      <View style={{ flex: 1, backgroundColor: mode === 'auto' ? b.bg : a.feature }} />
    </View>
  );
}

/** Wybór wyglądu: siatka 2×2 kafli z próbką kolorów. */
export function ThemePicker() {
  const { t, mode, setMode } = useTheme();
  return (
    <View accessibilityRole="radiogroup" style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
      {OPCJE.map((o) => {
        const on = o.mode === mode;
        return (
          <Pressable
            key={o.mode}
            accessibilityRole="radio"
            accessibilityState={{ checked: on }}
            accessibilityLabel={`${o.label}. ${o.opis}`}
            onPress={() => setMode(o.mode)}
            style={({ pressed }) => ({
              flexBasis: '47%', flexGrow: 1, height: 116, borderRadius: 24, padding: 16, justifyContent: 'space-between',
              backgroundColor: t.surface, borderWidth: on ? 2 : 1, borderColor: on ? t.active : t.border, opacity: pressed ? 0.85 : 1,
            })}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Probka mode={o.mode} />
              {on && <Icon name="check" size={20} color={t.active} strokeWidth={2.4} />}
            </View>
            <View>
              <Text style={{ fontFamily: F.bodyHeavy, fontSize: 15, color: t.text }}>{o.label}</Text>
              <Text style={{ marginTop: 2, fontFamily: F.body, fontSize: 12, color: t.textMuted }}>{o.opis}</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
