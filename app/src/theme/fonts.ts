import { Cinzel_600SemiBold, Cinzel_700Bold } from '@expo-google-fonts/cinzel';
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_600SemiBold,
  DMSans_700Bold,
  DMSans_800ExtraBold,
} from '@expo-google-fonts/dm-sans';
import { DMSerifDisplay_400Regular, DMSerifDisplay_400Regular_Italic } from '@expo-google-fonts/dm-serif-display';

export const fontAssets = {
  Lora_600SemiBold: require('../../assets/fonts/Lora_600SemiBold.ttf'),
  Cinzel_600SemiBold,
  Cinzel_700Bold,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_600SemiBold,
  DMSans_700Bold,
  DMSans_800ExtraBold,
  DMSerifDisplay_400Regular,
  DMSerifDisplay_400Regular_Italic,
};

/**
 * Typografia:
 * - DM Serif Display — duże tytuły, kafelki, imiona na ekranie postaci
 * - Lora — mniejsze nagłówki na listach (lepsza czytelność)
 * - Cinzel — nazwiska (WERSALIKAMI), duże liczby, znak POLSKA
 * - DM Sans — interfejs i tekst
 */
export const F = {
  display: 'DMSerifDisplay_400Regular',
  displaySemi: 'DMSerifDisplay_400Regular',
  displayItalic: 'DMSerifDisplay_400Regular_Italic',
  displayItalicLight: 'DMSerifDisplay_400Regular_Italic',
  /** Lora — mniejsze nagłówki: nazwy na listach, tytuły wydarzeń */
  lista: 'Lora_600SemiBold',
  /** Cinzel: nazwiska, liczby, znak marki */
  displayHeavy: 'Cinzel_700Bold',
  nazwisko: 'Cinzel_700Bold',
  liczby: 'Cinzel_700Bold',
  marka: 'Cinzel_600SemiBold',
  body: 'DMSans_400Regular',
  bodyMedium: 'DMSans_500Medium',
  bodySemi: 'DMSans_600SemiBold',
  bodyBold: 'DMSans_700Bold',
  bodyHeavy: 'DMSans_800ExtraBold',
} as const;
