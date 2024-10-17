import pool from './db.js';
import inquirer from 'inquirer';


async function viewDepartments() {
    const res = await pool.query('SELECT * FROM department');
    console.table(res.rows);
}


async function viewRoles() {
    const res = await pool.query(`
        SELECT role.id, role.title, role.salary, department.name AS department 
        FROM role 
        JOIN department ON role.department_id = department.id
    `);
    console.table(res.rows);
}


async function viewEmployees() {
    const res = await pool.query(`
        SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary,
        (SELECT CONCAT(manager.first_name, ' ', manager.last_name) 
         FROM employee manager 
         WHERE manager.id = employee.manager_id) AS manager
        FROM employee
        JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id
    `);
    console.table(res.rows);
}


async function addDepartment() {
    const { departmentName } = await inquirer.prompt([{ 
        type: 'input', 
        name: 'departmentName', 
        message: 'Enter the new department name:' 
    }]);
    await pool.query('INSERT INTO department (name) VALUES ($1)', [departmentName]);
    console.log(`Department "${departmentName}" added.`);
}


async function addRole() {
    const departmentsRes = await pool.query('SELECT * FROM department');
    const departmentChoices = departmentsRes.rows.map(dep => ({ name: dep.name, value: dep.id }));

    const { title, salary, departmentId } = await inquirer.prompt([
        { type: 'input', name: 'title', message: 'Enter the role title:' },
        { type: 'input', name: 'salary', message: 'Enter the role salary:' },
        { type: 'list', name: 'departmentId', message: 'Select the department:', choices: departmentChoices }
    ]);

    await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
    console.log(`Role "${title}" added.`);
}


async function addEmployee() {
    const rolesRes = await pool.query('SELECT * FROM role');
    const roleChoices = rolesRes.rows.map(role => ({ name: role.title, value: role.id }));

    const employeesRes = await pool.query('SELECT * FROM employee');
    const managerChoices = employeesRes.rows.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));

    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([ // Added await here
        { type: 'input', name: 'firstName', message: 'Enter the employee\'s first name:' },
        { type: 'input', name: 'lastName', message: 'Enter the employee\'s last name:' },
        { type: 'list', name: 'roleId', message: 'Select the role:', choices: roleChoices },
        { type: 'list', name: 'managerId', message: 'Select the manager:', choices: [...managerChoices, { name: 'None', value: null }] }
    ]);

    await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, managerId]);
    console.log(`Employee "${firstName} ${lastName}" added.`);
}


async function updateEmployeeRole() {
    const employeesRes = await pool.query('SELECT * FROM employee');
    const employeeChoices = employeesRes.rows.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));

    const rolesRes = await pool.query('SELECT * FROM role');
    const roleChoices = rolesRes.rows.map(role => ({ name: role.title, value: role.id }));

    const { employeeId, newRoleId } = await inquirer.prompt([
        { type: 'list', name: 'employeeId', message: 'Select the employee to update:', choices: employeeChoices },
        { type: 'list', name: 'newRoleId', message: 'Select the new role:', choices: roleChoices }
    ]);

    await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [newRoleId, employeeId]);
    console.log(`Employee role updated.`);
}

export { viewDepartments, addDepartment, viewEmployees, updateEmployeeRole, addRole, viewRoles, addEmployee };