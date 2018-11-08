'use strict';
const process = require('process');

const express = require('express')
const bodyParser = require('body-parser');
const Knex = require('knex');
const crypto = require('crypto');
const cors = require('cors')
const JSON = require('circular-json');

const app = express();

app.use(cors())

app.use(bodyParser.json());

app.enable('trust proxy');

app.post('/api/1', function(request, response){
  console.log(request.body);

  var jsonRequest = request.body;
  var jsonResponse = {};

  jsonResponse.result = jsonRequest.id;

  response.send(jsonResponse);
});

const PORT = process.env.PORT || 52170;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;
