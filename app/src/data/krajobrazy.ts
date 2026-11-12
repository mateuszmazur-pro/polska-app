import type { ImageSourcePropType } from 'react-native';

/**
 * Krajobrazy na kafel „Miejsca” na Starcie — zmieniają się po kolei (płynne przenikanie).
 * Zdjęcia poziome, min. 1200 px szerokości. Tylko zdjęcia z licencją na użycie w aplikacji.
 * `ogniskowa` (0–1) mówi, która część zdjęcia ma być w kadrze w pionie (0 = góra, 1 = dół).
 */
export type Krajobraz = {
  src: ImageSourcePropType;
  podpis: string;
  ogniskowa?: number;
  /** proporcje zdjęcia (szerokość / wysokość) */
  proporcje: number;
};

export const krajobrazy: Krajobraz[] = [
  {
    src: require('../../assets/krajobrazy/jelenia-gora-karkonosze.jpg'),
    podpis: 'Jelenia Góra · Karkonosze',
    ogniskowa: 0.42,
    proporcje: 1200 / 644,
  },
];
