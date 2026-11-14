// Szlaki do zwiedzania i historyczne wyprawy (przemarsze) — dane z arkusza mapy.
export type Przystanek = { nazwa: string; miasto: string; opis: string; lat: number; lon: number };
export type Szlak = { id: string; nazwa: string; przystanki: Przystanek[] };
export type Etap = { data: string; miejsce: string; opis: string; lat: number; lon: number };
export type Wyprawa = { id: string; nazwa: string; rok: number; etapy: Etap[] };

export const szlaki: Szlak[] = [
 {
  "id": "szlak-orlich-gniazd",
  "nazwa": "Szlak Orlich Gniazd",
  "przystanki": [
   {
    "nazwa": "Jasna Góra",
    "miasto": "Częstochowa",
    "opis": "Początek szlaku.",
    "lat": 50.8125,
    "lon": 19.0975
   },
   {
    "nazwa": "Zamek w Olsztynie",
    "miasto": "Olsztyn k. Częstochowy",
    "opis": "Ruiny z wieżą na skale.",
    "lat": 50.7493,
    "lon": 19.2706
   },
   {
    "nazwa": "Zamek Mirów",
    "miasto": "Mirów",
    "opis": "Ruiny nad wsią.",
    "lat": 50.6143,
    "lon": 19.471
   },
   {
    "nazwa": "Zamek Bobolice",
    "miasto": "Bobolice",
    "opis": "Zamek odbudowany od podstaw.",
    "lat": 50.6031,
    "lon": 19.4836
   },
   {
    "nazwa": "Zamek Ogrodzieniec",
    "miasto": "Podzamcze",
    "opis": "Największe z Orlich Gniazd.",
    "lat": 50.4532,
    "lon": 19.5519
   },
   {
    "nazwa": "Zamek Rabsztyn",
    "miasto": "Olkusz",
    "opis": "Ruiny na wapiennej skale.",
    "lat": 50.3005,
    "lon": 19.6045
   },
   {
    "nazwa": "Zamek Pieskowa Skała",
    "miasto": "Sułoszowa",
    "opis": "Renesansowy zamek nad Prądnikiem.",
    "lat": 50.2441,
    "lon": 19.7781
   },
   {
    "nazwa": "Zamek w Ojcowie",
    "miasto": "Ojców",
    "opis": "Ruiny Kazimierza Wielkiego.",
    "lat": 50.2111,
    "lon": 19.8297
   },
   {
    "nazwa": "Wawel",
    "miasto": "Kraków",
    "opis": "Koniec szlaku.",
    "lat": 50.0541,
    "lon": 19.9352
   }
  ]
 },
 {
  "id": "szlak-piastowski",
  "nazwa": "Szlak Piastowski",
  "przystanki": [
   {
    "nazwa": "Katedra Poznańska",
    "miasto": "Poznań",
    "opis": "Groby pierwszych Piastów.",
    "lat": 52.4115,
    "lon": 16.9481
   },
   {
    "nazwa": "Ostrów Lednicki",
    "miasto": "Lednogóra",
    "opis": "Wyspa z ruinami palatium Mieszka I.",
    "lat": 52.5372,
    "lon": 17.3906
   },
   {
    "nazwa": "Katedra Gnieźnieńska",
    "miasto": "Gniezno",
    "opis": "Grób św. Wojciecha.",
    "lat": 52.5378,
    "lon": 17.588
   },
   {
    "nazwa": "Biskupin",
    "miasto": "Żnin",
    "opis": "Osada obronna sprzed ok. 2700 lat.",
    "lat": 52.7922,
    "lon": 17.7369
   },
   {
    "nazwa": "Mysia Wieża",
    "miasto": "Kruszwica",
    "opis": "Wieża z legendy o Popielu.",
    "lat": 52.675,
    "lon": 18.3317
   },
   {
    "nazwa": "Strzelno",
    "miasto": "Strzelno",
    "opis": "Romańskie kolumny w kościele św. Trójcy.",
    "lat": 52.6283,
    "lon": 18.1736
   }
  ]
 },
 {
  "id": "szlak-kopernikowski",
  "nazwa": "Szlak Kopernikowski",
  "przystanki": [
   {
    "nazwa": "Dom Kopernika",
    "miasto": "Toruń",
    "opis": "Miasto urodzenia.",
    "lat": 53.0094,
    "lon": 18.6037
   },
   {
    "nazwa": "Zamek Kapituły Warmińskiej",
    "miasto": "Olsztyn",
    "opis": "Kopernik był tu administratorem.",
    "lat": 53.7778,
    "lon": 20.4744
   },
   {
    "nazwa": "Zamek biskupów warmińskich",
    "miasto": "Lidzbark Warmiński",
    "opis": "Pracował jako lekarz i sekretarz biskupa.",
    "lat": 54.1259,
    "lon": 20.5806
   },
   {
    "nazwa": "Wzgórze Katedralne",
    "miasto": "Frombork",
    "opis": "Tu powstało „O obrotach” i tu jest jego grób.",
    "lat": 54.3575,
    "lon": 19.6825
   }
  ]
 },
 {
  "id": "droga-krolewska-krakow",
  "nazwa": "Droga Królewska (Kraków)",
  "przystanki": [
   {
    "nazwa": "Barbakan",
    "miasto": "Kraków",
    "opis": "Wjazd do miasta.",
    "lat": 50.0655,
    "lon": 19.9416
   },
   {
    "nazwa": "Brama Floriańska",
    "miasto": "Kraków",
    "opis": "Początek traktu koronacyjnego.",
    "lat": 50.0647,
    "lon": 19.9415
   },
   {
    "nazwa": "Rynek Główny",
    "miasto": "Kraków",
    "opis": "Sukiennice i Bazylika Mariacka.",
    "lat": 50.0617,
    "lon": 19.9373
   },
   {
    "nazwa": "Ulica Grodzka",
    "miasto": "Kraków",
    "opis": "Droga na wzgórze.",
    "lat": 50.0565,
    "lon": 19.9375
   },
   {
    "nazwa": "Wawel",
    "miasto": "Kraków",
    "opis": "Katedra koronacyjna.",
    "lat": 50.0541,
    "lon": 19.9352
   }
  ]
 }
];

