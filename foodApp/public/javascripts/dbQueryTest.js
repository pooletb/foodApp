'use strict';

var knex = require('knex')({
    client: 'mysql',
    connection: {
    host : '127.0.0.1',
    user : 'root',
    password : 'noSQLisbetter93',
    database : 'db',
    port: '3306'
    }
});

knex.schema.createTable('visits2',
(table) => {
    table.increments();
    table.timestamp('timestamp');
    table.string('userIp');
})
.then(() => {
    console.log(`Successfully created 'visits' table.`);
    return knex.destroy();
})
.catch((err) => {
    console.error(`Failed to create 'visits' table:`, err);
    if (knex) {
    knex.destroy();
    }
});
