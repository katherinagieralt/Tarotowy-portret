@echo off
REM Docker Quick Start Script for Tarotowy Portret (Windows)
REM This script automates the 3-step Docker setup

setlocal enabledelayedexpansion

echo.
echo ════════════════════════════════════════════════════════════════
echo          Tarotowy Portret - Docker Quick Start (Windows)
echo    Next.js 16 + React 19 + Tailwind CSS + Prisma + Piny
echo ════════════════════════════════════════════════════════════════
echo.

REM Step 1: Prepare Environment
echo [STEP 1] Preparing Environment...
echo.

if not exist ".env.docker" (
    echo ERROR: .env.docker not found
    echo Please ensure .env.docker exists in project root
    pause
    exit /b 1
)

if not exist ".env" (
    echo WARNING: .env not found, creating from .env.docker...
    copy .env.docker .env >nul
    echo SUCCESS: .env created
) else (
    echo SUCCESS: .env already exists
)

REM Verify required files
setlocal enabledelayedexpansion
set "files=Dockerfile.dev" "docker-compose.yml" ".dockerignore" "prisma\schema.prisma"
for %%F in (%files%) do (
    if exist "%%F" (
        echo SUCCESS: %%F found
    ) else (
        echo ERROR: %%F not found
        pause
        exit /b 1
    )
)

echo.
echo SUCCESS: All required files present!

REM Step 2: Start Services
echo.
echo [STEP 2] Starting Docker Services...
echo.

REM Check if Docker is installed
where docker >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Docker not found! Please install Docker Desktop for Windows.
    echo Visit: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

where docker-compose >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: docker-compose not found!
    echo Please ensure Docker Desktop is properly installed.
    pause
    exit /b 1
)

echo WARNING: Building images and starting services...
echo WARNING: This may take 1-2 minutes on first run...
echo.

docker compose up --build -d

if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to start services
    pause
    exit /b 1
)

echo SUCCESS: All services started!

REM Step 3: Verify Services
echo.
echo [STEP 3] Verifying Services...
echo.

echo WARNING: Waiting for services to be healthy (30 seconds)...

setlocal enabledelayedexpansion
set /a counter=0
:wait_db
if !counter! geq 30 (
    echo WARNING: Timeout waiting for PostgreSQL
    goto check_nextjs
)

docker compose exec -T postgres pg_isready -U postgres >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo SUCCESS: PostgreSQL is ready!
    goto check_nextjs
)

echo -n "."
set /a counter+=1
timeout /t 1 /nobreak >nul
goto wait_db

:check_nextjs
timeout /t 5 /nobreak >nul

docker compose ps | find "tarot-nextjs" | find "Up" >nul
if %ERRORLEVEL% EQU 0 (
    echo SUCCESS: Next.js is running!
) else (
    echo ERROR: Next.js is not running
    echo.
    echo Recent logs:
    docker compose logs nextjs
    pause
    exit /b 1
)

echo.
echo SUCCESS: All services are running!

REM Display service information
echo.
echo ════════════════════════════════════════════════════════════════
echo                    SUCCESS: Setup Complete!
echo ════════════════════════════════════════════════════════════════
echo.

echo IMPORTANT: Service URLs:
echo   * Next.js Application:    http://localhost:3000
echo   * Adminer (Database UI):  http://localhost:8080
echo   * PostgreSQL:             localhost:5432
echo.

echo Useful Commands:
echo   * View logs:              docker compose logs -f nextjs
echo   * Open database shell:    docker compose exec postgres psql -U postgres
echo   * Prisma Studio:          docker compose exec nextjs npx prisma studio
echo   * Stop services:          docker compose down
echo   * Restart services:       docker compose restart
echo.

echo Piny Integration:
echo   * Open any .tsx file in VS Code
echo   * Right-click and select "Edit in Piny"
echo   * Hot-reload works automatically!
echo.

echo Documentation:
echo   See DOCKER_SETUP.md for complete guide
echo.

echo SUCCESS: Docker setup complete! Happy coding!
echo.

REM Open services in browser (Windows)
timeout /t 3 /nobreak >nul
start http://localhost:3000
timeout /t 1 /nobreak >nul
start http://localhost:8080

pause
