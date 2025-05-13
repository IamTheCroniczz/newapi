@echo off
if not exist ".\tarefa-db" mkdir ".\tarefa-db"
"C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --dbpath .\tarefa-db
