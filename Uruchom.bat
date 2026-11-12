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
echo  Uruchamiam serwer Expo...
echo.
cd app
npx expo start -c
