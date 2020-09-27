# How to run

## Setup DB creds
* Setup env: create .env from .env-example 
* npm install
* Create table : node setup.js
* start worker: node worker.js
* start server: node index.js
* Send post request with file input, example: localhost:3000/upload

## How it works
* when file is uploaded a queue is created and filename is passed as job data
* worker receives that file name and starts saving each row in database
