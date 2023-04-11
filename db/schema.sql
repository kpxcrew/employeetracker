DROP TABLE IF EXISTS employee_tracker;
create database employee_tracker;
use employee_tracker;

DROP TABLE IF EXISTS department;
create table department (
    id int auto_increment not null primary key,
    name varchar(30) not null
);


create table role(
    id int auto_increment not null primary key,
    title varchar(30) not null,
    salary decimal(10,0),
    department_id int not null
);

DROP TABLE IF EXISTS employee;
create table employee (
     id int auto_increment primary key,
     first_name varchar(30) not null,
     last_name varchar(30) not null,
     role_id int not null,
     manager_id int
);
