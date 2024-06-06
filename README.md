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
Set up the necessary environment variables on Heroku. ex:


```
heroku config:set VUE_APP_FIREBASE_API_KEY=your-api-key --app your-app-name
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


## What could be done next? 
* Dockerization
* All backend requests get all configs over and over => Moving to a more scalable structure.
* Responsiveness for /sign-in page and for all app tablet version. (Currently it is basically same with mobile version)
* User profile at right most part is hard coded for only visual purposes. Could be fixed.
* Animations are not used at all. Could utilize
* Sign-up and Forgot Password functionalities added.


```
heroku logs --tail --app your-app-name
```
