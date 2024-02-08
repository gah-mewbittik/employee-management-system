
DROP DATABASE IF EXISTS myEmployeeList_db;
CREATE DATABASE myEmployeeList_db;

USE myEmployeeList_db;

CREATE TABLE department (
  id INT,
  name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL,
  manager_id INT,
  FOREIGN KEY (manager_id)
    REFERENCES employee(id),
  PRIMARY KEY (id)
);