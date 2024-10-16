const db = require('./db');

async function viewDepartments() {
  const res = await db.query('SELECT * FROM department');
  console.table(res.rows);
}

async function addDepartment() {
  const { departmentName } = await inquirer.prompt({
    name: 'departmentName',
    message: 'Enter department name:',
  });
  await db.query('INSERT INTO department (name) VALUES ($1)', [departmentName]);
  console.log(`Added ${departmentName} to departments.`);
}

module.exports = { viewDepartments, addDepartment };