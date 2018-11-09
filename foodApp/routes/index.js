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

router.get('/authenticate', function(req, res, next) {
    res.render('authenticate', { title: 'authenticating' });
    var url = document.URL;
    console.log(url);
});

module.exports = router;
