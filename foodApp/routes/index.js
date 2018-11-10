const process = require('process');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const app = express();

app.use(cors())

app.use(bodyParser.json());

app.enable('trust proxy');

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
    res.render('home', {params: {user: "Guest"}, title: 'Home'});
});

router.get('/authenticate/:ptPass/:ePass/:username', function(req, res) {
    var ptPass = req.params.ptPass;
    var ePass = req.params.ePass;
    var username = req.params.username;

    var dPass = decrypt(ePass)

    if(ptPass === dPass) {
        res.render('home', {params: {user: username}, title: 'Home'});
    }
    else {
        res.render('registration_landing', { title: 'Register Today' });
    }
    console.log(json)
  });

//API INFORMATION FOLLOWS
const knex = require('knex')({
  client: 'mysql',
  connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'noSQLisbetter93',
      database : 'db'
  }
});

const config = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE
};

if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
  config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
}
//REGISTER A NEW ACCOUNT
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
  
  const PORT = 52170;
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

module.exports = router;
