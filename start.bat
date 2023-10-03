@echo off
cd Backend
REM npm run run_server
start cmd /k "npm run run_server"

timeout /t 5 /nobreak  >nul

cd ../Frontend
start cmd /k "npm start"
