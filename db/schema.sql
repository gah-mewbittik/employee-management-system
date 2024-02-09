
DROP DATABASE IF EXISTS myEmployeeList_db;
CREATE DATABASE myEmployeeList_db;

USE myEmployeeList_db;

CREATE TABLE department (
  id INT AUTO_INCREMENT,
  name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id)
    REFERENCES department(id),
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  FOREIGN KEY (role_id)
    REFERENCES role(id),
  manager_id INT,
  FOREIGN KEY (manager_id)
    REFERENCES employee(id),
  PRIMARY KEY (id)
);