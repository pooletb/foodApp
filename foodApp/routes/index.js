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
homemade_food_ingredients = [];
homemade_food_allergens = [];
hmfDBFull = []

ingredients = [];
resultHold = [];

categories = [];
allergens = [];
manufacturers = []

knex.from('premade_food').innerJoin('made_by', 'premade_food.food_ID', 'made_by.food_ID')
  .then((result) => {
    premade_food = result;
  })
  .then(() => {
    for (var i = 0; i < premade_food.length; i++) {
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
        for (var i = 0; i < premade_food_allergens.length; i++) {
          var index = IndexOf(premade_food_allergens[i].food_ID, pmfDBFull)
          pmfDBFull[index].containsAllergens.push(premade_food_allergens[i].allergen_name)
        }
      }).then(() => {
        for (var i = 0; i < pmfDBFull.length; i++) {
          if (categories.includes(pmfDBFull[i].category)) {

          }
          else {
            categories.push(pmfDBFull[i].category)
          }
        }
      })
  })

knex.from('homemade_food')
  .then((result) => {
    homemade_food = result;
  })
  .then(() => {
    for (var i = 0; i < homemade_food.length; i++) {
      var pmf = {}
      pmf.food_ID = homemade_food[i].food_ID;
      pmf.food_name = homemade_food[i].food_name
      pmf.serving_size = homemade_food[i].serving_size
      pmf.servings = homemade_food[i].servings
      pmf.calories = homemade_food[i].calories
      pmf.fat_calories = homemade_food[i].fat_calories
      pmf.sat_fat = homemade_food[i].sat_fat
      pmf.trans_fat = homemade_food[i].trans_fat
      pmf.total_fat = homemade_food[i].total_fat
      pmf.cholesterol = homemade_food[i].cholesterol
      pmf.sodium = homemade_food[i].sodium
      pmf.diet_fiber = homemade_food[i].diet_fiber
      pmf.sugars = homemade_food[i].sugars
      pmf.total_carbs = homemade_food[i].total_carbs
      pmf.protein = homemade_food[i].protein
      pmf.category = homemade_food[i].category
      pmf.containsAllergens = []
      pmf.ingredients = []
      hmfDBFull.push(pmf)
    }
  })
  .then(() => {
    knex.from('homemade_food').innerJoin('made_with', 'homemade_food.food_ID', 'made_with.food_ID')
      .innerJoin('ingredients', 'made_with.ingredient_ID', 'ingredients.ingredient_ID')
      .then((result) => {
        homemade_food_ingredients = result;
      })
      .then(() => {
        for (var i = 0; i < homemade_food_ingredients.length; i++) {
          var ingredient = {}
          ingredient.ingredient_name = homemade_food_ingredients[i].ingredient_name
          ingredient.measurement = homemade_food_ingredients[i].measurement
          ingredient.category = homemade_food_ingredients[i].category
          var index = IndexOf(homemade_food_ingredients[i].food_ID, hmfDBFull)
          hmfDBFull[index].ingredients.push(ingredient)
        }
      })
  })
  .then(() => {
    knex.from('homemade_food').rightJoin('homemade_contains', 'homemade_food.food_ID', 'homemade_contains.food_ID')
      .then((result) => {
        homemade_food_allergens = result;
      })
      .then(() => {
        for (var i = 0; i < homemade_food_allergens.length; i++) {
          var index = IndexOf(homemade_food_allergens[i].food_ID, hmfDBFull)
          hmfDBFull[index].containsAllergens.push(homemade_food_allergens[i].allergen_name)
        }
      }).then(() => {
        for (var i = 0; i < hmfDBFull.length; i++) {
          if (categories.includes(hmfDBFull[i].category)) {

          }
          else {
            categories.push(hmfDBFull[i].category)
          }
        }
      })
  })

knex.from('allergens')
  .then((result) => {
    allergens = result;
  })

knex('ingredients').select()
  .then((result) => {
    ingredients = result;
  })

knex('manufacturers').select()
  .then((result) => {
    manufacturers = result;
  })



//ROUTING INFORMATION FOLLOWS
router.get('/', function (req, res, next) {
  var username = req.cookies.username;
  if (username != undefined) {
    res.render('index', { title: 'Express' });
  } else {
    res.render('registration_landing', { title: 'Register Today' });
  }
});

router.get('/home', function (req, res, next) {
  res.render('home', { title: 'Home' });
});

router.get('/authenticate/:ptPass/:ePass/:username/:eUser', function (req, res) {
  var ptPass = req.params.ptPass;
  var ePass = req.params.ePass;
  var username = req.params.username;
  var eUser = req.params.eUser

  var dPass = decrypt(ePass)
  var dUser = decrypt(eUser)

  if (ptPass === dPass && username === dUser) {
    console.log(getInfo(username));
    res.render('home', { params: { user: username, pmDB: this.pmfDBFull, hfDB: this.hmfDBFull, iDB: this.ingredients, cat: this.categories, all: this.allergens, man: this.manufacturers, userSaved: getInfo(username) }, title: 'Home' });
  }
  else {
    res.render('registration_landing', { title: 'Register Today' });
  }
});

