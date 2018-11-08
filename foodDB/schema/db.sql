CREATE TABLE premade_food (
  food_ID int NOT NULL PRIMARY KEY UNIQUE,
  food_name varchar(25) NOT NULL,
  serving_size int NOT NULL,
  servings decimal(12,6) NOT NULL,
  calories decimal(12,6) NOT NULL,
  fat_calories decimal(12,6) NOT NULL,
  sat_fat decimal(12,6) NOT NULL,
  trans_fat decimal(12,6) NOT NULL,
  total_fat decimal(12,6) NOT NULL,
  cholesterol decimal(12,6) NOT NULL,
  sodium decimal(12,6) NOT NULL,
  diet_fiber decimal(12,6) NOT NULL,
  sugars decimal(12,6) NOT NULL,
  total_carbs decimal(12,6) NOT NULL,
  protein decimal(12,6) NOT NULL,
  category varchar(25) NOT NULL,
  CHECK (food_ID >= 0),
  CHECK (serving_size >= 0),
  CHECK (servings >= 0),
  CHECK (calories >= 0),
  CHECK (fat_calories >= 0),
  CHECK (sat_fat >= 0),
  CHECK (trans_fat >= 0),
  CHECK (total_fat >= 0),
  CHECK (cholesterol >= 0),
  CHECK (sodium >= 0),
  CHECK (diet_fiber >= 0),
  CHECK (sugars >= 0),
  CHECK (total_carbs >= 0),
  CHECK (protein >= 0)
);

CREATE TABLE manufacturers (
  manufacturer_name varchar(25) NOT NULL PRIMARY KEY UNIQUE
);

CREATE TABLE made_by (
  food_ID int NOT NULL UNIQUE,
  manufacturer_name varchar(25) NOT NULL,
  CHECK (food_ID >= 0),
  FOREIGN KEY (food_id) REFERENCES premade_food (food_id),
  FOREIGN KEY (manufacturer_name) REFERENCES manufacturers (manufacturer_name)
);

CREATE TABLE allergens (
  allergen_name varchar(25) NOT NULL PRIMARY KEY UNIQUE
);

CREATE TABLE premade_contains (
  food_ID int NOT NULL,
  allergen_name varchar(25) NOT NULL,
  FOREIGN KEY (food_id) REFERENCES premade_food (food_id),
  FOREIGN KEY (allergen_name) REFERENCES allergens (allergen_name),
  CHECK (food_ID >= 0)
);

CREATE TABLE ingredients (
  ingredient_ID int NOT NULL PRIMARY KEY UNIQUE,
  ingredient_name varchar(25) NOT NULL,
  calories_i decimal(12,6) NOT NULL,
  fat_calories_i decimal(12,6) NOT NULL,
  sat_fat_i decimal(12,6) NOT NULL,
  trans_fat_i decimal(12,6) NOT NULL,
  total_fat_i decimal(12,6) NOT NULL,
  cholesterol_i decimal(12,6) NOT NULL,
  sodium_i decimal(12,6) NOT NULL,
  diet_fiber_i decimal(12,6) NOT NULL,
  sugars_i decimal(12,6) NOT NULL,
  total_carbs_i decimal(12,6) NOT NULL,
  protein_i decimal(12,6) NOT NULL,
  category_i varchar(25) NOT NULL,
  CHECK (serving_size >= 0),
  CHECK (servings >= 0),
  CHECK (calories >= 0),
  CHECK (fat_calories >= 0),
  CHECK (sat_fat >= 0),
  CHECK (trans_fat >= 0),
  CHECK (total_fat >= 0),
  CHECK (cholesterol >= 0),
  CHECK (sodium >= 0),
  CHECK (diet_fiber >= 0),
  CHECK (sugars >= 0),
  CHECK (total_carbs >= 0),
  CHECK (protein >= 0)
);

CREATE TABLE measurements (
  measurement decimal(12,6) NOT NULL PRIMARY KEY UNIQUE,
  CHECK (measurement >= 0)
);

CREATE TABLE homemade_food (
  food_ID int NOT NULL PRIMARY KEY UNIQUE,
  food_name varchar(25) NOT NULL,
  serving_size int NOT NULL,
  servings int NOT NULL,
  calories decimal(12,6),
  fat_calories decimal(12,6),
  sat_fat decimal(12,6),
  trans_fat decimal(12,6),
  total_fat decimal(12,6),
  cholesterol decimal(12,6),
  sodium decimal(12,6),
  diet_fiber decimal(12,6),
  sugars decimal(12,6),
  total_carbs decimal(12,6),
  protein decimal(12,6),
  category varchar(25) NOT NULL,
  CHECK (food_ID >= 0),
  CHECK (serving_size >= 0),
  CHECK (servings >= 0),
  CHECK (calories >= 0),
  CHECK (fat_calories >= 0),
  CHECK (sat_fat >= 0),
  CHECK (trans_fat >= 0),
  CHECK (total_fat >= 0),
  CHECK (cholesterol >= 0),
  CHECK (sodium >= 0),
  CHECK (diet_fiber >= 0),
  CHECK (sugars >= 0),
  CHECK (total_carbs >= 0),
  CHECK (protein >= 0)
);

