# Aktualizacje „w powietrzu” — konfiguracja (jednorazowo, ok. 30–60 min)

Cel: zmiany w aplikacji trafiają na telefon bez komputera i bez Expo Go.

## 1. Połącz projekt z kontem Expo (komputer, PowerShell)
```powershell
cd C:\Projekty\polska-app\app
npm install
npx eas-cli@latest login
npx eas-cli@latest init
npx eas-cli@latest update:configure
```
Przy `init` wybierz organizację **estaloca-studio** (jeśli nazwa jest inna — popraw pole `owner` w `app.json`).
Komendy dopiszą do `app.json` identyfikator projektu i adres aktualizacji — **wyślij te zmiany na GitHuba** (Claude podpowie jak).

## 2. Token dla GitHuba
1. expo.dev → ikona konta → **Access tokens** → **Create token** (nazwa np. „github”). Skopiuj token.
2. GitHub → repozytorium **polska-app** → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**.
3. Name: `EXPO_TOKEN`, Secret: wklej token → **Add secret**.

## 3. Pierwsza wersja testowa na telefon
```powershell
cd C:\Projekty\polska-app\app
npx eas-cli@latest build --profile preview --platform ios
npx eas-cli@latest build --profile preview --platform android
```
- iOS: Expo poprosi o zalogowanie do **Apple Developer** i o zarejestrowanie Twojego iPhone'a (link/QR do otwarcia na telefonie).
- Android: na końcu dostaniesz link do pliku **.apk** do zainstalowania.
- Build trwa kilkanaście–kilkadziesiąt minut (w chmurze Expo, komputer może być wyłączony).

## 4. Gotowe
Od teraz każda zmiana wypchnięta na GitHuba trafia do aplikacji testowej automatycznie
(GitHub → zakładka **Actions** pokazuje postęp). Na telefonie: zamknij i otwórz aplikację.

Nowy build (krok 3) jest potrzebny tylko po dodaniu nowego pakietu natywnego.
