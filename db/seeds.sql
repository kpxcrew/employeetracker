INSERT INTO department (name)
VALUES  ('Human Resources'), 
        ('Accounting'), 
        ('Legal'), 
        ('Sales');

INSERT INTO
    role (title, salary, department_id)
VALUES  ('Sales Lead', 120000, 4), 
        ('Salesperson', 65000, 4), 
        ('Human Resource Generalist', 50000, 1), 
        ('Lead Human Resource Admin', 80000, 1), 
        ('Payroll Coordinator', 50000, 1), 
        ('Account Manager', 165000, 2), 
        ('Accountant', 130000, 2), 
        ('Paralegal', 75000, 3), 
        ('Records Coordinator', 43000, 3), 
        ('Lawyer', 210000, 3);

INSERT INTO
    employee (
        first_name,
        last_name,
        role_id,
        manager_id
    )
VALUES  ('Stoop', 'Kid', 1, null), 
        ('Norbert', 'Beaver', 2, 1), 
        ('Patti', 'Mayonnaise', 3, 4), 
        ('Chuckie', 'Finster', 4, null), 
        ('Squidward', 'Tentacles', 5, 4), 
        ('Tommy', 'Pickles', 6, null), 
        ('Nigel', 'Thornberry', 7, 6), 
        ('Helga', 'Pataki', 8, 10),
        ('Rocko', 'Rama', 9, 10),
        ('Doug', 'Funnie', 10, null);