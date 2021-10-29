



INSERT INTO department (name)
VALUES ("Management"),
       ("Sales"),
       ("Accounting"),
       ("Warehouse");


INSERT INTO roles (title, salary, department_id)
VALUES ("Manager", 80000.99, 1),
       ("Sales Lead", 50000.99, 2),
       ("Senior Accountant", 60000.99, 3),
       ("Supervisor", 45000.99, 4);


INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES ("Michael", "Scott", 1, 1),
       ("Dwight", "Schrute", 2, NULL),
       ("Kevin", "Malone", 3, NULL),
       ("Darryl", "Philbin", 4, NULL),