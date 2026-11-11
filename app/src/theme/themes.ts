/**
 * Trzy motywy aplikacji. Ekrany używają WYŁĄCZNIE tych nazw — nigdy kolorów wpisanych na sztywno.
 * Nowy motyw = nowy obiekt z tymi samymi kluczami.
 */
export type ThemeName = 'granat' | 'biel' | 'grafit';
export type ThemeMode = ThemeName | 'auto';

export type Theme = {
  name: ThemeName;
  label: string;
  statusBar: 'light' | 'dark';

  /** Tło ekranu */
  bg: string;
  /** Karty, kafle, pola */
  surface: string;
  border: string;
  borderStrong: string;
  /** Dolne menu */
  tabBar: string;

  text: string;
  textSoft: string;
  textMuted: string;
  /** Złoty tekst (czytelny na tle `bg`/`surface`) */
  accentText: string;
  /** Złote ikony (kontrast ≥ 3:1 na `bg`) */
  accentIcon: string;
  /** Dekoracyjne złoto: obwódki, linie */
  gold: string;
  red: string;
  onRed: string;

  /** Aktywny element: zakładka menu, wybrany filtr */
  active: string;
  chipOnBg: string;
  chipOnText: string;

  /** Wyróżniona karta (święto dnia, postać polecana, rok 1918) */
  feature: string;
  onFeature: string;
  onFeatureMuted: string;
  featureEyebrow: string;
  featureButtonBg: string;
  featureButtonText: string;
  featureButtonIcon: string;

  /** Medalion z inicjałami postaci */
  medalBg: string;
  medalText: string;
};

export const themes: Record<ThemeName, Theme> = {
  granat: {
    name: 'granat',
    label: 'Granat',
    statusBar: 'light',
    bg: '#0A1630',
    surface: '#10214A',
    border: '#1C3166',
    borderStrong: '#22386B',
    tabBar: '#071025',
    text: '#F6F2E8',
    textSoft: '#D5DBE8',
    textMuted: '#A9B4CC',
    accentText: '#E2C47A',
    accentIcon: '#C9A24A',
    gold: '#C9A24A',
    red: '#C8102E',
    onRed: '#FFFFFF',
    active: '#E2C47A',
    chipOnBg: '#C9A24A',
    chipOnText: '#0A1630',
    feature: '#F6F2E8',
    onFeature: '#0A1630',
    onFeatureMuted: '#3E475C',
    featureEyebrow: '#A50D26',
    featureButtonBg: '#0A1630',
    featureButtonText: '#F6F2E8',
    featureButtonIcon: '#E2C47A',
    medalBg: '#0A1630',
    medalText: '#E2C47A',
  },
  biel: {
    name: 'biel',
    label: 'Biel',
    statusBar: 'dark',
    bg: '#FFFFFF',
    surface: '#FAF6EE',
    border: '#EFE6D4',
    borderStrong: '#E9DFCC',
    tabBar: '#FFFFFF',
    text: '#16181D',
    textSoft: '#3A3F4B',
    textMuted: '#5C6170',
    accentText: '#8A6418',
    accentIcon: '#A87520',
    gold: '#C9A24A',
    red: '#C8102E',
    onRed: '#FFFFFF',
    active: '#C8102E',
    chipOnBg: '#C8102E',
    chipOnText: '#FFFFFF',
    feature: '#C8102E',
    onFeature: '#FFFFFF',
    onFeatureMuted: '#FBE3E6',
    featureEyebrow: '#FFFFFF',
    featureButtonBg: '#FFFFFF',
    featureButtonText: '#16181D',
    featureButtonIcon: '#C8102E',
    medalBg: '#FFFFFF',
    medalText: '#8A6418',
  },
  grafit: {
    name: 'grafit',
    label: 'Grafit',
    statusBar: 'light',
    bg: '#141416',
    surface: '#1E1F22',
    border: '#2C2E33',
    borderStrong: '#33353A',
    tabBar: '#0F0F11',
    text: '#EDEDEC',
    textSoft: '#D8D8DB',
    textMuted: '#A8A9AE',
    accentText: '#E2C47A',
    accentIcon: '#C9A24A',
    gold: '#C9A24A',
    red: '#C8102E',
    onRed: '#FFFFFF',
    active: '#E2C47A',
    chipOnBg: '#C9A24A',
    chipOnText: '#141416',
    feature: '#EDEDEC',
    onFeature: '#141416',
    onFeatureMuted: '#45464B',
    featureEyebrow: '#A50D26',
    featureButtonBg: '#141416',
    featureButtonText: '#EDEDEC',
    featureButtonIcon: '#E2C47A',
    medalBg: '#141416',
    medalText: '#E2C47A',
  },
};

/** Co wybiera tryb „Automatycznie” */
export const AUTO_LIGHT: ThemeName = 'biel';
export const AUTO_DARK: ThemeName = 'granat';
