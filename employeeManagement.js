var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTbl = require("console.table");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Freek6988!",
  database: "employee_trackerDB"
});

// connect to the mysql server and sql database, call start function
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  start();
});

//lists
const tasks = ["View All Employees", "View All Employees by Department", "View All Employees by Manager",
  "Add Employees", "Remove Employees", "Update Employee Role", "Update Employee Manager", "Exit"];

function start(){
  inquirer.prompt({
    name: "task",
    type: "list",
    message: "What woul you like to do?",
    choices: tasks
  }).then(function(answer){
    switch (answer.task){
      case "View All Employees":
        viewAllEmps();
        break;
      case ("View All Employees by Department"):
        viewByDept();
        break;
      case ("View All Employees by Manager"):
        viewByMan();
        break;
      case ("Add Employees"):
        addEmp();
        break;
      case ("Remove Employees"):
        removeEmp();
        break;
      case ("Update Employee Role"):
        updateRole();
        break;
      case ("Update Employee Manager"):
        updateMan();
        break;
      case ("Exit"):
        connection.end();
        break;
      default:
        console.log("Chioce "+answer.task+" is not working, pleas try another");
        start();
        break;
    }
  })
}

function viewAllEmps(){
  console.log("Entered viewAllEmps");
  start();
}
function viewByDept(){
  console.log("Entered viewByDept");
  start();
}

function viewByMan(){
  console.log("Entered viewByMan");
  start();
}

function addEmp(){
  console.log("Entered addEmp");
  start();
}

function removeEmp(){
  console.log("Entered removeEmp");
  start();
}

function updateRole(){
  console.log("Entered updateRole");
  start();
}

function updateMan(){
  console.log("Entered updateMan");
  start();
}