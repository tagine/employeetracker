-- Drop database if it exists
DROP DATABASE IF EXISTS staff_db;

-- Create database
CREATE DATABASE staff_db;

-- Use database
USE staff_db;

-- Employee table
CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id DECIMAL (6,2) NOT NULL,
  manager_id DECIMAL (6,2) NOT NULL,
  department_id INT (6),
  PRIMARY KEY(id)
);

-- Department table
CREATE TABLE department (
  id INT(4) AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);

-- Role table
CREATE TABLE roles (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL (6,2) NOT NULL,
  department_id INT (6) NOT NULL,
  PRIMARY KEY(id)
);


-- add employee to employee table
INSERT INTO employee (employee) VALUES ('');

-- add role to role table
INSERT INTO roles (role) VALUES ('');


-- Functions
-- department, roles, employees
-- add employee, delete employee, edit employee, view employee