//DEPRECATED FOR NOW
router.get('/api/0', function (request, response) {
});

//REGISTER A NEW ACCOUNT
router.post('/api/1', function (request, response) {
  console.log(request.body);
  var credentials = request.body;
  var json = {};

  console.log(credentials.username, credentials.password);
  knex('user').insert([{ username: credentials.username, pass: credentials.password }])
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
router.post('/api/2', function (request, response) {
  console.log(request.body);
  var credentials = request.body;
  var json = {};
  console.log(credentials.username, credentials.password);
  knex('user').where({
    username: credentials.username,
    pass: credentials.password
  }).select()
    .then((result) => {
      if (result[0] === undefined) {
        console.error(`Failed login attempt`, err);
        response.send(json);
      }
      else if (result[0] != undefined && result[0] != null) {
        console.log(`User exists, allow login`);
        var randomPass = randomPassword(50);
        var encryptedPass = encrypt(randomPass);
        var encryptedUser = encrypt(credentials.username);
        json.result = 0;
        json.ptPass = randomPass
        json.ePass = encryptedPass
        json.eUser = encryptedUser
        response.send(json);
      }
    })
    .catch((err) => {
      console.error(`Failed login attempt`, err);
      response.send(json);
    });
});

//SEND PREMADE INFO
router.post('/api/3', function (request, response) {
  json = {}
  json.db1 = this.pmfDBFull
  json.db2 = this.hmfDBFull
  response.send(json);
});

function getInfo(user) {
  var premade_likes = []
  var premade_fav = []
  var homemade_fav = []
  var homemade_likes = []

  async function a() {
    knex('premade_likes').where({
      username: user,
    }).select().innerJoin('premade_food', 'premade_food.food_ID', 'premade_likes.food_ID')
      .then((result) => {
        return result
      })
  }

  async function b() {
    knex('homemade_likes').where({
      username: user,
    }).select().innerJoin('homemade_food', 'homemade_food.food_ID', 'homemade_likes.food_ID')
      .then((result) => {
        return result
      })
  }


  async function c() {
    knex('premade_fav').where({
      username: user,
    }).select().innerJoin('premade_food', 'premade_food.food_ID', 'premade_fav.food_ID')
      .then((result) => {
        return result
      })
  }
  async function d() {
    knex('homemade_fav').where({
      username: user,
    }).select().innerJoin('homemade_food', 'homemade_food.food_ID', 'homemade_fav.food_ID')
      .then((result) => {
        return result
      })
  }
  premade_likes = await a();
  homemade_likes = await b();
  premade_fav = await c();
  homemade_fav = await d()
  console.log(premade_likes, homemade_likes, premade_fav, homemade_fav)
  return (premade_likes, homemade_likes, premade_fav, homemade_fav)
}


router.post('/api/5', function (request, response) {
  var info = request.body;
  var json = {};
  if (info.num == 1) {
    knex('premade_likes').insert([{ username: info.username, food_ID: info.food_ID }])
      .then(() => {
        json.res = 'ok';
        response.send(json)
      })
      .catch((err) => {
        json.res = 'o no';
        response.send(json);
      });
  }
  else if (info.num == 2) {
    knex('homemade_likes').insert([{ username: info.username, food_ID: info.food_ID }])
      .then(() => {
        json.res = 'ok';
        response.send(json)
      })
      .catch((err) => {
        json.res = 'o no';
        response.send(json);
      });
  }
  if (info.num == 3) {
    knex('premade_fav').insert([{ username: info.username, food_ID: info.food_ID }])
      .then(() => {
        json.res = 'ok';
        response.send(json)
      })
      .catch((err) => {
        json.res = 'o no';
        response.send(json);
      });
  }
  if (info.num == 4) {
    knex('homemade_fav').insert([{ username: info.username, food_ID: info.food_ID }])
      .then(() => {
        json.res = 'ok';
        response.send(json)
      })
      .catch((err) => {
        json.res = 'o no';
        response.send(json);
      });
  }
});


function IndexOf(id, db) {
  for (var i = 0; i < db.length; i++) {
    if (db[i].food_ID == id) {
      return i
    }
  }
  return false;
}

function encrypt(text) {
  var cipher = crypto.createCipher(algorithm, password)
  var crypted = cipher.update(text, 'utf8', 'hex')
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text) {
  var decipher = crypto.createDecipher(algorithm, password)
  var dec = decipher.update(text, 'hex', 'utf8')
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