CREATE TABLE homemade_contains (
  food_ID int NOT NULL,
  allergen_name varchar(25) NOT NULL,
  FOREIGN KEY (food_id) REFERENCES homemade_food (food_id),
  FOREIGN KEY (allergen_name) REFERENCES allergens (allergen_name),
  CHECK (food_ID >= 0)
);

CREATE TABLE made_with (
  food_ID int NOT NULL,
  ingredient_ID int NOT NULL,
  measurement decimal(12,6) NOT NULL,
  CHECK (food_ID >= 0),
  CHECK (ingredient_ID >= 0),
  CHECK (measurement >= 0),
  FOREIGN KEY (food_id) REFERENCES homemade_food (food_id),
  FOREIGN KEY (ingredient_ID) REFERENCES ingredients (ingredient_ID),
  FOREIGN KEY (measurement) REFERENCES measurements (measurement)
);

CREATE TABLE user (
  username varchar(25) NOT NULL UNIQUE,
  pass varchar(25) NOT NULL
);

CREATE TABLE premade_likes (
  username varchar(25) NOT NULL,
  food_ID int NOT NULL,
  CHECK (food_ID >= 0),
  FOREIGN KEY (username) REFERENCES user (username),
  FOREIGN KEY (food_ID) REFERENCES premade_food (food_ID)
);

CREATE TABLE homemade_likes (
  username varchar(25) NOT NULL,
  food_ID int NOT NULL,
  CHECK (food_ID >= 0),
  FOREIGN KEY (username) REFERENCES user (username),
  FOREIGN KEY (food_ID) REFERENCES homemade_food (food_ID)
);

CREATE TABLE premade_fav (
  username varchar(25) NOT NULL UNIQUE,
  food_ID int NOT NULL,
  CHECK (food_ID >= 0),
  FOREIGN KEY (username) REFERENCES user (username),
  FOREIGN KEY (food_ID) REFERENCES premade_food (food_ID)
);

CREATE TABLE homemade_fav (
  username varchar(25) NOT NULL UNIQUE,
  food_ID int NOT NULL,
  CHECK (food_ID >= 0),
  FOREIGN KEY (username) REFERENCES user (username),
  FOREIGN KEY (food_ID) REFERENCES homemade_food (food_ID)
);

CREATE TRIGGER nutrition_calc_cals
AFTER INSERT ON made_with
FOR EACH ROW
    UPDATE homemade_food SET calories = (SELECT SUM(calories_i) FROM (SELECT view1.food_ID, ingredients.calories_i
    FROM homemade_food AS view1
    RIGHT JOIN made_with ON view1.food_ID = made_with.food_ID
    RIGHT JOIN ingredients ON made_with.ingredient_ID = ingredients.ingredient_ID)
    AS cals
    WHERE food_ID = homemade_food.food_ID)
WHERE food_ID = homemade_food.food_ID;

CREATE TRIGGER nutrition_calc_fat_cals
AFTER INSERT ON made_with
FOR EACH ROW
    UPDATE homemade_food SET fat_calories = (SELECT SUM(fat_calories_i) FROM (SELECT view1.food_ID, ingredients.fat_calories_i
    FROM homemade_food AS view1
    RIGHT JOIN made_with ON view1.food_ID = made_with.food_ID
    RIGHT JOIN ingredients ON made_with.ingredient_ID = ingredients.ingredient_ID)
    AS cals
    WHERE food_ID = homemade_food.food_ID)
WHERE food_ID = homemade_food.food_ID;

CREATE TRIGGER nutrition_calc_sat_fat
AFTER INSERT ON made_with
FOR EACH ROW
    UPDATE homemade_food SET sat_fat = (SELECT SUM(sat_fat_i) FROM (SELECT view1.food_ID, ingredients.sat_fat_i
    FROM homemade_food AS view1
    RIGHT JOIN made_with ON view1.food_ID = made_with.food_ID
    RIGHT JOIN ingredients ON made_with.ingredient_ID = ingredients.ingredient_ID)
    AS cals
    WHERE food_ID = homemade_food.food_ID)
WHERE food_ID = homemade_food.food_ID;

