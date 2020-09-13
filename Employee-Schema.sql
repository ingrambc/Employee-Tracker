DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE departmentTbl(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,

  PRIMARY KEY(id)
);

CREATE TABLE roleTbl(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(9,2) NOT NULL,
  department_id INT NOT NULL,

  PRIMARY KEY(id),
  FOREIGN KEY(department_id) REFERENCES departmentTbl(id)
);


CREATE TABLE employeeTbl (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,

  PRIMARY KEY(id),
  FOREIGN KEY(role_id) REFERENCES roleTbl(id),
  FOREIGN KEY(manager_id) REFERENCES employeeTbl(id)
);