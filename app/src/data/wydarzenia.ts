/**
 * Oś czasu: epoki i wydarzenia. Docelowo dane przyjdą z API i panelu admina.
 * `wazne` — wyróżnione na liście (czerwona kropka, podświetlona karta).
 * `data` — dzień i miesiąc (jeśli znane), np. '15 lipca'; `md` — 'MM-DD' do „Dziś w historii”.
 */
export type Epoka = { id: string; nazwa: string; od: number; do: number | null; wstep: string };

export type Wydarzenie = {
  id: string;
  rok: number;
  data?: string;
  md?: string;
  tytul: string;
  opis: string;
  epoka: string;
  wazne?: boolean;
  postacie?: string[];
};

export const EPOKI: Epoka[] = [
  { id: 'piastowie', nazwa: 'Piastowie', od: 966, do: 1370, wstep: 'Narodziny państwa: chrzest, pierwsi królowie, rozbicie i ponowne zjednoczenie.' },
  { id: 'jagiellonowie', nazwa: 'Jagiellonowie', od: 1386, do: 1572, wstep: 'Dwa wieki potęgi: unia z Litwą, Grunwald, złoty wiek kultury.' },
  { id: 'rzeczpospolita', nazwa: 'Rzeczpospolita', od: 1573, do: 1795, wstep: 'Królowie elekcyjni, wielkie zwycięstwa i wielkie kryzysy — aż po rozbiory.' },
  { id: 'zabory', nazwa: 'Zabory', od: 1795, do: 1918, wstep: '123 lata bez państwa: legiony, powstania i kultura, która przetrwała.' },
  { id: 'ii-rp', nazwa: 'II RP', od: 1918, do: 1939, wstep: 'Odzyskana niepodległość i budowa państwa od nowa.' },
  { id: 'wojna', nazwa: 'Wojna', od: 1939, do: 1945, wstep: 'Najtragiczniejsze lata w dziejach Polski.' },
  { id: 'prl', nazwa: 'PRL', od: 1945, do: 1989, wstep: 'Państwo w bloku wschodnim i droga do „Solidarności”.' },
  { id: 'iii-rp', nazwa: 'III RP', od: 1989, do: null, wstep: 'Wolna Polska w NATO i w Unii Europejskiej.' },
];