CREATE TRIGGER nutrition_calc_trans_fat
AFTER INSERT ON made_with
FOR EACH ROW
    UPDATE homemade_food SET trans_fat = (SELECT SUM(trans_fat_i) FROM (SELECT view1.food_ID, ingredients.trans_fat_i
    FROM homemade_food AS view1
    RIGHT JOIN made_with ON view1.food_ID = made_with.food_ID
    RIGHT JOIN ingredients ON made_with.ingredient_ID = ingredients.ingredient_ID)
    AS cals
    WHERE food_ID = homemade_food.food_ID)
WHERE food_ID = homemade_food.food_ID;

CREATE TRIGGER nutrition_calc_total_fat
AFTER INSERT ON made_with
FOR EACH ROW
    UPDATE homemade_food SET total_fat = (SELECT SUM(total_fat_i) FROM (SELECT view1.food_ID, ingredients.total_fat_i
    FROM homemade_food AS view1
    RIGHT JOIN made_with ON view1.food_ID = made_with.food_ID
    RIGHT JOIN ingredients ON made_with.ingredient_ID = ingredients.ingredient_ID)
    AS cals
    WHERE food_ID = homemade_food.food_ID)
WHERE food_ID = homemade_food.food_ID;

CREATE TRIGGER nutrition_calc_chol
AFTER INSERT ON made_with
FOR EACH ROW
    UPDATE homemade_food SET cholesterol = (SELECT SUM(cholesterol_i) FROM (SELECT view1.food_ID, ingredients.cholesterol_i
    FROM homemade_food AS view1
    RIGHT JOIN made_with ON view1.food_ID = made_with.food_ID
    RIGHT JOIN ingredients ON made_with.ingredient_ID = ingredients.ingredient_ID)
    AS cals
    WHERE food_ID = homemade_food.food_ID)
WHERE food_ID = homemade_food.food_ID;

CREATE TRIGGER nutrition_calc_sodium
AFTER INSERT ON made_with
FOR EACH ROW
    UPDATE homemade_food SET sodium = (SELECT SUM(sodium_i) FROM (SELECT view1.food_ID, ingredients.sodium_i
    FROM homemade_food AS view1
    RIGHT JOIN made_with ON view1.food_ID = made_with.food_ID
    RIGHT JOIN ingredients ON made_with.ingredient_ID = ingredients.ingredient_ID)
    AS cals
    WHERE food_ID = homemade_food.food_ID)
WHERE food_ID = homemade_food.food_ID;

CREATE TRIGGER nutrition_calc_diet_fiber
AFTER INSERT ON made_with
FOR EACH ROW
    UPDATE homemade_food SET diet_fiber = (SELECT SUM(diet_fiber_i) FROM (SELECT view1.food_ID, ingredients.diet_fiber_i
    FROM homemade_food AS view1
    RIGHT JOIN made_with ON view1.food_ID = made_with.food_ID
    RIGHT JOIN ingredients ON made_with.ingredient_ID = ingredients.ingredient_ID)
    AS cals
    WHERE food_ID = homemade_food.food_ID)
WHERE food_ID = homemade_food.food_ID;

CREATE TRIGGER nutrition_calc_sugar
AFTER INSERT ON made_with
FOR EACH ROW
    UPDATE homemade_food SET sugars = (SELECT SUM(sugars_i) FROM (SELECT view1.food_ID, ingredients.sugars_i
    FROM homemade_food AS view1
    RIGHT JOIN made_with ON view1.food_ID = made_with.food_ID
    RIGHT JOIN ingredients ON made_with.ingredient_ID = ingredients.ingredient_ID)
    AS cals
    WHERE food_ID = homemade_food.food_ID)
WHERE food_ID = homemade_food.food_ID;

CREATE TRIGGER nutrition_calc_total_carbs
AFTER INSERT ON made_with
FOR EACH ROW
    UPDATE homemade_food SET total_carbs = (SELECT SUM(total_carbs_i) FROM (SELECT view1.food_ID, ingredients.total_carbs_i
    FROM homemade_food AS view1
    RIGHT JOIN made_with ON view1.food_ID = made_with.food_ID
    RIGHT JOIN ingredients ON made_with.ingredient_ID = ingredients.ingredient_ID)
    AS cals
    WHERE food_ID = homemade_food.food_ID)
WHERE food_ID = homemade_food.food_ID;

CREATE TRIGGER nutrition_calc_protein
AFTER INSERT ON made_with
FOR EACH ROW
    UPDATE homemade_food SET protein = (SELECT SUM(protein_i) FROM (SELECT view1.food_ID, ingredients.protein_i
    FROM homemade_food AS view1
    RIGHT JOIN made_with ON view1.food_ID = made_with.food_ID
    RIGHT JOIN ingredients ON made_with.ingredient_ID = ingredients.ingredient_ID)
    AS cals
    WHERE food_ID = homemade_food.food_ID)
WHERE food_ID = homemade_food.food_ID;
