INSERT INTO homemade_food VALUES (1, "burger", 3, 2, null, null, null, null, null, null, null, null, null, null, null, "fat");
INSERT INTO homemade_food VALUES (2, "salad", 3, 2, null, null, null, null, null, null, null, null, null, null, null, "health");
INSERT INTO homemade_food VALUES (3, "toast", 3, 2, null, null, null, null, null, null, null, null, null, null, null, "why");
INSERT INTO homemade_food VALUES (4, "spaghetti", 3, 2, null, null, null, null, null, null, null, null, null, null, null, "moms");
INSERT INTO homemade_food VALUES (5, "milk steak", 3, 2, null, null, null, null, null, null, null, null, null, null, null, "trash");

INSERT INTO premade_food VALUES (1, "milk steak", 3, 2, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, "trash");
INSERT INTO premade_food VALUES (2, "milk steak", 3, 2, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, "trash");
INSERT INTO premade_food VALUES (3, "milk steak", 3, 2, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, "trash");
INSERT INTO premade_food VALUES (4, "milk steak", 3, 2, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, "trash");
INSERT INTO premade_food VALUES (5, "milk steak", 3, 2, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, "trash");

INSERT INTO manufacturers VALUES ("McDonalds");
INSERT INTO manufacturers VALUES ("BK");
INSERT INTO manufacturers VALUES ("DQ");
INSERT INTO manufacturers VALUES ("Hostess");
INSERT INTO manufacturers VALUES ("Hardees");
INSERT INTO manufacturers VALUES ("Arbys");

INSERT INTO made_by VALUES (1, 'McDonalds');
INSERT INTO made_by VALUES (2, 'BK');
INSERT INTO made_by VALUES (3, 'DQ');
INSERT INTO made_by VALUES (4, 'Hostess');
INSERT INTO made_by VALUES (5, 'Arbys');

INSERT INTO allergens VALUES ('Peanuts');
INSERT INTO allergens VALUES ('Wheat');
INSERT INTO allergens VALUES ('Eggs');
INSERT INTO allergens VALUES ('Soy');

INSERT INTO premade_contains VALUES (1, 'Peanuts');
INSERT INTO premade_contains VALUES (1, 'Wheat');
INSERT INTO premade_contains VALUES (1, 'Eggs');
INSERT INTO premade_contains VALUES (1, 'Soy');

INSERT INTO ingredients VALUES (1, "jelly beans", 1.98, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, "candy");
INSERT INTO ingredients VALUES (2, "lettuce", 2.2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, "veggie");
INSERT INTO ingredients VALUES (3, "celery", 3.3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, "veggie");
INSERT INTO ingredients VALUES (4, "pepper", 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, "seasoning");
INSERT INTO ingredients VALUES (5, "raw chicken", 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, "murder");
INSERT INTO ingredients VALUES (6, "dog food", 6.1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, "trash");
INSERT INTO measurements VALUES (1);

INSERT INTO made_with VALUES (1, 3, 1);
INSERT INTO made_with VALUES (1, 6, 1);
