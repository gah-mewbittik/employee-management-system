
INSERT INTO department (id, name)
VALUES (1, "Accounting"),
       (2, "Legal"),
       (3, "Research"),
       (4, "Engineering"),
       (5, "Administration"),
       (6, "Sales");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Accounts Payable", 100000.00, 1),
       (2, "Accounts Receivables", 100000.00, 1),
       (3, "Lawyer", 250000.00, 2),
       (4, "Engineer", 200000.00, 4),
       (5, "Data Scientist", 180000.00, 3),
       (6, "Director", 300000.00, 5),
       (7, "Administrative Assistant", 50000.00, 5),
       (8, "Sales Rep", 80000.00, 6);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
(1, "Andrew", "Bean", 6, null),
(2, "Sarah", "Lean", 6, null),
(3, "Kyle", "Lu", 6, Null),
(4, "Jon", "Jacob", 3, 3),
(5, "Jane", "Bean", 1, 1),
(6, "Chris", "Lee", 2, 1),
(7, "Matt", "Asqua", 1, 1),
(8, "Drew", "An", 5, 2),
(9, "Anne", "Beat", 4, 2),
(10, "Kathy", "Means", 4, 2),
(11, "Will", "Earn", 5, 2),
(12, "John", "Dow", 8, 3),
(13, "Andre", "Ean", 3, 3),
(14, "Ashley", "Jones", 7, 3);
