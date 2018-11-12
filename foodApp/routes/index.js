const process = require('process');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();

router.use(cors())

router.use(bodyParser.json());

//FOR CREATING AN ENCRYPTION KEY
const crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'Mfk+3P0Ee>';

//API INFORMATION FOLLOWS
const config = {
  user: 'root',
  password: 'noSQLisbetter93',
  database: 'db',
  // socketPath: `/cloudsql/foodapp-221804:us-east1:cookbook`
};

const knex = require('knex')({
  client: 'mysql',
  connection: config
});

//GETTING A FULL LIST TO POPULATE MY TABLES
premade_food = [];
premade_food_allergens = [];
pmfDBFull = []
homemade_food = [];
ingredients = [];
resultHold = [];

// knex('premade_food').select()
// .then((result) => {
//   console.log(result);
//   premade_food = result;
// })

knex.from('premade_food').innerJoin('made_by', 'premade_food.food_ID', 'made_by.food_ID')
.then((result) => {
  premade_food = result;
})
.then(() => {
  for(var i = 0; i < premade_food.length; i++) {
    var pmf = {}
    pmf.food_ID = premade_food[i].food_ID;
    pmf.food_name = premade_food[i].food_name
    pmf.serving_size = premade_food[i].serving_size
    pmf.servings = premade_food[i].servings
    pmf.calories = premade_food[i].calories
    pmf.fat_calories = premade_food[i].fat_calories
    pmf.sat_fat = premade_food[i].sat_fat
    pmf.trans_fat = premade_food[i].trans_fat
    pmf.total_fat = premade_food[i].total_fat
    pmf.cholesterol = premade_food[i].cholesterol
    pmf.sodium = premade_food[i].sodium
    pmf.diet_fiber = premade_food[i].diet_fiber
    pmf.sugars = premade_food[i].sugars
    pmf.total_carbs = premade_food[i].total_carbs
    pmf.protein = premade_food[i].protein
    pmf.category = premade_food[i].category
    pmf.manufacturer_name = premade_food[i].manufacturer_name
    pmf.containsAllergens = []
    pmfDBFull.push(pmf)
  }
})
.then(() => {
  knex.from('premade_food').innerJoin('made_by', 'premade_food.food_ID', 'made_by.food_ID')
  .rightJoin('premade_contains', 'made_by.food_ID', 'premade_contains.food_ID')
  .then((result) => {
    premade_food_allergens = result;
  })
  .then(() => {
    for(var i = 0; i < premade_food_allergens.length; i++) {
      var index = IndexOf(premade_food_allergens.food_ID,pmfDBFull)
      console.log(pmfDBFull[i])
      console.log(index);
      pmfDBFull[index].containsAllergens.push(premade_food_allergens[i].allergen_name)
    }
    console.log(pmfDBFull);
  })
})


function IndexOf(id, db) {
  for(var i = 0; i < db.length; i++) {
    if(db[i].food_ID == id) {
      return i
    }
  }
  return false;
}




knex('homemade_food').select()
.then((result) => {
  homemade_food = result;
})

knex('ingredients').select()
.then((result) => {
  ingredients = result;
})



//ROUTING INFORMATION FOLLOWS
router.get('/', function(req, res, next) {
    var username = req.cookies.username;
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
  console.log(this.premade_food);
  res.render('home', {params: {user: "Guest", pmDB: this.premade_food, hfDB: this.homemade_food, iDB: this.ingredients}, title: 'Home'});
});

router.get('/authenticate/:ptPass/:ePass/:username', function(req, res) {
    var ptPass = req.params.ptPass;
    var ePass = req.params.ePass;
    var username = req.params.username;

    var dPass = decrypt(ePass)

    if(ptPass === dPass) {
      res.render('home', {params: {user: username, pmDB: this.premade_food, hfDB: this.homemade_food, iDB: this.ingredients}, title: 'Home'});
    }
    else {
        res.render('registration_landing', { title: 'Register Today' });
    }
    console.log(json)
  });

//DEPRECATED FOR NOW
router.get('/api/0', function(request, response){
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
