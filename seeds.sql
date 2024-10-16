INSERT INTO department (name) VALUES ('HR'), ('Engineering'), ('Sales');

INSERT INTO role (title, salary, department_id) 
VALUES ('Manager', 75000, 1), ('Developer', 60000, 2), ('Salesperson', 50000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL), ('Jane', 'Smith', 2, 1), ('Mark', 'Johnson', 3, NULL);