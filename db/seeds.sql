
INSERT INTO department (id, department_name)
VALUES (1, "Accounting"),
       (2, "Legal"),
       (4, "Engineering"),
       (5, "Administration"),
       (6, "Sales");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Accounts Payable", 100000.00, 1),
       (2, "Accounts Receivables", 100000.00, 1),
       (3, "Lawyer", 250000.00, 2),
       (4, "Engineer", 200000.00, 3),
       (5, "Data Scientist", 180000.00 4),
       (6, "Director", 300000.00 5),
       (7, "Administrative Assistant", 50000.00 5),
       (8, "Sales Rep", 80000.00 6);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
(1, "Andrew", "Bean", 1, 3),
(2, "drew", "An", 1, 3),
(3, "Andre", "Ean", 3, 3),
(4, "Jon", "Jacob", 3, 1),
(5, "Jane", "Bean", 1, 1),
(6, "Chris", "Lee", 2, 1),
(7, "Matt", "Asqua", 1, 3),
(8, "Sarah", "Lean", 3, 2),
(9, "Anne", "Beat", 1, 2),
(10, "Kathy", "Means", 2, 3),
(11, "Will", "Earn", 1, 3),
(12, "John", "Dow", 2, 3),
(13, "Kyle", "Lu", 2, 3),
(14, "Ashley", "Jones", 2, 3),
