import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { AUTO_DARK, AUTO_LIGHT, themes, type Theme, type ThemeMode } from './themes';

const STORAGE_KEY = 'polska.themeMode';
const MODES: ThemeMode[] = ['auto', 'granat', 'biel', 'grafit'];

type ThemeContextValue = {
  t: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  /** false, dopóki zapisany wybór nie zostanie wczytany */
  ready: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const system = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>('auto');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (saved && (MODES as string[]).includes(saved)) setModeState(saved as ThemeMode);
      })
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  const setMode = (next: ThemeMode) => {
    setModeState(next);
    AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {});
  };

  const value = useMemo<ThemeContextValue>(() => {
    const name = mode === 'auto' ? (system === 'light' ? AUTO_LIGHT : AUTO_DARK) : mode;
    return { t: themes[name], mode, setMode, ready };
  }, [mode, system, ready]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme musi być użyty wewnątrz <ThemeProvider>');
  return ctx;
}
