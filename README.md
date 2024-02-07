# Contact List

## Overview
- Simple full stack application that allows users to read contacts from a database.
- The frontend is a React app which displays the contacts.
- The backend is a .NET Core API which provides the contacts to the frontend.
- The database is a Postgres database which stores the contacts.
- Two database contexts are provided
  - One to mimic production data 
  - One to mimic test data
  - They are available via containerized database artifacts mounted at build time.

## Installation

### Prerequisites
- NodeJs
- Docker
- .NET 8.0
- Oras Client
- Playwright

### Run Locally
- Clone the repository
- Enter the build/local directory
- Run `./build_and_deploy.sh`
  - Note: if you are trying to run this on x86 architecture the dotnet publish command will need to be modified slightly
- Navigate to http://localhost:3000
- The containers will run until `docker-compose down` is run in the build/local directory

### Run Tests
- Clone the repository
- Enter the build/test directory
- Run `./build_and_test.sh`
  - Note: if you are trying to run this on x86 architecture the dotnet publish command will need to be modified slightly
- See test results in console

