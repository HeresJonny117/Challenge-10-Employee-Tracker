const inquirer = require('inquirer');
const db = require('./db');
const { viewDepartments, addDepartment, viewEmployees, updateEmployeeRole } = require('./queries');

function mainMenu() {
  inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View All Departments',
      'View All Roles',
      'View All Employees',
      'Add Department',
      'Add Role',
      'Add Employee',
      'Update Employee Role',
      'Exit',
    ],
  }).then(answer => {
    switch (answer.action) {
      case 'View All Departments':
        return viewDepartments();
      // Implement other cases
      case 'Exit':
        db.end();
        break;
    }
  });
}

mainMenu();