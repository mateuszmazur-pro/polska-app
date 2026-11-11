/**
 * Dane startowe. Docelowo przyjdą z API (Cloudflare Workers + D1) i będą edytowane w panelu admina.
 */
import type { ImageSourcePropType } from 'react-native';

export type Kategoria = 'Nauka' | 'Władcy' | 'Sztuka' | 'Wojsko';
export const KATEGORIE: Kategoria[] = ['Nauka', 'Władcy', 'Sztuka', 'Wojsko'];

export type Postac = {
  id: string;
  imie: string;
  inicjaly: string;
  lata: string;
  rola: string;
  kategoria: Kategoria;
  /** Szkic: kwadrat 1:1, tło #0C1D36, popiersie wypełniające kadr */
  portret?: ImageSourcePropType;
  /** Środek twarzy na szkicu (0–1), do wycinania okrągłego avatara */
  twarz?: { x: number; y: number };
  opis?: string;
  zyciorys?: string;
  kalendarium?: { rok: string; tekst: string }[];
  ciekawostki?: string[];
  polecana?: boolean;
};

export const postacie: Postac[] = [
  { id: 'adam-mickiewicz', imie: 'Adam Mickiewicz', inicjaly: 'AM', lata: '1798–1855', rola: 'poeta, autor „Pana Tadeusza”', kategoria: 'Sztuka' },
  { id: 'boleslaw-chrobry', imie: 'Bolesław Chrobry', inicjaly: 'BC', lata: 'ok. 967–1025', rola: 'pierwszy król Polski', kategoria: 'Władcy' },
  { id: 'fryderyk-chopin', imie: 'Fryderyk Chopin', inicjaly: 'FC', lata: '1810–1849', rola: 'kompozytor, pianista', kategoria: 'Sztuka', polecana: true },
  { id: 'jan-iii-sobieski', imie: 'Jan III Sobieski', inicjaly: 'JS', lata: '1629–1696', rola: 'król, zwycięzca spod Wiednia', kategoria: 'Władcy' },
  { id: 'jozef-pilsudski', imie: 'Józef Piłsudski', inicjaly: 'JP', lata: '1867–1935', rola: 'Naczelnik Państwa', kategoria: 'Wojsko' },
  {
    id: 'maria-sklodowska-curie',
    imie: 'Maria Skłodowska-Curie',
    inicjaly: 'MS',
    lata: '1867–1934',
    rola: 'fizyczka i chemiczka',
    kategoria: 'Nauka',
    polecana: true,
    portret: require('../../assets/portrety/maria-sklodowska-curie.jpg'),
    twarz: { x: 0.51, y: 0.47 },
    opis: 'Fizyczka i chemiczka, dwukrotna laureatka Nagrody Nobla',
    zyciorys:
      'Urodziła się w Warszawie, pod zaborem rosyjskim, gdzie kobiety nie mogły studiować. W Paryżu skończyła studia na Sorbonie i razem z mężem, Piotrem Curie, badała promieniotwórczość. Odkryła dwa nowe pierwiastki — polon i rad.',
    kalendarium: [
      { rok: '1867', tekst: 'Przychodzi na świat w Warszawie, 7 listopada.' },
      { rok: '1891', tekst: 'Wyjeżdża do Paryża i zaczyna studia na Sorbonie.' },
      { rok: '1898', tekst: 'Wraz z Piotrem Curie odkrywa polon i rad.' },
      { rok: '1903', tekst: 'Nagroda Nobla z fizyki — jako pierwsza kobieta.' },
      { rok: '1911', tekst: 'Druga Nagroda Nobla, tym razem z chemii.' },
      { rok: '1932', tekst: 'Otwarcie Instytutu Radowego w Warszawie.' },
    ],
    ciekawostki: [
      'Jest jedyną osobą nagrodzoną Noblem w dwóch różnych naukach ścisłych.',
      'Odkryty przez nią polon nazwała na cześć Polski.',
      'W 1995 r. jej prochy przeniesiono do paryskiego Panteonu.',
    ],
  },
  {
    id: 'mikolaj-kopernik',
    imie: 'Mikołaj Kopernik',
    inicjaly: 'MK',
    lata: '1473–1543',
    rola: 'astronom, twórca heliocentryzmu',
    kategoria: 'Nauka',
    polecana: true,
    portret: require('../../assets/portrety/mikolaj-kopernik.jpg'),
    twarz: { x: 0.42, y: 0.45 },
    opis: 'Astronom, twórca teorii heliocentrycznej',
    zyciorys:
      'Urodził się w Toruniu. Studiował w Krakowie, a potem we Włoszech. W dziele „O obrotach sfer niebieskich” pokazał, że to Ziemia krąży wokół Słońca — i zmienił sposób, w jaki patrzymy na Wszechświat.',
    kalendarium: [
      { rok: '1473', tekst: 'Przychodzi na świat w Toruniu, 19 lutego.' },
      { rok: '1491', tekst: 'Rozpoczyna studia w Akademii Krakowskiej.' },
      { rok: '1496', tekst: 'Wyjeżdża na studia do Bolonii.' },
      { rok: '1503', tekst: 'Zostaje doktorem prawa kanonicznego w Ferrarze.' },
      { rok: '1543', tekst: 'Ukazuje się „O obrotach sfer niebieskich”. Umiera we Fromborku.' },
    ],
    ciekawostki: [
      'Był nie tylko astronomem: zajmował się też medycyną i ekonomią — opisał zjawisko, w którym gorszy pieniądz wypiera lepszy.',
    ],
  },
  { id: 'tadeusz-kosciuszko', imie: 'Tadeusz Kościuszko', inicjaly: 'TK', lata: '1746–1817', rola: 'Naczelnik insurekcji 1794', kategoria: 'Wojsko' },
];

export function postacPoId(id: string): Postac | undefined {
  return postacie.find((p) => p.id === id);
}

/** Postać dnia — na razie rotacja po dniu roku; później ustawiana w panelu admina. */
export function postacDnia(date: Date): Postac {
  const start = new Date(date.getFullYear(), 0, 0);
  const day = Math.floor((date.getTime() - start.getTime()) / 86_400_000);
  return postacie[day % postacie.length];
}
