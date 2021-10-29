//add packages
const  inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;

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
            name: "licenseChoice",
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
    
   
    }