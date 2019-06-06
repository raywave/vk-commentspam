@echo off
IF NOT EXIST ./config.json (RENAME "./config.example.json" "config.json")
node index.js
