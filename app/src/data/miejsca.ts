// Dane z arkusza „Mapa – miejsca, szlaki i wyprawy” (https://claude.ai/artifact/MhL3GeiebUG6dQQNAs6ngt).
// Współrzędne oznaczone tam jako „przybliżone” trzeba jeszcze sprawdzić przed wydaniem.
export type KategoriaMiejsca = 'zamki' | 'bitwy' | 'pamiec' | 'muzea' | 'sakralne' | 'starowki' | 'skanseny';

export type Miejsce = {
  id: string;
  nazwa: string;
  miasto: string;
  kategoria: KategoriaMiejsca;
  lat: number;
  lon: number;
  opis: string;
  unesco?: boolean;
  /** Dłuższy opis do karty miejsca (opcjonalnie). */
  wiecej?: string;
  /** Zdjęcia do mini-galerii — tylko z licencją na użycie w aplikacji. */
  zdjecia?: number[];
};

export const KATEGORIE_MIEJSC: { id: KategoriaMiejsca; nazwa: string; ikona: 'castle' | 'swords' | 'flame' | 'museum' | 'church' | 'houses' | 'hut' }[] = [
  { id: 'zamki', nazwa: 'Zamki', ikona: 'castle' },
  { id: 'bitwy', nazwa: 'Bitwy', ikona: 'swords' },
  { id: 'pamiec', nazwa: 'Pamięć', ikona: 'flame' },
  { id: 'muzea', nazwa: 'Muzea', ikona: 'museum' },
  { id: 'sakralne', nazwa: 'Sakralne', ikona: 'church' },
  { id: 'starowki', nazwa: 'Starówki', ikona: 'houses' },
  { id: 'skanseny', nazwa: 'Skanseny', ikona: 'hut' },
];

