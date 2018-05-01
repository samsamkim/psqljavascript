const settings = require("./settings"); // settings.json
var moment = require('moment');



var knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});


// Implement an add_person.js script that takes in the first name, last name and date of a famous person as three command line arguments and uses Knex to perform an insert.


var fnameInput = process.argv[2];
var lnameInput = process.argv[3];
var dateInput = process.argv[4];

knex('famous_people')
  .insert({ first_name: fnameInput,
            last_name: lnameInput,
            birthdate: dateInput })

  .returning('*')
  .asCallback(function(err, result){
    console.log(result);
  });

