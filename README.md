# ChatOn-Chat App in Angular
 A chat app created using Angular and Firebase. The app also uses Bootstrap for styling. The data is stored in the Firebase real-time database. The app also uses Firebase authentication.

## Features

 - SignUp Page
 - Login Page
 - Realtime one-to-one messaging between registered users
 - User registration using email 
 - Display of user status

## Execution Instructions

 - Download the repository
 - Install NodeJS and AngularCLI
 - Open the terminal and cd into the app repository
 - Run the following commands
```python
npm install
npm install bootstrap
npm install @angular/fire
npm install firebase
```
 - Create a Firebase account and create a new Firebase project
 - Add your Firebase configuration to src/environments/enviroment.ts
 - In the terminal run the following command
```python
ng serve
```

##Future Additions

 - Signin and signup using Google,Facebook etc.
 - Forgot password option and password recovery using email
 - Implementation of group chat
 - Make a user account private or public restricting messaging to a private user
