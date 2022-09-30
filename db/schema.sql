DROP TABLE IF EXISTS department; 
DROP TABLE IF EXISTS employee; 
DROP TABLE IF EXISTS roles;

CREATE TABLE department(
    id INT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE employee (
    id INT
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    roleID INT,
    managerID INT,
    departmentID INT
); 

CREATE TABLE roles (
    id INT ,
    title VARCHAR(30),
    salary INT,
    departmentID INT
);
