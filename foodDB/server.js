'use strict';
const process = require('process');

const express = require('express')
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors')
const JSON = require('circular-json');
const app = express();
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : 'noSQLisbetter93',
    database : 'db'
  }
});

app.use(cors())

app.use(bodyParser.json());

app.enable('trust proxy');

//REGISTERING A NEW ACCOUNT
app.post('/api/1', function(request, response){
  console.log(request.body);
  var credentials = request.body;
  var json = {};
  
  console.log(credentials.username, credentials.password);
  knex('user').insert([{username: credentials.username, pass: credentials.password}])
  .then(() => {
    console.log(`Successfully created user`);
    json.result = 0;
    response.send(json);
  })
  .catch((err) => {
    console.error(`User already exists`, err);
    response.send(json);
  });
});

//LOG INTO AN EXISTING ACCOUNT
app.post('/api/2', function(request, response){
  console.log(request.body);
  var credentials = request.body;
  var json = {};
  console.log(credentials.username, credentials.password);
  knex('user').where({
    username: credentials.username,
    pass:  credentials.password
  }).select()
  .then(() => {
    console.log(`User exists, allow login`);
    json.result = 0;
    response.send(json);
  })
  .catch((err) => {
    console.error(`Failed login attempt`, err);
    response.send(json);
  });
});

const PORT = process.env.PORT || 52170;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;
