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

const viewAllRoles = () =>{
    db.query(`SELECT * FROM role;`,(err, res) => {
      if (err) throw err;
      console.table(res)
      companyQuestions();
    });
  };

  const addEmployee = () => {
    db.query(`SELECT id, title FROM role`,(err, data)=>{
      const roleChoices = data.map(roles =>({
        value: roles.id,
        name: roles.title,
      }));
      db.query(`SELECT id, first_name, last_name FROM employee`,(err,data)=>{
        const managerChoies = data.map(employees =>({
          value: employees.id,
          name: employees.first_name + " " + employees.last_name,
        }))
        managerChoies.push({
          value: null,
          name: "No manager",
        })
      inquirer.prompt([
      {
        name: 'empFirst',
        type: 'input',
        message: 'Please enter employees First Name:'
      },
      {
        name: 'empLast',
        type: 'input',
        message: 'Please eneter employees Last Name:'
      },
      {
        name: 'empRole',
        type: 'list',
        message: 'Please enter employees role:',
        choices: roleChoices
      },
      {
        name: 'managerId',
        type: 'list',
        message: 'Please choose the manager: ',
        choices: managerChoies
      }
    
      ])
      .then((response) => {
        console.log(response);
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${response.empFirst}', '${response.empLast}', ${response.empRole}, ${response.managerId});`, (err, res) => {
            if (err) throw err;
            console.log('Employee added')
            companyQuestions();
          });
      });
    })
    })
};


const addDepartment = () =>{
    inquirer.prompt({
      name: 'newDepartment',
      type: 'input',
      message: 'Please enter department name:'
    })
    .then((response) => {
      db.query(`INSERT INTO department (name) VALUES ('${response.newDepartment}');`, (err, res) => {
          if (err) throw err;
          console.log('Department added')
          companyQuestions();
        });
    });
  };

