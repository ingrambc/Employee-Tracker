var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

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
  "Add Employees", "Remove Employees", "Update Employee Role", "Update Employee Manager","add Role", "add Department", "Exit"];

function start(){
  inquirer.prompt({
    name: "task",
    type: "list",
    message: "What woul you like to do?",
    choices: tasks
  }).then(function(answer){
    switch (answer.task){
      case ("View All Employees"):
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
      case ("add Role"):
        addRole();
        break;
      case ("add Department"):
        addDepartment();
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
  // Build querry statement
  var querry = "SELECT a.id, a.first_name, a.last_name, c.name, b.title, b.salary ";
  querry += "FROM employeeTbl a, roleTbl b, departmentTbl c ";
  querry += "WHERE a.role_id = b.id AND b.department_id = c.id";

  // querry database, display results
  connection.query(querry, function(err, res){
    if(err)throw err;
    console.log(res);
    console.table(res);
    start();
  })
  
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

function addRole(){
  console.log("Entered addRole");
  start();
}

function addDepartment(){
  console.log("Entered addDepartment");
  start();
}