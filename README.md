# Codeway - Config Management Panel
## Overview
Config Management Panel using Node, Vue. 
<br/>Can access deployed version from https://codeway-case-af79687c12c6.herokuapp.com/#/
<br/>For demonstration purposes there is only one user
```
email: emresafter@gmail.com
password: 123456
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

5. Configure Environment Variables
Set up the necessary environment variables on Heroku.


```
heroku config:set VUE_APP_FIREBASE_API_KEY=your-api-key --app your-app-name
heroku config:set VUE_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain --app your-app-name
heroku config:set VUE_APP_FIREBASE_PROJECT_ID=your-project-id --app your-app-name
heroku config:set VUE_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket --app your-app-name
heroku config:set VUE_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id --app your-app-name
heroku config:set VUE_APP_FIREBASE_APP_ID=your-app-id --app your-app-name
heroku config:set VUE_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id --app your-app-name
heroku config:set PORT=3000 --app your-app-name
```
6. Add Heroku Remote

```
git remote add heroku https://git.heroku.com/your-app-name.git
```
7. Deploy to Heroku

```
git push heroku main
```
8. Open Your Application

```
heroku open --app your-app-name
```
9. Monitor Logs
Monitor the Heroku logs to ensure everything is working correctly.


```
heroku logs --tail --app your-app-name
```
