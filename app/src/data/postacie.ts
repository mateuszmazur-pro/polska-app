/**
 * Dane startowe. Docelowo przyjdą z API (Cloudflare Workers + D1) i będą edytowane w panelu admina.
 */
export type Kategoria = 'Nauka' | 'Władcy' | 'Sztuka' | 'Wojsko';

export type Postac = {
  id: string;
  imie: string;
  inicjaly: string;
  lata: string;
  rola: string;
  kategoria: Kategoria;
};

export const postacie: Postac[] = [
  { id: 'adam-mickiewicz', imie: 'Adam Mickiewicz', inicjaly: 'AM', lata: '1798–1855', rola: 'poeta, autor „Pana Tadeusza”', kategoria: 'Sztuka' },
  { id: 'boleslaw-chrobry', imie: 'Bolesław Chrobry', inicjaly: 'BC', lata: 'ok. 967–1025', rola: 'pierwszy król Polski', kategoria: 'Władcy' },
  { id: 'fryderyk-chopin', imie: 'Fryderyk Chopin', inicjaly: 'FC', lata: '1810–1849', rola: 'kompozytor, pianista', kategoria: 'Sztuka' },
  { id: 'jan-iii-sobieski', imie: 'Jan III Sobieski', inicjaly: 'JS', lata: '1629–1696', rola: 'król, zwycięzca spod Wiednia', kategoria: 'Władcy' },
  { id: 'jozef-pilsudski', imie: 'Józef Piłsudski', inicjaly: 'JP', lata: '1867–1935', rola: 'Naczelnik Państwa', kategoria: 'Wojsko' },
  { id: 'maria-sklodowska-curie', imie: 'Maria Skłodowska-Curie', inicjaly: 'MS', lata: '1867–1934', rola: 'fizyczka i chemiczka', kategoria: 'Nauka' },
  { id: 'mikolaj-kopernik', imie: 'Mikołaj Kopernik', inicjaly: 'MK', lata: '1473–1543', rola: 'astronom, twórca heliocentryzmu', kategoria: 'Nauka' },
  { id: 'tadeusz-kosciuszko', imie: 'Tadeusz Kościuszko', inicjaly: 'TK', lata: '1746–1817', rola: 'Naczelnik insurekcji 1794', kategoria: 'Wojsko' },
];

/** Postać dnia — na razie rotacja po dniu roku; później ustawiana w panelu admina. */
export function postacDnia(date: Date): Postac {
  const start = new Date(date.getFullYear(), 0, 0);
  const day = Math.floor((date.getTime() - start.getTime()) / 86_400_000);
  return postacie[day % postacie.length];
}
