//for server build
const express = require("express");
//for command line prompts
const inquirer = require("inquirer");
// for app start
const app = express();
// for printing mySQL rows to the console
const cTable = require("console.table");

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080;

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
    console.log("Server is starting...")
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });
  

//SAMPLE USE OF cTABLE

const table = cTable.getTable([
  {
    name: 'Murphy Brown',
    age: 5
  }, {
    name: 'Rana',
    age: 32
  }
]);

console.log(table);