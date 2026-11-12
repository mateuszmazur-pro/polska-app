import type { ImageSourcePropType } from 'react-native';

/**
 * Prawdziwe polskie ornamenty ludowe do tła nagłówka na Starcie.
 * Zmieniają się po kolei co kilka sekund (płynne przenikanie).
 *
 * Jak dodać ornament:
 * 1. Wrzuć plik do app/assets/ornamenty/ — najlepiej PNG z przezroczystym tłem,
 *    szeroki (np. 1600 × 500 px), wzór w jednym kolorze.
 * 2. Dopisz wpis poniżej, np.:
 *    { src: require('../../assets/ornamenty/kurpie-gwiazda.png'), nazwa: 'Gwiazda', region: 'Kurpie' },
 *
 * Wzór jednokolorowy (jednobarwny = true) aplikacja sama przyciemni do odcienia granatu,
 * kolorowy pokaże jako delikatnie przezroczysty.
 */
export type Ornament = {
  src: ImageSourcePropType;
  nazwa: string;
  region: string;
  jednobarwny?: boolean;
};

export const ornamenty: Ornament[] = [];
