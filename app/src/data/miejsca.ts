export type KategoriaMiejsca = 'zamki' | 'historia' | 'natura';

export type Miejsce = {
  id: string;
  nazwa: string;
  miasto: string;
  kategoria: KategoriaMiejsca;
  lat: number;
  lon: number;
  opis: string;
  unesco?: boolean;
};

export const KATEGORIE_MIEJSC: { id: KategoriaMiejsca | 'wszystko' | 'unesco'; nazwa: string }[] = [
  { id: 'wszystko', nazwa: 'Wszystko' },
  { id: 'zamki', nazwa: 'Zamki' },
  { id: 'historia', nazwa: 'Historia' },
  { id: 'natura', nazwa: 'Natura' },
  { id: 'unesco', nazwa: 'UNESCO' },
];

export const miejsca: Miejsce[] = [
  { id: 'wawel', nazwa: 'Wawel', miasto: 'Kraków', kategoria: 'zamki', lat: 50.0541, lon: 19.9352, opis: 'Siedziba królów i katedra koronacyjna.', unesco: true },
  { id: 'malbork', nazwa: 'Zamek w Malborku', miasto: 'Malbork', kategoria: 'zamki', lat: 54.0399, lon: 19.0277, opis: 'Największy zamek ceglany świata.', unesco: true },
  { id: 'ksiaz', nazwa: 'Zamek Książ', miasto: 'Wałbrzych', kategoria: 'zamki', lat: 50.8423, lon: 16.2919, opis: 'Trzeci co do wielkości zamek w Polsce.' },
  { id: 'westerplatte', nazwa: 'Westerplatte', miasto: 'Gdańsk', kategoria: 'historia', lat: 54.4068, lon: 18.6697, opis: 'Tu 1 września 1939 r. zaczęła się II wojna światowa.' },
  { id: 'grunwald', nazwa: 'Pola Grunwaldu', miasto: 'Stębark', kategoria: 'historia', lat: 53.4847, lon: 20.1242, opis: 'Miejsce wielkiej bitwy z 1410 r.' },
  { id: 'gniezno', nazwa: 'Katedra Gnieźnieńska', miasto: 'Gniezno', kategoria: 'historia', lat: 52.5375, lon: 17.5878, opis: 'Pierwsza stolica i słynne drzwi gnieźnieńskie.' },
  { id: 'biskupin', nazwa: 'Biskupin', miasto: 'Żnin', kategoria: 'historia', lat: 52.7922, lon: 17.7369, opis: 'Osada obronna sprzed ok. 2700 lat.' },
  { id: 'warszawa', nazwa: 'Stare Miasto', miasto: 'Warszawa', kategoria: 'historia', lat: 52.2497, lon: 21.0122, opis: 'Odbudowane po 1945 r. niemal z gruzów.', unesco: true },
  { id: 'torun', nazwa: 'Starówka Torunia', miasto: 'Toruń', kategoria: 'historia', lat: 53.0103, lon: 18.6048, opis: 'Gotyckie miasto Kopernika.', unesco: true },
  { id: 'jasna-gora', nazwa: 'Jasna Góra', miasto: 'Częstochowa', kategoria: 'historia', lat: 50.8125, lon: 19.0975, opis: 'Klasztor obroniony przed Szwedami w 1655 r.' },
  { id: 'zamosc', nazwa: 'Zamość', miasto: 'Zamość', kategoria: 'historia', lat: 50.7172, lon: 23.2528, opis: 'Renesansowe „miasto idealne”.', unesco: true },
  { id: 'bialowieza', nazwa: 'Puszcza Białowieska', miasto: 'Białowieża', kategoria: 'natura', lat: 52.7008, lon: 23.8644, opis: 'Ostatni las pierwotny niżu Europy, królestwo żubrów.', unesco: true },
  { id: 'sniezka', nazwa: 'Śnieżka', miasto: 'Karkonosze', kategoria: 'natura', lat: 50.7360, lon: 15.7399, opis: 'Najwyższy szczyt Sudetów (1603 m).' },
  { id: 'morskie-oko', nazwa: 'Morskie Oko', miasto: 'Tatry', kategoria: 'natura', lat: 49.2013, lon: 20.0715, opis: 'Najsłynniejsze jezioro w Tatrach.' },
  { id: 'leba', nazwa: 'Wydmy Łeby', miasto: 'Słowiński Park Narodowy', kategoria: 'natura', lat: 54.7490, lon: 17.5560, opis: 'Ruchome wydmy nad samym Bałtykiem.' },
];
