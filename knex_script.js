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

var nameInput = process.argv[2];

knex('famous_people')
  .select('first_name', 'last_name')
  .where('first_name', 'like', nameInput)
  .asCallback(function(err, result){
    if(!nameInput){
      return console.log("please input name");
    }

    console.log("Found " + result.length + " person(s) by the name" + process.argv[2] + ":");
    result.forEach(function (anon, index) {
      console.log(
        "- " + (index + 1) + ": " +
        anon.first_name + " " + anon.last_name +
        ", born " + "'" + moment(anon.birthdate).format("YYYY-MM-DD") + "'");
    });

  });

