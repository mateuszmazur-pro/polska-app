export type Swieto = {
  /** MM-DD */
  data: string;
  nazwa: string;
  opis: string;
  /** Rok wydarzenia, od którego liczymy rocznicę (opcjonalnie) */
  rok?: number;
};

export const swieta: Swieto[] = [
  { data: '03-01', nazwa: 'Narodowy Dzień Pamięci „Żołnierzy Wyklętych”', opis: 'Upamiętnienie żołnierzy antykomunistycznego podziemia.' },
  { data: '05-02', nazwa: 'Dzień Flagi Rzeczypospolitej Polskiej', opis: 'Biel i czerwień — barwy narodowe Polski.' },
  { data: '05-03', nazwa: 'Święto Narodowe Trzeciego Maja', opis: 'W 1791 r. uchwalono pierwszą w Europie nowoczesną konstytucję.', rok: 1791 },
  { data: '08-01', nazwa: 'Narodowy Dzień Pamięci Powstania Warszawskiego', opis: 'W 1944 r. rozpoczęło się 63 dni walki o wolną stolicę.', rok: 1944 },
  { data: '08-15', nazwa: 'Święto Wojska Polskiego', opis: 'Rocznica zwycięskiej Bitwy Warszawskiej z 1920 r.', rok: 1920 },
  { data: '11-11', nazwa: 'Narodowe Święto Niepodległości', opis: '11 listopada 1918 r. Polska wróciła na mapę Europy po 123 latach zaborów.', rok: 1918 },
];

export function swietoNaDzien(date: Date): Swieto | undefined {
  const key = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  return swieta.find((s) => s.data === key);
}

const DNI = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
const MIESIACE = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];

/** np. „Środa, 11 listopada” */
export function dataPoPolsku(date: Date): string {
  return `${DNI[date.getDay()]}, ${date.getDate()} ${MIESIACE[date.getMonth()]}`;
}
