'use strict';
const process = require('process');

const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const JSON = require('circular-json');
const app = express();
const crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'Mfk+3P0Ee>';
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
  .then((result) => {
    if(result[0] === undefined) {
      console.error(`Failed login attempt`, err);
      response.send(json);
    }
    else if(result[0] != undefined && result[0] != null) {
      console.log(`User exists, allow login`);
      var randomPass = randomPassword(50);
      var encryptedPass = encrypt(randomPass);
      json.result = 0;  
      json.ptPass = randomPass
      json.ePass = encryptedPass
      response.send(json);
    }
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

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

function randomPassword(length) {
  var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP1234567890";
  var pass = "";
  for (var x = 0; x < length; x++) {
      var i = Math.floor(Math.random() * chars.length);
      pass += chars.charAt(i);
  }
  return pass;
}

module.exports = app;
