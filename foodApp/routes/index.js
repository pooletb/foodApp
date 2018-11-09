var express = require('express');
const fetch = require("node-fetch");
var router = express.Router();
const crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'Mfk+3P0Ee>';

/* GET home page. */
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
  res.render('home', { title: 'foodApp' });
});

router.get('/authenticate/:ptPass/:ePass', function(req, res) {
    var ptPass = req.params.ptPass;
    var ePass = req.params.ePass;

    var dPass = decrypt(ePass)

    if(ptPass === dPass) {
        res.render('home', { title: 'Home' });
    }
    else {
        res.render('registration_landing', { title: 'Register Today' });
    }
    console.log(json)
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

module.exports = router;
