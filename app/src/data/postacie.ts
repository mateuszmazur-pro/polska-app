/**
 * Dane startowe. Docelowo przyjdą z API (Cloudflare Workers + D1) i będą edytowane w panelu admina.
 */
import type { ImageSourcePropType } from 'react-native';

export type Kategoria = 'Nauka' | 'Władcy' | 'Sztuka' | 'Wojsko' | 'Polityka';
export const KATEGORIE: Kategoria[] = ['Nauka', 'Władcy', 'Sztuka', 'Wojsko', 'Polityka'];

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
  /** Kolor tła szkicu — nagłówek i karta przyjmują dokładnie ten odcień */
  tlo?: string;
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
  {
    id: 'ignacy-jan-paderewski',
    imie: 'Ignacy Jan Paderewski',
    inicjaly: 'IP',
    lata: '1860–1941',
    rola: 'pianista, kompozytor, mąż stanu',
    kategoria: 'Polityka',
    portret: require('../../assets/portrety/ignacy-jan-paderewski.jpg'),
    twarz: { x: 0.5, y: 0.45 },
    tlo: '#081B3A',
    opis: 'Pianista światowej sławy i premier odrodzonej Polski',
    zyciorys:
      'Jeden z najsłynniejszych pianistów swoich czasów — koncertował na całym świecie. Swoją sławę i majątek oddał sprawie polskiej: zabiegał o niepodległość w Ameryce, a w 1919 r. został premierem i ministrem spraw zagranicznych odrodzonej Rzeczypospolitej.',
    kalendarium: [
      { rok: '1860', tekst: 'Przychodzi na świat w Kuryłówce na Podolu, 18 listopada.' },
      { rok: '1918', tekst: 'Przyjeżdża do Poznania — jego wizyta poprzedza wybuch powstania wielkopolskiego.' },
      { rok: '1919', tekst: 'Zostaje premierem i ministrem spraw zagranicznych; podpisuje traktat wersalski.' },
      { rok: '1941', tekst: 'Umiera w Nowym Jorku.' },
      { rok: '1992', tekst: 'Jego prochy wracają do Polski, do archikatedry warszawskiej.' },
    ],
    ciekawostki: [
      'Jego Menuet G-dur był jednym z najpopularniejszych utworów fortepianowych swoich czasów.',
    ],
  },
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
    twarz: { x: 0.51, y: 0.49 },
    tlo: '#0A1B37',
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
    twarz: { x: 0.47, y: 0.48 },
    tlo: '#0C1E36',
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
  {
    id: 'roman-dmowski',
    imie: 'Roman Dmowski',
    inicjaly: 'RD',
    lata: '1864–1939',
    rola: 'polityk, współtwórca niepodległości',
    kategoria: 'Polityka',
    portret: require('../../assets/portrety/roman-dmowski.jpg'),
    twarz: { x: 0.52, y: 0.44 },
    tlo: '#061937',
    opis: 'Polityk, przywódca Narodowej Demokracji',
    zyciorys:
      'Twórca i przywódca obozu narodowego (Narodowej Demokracji). W czasie I wojny światowej zabiegał na Zachodzie o sprawę polską, a w 1919 r. razem z Paderewskim podpisał traktat wersalski. Jego poglądy polityczne do dziś wywołują spory.',
    kalendarium: [
      { rok: '1864', tekst: 'Przychodzi na świat w Kamionku pod Warszawą, 9 sierpnia.' },
      { rok: '1893', tekst: 'Współtworzy Ligę Narodową.' },
      { rok: '1917', tekst: 'Staje na czele Komitetu Narodowego Polskiego, uznanego przez państwa Ententy.' },
      { rok: '1919', tekst: 'Podpisuje traktat wersalski w imieniu Polski.' },
      { rok: '1939', tekst: 'Umiera w Drozdowie, 2 stycznia.' },
    ],
    ciekawostki: ['Z wykształcenia był przyrodnikiem — ukończył studia biologiczne w Warszawie.'],
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
