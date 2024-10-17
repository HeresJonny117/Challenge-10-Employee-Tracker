import inquirer from 'inquirer';;
import db from './db.js';

import { viewDepartments, addDepartment, viewEmployees, updateEmployeeRole, addRole, viewRoles, addEmployee } from './queries.js';
import Pool from './db.js';

async function mainMenu() {
    const { action } = await inquirer.prompt({
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
    });

    switch (action)
         {
        case 'View All Departments':
            await viewDepartments();
            break;
        case 'View All Roles':
            await viewRoles();
            break;
        case 'View All Employees':
            await viewEmployees();
            break;
        case 'Add Department':
            await addDepartment();
            break;
        case 'Add Role':
            await addRole();
            break;
        case 'Add Employee':
            await addEmployee();
            break;
        case 'Update Employee Role':
            await updateEmployeeRole();
            break;
        case 'Exit':
            console.log('Exiting the application...');
            await db.end();  
            return;
    }

    
    mainMenu();
}
mainMenu();