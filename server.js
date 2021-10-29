//add packages
const  inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');


// connect to db
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Bootcamp12!34$',
      database: 'theworkplace_db'
    },
    console.log(`Connected to the theworkplace_db.`)
  );

const companyQuestions = () => {
    inquirer.prompt([

        {
            type: "list",
            name: "userChoices",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "Add employee",
                "Update Employee Role",
                "View all roles",
                "Add role",
                "View all departments",
                "Add department",
                "Quit"
            ]
        },
    ])
    .then(answer => {
        switch (answer.selected) {
            case 'View all employees':
                viewAllEmployees();
            break;

            case 'Add employee':
                addEmployee();
            break;

            case 'Update Employee Role':
                UpdateEmployeeRole();
            break;

            case 'View all roles':
                viewAllRoles();
            break;

            case 'Add role':
                addRole();
            break;

            case 'View all departments':
                viewAllDepartments();
            break;

            case 'Add department':
                addDepartment();
            break;

            case 'Quit':
                db.end();
            break;

            default: 'Error, error';
    
        };
    });

}

const viewAllEmployees = () => {
    db.query(`SELECT * FROM employees;`,(err, res) => {
      if (err) throw err;
      console.table(res)
      companyQuestions();
    });
  };

  const viewAllDepartments = () =>{
    db.query(`SELECT * FROM department;`,(err, res) => {
      if (err) throw err;
      console.table(res)
      companyQuestions();
    });
  };




