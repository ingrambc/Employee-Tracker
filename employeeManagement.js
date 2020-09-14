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
  "Add Employees", "Remove Employee", "Update Employee Role", "Update Employee Manager","add Role", "add Department", "Exit"];

function start(){
  //get input from user
  inquirer.prompt({
    name: "task",
    type: "list",
    message: "What would you like to do?",
    choices: tasks
  }).then(function(answer){
    // call proper function from user choice
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
      case ("Remove Employee"):
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
  let querry = "SELECT a.id, a.first_name, a.last_name, b.name, c.title, c.salary, concat(d.first_name, ' ', d.last_name) AS manager ";
      querry += "FROM employeetbl a ";
      querry += "LEFT JOIN roletbl c ON a.role_id = c.id ";
      querry += "LEFT JOIN departmenttbl b ON c.department_id = b.id ";
      querry += "LEFT JOIN employeetbl d ON a.manager_id = d.id";

  // querry database, display results
  connection.query(querry, function(err, res){
    if(err) throw err;
    console.table(res);
    start();
  })
}//end of function

function viewByDept(){
  //get department list
  connection.query("SELECT DISTINCT name FROM departmentTbl", function(err, res){
    if(err) throw err;
    //turn response into list
    let departments = [];
    for (let i = 0; i < res.length; i++) {
      departments.push(res[i].name);      
    }

    //get department to view
    inquirer.prompt({
      name: "department",
      type: "list",
      message: "What department would you like to view?",
      choices: departments
    }).then(function(answer){
      //build querry statement
      let querry = "SELECT a.id, a.first_name, a.last_name, b.name, c.title, c.salary, concat(d.first_name, ' ', d.last_name) AS manager ";
      querry += "FROM employeetbl a ";
      querry += "LEFT JOIN roletbl c ON a.role_id = c.id ";
      querry += "LEFT JOIN departmenttbl b ON c.department_id = b.id ";
      querry += "LEFT JOIN employeetbl d ON a.manager_id = d.id ";
      querry += "WHERE b.name = ?";

      //run querry and display result
      connection.query(querry, [answer.department], function(err, res){
        if(err) throw err;
        console.table(res);
        start();
      })
    })
  })
}//end of function

function viewByMan(){
  //get manager list
  let querry = "SELECT DISTINCT a.manager_id, concat(b.first_name, ' ', b.last_name) AS manager ";
      querry += "FROM employeetbl a ";
      querry += "LEFT JOIN employeetbl b ON a.manager_id = b.id ";
      querry += "WHERE a.manager_id IS NOT NULL ";

  connection.query(querry, function(err, res){
    if(err) throw err;
    //turn response into list
    let managers = [];
    for (let i = 0; i < res.length; i++) {
      managers.push(res[i].manager);
    }

    //get department to view
    inquirer.prompt({
      name: "manager",
      type: "list",
      message: "What managers employees would you like to view?",
      choices: managers
    }).then(function(answer){
      // get id of manager from answer
      let manId = -1
      for (let i = 0; i < managers.length; i++) {
        if(res[i].manager === answer.manager)
          manId = res[i].manager_id;
      }

      //build querry statement
      let querry = "SELECT a.id, a.first_name, a.last_name, b.name, c.title, c.salary, concat(d.first_name, ' ', d.last_name) AS manager ";
      querry += "FROM employeetbl a ";
      querry += "LEFT JOIN roletbl c ON a.role_id = c.id ";
      querry += "LEFT JOIN departmenttbl b ON c.department_id = b.id ";
      querry += "LEFT JOIN employeetbl d ON a.manager_id = d.id ";
      querry += "WHERE a.manager_id = ?";

      //run querry and display result
      connection.query(querry, [manId], function(err, res){
        if(err) throw err;
        console.table(res);
        start();
      })
    })
  })
}

function addEmp(){
  //get list for prompts
  connection.query("SELECT DISTINCT title, id FROM roleTbl", function(err, rolesRes){
    let roles = []
    for (let i = 0; i < rolesRes.length; i++) {
      roles.push(rolesRes[i].title);      
    }

    let querry = "SELECT DISTINCT a.manager_id, concat(b.first_name, ' ', b.last_name) AS manager ";
    querry += "FROM employeetbl a ";
    querry += "LEFT JOIN employeetbl b ON a.manager_id = b.id ";
    querry += "WHERE a.manager_id IS NOT NULL ";

    connection.query(querry, function(err, managerRes){
      if(err) throw err;
      //turn response into list
      let managers = ["none"];
      for (let i = 0; i < managerRes.length; i++) {
        managers.push(managerRes[i].manager);
      }

      inquirer
      .prompt([{
          name: "fName",
          type: "input",
          message: "Employees first name: ",
        },{
          name: "lName",
          type: "input",
          message: "Employees last name: ",
        },{
          name: "role",
          type: "list",
          message: "What is the employees role? ",
          choices: roles
        },{
          name: "manager",
          type: "list",
          message: "Who is the employees manager? ",
          choices: managers
      }]).then (function(answer){
        //get ID values
        let roleId = -1
        for(let i = 0; i < rolesRes.length; i++){
          if(answer.role === rolesRes[i].title){
            roleId = rolesRes[i].id;
          }
        }

        let managerId = null;
        for(let i = 0; i < managerRes.length; i++){
          if(answer.manager === managerRes[i].manager){
            managerId = managerRes[i].manager_id;
          }
        }

        //create querry
        connection.query("INSERT INTO employeeTbl SET ?",
        {first_name: answer.fName,
          last_name: answer.lName,
          role_id: roleId,
          manager_id: managerId
        },function(err){
          if(err) throw err;
          console.log("Employee Entered Successfully");

          start();
        })
      })
    })
  })
}

function removeEmp(){
  //create query staement to get employee list
  let querry = "SELECT id, concat(first_name, ' ', last_name) AS employee ";
      querry += "FROM employeeTbl";
  connection.query(querry, function(err, employeesRes){
    //create employee list from response
    employees = [];
    for (let i = 0; i < employeesRes.length; i++) {
      employees.push(employeesRes[i].employee);      
    }

    inquirer.prompt({
      name: "employee",
      type: "list",
      message: "Which employee would you like to remove?",
      choices: employees
    }).then(function(answer){
      //get employee id 
      let empId = -1;
      for (let i = 0; i < employeesRes.length; i++) {
        if(answer.employee === employeesRes[i].employee){
          empId = employeesRes[i].id;
        }
      }
      //querry for deletion
      connection.query("DELETE FROM employeeTbl WHERE id = ?",[empId], 
        function(err, res){
          if(err) throw err;
          console.log("Employee " +answer.employee+ " Deleted");
          start();
      })
    })
  })
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