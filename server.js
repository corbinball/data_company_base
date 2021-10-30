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
        switch (answer.userChoices) {
            case 'View all employees':
                viewAllEmployees();
            break;

            case 'Add employee':
                addEmployee();
            break;

            case 'Update Employee Role':
                updateEmployeeRole();
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

            default: 
            break;
    
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
    db.query(`SELECT * FROM roles;`,(err, res) => {
      if (err) throw err;
      console.table(res)
      companyQuestions();
    });
};

const addEmployee = () => {
    db.query(`SELECT id, title FROM roles`,(err, data)=>{
      const roleChoices = data.map(roles =>({
        value: roles.id,
        name: roles.title,
      }));
      db.query(`SELECT id, first_name, last_name FROM employees`,(err,data)=>{
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
        db.query(`INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES ('${response.empFirst}', '${response.empLast}', ${response.empRole}, ${response.managerId});`, (err, res) => {
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

const addRole = () => {
    db.query(`SELECT * FROM department;`, (err, data)=>{
      if (err) throw err;
      const departmentChoices = data.map(department=>({
        value: department.id,
        name: department.name,
      }));
      console.log(departmentChoices);
   
    inquirer.prompt([
    {
      name: 'roleName',
      type: 'input',
      message: 'Please enter role: '
    },
    {
      name: 'roleSalary',
      type: 'number',
      message: 'Please enter salary: '
    },
    {
      name: 'departMents',
      type: 'list',
      message: 'Please choose department: ',
      choices: departmentChoices
    }
  ])
  
    .then((response) => {
      db.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${response.roleName}', ${response.roleSalary}, ${response.departMents});`, (err, res) => {
          if (err) throw err;
          console.log('Role added')
          companyQuestions();
        });
      console.log(response);
    });
  })
};
  
const updateEmployeeRole = () => {
    db.query(`SELECT id, title FROM roles`,(err, data)=>{
      const roleChoice = data.map(roles =>({
        value: roles.id,
        name: roles.title,
      }));
      db.query(`SELECT id, first_name, last_name FROM employee`,(err,data)=>{
        const empChoice = data.map(employees =>({
          value: employees.id,
          name: employees.first_name + " " + employee.last_name,
        }))
  
        
    inquirer.prompt([
      {
        name: 'updatedEmp',
        type: 'list',
        message: 'Please choose employee to update:',
        choices: empChoice
      },
      {
        name: 'updatedRole',
        type: 'list',
        message: 'Please enter updated role:',
        choices: roleChoice
      }
    ])
      .then((response) => {
        db.query(`UPDATE employee SET role_id = ${response.updatedRole} WHERE id = ${response.updatedEmp};`, (err, res) => {
            if (err) throw err;
            console.log('Updated')
            companyQuestions();
          });
        });
      })
      })
};

db.connect((err) => {
    if (err) throw err;
    companyQuestions();
});