export const miejsca: Miejsce[] = [
 {
  "id": "wawel",
  "nazwa": "Wawel",
  "miasto": "Kraków",
  "kategoria": "zamki",
  "lat": 50.0541,
  "lon": 19.9352,
  "opis": "Siedziba królów Polski i katedra koronacyjna.",
  "unesco": true
 },
 {
  "id": "zamek-w-malborku",
  "nazwa": "Zamek w Malborku",
  "miasto": "Malbork",
  "kategoria": "zamki",
  "lat": 54.0399,
  "lon": 19.0277,
  "opis": "Stolica zakonu krzyżackiego, największy zamek ceglany świata.",
  "unesco": true
 },
 {
  "id": "zamek-krolewski-w-warszawie",
  "nazwa": "Zamek Królewski w Warszawie",
  "miasto": "Warszawa",
  "kategoria": "zamki",
  "lat": 52.2479,
  "lon": 21.0152,
  "opis": "Rezydencja królów i miejsce uchwalenia Konstytucji 3 maja.",
  "unesco": true
 },
 {
  "id": "palac-w-wilanowie",
  "nazwa": "Pałac w Wilanowie",
  "miasto": "Warszawa",
  "kategoria": "zamki",
  "lat": 52.1651,
  "lon": 21.0904,
  "opis": "Letnia rezydencja Jana III Sobieskiego."
 },
 {
  "id": "zamek-ksiaz",
  "nazwa": "Zamek Książ",
  "miasto": "Wałbrzych",
  "kategoria": "zamki",
  "lat": 50.8423,
  "lon": 16.2919,
  "opis": "Jeden z największych zamków w Polsce, z tajemniczymi podziemiami z czasów wojny."
 },
 {
  "id": "zamek-w-lancucie",
  "nazwa": "Zamek w Łańcucie",
  "miasto": "Łańcut",
  "kategoria": "zamki",
  "lat": 50.0688,
  "lon": 22.2316,
  "opis": "Magnacka rezydencja Lubomirskich i Potockich z wozownią powozów."
 },
 {
  "id": "zamek-ogrodzieniec",
  "nazwa": "Zamek Ogrodzieniec",
  "miasto": "Podzamcze",
  "kategoria": "zamki",
  "lat": 50.4532,
  "lon": 19.5519,
  "opis": "Ruiny największego z Orlich Gniazd na Jurze."
 },
 {
  "id": "zamek-w-lidzbarku-warminskim",
  "nazwa": "Zamek w Lidzbarku Warmińskim",
  "miasto": "Lidzbark Warmiński",
  "kategoria": "zamki",
  "lat": 54.1259,
  "lon": 20.5806,
  "opis": "Siedziba biskupów warmińskich, tu pracował Kopernik."
 },
 {
  "id": "cedynia",
  "nazwa": "Cedynia",
  "miasto": "Cedynia",
  "kategoria": "bitwy",
  "lat": 52.8806,
  "lon": 14.2042,
  "opis": "Bitwa z 972 r. — Mieszko I pokonuje margrabiego Hodona."
 },
 {
  "id": "legnickie-pole",
  "nazwa": "Legnickie Pole",
  "miasto": "Legnickie Pole",
  "kategoria": "bitwy",
  "lat": 51.142,
  "lon": 16.244,
  "opis": "Bitwa z Mongołami w 1241 r., zginął Henryk II Pobożny."
 },
 {
  "id": "pola-grunwaldu",
  "nazwa": "Pola Grunwaldu",
  "miasto": "Stębark",
  "kategoria": "bitwy",
  "lat": 53.4847,
  "lon": 20.1242,
  "opis": "Wielka bitwa z zakonem krzyżackim 15 lipca 1410 r."
 },
 {
  "id": "raclawice",
  "nazwa": "Racławice",
  "miasto": "Racławice",
  "kategoria": "bitwy",
  "lat": 50.3258,
  "lon": 20.2133,
  "opis": "Zwycięstwo Kościuszki i kosynierów w 1794 r."
 },
 {
  "id": "olszynka-grochowska",
  "nazwa": "Olszynka Grochowska",
  "miasto": "Warszawa",
  "kategoria": "bitwy",
  "lat": 52.244,
  "lon": 21.115,
  "opis": "Największa bitwa powstania listopadowego, 1831 r."
 },
 {
  "id": "ossow",
  "nazwa": "Ossów",
  "miasto": "Ossów",
  "kategoria": "bitwy",
  "lat": 52.322,
  "lon": 21.245,
  "opis": "Kluczowe starcie Bitwy Warszawskiej 1920 r."
 },
 {
  "id": "westerplatte",
  "nazwa": "Westerplatte",
  "miasto": "Gdańsk",
  "kategoria": "bitwy",
  "lat": 54.4068,
  "lon": 18.6697,
  "opis": "Pierwsze strzały II wojny światowej, 1 września 1939 r."
 },
 {
  "id": "wizna",
  "nazwa": "Wizna",
  "miasto": "Wizna",
  "kategoria": "bitwy",
  "lat": 53.188,
  "lon": 22.392,
  "opis": "„Polskie Termopile” — obrona kpt. Raginisa we wrześniu 1939 r."
 },
 {
  "id": "psie-pole",
  "nazwa": "Psie Pole",
  "miasto": "Wrocław",
  "kategoria": "bitwy",
  "lat": 51.146,
  "lon": 17.115,
  "opis": "Obrona przed wojskami cesarza Henryka V w 1109 r., znana z kroniki i legendy."
 },
 {
  "id": "plowce",
  "nazwa": "Płowce",
  "miasto": "Płowce",
  "kategoria": "bitwy",
  "lat": 52.6156,
  "lon": 18.6439,
  "opis": "Łokietek rozbija część armii krzyżackiej, 27 września 1331 r."
 },
 {
  "id": "bitwa-pod-oliwa",
  "nazwa": "Bitwa pod Oliwą",
  "miasto": "Gdańsk",
  "kategoria": "bitwy",
  "lat": 54.42,
  "lon": 18.65,
  "opis": "Zwycięstwo floty Rzeczypospolitej nad Szwedami w 1627 r."
 },
 {
  "id": "warka",
  "nazwa": "Warka",
  "miasto": "Warka",
  "kategoria": "bitwy",
  "lat": 51.783,
  "lon": 21.193,
  "opis": "Czarniecki pokonuje Szwedów w czasie potopu, 1656 r."
 },
 {
  "id": "maciejowice",
  "nazwa": "Maciejowice",
  "miasto": "Maciejowice",
  "kategoria": "bitwy",
  "lat": 51.69,
  "lon": 21.558,
  "opis": "Klęska insurekcji i niewola Kościuszki, 10 października 1794 r."
 },
 {
  "id": "raszyn",
  "nazwa": "Raszyn",
  "miasto": "Raszyn",
  "kategoria": "bitwy",
  "lat": 52.156,
  "lon": 20.923,
  "opis": "Obrona Księstwa Warszawskiego przed Austriakami, 1809 r."
 },
 {
  "id": "ostroleka",
  "nazwa": "Ostrołęka",
  "miasto": "Ostrołęka",
  "kategoria": "bitwy",
  "lat": 53.085,
  "lon": 21.575,
  "opis": "Jedna z najkrwawszych bitew powstania listopadowego, 1831 r."
 },
 {
  "id": "radzymin",
  "nazwa": "Radzymin",
  "miasto": "Radzymin",
  "kategoria": "bitwy",
  "lat": 52.416,
  "lon": 21.184,
  "opis": "Zacięte walki na przedpolu Warszawy w sierpniu 1920 r."
 },
 {
  "id": "mokra",
  "nazwa": "Mokra",
  "miasto": "Mokra (gm. Miedźno)",
  "kategoria": "bitwy",
  "lat": 50.95,
  "lon": 18.94,
  "opis": "Wołyńska Brygada Kawalerii cały dzień zatrzymuje niemiecką dywizję pancerną, 1 września 1939 r."
 },
 {
  "id": "poczta-polska-w-gdansku",
  "nazwa": "Poczta Polska w Gdańsku",
  "miasto": "Gdańsk",
  "kategoria": "bitwy",
  "lat": 54.353,
  "lon": 18.656,
  "opis": "Obrona budynku poczty przez polskich pocztowców, 1 września 1939 r."
 },
 {
  "id": "bitwa-nad-bzura",
  "nazwa": "Bitwa nad Bzurą",
  "miasto": "Kutno",
  "kategoria": "bitwy",
  "lat": 52.231,
  "lon": 19.364,
  "opis": "Największa bitwa Września 1939 i jedyna polska kontrofensywa. W Kutnie jest jej muzeum."
 },
 {
  "id": "obrona-helu",
  "nazwa": "Obrona Helu",
  "miasto": "Hel",
  "kategoria": "bitwy",
  "lat": 54.608,
  "lon": 18.801,
  "opis": "Ostatni punkt oporu na Wybrzeżu, walczył do 2 października 1939 r."
 },
 {
  "id": "kock",
  "nazwa": "Kock",
  "miasto": "Kock",
  "kategoria": "bitwy",
  "lat": 51.633,
  "lon": 22.433,
  "opis": "Ostatnia bitwa kampanii 1939 r., gen. Kleeberg, 2–5 października."
 },
 {
  "id": "studzianki",
  "nazwa": "Studzianki",
  "miasto": "Studzianki Pancerne",
  "kategoria": "bitwy",
  "lat": 51.629,
  "lon": 21.518,
  "opis": "Bitwa na przyczółku warecko-magnuszewskim w sierpniu 1944 r."
 },
 {
  "id": "kolobrzeg",
  "nazwa": "Kołobrzeg",
  "miasto": "Kołobrzeg",
  "kategoria": "bitwy",
  "lat": 54.176,
  "lon": 15.583,
  "opis": "Walki o miasto w marcu 1945 r. i zaślubiny z morzem."
 },
 {
  "id": "auschwitz-birkenau",
  "nazwa": "Auschwitz-Birkenau",
  "miasto": "Oświęcim",
  "kategoria": "pamiec",
  "lat": 50.0266,
  "lon": 19.2036,
  "opis": "Niemiecki nazistowski obóz koncentracyjny i zagłady, dziś muzeum i miejsce pamięci.",
  "unesco": true
 },
 {
  "id": "majdanek",
  "nazwa": "Majdanek",
  "miasto": "Lublin",
  "kategoria": "pamiec",
  "lat": 51.2208,
  "lon": 22.6028,
  "opis": "Niemiecki obóz koncentracyjny, dziś Państwowe Muzeum na Majdanku."
 },
 {
  "id": "treblinka",
  "nazwa": "Treblinka",
  "miasto": "Wólka Okrąglik",
  "kategoria": "pamiec",
  "lat": 52.6313,
  "lon": 22.0533,
  "opis": "Niemiecki obóz zagłady, pomnik z kamieni symbolizujących zgładzone społeczności."
 },
 {
  "id": "grob-nieznanego-zolnierza",
  "nazwa": "Grób Nieznanego Żołnierza",
  "miasto": "Warszawa",
  "kategoria": "pamiec",
  "lat": 52.2412,
  "lon": 21.0119,
  "opis": "Symboliczny grób poległych za Polskę, przy nim warta honorowa."
 },
 {
  "id": "pomnik-powstania-warszawskiego",
  "nazwa": "Pomnik Powstania Warszawskiego",
  "miasto": "Warszawa",
  "kategoria": "pamiec",
  "lat": 52.2493,
  "lon": 21.0063,
  "opis": "Pomnik na placu Krasińskich, przy dawnym wejściu do kanałów."
 },
 {
  "id": "stare-powazki",
  "nazwa": "Stare Powązki",
  "miasto": "Warszawa",
  "kategoria": "pamiec",
  "lat": 52.2538,
  "lon": 20.9837,
  "opis": "Najstarszy cmentarz Warszawy, groby wielu zasłużonych Polaków."
 },
 {
  "id": "kopiec-kosciuszki",
  "nazwa": "Kopiec Kościuszki",
  "miasto": "Kraków",
  "kategoria": "pamiec",
  "lat": 50.0549,
  "lon": 19.8932,
  "opis": "Kopiec usypany w hołdzie Tadeuszowi Kościuszce."
 },
 {
  "id": "pomnik-poleglych-stoczniowcow",
  "nazwa": "Pomnik Poległych Stoczniowców",
  "miasto": "Gdańsk",
  "kategoria": "pamiec",
  "lat": 54.361,
  "lon": 18.6496,
  "opis": "Upamiętnia ofiary Grudnia 1970, symbol Solidarności."
 },
 {
  "id": "stutthof",
  "nazwa": "Stutthof",
  "miasto": "Sztutowo",
  "kategoria": "pamiec",
  "lat": 54.329,
  "lon": 19.153,
  "opis": "Pierwszy niemiecki obóz koncentracyjny na ziemiach polskich, od 1939 r."
 },
 {
  "id": "gross-rosen",
  "nazwa": "Gross-Rosen",
  "miasto": "Rogoźnica",
  "kategoria": "pamiec",
  "lat": 50.996,
  "lon": 16.279,
  "opis": "Niemiecki obóz koncentracyjny na Dolnym Śląsku."
 },
 {
  "id": "belzec",
  "nazwa": "Bełżec",
  "miasto": "Bełżec",
  "kategoria": "pamiec",
  "lat": 50.372,
  "lon": 23.457,
  "opis": "Niemiecki obóz zagłady, jedno z głównych miejsc Zagłady Żydów."
 },
 {
  "id": "sobibor",
  "nazwa": "Sobibór",
  "miasto": "Sobibór",
  "kategoria": "pamiec",
  "lat": 51.447,
  "lon": 23.593,
  "opis": "Niemiecki obóz zagłady, miejsce buntu więźniów w 1943 r."
 },
 {
  "id": "chelmno-nad-nerem",
  "nazwa": "Chełmno nad Nerem",
  "miasto": "Chełmno",
  "kategoria": "pamiec",
  "lat": 52.145,
  "lon": 18.728,
  "opis": "Pierwszy niemiecki obóz zagłady na ziemiach polskich."
 },
 {
  "id": "palmiry",
  "nazwa": "Palmiry",
  "miasto": "Palmiry",
  "kategoria": "pamiec",
  "lat": 52.37,
  "lon": 20.786,
  "opis": "Cmentarz ofiar niemieckich egzekucji w Puszczy Kampinoskiej."
 },
 {
  "id": "piasnica",
  "nazwa": "Piaśnica",
  "miasto": "Wielka Piaśnica",
  "kategoria": "pamiec",
  "lat": 54.6822,
  "lon": 18.1953,
  "opis": "Las masowych egzekucji Polaków jesienią 1939 r."
 },
 {
  "id": "pawiak",
  "nazwa": "Pawiak",
  "miasto": "Warszawa",
  "kategoria": "pamiec",
  "lat": 52.2463,
  "lon": 20.9885,
  "opis": "Więzienie gestapo w czasie okupacji, dziś muzeum."
 },
 {
  "id": "umschlagplatz",
  "nazwa": "Umschlagplatz",
  "miasto": "Warszawa",
  "kategoria": "pamiec",
  "lat": 52.2513,
  "lon": 20.9963,
  "opis": "Miejsce wywózek z getta warszawskiego do Treblinki."
 },
 {
  "id": "pomnik-bohaterow-getta",
  "nazwa": "Pomnik Bohaterów Getta",
  "miasto": "Warszawa",
  "kategoria": "pamiec",
  "lat": 52.2496,
  "lon": 20.9932,
  "opis": "Pomnik powstańców z getta. Tu w 1970 r. ukląkł Willy Brandt."
 },
 {
  "id": "mauzoleum-walki-i-meczenstwa",
  "nazwa": "Mauzoleum Walki i Męczeństwa",
  "miasto": "Warszawa",
  "kategoria": "pamiec",
  "lat": 52.2196,
  "lon": 21.0212,
  "opis": "Dawna siedziba gestapo przy al. Szucha i jej cele."
 },
 {
  "id": "muzeum-katynskie",
  "nazwa": "Muzeum Katyńskie",
  "miasto": "Warszawa",
  "kategoria": "pamiec",
  "lat": 52.265,
  "lon": 21.007,
  "opis": "Pamięć ofiar zbrodni katyńskiej, w Cytadeli Warszawskiej."
 },
 {
  "id": "laczka-na-powazkach-wojskowych",
  "nazwa": "„Łączka” na Powązkach Wojskowych",
  "miasto": "Warszawa",
  "kategoria": "pamiec",
  "lat": 52.2585,
  "lon": 20.956,
  "opis": "Miejsce potajemnych pochówków ofiar terroru komunistycznego."
 },
 {
  "id": "muzeum-zolnierzy-wykletych",
  "nazwa": "Muzeum Żołnierzy Wyklętych",
  "miasto": "Warszawa",
  "kategoria": "pamiec",
  "lat": 52.2048,
  "lon": 21.0005,
  "opis": "Dawne więzienie przy Rakowieckiej, miejsce kaźni więźniów politycznych PRL."
 },
 {
  "id": "kopiec-pilsudskiego",
  "nazwa": "Kopiec Piłsudskiego",
  "miasto": "Kraków",
  "kategoria": "pamiec",
  "lat": 50.0593,
  "lon": 19.8462,
  "opis": "Największy z krakowskich kopców, usypany ku czci Marszałka."
 },
 {
  "id": "poznanskie-krzyze",
  "nazwa": "Poznańskie Krzyże",
  "miasto": "Poznań",
  "kategoria": "pamiec",
  "lat": 52.4085,
  "lon": 16.9205,
  "opis": "Pomnik Ofiar Czerwca 1956."
 },
 {
  "id": "krzyz-przy-kopalni-wujek",
  "nazwa": "Krzyż przy kopalni Wujek",
  "miasto": "Katowice",
  "kategoria": "pamiec",
  "lat": 50.244,
  "lon": 18.989,
  "opis": "Upamiętnia 9 górników zabitych 16 grudnia 1981 r."
 },
 {
  "id": "muzeum-powstania-warszawskiego",
  "nazwa": "Muzeum Powstania Warszawskiego",
  "miasto": "Warszawa",
  "kategoria": "muzea",
  "lat": 52.2324,
  "lon": 20.9809,
  "opis": "Historia 63 dni walki o Warszawę w 1944 r."
 },
 {
  "id": "muzeum-historii-zydow-polskich-polin",
  "nazwa": "Muzeum Historii Żydów Polskich POLIN",
  "miasto": "Warszawa",
  "kategoria": "muzea",
  "lat": 52.2493,
  "lon": 20.9932,
  "opis": "Tysiąc lat historii Żydów na ziemiach polskich."
 },
 {
  "id": "muzeum-ii-wojny-swiatowej",
  "nazwa": "Muzeum II Wojny Światowej",
  "miasto": "Gdańsk",
  "kategoria": "muzea",
  "lat": 54.3561,
  "lon": 18.6603,
  "opis": "Jedno z największych muzeów historycznych w Polsce."
 },
 {
  "id": "europejskie-centrum-solidarnosci",
  "nazwa": "Europejskie Centrum Solidarności",
  "miasto": "Gdańsk",
  "kategoria": "muzea",
  "lat": 54.361,
  "lon": 18.6489,
  "opis": "Historia Solidarności i drogi do wolności w 1989 r."
 },
 {
  "id": "kopalnia-soli-wieliczka",
  "nazwa": "Kopalnia Soli „Wieliczka”",
  "miasto": "Wieliczka",
  "kategoria": "muzea",
  "lat": 49.9833,
  "lon": 20.0546,
  "opis": "Podziemne komory i kaplica wykute w soli, jeden z pierwszych obiektów UNESCO.",
  "unesco": true
 },
 {
  "id": "dom-mikolaja-kopernika",
  "nazwa": "Dom Mikołaja Kopernika",
  "miasto": "Toruń",
  "kategoria": "muzea",
  "lat": 53.0094,
  "lon": 18.6037,
  "opis": "Muzeum w kamienicy, w której według tradycji urodził się Kopernik.",
  "unesco": true
 },
 {
  "id": "muzeum-fryderyka-chopina",
  "nazwa": "Muzeum Fryderyka Chopina",
  "miasto": "Warszawa",
  "kategoria": "muzea",
  "lat": 52.2367,
  "lon": 21.0236,
  "opis": "Pamiątki i rękopisy Chopina w Pałacu Ostrogskich."
 },
 {
  "id": "muzeum-marii-sklodowskiej-curie",
  "nazwa": "Muzeum Marii Skłodowskiej-Curie",
  "miasto": "Warszawa",
  "kategoria": "muzea",
  "lat": 52.2524,
  "lon": 21.0083,
  "opis": "Muzeum w kamienicy, w której urodziła się noblistka.",
  "unesco": true
 },
 {
  "id": "katedra-gnieznienska",
  "nazwa": "Katedra Gnieźnieńska",
  "miasto": "Gniezno",
  "kategoria": "sakralne",
  "lat": 52.5378,
  "lon": 17.588,
  "opis": "Grób św. Wojciecha i miejsce pierwszych koronacji."
 },
 {
  "id": "jasna-gora",
  "nazwa": "Jasna Góra",
  "miasto": "Częstochowa",
  "kategoria": "sakralne",
  "lat": 50.8125,
  "lon": 19.0975,
  "opis": "Sanktuarium z obrazem Matki Bożej, obronione przed Szwedami w 1655 r."
 },
 {
  "id": "bazylika-mariacka",
  "nazwa": "Bazylika Mariacka",
  "miasto": "Kraków",
  "kategoria": "sakralne",
  "lat": 50.0616,
  "lon": 19.9394,
  "opis": "Ołtarz Wita Stwosza i hejnał z wieży.",
  "unesco": true
 },
 {
  "id": "katedra-poznanska",
  "nazwa": "Katedra Poznańska",
  "miasto": "Poznań",
  "kategoria": "sakralne",
  "lat": 52.4115,
  "lon": 16.9481,
  "opis": "Najstarsza katedra w Polsce, groby pierwszych Piastów."
 },
 {
  "id": "kosciol-pokoju",
  "nazwa": "Kościół Pokoju",
  "miasto": "Świdnica",
  "kategoria": "sakralne",
  "lat": 50.8461,
  "lon": 16.4806,
  "opis": "Ogromny drewniany kościół ewangelicki z XVII w.",
  "unesco": true
 },
 {
  "id": "kalwaria-zebrzydowska",
  "nazwa": "Kalwaria Zebrzydowska",
  "miasto": "Kalwaria Zebrzydowska",
  "kategoria": "sakralne",
  "lat": 49.8676,
  "lon": 19.6739,
  "opis": "Barokowe sanktuarium i dróżki kalwaryjskie.",
  "unesco": true
 },
 {
  "id": "cerkiew-w-kwiatoniu",
  "nazwa": "Cerkiew w Kwiatoniu",
  "miasto": "Kwiatoń",
  "kategoria": "sakralne",
  "lat": 49.5008,
  "lon": 21.1677,
  "opis": "Drewniana cerkiew łemkowska z listy UNESCO.",
  "unesco": true
 },
 {
  "id": "swieta-gora-grabarka",
  "nazwa": "Święta Góra Grabarka",
  "miasto": "Grabarka",
  "kategoria": "sakralne",
  "lat": 52.444,
  "lon": 22.776,
  "opis": "Najważniejsze sanktuarium prawosławne w Polsce."
 },
 {
  "id": "stara-synagoga",
  "nazwa": "Stara Synagoga",
  "miasto": "Kraków",
  "kategoria": "sakralne",
  "lat": 50.0515,
  "lon": 19.9489,
  "opis": "Najstarsza zachowana synagoga w Polsce, na Kazimierzu.",
  "unesco": true
 },
 {
  "id": "meczet-w-kruszynianach",
  "nazwa": "Meczet w Kruszynianach",
  "miasto": "Kruszyniany",
  "kategoria": "sakralne",
  "lat": 53.182,
  "lon": 23.796,
  "opis": "Drewniany meczet polskich Tatarów z XVIII w."
 },
 {
  "id": "stare-miasto-w-krakowie",
  "nazwa": "Stare Miasto w Krakowie",
  "miasto": "Kraków",
  "kategoria": "starowki",
  "lat": 50.0617,
  "lon": 19.9373,
  "opis": "Rynek Główny, Sukiennice i dawna stolica królewska.",
  "unesco": true
 },
 {
  "id": "stare-miasto-w-warszawie",
  "nazwa": "Stare Miasto w Warszawie",
  "miasto": "Warszawa",
  "kategoria": "starowki",
  "lat": 52.2497,
  "lon": 21.0122,
  "opis": "Odbudowane po 1945 r. niemal z gruzów.",
  "unesco": true
 },
 {
  "id": "zespol-staromiejski-torunia",
  "nazwa": "Zespół staromiejski Torunia",
  "miasto": "Toruń",
  "kategoria": "starowki",
  "lat": 53.0103,
  "lon": 18.6048,
  "opis": "Gotyckie miasto Kopernika.",
  "unesco": true
 },
 {
  "id": "zamosc",
  "nazwa": "Zamość",
  "miasto": "Zamość",
  "kategoria": "starowki",
  "lat": 50.7172,
  "lon": 23.2528,
  "opis": "Renesansowe „miasto idealne” Jana Zamoyskiego.",
  "unesco": true
 },
 {
  "id": "glowne-miasto-w-gdansku",
  "nazwa": "Główne Miasto w Gdańsku",
  "miasto": "Gdańsk",
  "kategoria": "starowki",
  "lat": 54.3486,
  "lon": 18.6532,
  "opis": "Długi Targ, Neptun i hanzeatyckie kamienice."
 },
 {
  "id": "rynek-we-wroclawiu",
  "nazwa": "Rynek we Wrocławiu",
  "miasto": "Wrocław",
  "kategoria": "starowki",
  "lat": 51.11,
  "lon": 17.032,
  "opis": "Jeden z największych rynków Europy, gotycki ratusz."
 },
 {
  "id": "stary-rynek-w-poznaniu",
  "nazwa": "Stary Rynek w Poznaniu",
  "miasto": "Poznań",
  "kategoria": "starowki",
  "lat": 52.4083,
  "lon": 16.9341,
  "opis": "Renesansowy ratusz i koziołki."
 },
 {
  "id": "sandomierz",
  "nazwa": "Sandomierz",
  "miasto": "Sandomierz",
  "kategoria": "starowki",
  "lat": 50.682,
  "lon": 21.7489,
  "opis": "Królewskie miasto nad Wisłą z podziemną trasą."
 },
 {
  "id": "kazimierz-dolny",
  "nazwa": "Kazimierz Dolny",
  "miasto": "Kazimierz Dolny",
  "kategoria": "starowki",
  "lat": 51.3225,
  "lon": 21.9478,
  "opis": "Renesansowe miasteczko nad Wisłą."
 },
 {
  "id": "kaszubski-park-etnograficzny",
  "nazwa": "Kaszubski Park Etnograficzny",
  "miasto": "Wdzydze Kiszewskie",
  "kategoria": "skanseny",
  "lat": 54.0042,
  "lon": 17.9339,
  "opis": "Najstarszy skansen w Polsce, zagrody kaszubskie."
 },
 {
  "id": "skansen-w-sanoku",
  "nazwa": "Skansen w Sanoku",
  "miasto": "Sanok",
  "kategoria": "skanseny",
  "lat": 49.5703,
  "lon": 22.2006,
  "opis": "Budownictwo ludowe Bojków, Łemków i Pogórzan."
 },
 {
  "id": "muzeum-wsi-lubelskiej",
  "nazwa": "Muzeum Wsi Lubelskiej",
  "miasto": "Lublin",
  "kategoria": "skanseny",
  "lat": 51.2556,
  "lon": 22.4964,
  "opis": "Dawne wsie i miasteczko Lubelszczyzny."
 },
 {
  "id": "park-etnograficzny-w-tokarni",
  "nazwa": "Park Etnograficzny w Tokarni",
  "miasto": "Tokarnia",
  "kategoria": "skanseny",
  "lat": 50.7656,
  "lon": 20.43,
  "opis": "Muzeum Wsi Kieleckiej, zagrody i dworek."
 },
 {
  "id": "muzeum-wsi-mazowieckiej",
  "nazwa": "Muzeum Wsi Mazowieckiej",
  "miasto": "Sierpc",
  "kategoria": "skanseny",
  "lat": 52.8644,
  "lon": 19.6672,
  "opis": "Wieś mazowiecka z XIX i XX w."
 },
 {
  "id": "orawski-park-etnograficzny",
  "nazwa": "Orawski Park Etnograficzny",
  "miasto": "Zubrzyca Górna",
  "kategoria": "skanseny",
  "lat": 49.5609,
  "lon": 19.6564,
  "opis": "Zagroda Moniaków i drewniana Orawa."
 },
 {
  "id": "zalipie",
  "nazwa": "Zalipie",
  "miasto": "Zalipie",
  "kategoria": "skanseny",
  "lat": 50.2306,
  "lon": 20.8611,
  "opis": "Malowana wieś — kwiatowe malunki na chatach."
 }
];
