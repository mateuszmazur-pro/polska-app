@echo off
title POLSKA - automatyczne aktualizacje
cd /d "%~dp0.."
echo.
echo  Co 15 sekund sprawdzam, czy na GitHubie sa nowe zmiany.
echo  Gdy sa - pobieram je, a aplikacja na telefonie odswiezy sie sama.
echo  Zamknij to okno, aby wylaczyc automatyczne aktualizacje.
echo.
set BLAD=0
:petla
for /f %%i in ('git rev-parse HEAD') do set PRZED=%%i
git pull --ff-only -q >"%TEMP%\polska-pull.log" 2>&1
if errorlevel 1 (
  if "%BLAD%"=="0" (
    echo.
    echo  [%time:~0,8%] UWAGA: nie udalo sie pobrac zmian. Szczegoly:
    type "%TEMP%\polska-pull.log"
    echo  Napisz o tym Claude - pomoze to naprawic.
    echo.
  )
  set BLAD=1
) else (
  set BLAD=0
)
for /f %%i in ('git rev-parse HEAD') do set PO=%%i
if not "%PRZED%"=="%PO%" (
  echo  [%time:~0,8%] Pobrano nowa wersje:
  git log -1 --format="               %%s"
  git diff --name-only %PRZED% %PO% | findstr /i "package.json" >nul && (
    echo.
    echo  !!! Doszly nowe pakiety. Zamknij oba okna i uruchom ponownie Uruchom.bat
    echo.
  )
)
timeout /t 15 /nobreak >nul
goto petla
