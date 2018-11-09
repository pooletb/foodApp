var express = require('express');
var router = express.Router();

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

router.get('/authenticate/:username/:pass', function(req, res) {
    json = {}
    json.username = req.params.username;
    json.password = req.params.pass;
    console.log(json)
    async function f() {
        const response = await fetch('http://localhost:52170/api/2', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(json)
        });
        var results = await response.json()
        if(results.result === undefined) {
          console.log("authentication failed")
          res.render('registration_landing', { title: 'Register Today' });
        }
        else {
          console.log("authenticated");
          res.cookie("user",json.username)
          res.render('home', { title: 'foodApp' }, {userInfo: {username: json.username}});
        }
      }
    console.log(req.body)
  });

module.exports = router;
