# POLSKA – Moja Ojczyzna

Aplikacja o Polsce: postacie historyczne, miejsca, oś czasu, symbole, kultura i quizy.

## Struktura repozytorium

```
polska-app/
├── app/      aplikacja mobilna (Expo SDK 58, React Native, TypeScript) → Google Play i App Store
├── admin/    panel admina z podglądem na żywo (React) → Cloudflare Pages      [wkrótce]
└── api/      API (Cloudflare Workers) + baza D1 + zdjęcia w R2               [wkrótce]
```

## Pierwsze uruchomienie aplikacji

Wymagany Node.js 22.13+ (albo 24.3+).

```bash
cd app
npm install
npx expo install react react-native react-dom react-native-web expo-router expo-linking expo-constants expo-status-bar expo-font expo-system-ui react-native-safe-area-context react-native-screens react-native-svg @react-native-async-storage/async-storage @expo-google-fonts/playfair-display @expo-google-fonts/manrope
npx expo-doctor@latest
npx expo start
```

`npx expo install` sam dobiera wersje pakietów zgodne z SDK 58.
Po `npx expo start` zeskanuj kod QR aplikacją **Expo Go** (Android: aparatem w Expo Go, iPhone: aparatem systemowym).
Klawisz `w` otwiera wersję w przeglądarce.

## Motywy

Trzy motywy w `app/src/theme/themes.ts`: **Granat**, **Biel**, **Grafit** oraz tryb **Automatycznie**
(jasny telefon → Biel, ciemny → Granat). Ekrany używają wyłącznie nazw kolorów z motywu (`t.bg`, `t.text`, `t.feature`…),
nigdy wpisanych na sztywno wartości — dzięki temu nowy motyw to tylko nowy słownik kolorów.

## Do ustawienia przed publikacją

- `app/app.json` → `ios.bundleIdentifier` i `android.package` (identyfikator aplikacji w sklepach, nie da się go potem zmienić).
- Ikona i ekran startowy (`app/assets/`).
