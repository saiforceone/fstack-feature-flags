# Fullstack Feature Flags Tutorial
Welcome to the fullstack feature flag's tutorial starter project. This repository is intended as a starter for the related Fullstack feature flags tutorial

## Getting Started
To get the most out of this tutorial, you will need to have the following pre-requisites

- ✅ Python 3.10+
- ✅ Pipenv (or another virtual environment)
- ✅ NodeJS 20+ & NPM

*This tutorial has been tested on MacOS and Ubuntu 24.04LTS but should work on Windows*

### Setting up the backend
Navigate to the backend folder and run the following to initialize the virtual environment
```shell
pipenv shell
```
Install dependencies
```shell
pipenv install
```
Run the backend project
```shell
uvicorn app:app --port 5101 --reload
```
The API should now be available at `http://localhost:5101`

#### Note
*The `database.db` file will be created when an api route is accessed for the first time. This is normal*

### Setting up the frontend
Navigate to the frontend folder and create a `.env` file and paste the following
```shell
# Base URL for the API
VITE_API_BASE_URL="http://localhost:5101/api"
```
run the following to install dependencies
```shell
npm i
```
run the frontend project
```shell
npm run dev
```
The frontend should be available at `http://localhost:5102`