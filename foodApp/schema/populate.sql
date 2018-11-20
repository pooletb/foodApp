INSERT INTO homemade_food VALUES (1, "Omelette", 1, 2, null, null, null, null, null, null, null, null, null, null, null, "Breakfast");
INSERT INTO homemade_food VALUES (2, "Cheeseburger", 3, 2, null, null, null, null, null, null, null, null, null, null, null, "Sandwich");
INSERT INTO homemade_food VALUES (3, "PB&J", 1, 2, null, null, null, null, null, null, null, null, null, null, null, "Sandwich");
INSERT INTO homemade_food VALUES (4, "Spaghetti", 1, 2, null, null, null, null, null, null, null, null, null, null, null, "Grain");
INSERT INTO homemade_food VALUES (5, "Baked Chicken Breast", 3, 2, null, null, null, null, null, null, null, null, null, null, null, "Breakfast");

INSERT INTO premade_food VALUES (1, "Oreo", 34, 2, 4.705822, 1,852941, 0.058824, 0, 0.205882, 0, 4.117647, 0.014706, 0.411765, 0.735294, 0.09412, "Snack");
INSERT INTO premade_food VALUES (2, "Hamburger", 95, 2, 0.905263, 0.034737, 0.004211, 0.101053, 0.273684, 4.936842, 0.012632, 0.06, 0.305263, 0.126316, "Sandwich");
INSERT INTO premade_food VALUES (3, "Spicy Chicken Sandwich", 152, 1, 2.763158, 1.223684, 0.024342, 0.000658, 0.138158, 0.289474, 6.171053, 0.013816, 0.034211, 0.276316, 0.111842,"Sandwich");
INSERT INTO premade_food VALUES (4, "Spicy Shrimp Roll", 273, 1, 1.391941, 0.571429, 0.018315, 0, 0.087912, 0.036630, 2.564103, 0.018315, 0.014652, 0.124542, 0.029304, "Fish");
INSERT INTO premade_food VALUES (5, "Chicken Quesadilla", 510, 1, 0.354902, 0.494118, 0.023529, 0.00098, 0.054902, 0.147059, 2.372549, 0.007843, 0.005882, 0.07451, 0.052941, "Fast food");

INSERT INTO manufacturers VALUES ("Nabisco");
INSERT INTO manufacturers VALUES ("McDonalds");
INSERT INTO manufacturers VALUES ("Chik-fil-a");
INSERT INTO manufacturers VALUES ("Kroger");
INSERT INTO manufacturers VALUES ("Taco Bell");

INSERT INTO made_by VALUES (1, 'Nabisco');
INSERT INTO made_by VALUES (2, 'McDonalds');
INSERT INTO made_by VALUES (3, 'Chik-fil-a');
INSERT INTO made_by VALUES (4, 'Kroger');
INSERT INTO made_by VALUES (5, 'Taco Bell');

INSERT INTO allergens VALUES ('Egg');
INSERT INTO allergens VALUES ('Fish');
INSERT INTO allergens VALUES ('Milk');
INSERT INTO allergens VALUES ('Peanut');
INSERT INTO allergens VALUES ('Shellfish');
INSERT INTO allergens VALUES ('Tree Nut');
INSERT INTO allergens VALUES ('Wheat');
INSERT INTO allergens VALUES ('Soy');

INSERT INTO premade_contains VALUES (1, 'Wheat');
INSERT INTO premade_contains VALUES (2, 'Milk');
INSERT INTO premade_contains VALUES (2, 'Wheat');
INSERT INTO premade_contains VALUES (2, 'Soy');
INSERT INTO premade_contains VALUES (3, 'Tree Nut');
INSERT INTO premade_contains VALUES (4, 'Shellfish');
INSERT INTO premade_contains VALUES (4, 'Soy');
INSERT INTO premade_contains VALUES (5, 'Milk');
INSERT INTO premade_contains VALUES (5, 'Eggs');
INSERT INTO premade_contains VALUES (5, 'Wheat');


