# Codeway - Config Management Panel

## What is added & fixed
* Serve API added
* Country Specific Value add feature added
* World Map Tab added to see country specific configs easily
* Redis added to work robust under high load
* Prevent Overwrite upon update feature enhanced to make it faster
* User profile dummy values fixed
* Can't see configs without sign in
* Overall responsiveness fixed
* Config Model and Config Repository added to have robust database backend relation

## Overview
Config Management Panel using Node, Vue. 
<br/>Can access deployed version from https://codeway-case-af79687c12c6.herokuapp.com/#/
<br/>For demonstration purposes there is only one user
```
email: emresafter@gmail.com
password: 123456
```


Serve Configs for mobile clients 
```
curl --location 'https://codeway-case-af79687c12c6.herokuapp.com/api/serve' \
--header 'api-token: lovethisgame'
```

Serve Config Specific to Country 
```
curl --location 'https://codeway-case-af79687c12c6.herokuapp.com/api/serve?country={countryCode}' \
--header 'api-token: lovethisgame'
```

## Executing Locally
1. Clone the Repository
```
git clone https://github.com/your-repo/your-project.git
cd your-project
```
2. Install Dependencies
Install dependencies for both frontend and backend.
```
cd frontend
yarn install
cd ../backend
yarn install
cd ..
```
3. Create a .env File
Create a .env file in both backend adn frontend directories and populate them with your credentials as examples provided in both directories.

4. Build Frontend
Build the frontend to generate static files.

```
cd frontend
yarn run build
cd ..
```
5. Run Backend Server
Start the backend server.

```
cd backend
yarn start
```
6. Access the Application
Open your browser and navigate to http://localhost:3000.

## Deploying to Heroku
1. Create a Heroku Account and Install the Heroku CLI
If you haven't already, create a Heroku account and install the Heroku CLI.
2. Login to Heroku

```
heroku login
```
3. Create a Heroku App

```
heroku create your-app-name
```
4. Add Buildpacks

```
heroku buildpacks:set heroku/nodejs --app your-app-name
```
5. Add Redis Addon
```
heroku addons:create heroku-redis:hobby-dev --app your-app-name
```

6. Configure Environment Variables
Set up the necessary environment variables on Heroku. ex:


```
heroku config:set VUE_APP_FIREBASE_API_KEY=your-api-key --app your-app-name
```
7. Add Heroku Remote

```
git remote add heroku https://git.heroku.com/your-app-name.git
```
8. Deploy to Heroku

```
git push heroku main
```
9. Open Your Application

```
heroku open --app your-app-name
```
19. Monitor Logs
Monitor the Heroku logs to ensure everything is working correctly.


```
heroku logs --tail --app your-app-name
```

