Employee Tracker
Description
The Employee Tracker allows users to view and manage departments, roles, and employees, making it easy to track organizational information. The project uses Node.js, Inquirer, and PostgreSQL to create and delete data from the database, allowing for easy manipulation for information.

Table of Contents
Installation
Usage
Features
Database Schema
Technologies Used
License
Questions

Installation
To get started with this project, follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/your-username/employee-tracker.git
Navigate to the project directory:

bash
Copy code
cd employee-tracker
Install the dependencies:

bash
Copy code
npm install
Set up the PostgreSQL database:

Create a database named EmployeeTracker using PostgreSQL.
Use the schema.sql file to create the required tables:
bash
Copy code
psql -d EmployeeTracker -f schema.sql
Use the seeds.sql file to populate sample data:
bash
Copy code
psql -d EmployeeTracker -f seeds.sql
Set up environment variables by creating a .env file with the following content:

bash
Copy code
DB_USER=yourPostgresUsername
DB_HOST=localhost
DB_NAME=EmployeeTracker
DB_PASS=yourPostgresPassword
DB_PORT=5432
Run the application:

bash
Copy code
node inquirer.js
Usage
After running the application, you will be presented with a menu that allows you to choose from the following actions:

View All Departments: Displays a list of all departments.
View All Roles: Shows all roles along with their department, title, and salary.
View All Employees: Lists all employees, their role, department, salary, and manager (if any).
Add Department: Prompts for a department name and adds it to the database.
Add Role: Prompts for a role's title, salary, and associated department before adding it to the database.
Add Employee: Prompts for the employee’s first name, last name, role, and manager before adding it to the database.
Update Employee Role: Allows you to update an employee’s role by selecting the employee and their new role.
The application will continue to show the main menu until you select the "Exit" option, which will close the database connection and terminate the application.

Example
bash
Copy code
? What would you like to do? (Use arrow keys)
❯ View All Departments
  View All Roles
  View All Employees
  Add Department
  Add Role
  Add Employee
  Update Employee Role
  Exit
Features
CRUD Operations: Perform create, read, update, and delete operations on departments, roles, and employees.
Relational Data Management: The roles are associated with departments, and employees are associated with roles and managers, allowing for a structured database.
PostgreSQL Integration: The application interacts with a PostgreSQL database, storing and retrieving data through SQL queries.
Database Schema
The database consists of three tables:

department:

id (Primary Key)
name (Department Name)
role:

id (Primary Key)
title (Role Title)
salary (Role Salary)
department_id (Foreign Key referencing department)
employee:

id (Primary Key)
first_name (First Name)
last_name (Last Name)
role_id (Foreign Key referencing role)
manager_id (Foreign Key referencing employee to create self-referencing relationship for managers)
Technologies Used
Node.js: JavaScript runtime used to build the command-line application.
Inquirer.js: Node.js library used for prompting user inputs.
PostgreSQL: Relational database used to store and manage department, role, and employee data.
pg (node-postgres): PostgreSQL client for Node.js used to interact with the database.
License
This project is licensed under the MIT License. See the LICENSE file for more details.

Questions
If you have any questions or issues with this project, feel free to reach out to me:

GitHub: your-username
Email: your-email@example.com
