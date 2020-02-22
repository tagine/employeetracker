//for server build
const express = require("express");
//for command line prompts
const inquirer = require("inquirer");
// for app start
const app = express();
// for mysql
const mysql = require("mysql");
// for printing mySQL rows to the console
const cTable = require("console.table");
// for use of nodemon
const nodemon = require("nodemon");

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080;

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
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

const question =
  //For setting user intent
  {
    type: "list",
    name: "category",
    message: "What are you trying to view or edit?",
    choices: ["employees", new inquirer.Separator(), "departments", new inquirer.Separator(), "roles"]
  }

  const employeeQuestions = [
  //For requesting adding, deleting, editing, or viewing employees
  {
    type: "list",
    name: "employeeAction",
    message: "What would you like to do?",
    choices: ["add employee", new inquirer.Separator(), "delete employee", new inquirer.Separator(), "edit employee", new inquirer.Separator(), "view employee"]
  },
  //For adding employees
  {
    type: "list",
    name: "addEmployee",
    message: "Which type of employee would you like to add?",
    choices: ["engineer", new inquirer.Separator(), "intern", new inquirer.Separator(), "manager"]
  },
  //For deleting employees
  {
    type: "input",
    name: "deleteEmployee",
    message: "Which employee would you like to delete?"
  },
  //For editing employees
  {
    type: "input",
    name: "editEmployee",
    message: "Which employee would you like to edit?"
  },
  //For viewing employees
  {
    type: "list",
    name: "viewEmployee",
    message: "Which type of employee are you trying to view?",
    choices: ["engineer", new inquirer.Separator(), "intern", new inquirer.Separator(), "manager"]
    //would trigger function to view sql array of available employees
  }]

const departmentQuestions = [
  //For requesting adding, deleting, editing, or viewing departments
  {
    type: "list",
    name: "departmentAction",
    message: "What would you like to do?",
    choices: ["add department", new inquirer.Separator(), "delete department", new inquirer.Separator(), "edit department", new inquirer.Separator(), "view department"]
  },
  //For adding departments
  {
    type: "input",
    name: "addDepartment",
    message: "Which department are you trying to add?"
  },
  //For deleting departments
  {
    type: "input",
    name: "deleteDepartment",
    message: "Which department are you trying to delete?"
  },
  //for editing departments
  {
    type: "input",
    name: "editDepartment",
    message: "Which department are you trying to edit?"
  },
  {
    type: "input",
    name: "viewDepartment",
    message: "Which department are you trying to view?"
  }]

  const roleQuestions = [
  // For deleting, editing, or viewing roles
  {
    type: "list",
    name: "roleAction",
    message: "What are you trying to do with roles?",
    choices: ["delete", new inquirer.Separator(), "edit", new inquirer.Separator(), "view"]
  },
    //For deleting roles
    {
      type: "list",
      name: "deleteRole",
      message: "Which role are you trying to delete?",
      choices: ["engineer", new inquirer.Separator(), "manager", new inquirer.Separator(), "intern"]
    },
  //For viewing roles
  {
    type: "list",
    name: "viewRole",
    message: "Which role are you trying to view?",
    choices: ["engineer", new inquirer.Separator(), "manager", new inquirer.Separator(), "intern"]
  }
]

/// employee function block
function addEmployee(employee){
  // employee is the value being passed into this function
}

function deleteEmployee(employee){
  // employee is the value being passed into this function
}

function editEmployee(employee){
  // employee is the value being passed into this function
}

function viewEmployeeTable(employee) {
  // employee is the value being passed into this function
}

/// department function block
function addDepartment(department){
  // department is the value being passed into this function
}

function deleteDepartment(department){
  // department is the value being passed into this function
}

function editdepartment (department){
  // department is the value being passed into this function
}



function viewRoleTable(role) {
  // role is the value being passed into this function
}


function viewDepartmentTable(department) {
  // department is the value being passed into this function
}

inquirer
  .prompt(question)
  .then(answers => {
    // if (error) throw (error);
    console.log(answers.category)
    if (answers.category == "departments") {
    
    }
    if (answers.category == "roles") {
      if (answers.roleAction == "view")
        viewTable(answers.viewRole);
      {
        //FUNCTION CONNECTING TO DATABASE TO GRAB SPECIFIC TABLE GOES HERE

      }
    }
    if (answers.category == "employees") {
      if (answers.employeeAction == "add employee") {
        if (answers.addTeamMembers == "engineer") {
          console.log("engineer")
        }
      }
      else if (answers.employeeAction == "delete employee") {
        console.log("delete employee")
      }
      else if (answers.employeeAction == "edit employee") {
        console.log("edit employee")
      }
      else if (answers.employeeAction == "view employee") {
        console.log("view employee")
      }
    }
  });

  function querying () { 
    connection.query("SELECT * FROM empoyees", function(error, results)
  { 
    if (error) throw error;
    console.log("results");
    connection.end()
  })
}