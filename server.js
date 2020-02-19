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

const questions = [
  //For setting user intent
  {
    type: "list",
    name: "category",
    message: "What are you trying to view or edit?",
    choices: ["departments", new inquirer.Separator(), "roles", new inquirer.Separator(), "employees"]
  },
  //For adding, deleting, editing, or viewing employees
  {
    type: "list",
    name: "employeeAction",
    message: "What would you like to do?",
    choices: ["add employee", new inquirer.Separator(), "delete employee", new inquirer.Separator(), "edit employee", new inquirer.Separator(), "view employee"]
  },
  //For adding team members
  {
  type: "list",
  name: "addTeamMembers",
  message: "What type of team member would you like to add?",
  choices: ["employee", new inquirer.Separator(), "intern", new inquirer.Separator(), "manager"]
}
]

inquirer
  .prompt(questions)
  .then(answers => {
    console.log(answers)
  });
