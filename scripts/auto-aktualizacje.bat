@echo off
title POLSKA - automatyczne aktualizacje
cd /d "%~dp0.."
echo.
echo  Co 15 sekund sprawdzam, czy na GitHubie sa nowe zmiany.
echo  Gdy sa - pobieram je, a aplikacja na telefonie odswiezy sie sama.
echo  Zamknij to okno, aby wylaczyc automatyczne aktualizacje.
echo.
:petla
for /f %%i in ('git rev-parse HEAD') do set PRZED=%%i
git pull --ff-only -q >nul 2>&1
for /f %%i in ('git rev-parse HEAD') do set PO=%%i
if not "%PRZED%"=="%PO%" (
  echo  [%time:~0,8%] Pobrano nowa wersje:
  git log -1 --format="               %%s"
)
timeout /t 15 /nobreak >nul
goto petla
