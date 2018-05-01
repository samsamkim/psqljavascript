const pg = require("pg");
const settings = require("./settings"); // settings.json
var moment = require('moment');


const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect();
var nameInput = process.argv[2];
if(!nameInput){
  return console.log("please input name");
}
client.query("SELECT first_name, last_name, birthdate FROM famous_people WHERE first_name = '" + nameInput + "' OR last_name = '" + nameInput +"'", (err, result) => {
  console.log("Searching ...");
  if (err) {
    return console.error("error running query", err);
  }
  console.log("Found " + result.rows.length + " person(s) by the name" + process.argv[2] + ":");
  result.rows.forEach(function (anon, index) {
    console.log(
      "- " + (index + 1) + ": " +
      anon.first_name + " " + anon.last_name +
      ", born " + "'" + moment(anon.birthdate).format("YYYY-MM-DD") + "'");
  });

  client.end();
});