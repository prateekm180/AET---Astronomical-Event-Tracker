@echo off
title Aether AET - Project Starter
color 0B

echo.
echo  ================================================
echo    AETHER - Astronomical Events Tracker
echo    Auto Setup and Start Script
echo  ================================================
echo.

:: ─── CHECK NODE.JS ───────────────────────────────
echo [1/6] Checking Node.js...
node --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo  [ERROR] Node.js is not installed!
    echo  Please download and install from: https://nodejs.org
    echo  Then re-run this script.
    pause
    exit /b 1
)
FOR /F "tokens=*" %%i IN ('node --version') DO SET NODE_VER=%%i
echo  [OK] Node.js found: %NODE_VER%

:: ─── CHECK NPM ───────────────────────────────────
echo [2/6] Checking npm...
npm --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo  [ERROR] npm not found. Reinstall Node.js from https://nodejs.org
    pause
    exit /b 1
)
FOR /F "tokens=*" %%i IN ('npm --version') DO SET NPM_VER=%%i
echo  [OK] npm found: v%NPM_VER%

:: ─── CHECK .ENV FILE ─────────────────────────────
echo [3/6] Checking backend .env file...
IF NOT EXIST "backend\.env" (
    echo  [WARN] backend\.env not found — copying from .env.example
    IF EXIST "backend\.env.example" (
        copy "backend\.env.example" "backend\.env" >nul
        echo  [OK] .env created from .env.example
        echo  [!!] IMPORTANT: Open backend\.env and fill in your real keys before using!
    ) ELSE (
        echo  [ERROR] backend\.env.example also missing. Cannot continue.
        pause
        exit /b 1
    )
) ELSE (
    echo  [OK] backend\.env found
)

:: ─── BACKEND DEPENDENCIES ────────────────────────
echo [4/6] Checking backend dependencies...
IF NOT EXIST "backend\node_modules" (
    echo  [INFO] node_modules not found — installing backend packages...
    cd backend
    npm install
    IF %ERRORLEVEL% NEQ 0 (
        echo  [ERROR] Backend npm install failed!
        pause
        exit /b 1
    )
    echo  [OK] Backend packages installed
    cd ..
) ELSE (
    echo  [OK] Backend node_modules already exists
)

:: ─── PRISMA GENERATE ─────────────────────────────
echo [5/6] Checking Prisma client...
IF NOT EXIST "backend\node_modules\.prisma\client\index.js" (
    echo  [INFO] Prisma client not generated — running prisma generate...
    cd backend
    npx prisma generate
    IF %ERRORLEVEL% NEQ 0 (
        echo  [ERROR] Prisma generate failed! Check your DATABASE_URL in .env
        pause
        exit /b 1
    )
    echo  [OK] Prisma client generated
    cd ..
) ELSE (
    echo  [OK] Prisma client already generated
)

:: ─── FRONTEND DEPENDENCIES ───────────────────────
echo [6/6] Checking frontend dependencies...
IF NOT EXIST "frontend\node_modules" (
    echo  [INFO] node_modules not found — installing frontend packages...
    cd frontend
    npm install
    IF %ERRORLEVEL% NEQ 0 (
        echo  [ERROR] Frontend npm install failed!
        pause
        exit /b 1
    )
    echo  [OK] Frontend packages installed
    cd ..
) ELSE (
    echo  [OK] Frontend node_modules already exists
)

:: ─── ALL CHECKS PASSED ───────────────────────────
echo.
echo  ================================================
echo    All checks passed! Starting Aether...
echo  ================================================
echo.
echo  Backend  →  http://localhost:3000
echo  Frontend →  http://localhost:5173
echo  Health   →  http://localhost:3000/health
echo.
echo  Press Ctrl+C in any window to stop that service.
echo  Close ALL terminal windows to stop everything.
echo.

:: ─── START BACKEND ───────────────────────────────
echo  Starting backend server...
start "AET Backend" cmd /k "cd /d %~dp0backend && echo Backend starting... && npm run dev"

:: Small delay so backend starts first
timeout /t 3 /noisy >nul

:: ─── START WORKERS ───────────────────────────────
echo  Starting Agent A worker (AI Enrichment)...
start "AET Worker - Agent A" cmd /k "cd /d %~dp0backend && npm run worker:agentA"

timeout /t 1 /noisy >nul

echo  Starting Geo-Match worker...
start "AET Worker - GeoMatch" cmd /k "cd /d %~dp0backend && npm run worker:geo"

timeout /t 1 /noisy >nul

echo  Starting Notification Schedule worker...
start "AET Worker - Schedule" cmd /k "cd /d %~dp0backend && npm run worker:schedule"

timeout /t 1 /noisy >nul

echo  Starting Notification Dispatch worker...
start "AET Worker - Dispatch" cmd /k "cd /d %~dp0backend && npm run worker:dispatch"

timeout /t 2 /noisy >nul

:: ─── START FRONTEND ──────────────────────────────
echo  Starting frontend...
start "AET Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

timeout /t 4 /noisy >nul

:: ─── OPEN BROWSER ────────────────────────────────
echo  Opening browser...
start "" "http://localhost:5173"

echo.
echo  ================================================
echo    Aether is running!
echo    6 terminal windows opened (1 per service)
echo    Close them all to stop the project.
echo  ================================================
echo.
pause