INSERT INTO homemade_contains VALUES (1, 'Egg');
INSERT INTO homemade_contains VALUES (1, 'Milk');
INSERT INTO homemade_contains VALUES (1, 'Soy');
INSERT INTO homemade_contains VALUES (2, 'Milk');
INSERT INTO homemade_contains VALUES (2, 'Wheat');
INSERT INTO homemade_contains VALUES (2, 'Soy');
INSERT INTO homemade_contains VALUES (3, 'Wheat');
INSERT INTO homemade_contains VALUES (3, 'Tree Nut');
INSERT INTO homemade_contains VALUES (4, 'Wheat');

INSERT INTO ingredients VALUES (1, "Egg", 80, 16, 1.6, 0, 5, 187, 62, 0, 0.6, 0.6, 6, "Protein");
INSERT INTO ingredients VALUES (2, "Cheddar Cheese", 113, 60, 6, 0, 9, 29, 174, 0, 0.1, 0.4, 7, "Dairy");
INSERT INTO ingredients VALUES (3, "Butter", 100, 98, 7, 0, 12, 31, 2, 0, 0, 0, 0.1, "Dairy");
INSERT INTO ingredients VALUES (4, "White Hamburger Bun", 250, 30, 0.4, 0, 1.8, 0, 227, 0.8, 3.3, 23, 4.5, "Grain");
INSERT INTO ingredients VALUES (5, "Ground Beef 80% Lean", 210, 120, 5, 0, 14, 71, 285, 0, 0, 0, 20, "Protein");
INSERT INTO ingredients VALUES (6, "Pepperjack Cheese", 80, 63, 4, 0, 7, 20, 160, 0, 0, 0, 5, "Dairy");
INSERT INTO ingredients VALUES (7, "White Bread Slice", 70, 7.5, 0.2, 0, 0.8, 0, 123, 0.7, 1.4, 12, 2.2, "Grain");
INSERT INTO ingredients VALUES (8, "Peanut Butter", 188, 143, 3, 0, 16, 0, 152, 1.8, 2.1, 7.7, 7, "Protein");
INSERT INTO ingredients VALUES (9, "Jelly", 56, 0, 0, 0, 0, 0, 6, 0, 11, 15, 0, "Condiment");
INSERT INTO ingredients VALUES (10, "Wheat Pasta", 210, 22, 0.3, 0, 2.5, 0, 5.7, 5.5, 1.1, 42, 8.4, "Grain");
INSERT INTO ingredients VALUES (11, "Pasta Sauce", 66, 19, 0.3, 0, 2.1, 2.6, 577, 2.4, 6.5, 9.8, 1.8, "Grain");
INSERT INTO ingredients VALUES (12, "Chicken Breast", 198, 39, 1.2, 0, 4.3, 102, 89, 0, 0, 0, 37, "Protein");
INSERT INTO ingredients VALUES (13, "Olive Oil", 120, 120, 1.9, 0, 14, 0, 0.3, 0, 0, 0, 0, "Condiment");

INSERT INTO measurements VALUES (1);
INSERT INTO measurements VALUES (2);

INSERT INTO made_with VALUES (1, 1, 2);
INSERT INTO made_with VALUES (1, 2, 1);
INSERT INTO made_with VALUES (1, 3, 1);
INSERT INTO made_with VALUES (2, 4, 1);
INSERT INTO made_with VALUES (2, 5, 1);
INSERT INTO made_with VALUES (2, 6, 1);
INSERT INTO made_with VALUES (3, 7, 2);
INSERT INTO made_with VALUES (3, 8, 1);
INSERT INTO made_with VALUES (3, 9, 2);
INSERT INTO made_with VALUES (4, 10, 1);
INSERT INTO made_with VALUES (4, 11, 1);
INSERT INTO made_with VALUES (5, 12, 1);
INSERT INTO made_with VALUES (5, 12, 1);