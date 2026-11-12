@echo off
title POLSKA - serwer aplikacji
cd /d "%~dp0"
echo.
echo  POLSKA - Moja Ojczyzna
echo  ----------------------
echo  Pobieram najnowsze zmiany z GitHuba...
git pull --ff-only
echo.
echo  Wlaczam automatyczne pobieranie zmian (osobne okno)...
start "POLSKA - automatyczne aktualizacje" cmd /k ""%~dp0scripts\auto-aktualizacje.bat""
cd app
echo  Sprawdzam pakiety (npm install)...
call npm install --no-audit --no-fund
echo.
echo  Uruchamiam serwer Expo...
echo.
npx expo start -c
