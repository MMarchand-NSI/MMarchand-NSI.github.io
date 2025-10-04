@echo off
setlocal

REM === Config ===
set "URL=https://gitlab.com/api/v4/projects/4207231/packages/generic/graphviz-releases/14.0.0/windows_10_cmake_Release_Graphviz-14.0.0-win64.zip"
set "ZIP=%TEMP%\graphviz-14.0.0-win64.zip"
set "OUT=%USERPROFILE%\.local"

REM === Ensure output dir exists ===
if not exist "%OUT%" mkdir "%OUT%" 2>nul

REM === Download with curl (fallback: stop with error) ===
where curl >nul 2>&1
if errorlevel 1 (
  echo ERROR: curl not found in PATH.
  exit /b 1
)

echo [1/2] Downloading...
curl -L --fail --retry 3 --retry-delay 2 -o "%ZIP%" "%URL%"
if errorlevel 1 (
  echo ERROR: download failed.
  exit /b 2
)

REM === Unzip with tar into %OUT% ===
where tar >nul 2>&1
if errorlevel 1 (
  echo ERROR: tar not found in PATH (Windows 10/11 usually has it).
  exit /b 3
)

echo [2/2] Extracting into "%OUT%" ...
tar -xf "%ZIP%" -C "%OUT%"
if errorlevel 1 (
  echo ERROR: extraction failed.
  exit /b 4
)

del /q "%ZIP%" >nul 2>&1
echo Done. Extracted under: "%OUT%"
exit /b 0
