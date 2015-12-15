@echo off

TITLE Database Server
REM Set path to your MongoDB install 
SET mongoPath=D:\Programme\MongoDB\

start %mongoPath%\bin\mongod --dbpath %~dp0\import\database