export const wyprawy: Wyprawa[] = [
 {
  "id": "pochod-na-grunwald",
  "nazwa": "Pochód na Grunwald",
  "rok": 1410,
  "etapy": [
   {
    "data": "30 VI – 3 VII",
    "miejsce": "Czerwińsk nad Wisłą",
    "opis": "Koncentracja wojsk i przeprawa przez Wisłę po moście łyżwowym.",
    "lat": 52.3958,
    "lon": 20.3122
   },
   {
    "data": "ok. 9 VII",
    "miejsce": "Lidzbark Welski",
    "opis": "Wejście na ziemie zakonne, marsz w stronę Drwęcy.",
    "lat": 53.2747,
    "lon": 19.8236
   },
   {
    "data": "10 VII",
    "miejsce": "Kurzętnik",
    "opis": "Krzyżacy bronią przeprawy na Drwęcy, Jagiełło zawraca.",
    "lat": 53.3958,
    "lon": 19.5703
   },
   {
    "data": "11–12 VII",
    "miejsce": "Działdowo",
    "opis": "Obejście linii Drwęcy od wschodu.",
    "lat": 53.2342,
    "lon": 20.1797
   },
   {
    "data": "13 VII",
    "miejsce": "Dąbrówno",
    "opis": "Zdobycie miasta, obóz przed bitwą.",
    "lat": 53.4381,
    "lon": 20.0372
   },
   {
    "data": "15 VII",
    "miejsce": "Pola Grunwaldu",
    "opis": "Bitwa i zwycięstwo nad zakonem.",
    "lat": 53.4847,
    "lon": 20.1242
   }
  ]
 },
 {
  "id": "odsiecz-wiedenska",
  "nazwa": "Odsiecz wiedeńska",
  "rok": 1683,
  "etapy": [
   {
    "data": "15 VIII",
    "miejsce": "Kraków",
    "opis": "Król wyrusza z Krakowa po modlitwie na Wawelu.",
    "lat": 50.0541,
    "lon": 19.9352
   },
   {
    "data": "koniec VIII",
    "miejsce": "Tarnowskie Góry",
    "opis": "Przegląd armii koronnej przed marszem przez Śląsk.",
    "lat": 50.4434,
    "lon": 18.8606
   },
   {
    "data": "VIII/IX",
    "miejsce": "Gliwice",
    "opis": "Przemarsz przez Górny Śląsk.",
    "lat": 50.2945,
    "lon": 18.6714
   },
   {
    "data": "IX",
    "miejsce": "Opawa",
    "opis": "Marsz przez Morawy.",
    "lat": 49.9387,
    "lon": 17.9026
   },
   {
    "data": "IX",
    "miejsce": "Ołomuniec",
    "opis": "Marsz przez Morawy.",
    "lat": 49.5938,
    "lon": 17.2509
   },
   {
    "data": "IX",
    "miejsce": "Tulln",
    "opis": "Połączenie z wojskami cesarskimi nad Dunajem.",
    "lat": 48.3297,
    "lon": 16.0581
   },
   {
    "data": "12 IX",
    "miejsce": "Kahlenberg (Wiedeń)",
    "opis": "Bitwa i rozbicie armii tureckiej.",
    "lat": 48.277,
    "lon": 16.333
   }
  ]
 },
 {
  "id": "marsz-kadrowki",
  "nazwa": "Marsz Kadrówki",
  "rok": 1914,
  "etapy": [
   {
    "data": "6 VIII, przed świtem",
    "miejsce": "Oleandry, Kraków",
    "opis": "Pierwsza Kompania Kadrowa wyrusza na rozkaz Piłsudskiego.",
    "lat": 50.0596,
    "lon": 19.9167
   },
   {
    "data": "6 VIII",
    "miejsce": "Michałowice",
    "opis": "Obalenie słupów granicznych zaborów.",
    "lat": 50.1631,
    "lon": 19.9846
   },
   {
    "data": "VIII",
    "miejsce": "Słomniki",
    "opis": "Marsz na północ.",
    "lat": 50.2397,
    "lon": 20.0839
   },
   {
    "data": "VIII",
    "miejsce": "Miechów",
    "opis": "Marsz na północ.",
    "lat": 50.3561,
    "lon": 20.0281
   },
   {
    "data": "VIII",
    "miejsce": "Jędrzejów",
    "opis": "Marsz na północ.",
    "lat": 50.6392,
    "lon": 20.3036
   },
   {
    "data": "VIII",
    "miejsce": "Chęciny",
    "opis": "Ostatni etap przed Kielcami.",
    "lat": 50.7997,
    "lon": 20.4628
   },
   {
    "data": "12 VIII",
    "miejsce": "Kielce",
    "opis": "Wkroczenie do Kielc.",
    "lat": 50.8661,
    "lon": 20.6286
   }
  ]
 },
 {
  "id": "ewakuacja-zlota",
  "nazwa": "Ewakuacja złota",
  "rok": 1939,
  "etapy": [
   {
    "data": "4–5 IX",
    "miejsce": "Warszawa, Bank Polski",
    "opis": "Wyjazd konwoju ze złotem ze skarbca przy Bielańskiej.",
    "lat": 52.2445,
    "lon": 21.0059
   },
   {
    "data": "12–13 IX",
    "miejsce": "Śniatyn (dziś Ukraina)",
    "opis": "Zebranie złota i przeładunek do pociągów do Rumunii.",
    "lat": 48.4467,
    "lon": 25.5653
   },
   {
    "data": "15 IX",
    "miejsce": "Konstanca (Rumunia)",
    "opis": "Załadunek na brytyjski tankowiec.",
    "lat": 44.1733,
    "lon": 28.6383
   },
   {
    "data": "IX",
    "miejsce": "Stambuł (Turcja)",
    "opis": "Rejs przez Morze Czarne, dalej pociągiem na Bliski Wschód.",
    "lat": 41.0082,
    "lon": 28.9784
   },
   {
    "data": "IX",
    "miejsce": "Bejrut (Liban)",
    "opis": "Przeładunek na statek do Francji.",
    "lat": 33.8938,
    "lon": 35.5018
   },
   {
    "data": "5 X",
    "miejsce": "Nevers (Francja)",
    "opis": "Złoto trafia do skarbca Banku Francji.",
    "lat": 46.9896,
    "lon": 3.159
   }
  ]
 }
];
