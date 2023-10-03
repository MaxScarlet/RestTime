@echo off
cd Backend
REM npm run run_server
start cmd /k "npm run run_server"
title Backend_proj3
timeout /t 5 /nobreak  >nul

cd ../Frontend
title Frontend_proj3
start cmd /k "npm start"
