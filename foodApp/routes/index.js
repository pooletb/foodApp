const process = require('process');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const fetch = require('node-fetch');


router.use(cors())

router.use(bodyParser.json());

const crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'Mfk+3P0Ee>';

//ROUTING INFORMATION FOLLOWS
router.get('/', function(req, res, next) {
    var username = req.cookies.username;
    console.log(username)
    if (username != undefined) {
        res.render('index', { title: 'Express' });
    } else {
        res.render('registration_landing', { title: 'Register Today' });
    }
});

router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Home' });
});

router.get('/guestportal', function(req, res, next) {
    var results;
    async function f() {
      const response = await fetch('/api/0', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(1)
      });
      results = await response.json()
    }
    var Redirect = () => {
      console.log(results);
      res.render('home', {params: {user: "Guest", db: results}, title: 'Home'});
    }
    f().then(Redirect);

});

router.get('/authenticate/:ptPass/:ePass/:username', function(req, res) {
    var ptPass = req.params.ptPass;
    var ePass = req.params.ePass;
    var username = req.params.username;

    var dPass = decrypt(ePass)

    if(ptPass === dPass) {
        async function f() {
          const response = await fetch('/api/1', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json; charset=utf-8',
              'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(1)
          });
          var results = await response.json()
        }
        res.render('home', {params: {user: username, db: results}, title: 'Home'});
    }
    else {
        res.render('registration_landing', { title: 'Register Today' });
    }
    console.log(json)
  });

//API INFORMATION FOLLOWS
const config = {
  user: 'root',
  password: 'noSQLisbetter93',
  database: 'db',
  // socketPath: `/cloudsql/foodapp-221804:us-east1:cookbook`
};

console.log(config);

const knex = require('knex')({
  client: 'mysql',
  connection: config
});

//GET THE FULL LISTS
router.post('/api/0', function(request, response){
  foodDB = {}

  knex('premade_food').select()
  .then((result) => {
    foodDB.premade_food = result;
  })

  knex('homemade_food').select()
  .then((result) => {
    foodDB.homemade_food = result;
  })

  knex('ingredients').select()
  .then((result) => {
    foodDB.ingredients = result;
  })
});

//REGISTER A NEW ACCOUNT
router.post('/api/1', function(request, response){
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
  router.post('/api/2', function(request, response){
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

module.exports = router;
