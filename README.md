# xcnt-cashcog-be

```
This project accesses a stream API, save the response in a MySQL database and then provides some GraphQL APIs 
```

## Create Database (on mysql)
Create a database with name xcnt
```
CREATE DATABASE xcnt;  
```
In src/app.ts and in src/stream/cashcog.event.stream.api.js.. Provide your database credentials

## Project setup
```
npm install
```

### Consuming the stream API
```
npm run stream
```

### Run the app
```
npm start
```
Application will be on http://localhost:3000/graphql

### To Run both (Consuming Stream API and Run the app) in a single command
```
npm run all
```