export const wydarzenia: Wydarzenie[] = [
  // Piastowie
  { id: 'chrzest-polski', rok: 966, tytul: 'Chrzest Polski', opis: 'Mieszko I przyjmuje chrzest. Państwo Polan wchodzi do kręgu chrześcijańskiej Europy.', epoka: 'piastowie', wazne: true },
  { id: 'zjazd-gnieznienski', rok: 1000, tytul: 'Zjazd gnieźnieński', opis: 'Cesarz Otton III przybywa do Gniezna. Powstaje polska metropolia kościelna.', epoka: 'piastowie' },
  { id: 'koronacja-chrobrego', rok: 1025, tytul: 'Pierwsza koronacja', opis: 'Bolesław Chrobry zostaje pierwszym królem Polski.', epoka: 'piastowie', wazne: true, postacie: ['boleslaw-chrobry'] },
  { id: 'testament-krzywoustego', rok: 1138, tytul: 'Testament Krzywoustego', opis: 'Podział kraju między synów Bolesława Krzywoustego — początek rozbicia dzielnicowego.', epoka: 'piastowie' },
  { id: 'bitwa-pod-legnica', rok: 1241, tytul: 'Bitwa pod Legnicą', opis: 'Rycerstwo polskie staje do walki z najazdem mongolskim.', epoka: 'piastowie' },
  { id: 'koronacja-lokietka', rok: 1320, tytul: 'Koronacja Łokietka', opis: 'Władysław Łokietek koronuje się w Krakowie — Królestwo Polskie znów jest zjednoczone.', epoka: 'piastowie' },
  { id: 'akademia-krakowska', rok: 1364, tytul: 'Akademia Krakowska', opis: 'Kazimierz Wielki zakłada uczelnię, dziś Uniwersytet Jagielloński.', epoka: 'piastowie' },
  // Jagiellonowie
  { id: 'unia-w-krewie', rok: 1385, tytul: 'Unia w Krewie', opis: 'Początek unii Polski z Litwą.', epoka: 'jagiellonowie' },
  { id: 'grunwald', rok: 1410, data: '15 lipca', md: '07-15', tytul: 'Bitwa pod Grunwaldem', opis: 'Wojska polsko-litewskie pod wodzą Władysława Jagiełły pokonują zakon krzyżacki — jedna z największych bitew średniowiecznej Europy.', epoka: 'jagiellonowie', wazne: true },
  { id: 'pokoj-torunski', rok: 1466, tytul: 'II pokój toruński', opis: 'Po wojnie trzynastoletniej Pomorze Gdańskie wraca do Polski.', epoka: 'jagiellonowie' },
  { id: 'nihil-novi', rok: 1505, tytul: 'Konstytucja Nihil novi', opis: 'Bez zgody sejmu król nie może ustanawiać nowych praw.', epoka: 'jagiellonowie' },
  { id: 'o-obrotach', rok: 1543, tytul: '„O obrotach sfer niebieskich”', opis: 'Mikołaj Kopernik ogłasza teorię heliocentryczną: to Ziemia krąży wokół Słońca.', epoka: 'jagiellonowie', postacie: ['mikolaj-kopernik'] },
  { id: 'unia-lubelska', rok: 1569, tytul: 'Unia lubelska', opis: 'Powstaje Rzeczpospolita Obojga Narodów.', epoka: 'jagiellonowie', wazne: true },
  // Rzeczpospolita
  { id: 'pierwsza-wolna-elekcja', rok: 1573, tytul: 'Pierwsza wolna elekcja', opis: 'Szlachta po raz pierwszy wybiera króla. Powstają artykuły henrykowskie.', epoka: 'rzeczpospolita' },
  { id: 'obrona-jasnej-gory', rok: 1655, tytul: 'Obrona Jasnej Góry', opis: 'W czasie potopu szwedzkiego klasztor częstochowski nie poddaje się oblężeniu.', epoka: 'rzeczpospolita' },
  { id: 'odsiecz-wiedenska', rok: 1683, data: '12 września', md: '09-12', tytul: 'Odsiecz wiedeńska', opis: 'Jan III Sobieski rozbija pod Wiedniem armię osmańską.', epoka: 'rzeczpospolita', wazne: true, postacie: ['jan-iii-sobieski'] },
  { id: 'pierwszy-rozbior', rok: 1772, tytul: 'I rozbiór', opis: 'Rosja, Prusy i Austria zabierają Rzeczypospolitej blisko jedną trzecią terytorium.', epoka: 'rzeczpospolita' },
  { id: 'konstytucja-3-maja', rok: 1791, data: '3 maja', md: '05-03', tytul: 'Konstytucja 3 maja', opis: 'Pierwsza w Europie i druga na świecie nowoczesna konstytucja.', epoka: 'rzeczpospolita', wazne: true },
  { id: 'insurekcja-kosciuszkowska', rok: 1794, tytul: 'Insurekcja kościuszkowska', opis: 'Tadeusz Kościuszko staje na czele powstania w obronie Rzeczypospolitej.', epoka: 'rzeczpospolita', postacie: ['tadeusz-kosciuszko'] },
  { id: 'trzeci-rozbior', rok: 1795, tytul: 'III rozbiór', opis: 'Polska znika z mapy Europy na 123 lata.', epoka: 'rzeczpospolita', wazne: true },
  // Zabory
  { id: 'legiony-dabrowskiego', rok: 1797, tytul: 'Legiony Dąbrowskiego', opis: 'We Włoszech powstają Legiony Polskie, a z nimi pieśń, która stanie się hymnem.', epoka: 'zabory' },
  { id: 'ksiestwo-warszawskie', rok: 1807, tytul: 'Księstwo Warszawskie', opis: 'Z woli Napoleona powstaje polskie państwo zależne od Francji.', epoka: 'zabory' },
  { id: 'urodziny-chopina', rok: 1810, tytul: 'Urodziny Chopina', opis: 'W Żelazowej Woli przychodzi na świat Fryderyk Chopin.', epoka: 'zabory', postacie: ['fryderyk-chopin'] },
  { id: 'powstanie-listopadowe', rok: 1830, data: '29 listopada', md: '11-29', tytul: 'Powstanie listopadowe', opis: 'Zryw przeciw Rosji; po jego upadku tysiące Polaków wyjeżdża na emigrację.', epoka: 'zabory', wazne: true },
  { id: 'pan-tadeusz', rok: 1834, tytul: '„Pan Tadeusz”', opis: 'W Paryżu ukazuje się epopeja narodowa Adama Mickiewicza.', epoka: 'zabory', postacie: ['adam-mickiewicz'] },
  { id: 'powstanie-styczniowe', rok: 1863, data: '22 stycznia', md: '01-22', tytul: 'Powstanie styczniowe', opis: 'Najdłuższy z polskich zrywów niepodległościowych.', epoka: 'zabory', wazne: true },
  { id: 'nobel-sklodowskiej', rok: 1903, tytul: 'Nobel dla Skłodowskiej-Curie', opis: 'Maria Skłodowska-Curie jako pierwsza kobieta otrzymuje Nagrodę Nobla.', epoka: 'zabory', postacie: ['maria-sklodowska-curie'] },
  // II RP
  { id: 'niepodleglosc', rok: 1918, data: '11 listopada', md: '11-11', tytul: 'Odzyskanie niepodległości', opis: 'Józef Piłsudski obejmuje dowództwo nad wojskiem. Po 123 latach Polska znów jest wolna.', epoka: 'ii-rp', wazne: true, postacie: ['jozef-pilsudski'] },
  { id: 'bitwa-warszawska', rok: 1920, data: '15 sierpnia', md: '08-15', tytul: 'Bitwa Warszawska', opis: 'Wojsko Polskie zatrzymuje Armię Czerwoną pod Warszawą.', epoka: 'ii-rp', wazne: true },
  { id: 'konstytucja-marcowa', rok: 1921, tytul: 'Konstytucja marcowa', opis: 'Pierwsza konstytucja odrodzonej Rzeczypospolitej.', epoka: 'ii-rp' },
  // Wojna
  { id: 'wybuch-wojny', rok: 1939, data: '1 września', md: '09-01', tytul: 'Wybuch II wojny światowej', opis: 'Niemcy atakują Polskę, a 17 września — Związek Sowiecki.', epoka: 'wojna', wazne: true },
  { id: 'zbrodnia-katynska', rok: 1940, tytul: 'Zbrodnia katyńska', opis: 'Na rozkaz władz sowieckich zostają zamordowani tysiące polskich oficerów.', epoka: 'wojna' },
  { id: 'powstanie-w-getcie', rok: 1943, data: '19 kwietnia', md: '04-19', tytul: 'Powstanie w getcie warszawskim', opis: 'Żydowscy bojownicy podejmują walkę z Niemcami.', epoka: 'wojna' },
  { id: 'monte-cassino', rok: 1944, data: '18 maja', md: '05-18', tytul: 'Monte Cassino', opis: 'Żołnierze 2. Korpusu Polskiego zdobywają klasztor na Monte Cassino.', epoka: 'wojna' },
  { id: 'powstanie-warszawskie', rok: 1944, data: '1 sierpnia', md: '08-01', tytul: 'Powstanie Warszawskie', opis: '63 dni walki o wolną stolicę.', epoka: 'wojna', wazne: true },
  // PRL
  { id: 'czerwiec-56', rok: 1956, data: '28 czerwca', md: '06-28', tytul: 'Poznański Czerwiec', opis: 'Robotnicy Poznania wychodzą na ulice pod hasłem „chleba i wolności”.', epoka: 'prl' },
  { id: 'grudzien-70', rok: 1970, tytul: 'Grudzień na Wybrzeżu', opis: 'Protesty robotników w Gdańsku, Gdyni i Szczecinie zostają krwawo stłumione.', epoka: 'prl' },
  { id: 'papiez', rok: 1978, data: '16 października', md: '10-16', tytul: 'Polak papieżem', opis: 'Kardynał Karol Wojtyła zostaje wybrany na papieża i przyjmuje imię Jan Paweł II.', epoka: 'prl', wazne: true },
  { id: 'porozumienia-sierpniowe', rok: 1980, data: '31 sierpnia', md: '08-31', tytul: 'Porozumienia sierpniowe', opis: 'Strajk w Stoczni Gdańskiej kończy się porozumieniem — rodzi się „Solidarność”.', epoka: 'prl', wazne: true },
  { id: 'stan-wojenny', rok: 1981, data: '13 grudnia', md: '12-13', tytul: 'Stan wojenny', opis: 'Władze PRL wprowadzają stan wojenny i delegalizują „Solidarność”.', epoka: 'prl' },
  // III RP
  { id: 'wybory-4-czerwca', rok: 1989, data: '4 czerwca', md: '06-04', tytul: 'Wybory 4 czerwca', opis: 'Po obradach Okrągłego Stołu częściowo wolne wybory otwierają drogę do demokracji.', epoka: 'iii-rp', wazne: true },
  { id: 'nato', rok: 1999, data: '12 marca', md: '03-12', tytul: 'Polska w NATO', opis: 'Polska staje się członkiem Sojuszu Północnoatlantyckiego.', epoka: 'iii-rp' },
  { id: 'unia-europejska', rok: 2004, data: '1 maja', md: '05-01', tytul: 'Polska w Unii Europejskiej', opis: 'Polska dołącza do Unii Europejskiej.', epoka: 'iii-rp', wazne: true },
  { id: 'schengen', rok: 2007, data: '21 grudnia', md: '12-21', tytul: 'Strefa Schengen', opis: 'Znikają kontrole na granicach Polski z sąsiadami z Unii.', epoka: 'iii-rp' },
];

export const ROK_POCZATKU = 966;
export const rokKonca = () => new Date().getFullYear();

export function wydarzeniePoId(id: string) {
  return wydarzenia.find((w) => w.id === id);
}

export function epokaPoId(id: string) {
  return EPOKI.find((e) => e.id === id);
}
