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

app.post('/api/1', function(request, response){
  console.log(request.body);
  var credentials = request.body;
  var json = {};
  console.log(credentials.username, credentials.password);
  knex('user').insert([{username: credentials.username, pass: credentials.password}])
  .then(() => {
    console.log(`Successfully created user`);
    json.result = 0;
  })
  .catch((err) => {
    console.error(`User already exists`, err);
    json.result = 1;
  });
  response.send(json);
});

const PORT = process.env.PORT || 52170;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;
