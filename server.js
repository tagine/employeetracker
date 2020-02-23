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

// mysl connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "yourRootPassword",
  database: "staff_db"
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

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

const initialQuestion = [
  {
    type: "list",
    name: "action",
    message: "What would you like to do?",
    choices: ["Add employee", new inquirer.Separator(), "Add department", new inquirer.Separator(), "Add role", new inquirer.Separator(), "View employee", new inquirer.Separator(), "View role", new inquirer.Separator(), "View department", new inquirer.Separator(), "Update employee roles", new inquirer.Separator()]
  }
]

inquirer.prompt(initialQuestion)
  .then(answer => {
    switch (answer.action) {
      // for adding employees
      case "Add employee":
        const addEmployeeQuestions = [
          {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?"
          },
          {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?"
          }
        ]
        inquirer.prompt(addEmployeeQuestions)
          .then(answers => {
            console.log(answers.first_name)
            console.log(answers.last_name)
            connection.query("INSERT INTO employees SET ?",
              {
                first_name: answers.first_name,
                last_name: answers.last_name,
                role_id: 1,
                manager_id: 1
              });

          })
        break;
      // for adding departments
      case "Add department":
        const addDepartmentQuestions = [
          {
            type: "input",
            name: "add_department",
            message: "What is the department's name?"
          }
        ]
        inquirer.prompt(addDepartmentQuestions)
          .then(answers => {
            console.log(answers.add_department)
            connection.query("INSERT INTO departments SET ?",
              {
                name: answers.add_department,
                id: 10
              });
          })
        break;
      // for adding roles
      case "Add role":
        const addRoleQuestions = [
          {
            type: "input",
            name: "add_role_name",
            message: "What is the role named?"
          },
          {
            type: "input",
            name: "add_role_salary",
            message: "What is the role's salary?"
          }
        ]
        inquirer.prompt(addRoleQuestions)
          .then(answers => {
            console.log(answers.add_role_name)
            connection.query("INSERT INTO roles SET ?",
              {
                title: answers.add_role_name,
                id: answers.add_role,
                salary: answers.add_role_salary,
                department_id: 2,
              });
          })
        break;
      // for viewing employee
      case "View employee":
        const viewEmployeeQuestions = [
          {
            type: "input",
            name: "view_employee",
            message: "Which employee are you trying to view?"
          }
        ]
        inquirer.prompt(viewEmployeeQuestions)
          .then(answers => {
            console.log(answers.view_employee)
            // console.table(connection.query.results)
            connection.query("SELECT * FROM employees");
          })
        //Need to figure out a way to display table here with query
        break;
        case "View role":
        const viewRoleQuestions = [
          {
            type: "input",
            name: "view_role",
            message: "Which role are you trying to view?"
          }
        ]
        inquirer.prompt(viewRoleQuestions)
          .then(answers => {
            console.log(answers.view_role)
            // console.table(connection.query.results)
            connection.query("SELECT * FROM roles");
          })
        //Need to figure out a way to display table here with query
        break;
      // for viewing departments
      case "View department":
        const viewDepartmentQuestions = [
          {
            type: "input",
            name: "view_department",
            message: "What is the department you're trying to view?"
          }
        ]
        inquirer.prompt(viewDepartmentQuestions)
          .then(answers => {
            console.log(answers.view_department)
            connection.query("SELECT * FROM departments");
          })
        break;
              // for updating employees
      case "Update employee roles":
        const editEmployeeQuestions = [
          {
            type: "input",
            name: "edit_employee",
            message: "Which employee are you trying to edit?"
          }
        ]
        inquirer.prompt(editEmployeeQuestions)
          .then(answers => {
            console.log(answers.edit_employee);
            connection.query("SELECT * FROM departments");
          })
        break;
    }
  })





















/*
const question =
//For setting user intent
{
  type: "list",
  name: "category",
  message: "What are you trying to view or edit?",
  choices: ["employees", new inquirer.Separator(), "departments", new inquirer.Separator(), "roles"]
};
//switch statement??

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
  // For adding, deleting, editing, or viewing roles
  {
    type: "list",
    name: "roleAction",
    message: "What are you trying to do with roles?",
    choices: ["delete", new inquirer.Separator(), "edit", new inquirer.Separator(), "view"]
  },
  //For adding roles
  {
    type: "input",
    name: "addRole",
    message: "What kind of role are you trying to add?"
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
function addEmployee(employee) {
  // employee is the value being passed into this function
  inquirer
    .prompt(question)
    .then(answers => {
      // if (error) throw (error);
      console.log(answers.addEmployee)
      if (answers.addEmployee == "name") {

      }
    })
};

function deleteEmployee(employee) {
  // employee is the value being passed into this function
  inquirer
    .prompt(deleteEmployee)
    .then(answers => {
      // if (error) throw (error);
      console.log(answers.deleteEmployee)
      if (answers.deleteEmployee == "{LAST_NAME, FIRST_NAME}") {

      }
    })
};

function editEmployee(employee) {
  // employee is the value being passed into this function
};

function viewEmployeeTable(employee) {
  // employee is the value being passed into this function
};

/// department function block
function addDepartment(department) {
  // department is the value being passed into this function
};

function deleteDepartment(department) {
  // department is the value being passed into this function
};

function editdepartment(department) {
  // department is the value being passed into this function
};

function viewRoleTable(role) {
  // role is the value being passed into this function
};


function viewDepartmentTable(department) {
  // department is the value being passed into this function
};

inquirer
  .prompt(question)
  .then(answers => {
    // if (error) throw (error);
    console.log(answers.category)
    if (answers.category == "departments") {
      inquirer.prompt(departmentQuestions)
      .then(answers => {
        console.log(answers.departmentAction);
      })
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

function querying() {
  connection.query("SELECT * FROM empoyees", function (error, results) {
    if (error) throw error;
    console.log("results");
    connection.end()
  })
}
*/