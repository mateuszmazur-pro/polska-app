import Svg, { Path } from 'react-native-svg';

/** Liniowe „ryciny” kategorii (viewBox 64×64). Docelowo do podmiany na dopracowane ilustracje. */
const RYCINY = {
  'Wielcy Polacy': 'M30 10c-7 0-12 5-12 12 0 4 1 6 3 8l-2 6 4 1c1 4 4 6 8 6v4c-9 2-16 7-18 15M30 10c6 0 10 4 11 9 2 1 3 3 2 5l-2 2 2 5-3 1v4c-1 3-3 4-6 4M33 47c8 1 15 6 17 13M22 18c3-3 7-4 11-3',
  'Oś czasu': 'M18 8h28M18 56h28M21 8c0 12 10 16 10 24S21 44 21 56M43 8c0 12-10 16-10 24s10 12 10 24M26 50c2-4 4-6 6-6s4 2 6 6',
  'Epoki': 'M10 46l4-24 10 10 8-16 8 16 10-10 4 24zM10 52h44M14 22a3 3 0 100-.1M32 14a3 3 0 100-.1M50 22a3 3 0 100-.1M24 40a2 2 0 100-.1M32 40a2 2 0 100-.1M40 40a2 2 0 100-.1',
  'Wydarzenia': 'M12 52L48 12M44 10l8-2-2 8M16 44l4 4M10 50l4 4M52 52L16 12M20 10l-8-2 2 8M48 44l-4 4M54 50l-4 4',
  'Miejsca': 'M8 56h48M12 56V26l4-4 4 4v30M44 56V26l4-4 4 4v30M20 56V34h24v22M28 56V46a4 4 0 018 0v10M10 26h12M42 26h12M24 34v-6h16v6M32 28v-8l6 3-6 3',
  'Kultura': 'M14 56c6-14 18-34 36-48-4 10-10 18-18 24l6 2c-6 6-14 10-20 12M14 56l10-12M44 56H30',
  'Symbole': 'M14 58V6M14 8c8-4 14 4 22 0s12-2 16 0v22c-4-2-8-4-16 0s-14-4-22 0M14 19h38',
  'Święta': 'M32 54c-14-2-22-14-20-30M32 54c14-2 22-14 20-30M16 44c-4 0-7-2-8-5 3-1 6 0 8 2M14 34c-4-1-6-4-6-7 3 0 6 2 7 4M14 24c-3-2-4-5-3-8 3 1 5 3 5 6M48 44c4 0 7-2 8-5-3-1-6 0-8 2M50 34c4-1 6-4 6-7-3 0-6 2-7 4M50 24c3-2 4-5 3-8-3 1-5 3-5 6M28 58l4-4 4 4',
  'Ciekawostki': 'M26 26a14 14 0 1028 0 14 14 0 10-28 0M30 37L12 55M34 18a9 9 0 018 4',
} as const;

export type RycinaNazwa = keyof typeof RYCINY;

export function Rycina({ nazwa, size = 40, color, strokeWidth = 1.6, opacity = 1 }: { nazwa: RycinaNazwa; size?: number; color: string; strokeWidth?: number; opacity?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" style={{ opacity }} accessibilityElementsHidden importantForAccessibility="no">
      <Path d={RYCINY[nazwa]} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}
