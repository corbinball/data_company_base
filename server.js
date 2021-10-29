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