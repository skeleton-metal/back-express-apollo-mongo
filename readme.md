# Skeleton Backend
This is a base project for a fast start in the development of a Single Page Application based on nodejs, graphql and mongodb.

This project have his counterpart with a frontend project.
Frontend repo: https://github.com/skeleton-metal/apollo-client-vue-vuetify2.git

### Dependencies & Technologies
- Nodejs 
- Graphql 
- Express 
- Apollo Server
- MongoDB (Mongoose)

### Features
- Register with email confirmation
- Login
- Password Recovery with email validation
- Change Password
- Avatar and Change Avatar
- User CRUD for admin with validations
- Logger (Request, Operations, Errors)

## Project setup
```
npm install
```

## Config enviroment
See vars on .env file

## Init data
Initialize Roles and One admin user.  
_Working in progress..._

### Compiles and hot-reloads for development
```
npm run start
```

### Compiles for production
_Working in progress..._

#### Using pm2
```
pm2 start index.js
```