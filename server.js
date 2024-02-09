const inquirer = require('inquirer');

const db = require('./db/connection');



// first question 
const originalQuestion = () =>{
    inquirer.prompt([
        {
            type:'list',
            name:'originalQuestion',
            message: 'What would you like to do?',
            choices: [
                'view all departments',
                'view all roles',
                'view all employees',
                'add a department', 
                'add a role', 
                'add an employee',
                'update an employee role'
            ]//Bonus ('view employees by department', 'view utilized budget by department', 'Delete an employee', 'Delete a role', 'Delete a department', 'Exit' )
        }
    ]).then((res) => {
        console.log(res.originalQuestion);
        switch(res.originalQuestion){
            case 'view all departments':
                viewAllDepartments();
                break;
            case 'view all roles':
                viewAllRoles();
                break;
            case 'view all employees':
                viewAllEmployees();
                break;
            case 'add a department':
                addDepartment();
                break;
            case 'add a role':
                addRole();
                break;
            case 'add an employee':
                addEmployee();
                break;
            case 'update an employee role':
                updateEmployeeRole();
                break;
            default:
                console.log('Error');
                db.end();
                break;
        }
    }).catch((err) =>{
        if(err)throw err;
    });
}

//Functions that perform the queries

//View all departments function
const viewAllDepartments = () =>{
    let selection = "SELECT * FROM  department";
    db.query(selection, function(err, res){
        if(err) throw err;
        console.table(res);
        originalQuestion();
    });
}

//View all roles function
const viewAllRoles = () => {
    let selection = "SELECT * FROM role";
    db.query(selection, function(err, res){
        if(err) throw err;
        console.table(res);
        originalQuestion();
    });
}

//View all employees function
const viewAllEmployees = () => {     // TODO: ReVIEW this!
    let selection = "SELECT * FROM employee";
    db.query(selection, function(err, res){
        if(err) throw err;
        console.table(res);
        originalQuestion();
    });
}

//Add a department function
const addDepartment = () => {
    inquirer.prompt([
        {
            type:'input',
            name:'departmentName',
            message: 'Enter the name of the department: ',
            validate: (input) =>{  //checks if you entered a department name
                if(!input.trim()){
                    return 'Please enter the name of the department.';
                }
                return true;
                
            }
        }
    ]).then((res) => {
        let insert = "INSERT INTO department SET ?";
        db.query(insert, {name: res.departmentName},(err, res) => {
            if(err) throw err;
            console.log(`Successfully Added the ${res.departmentName} Department`);
            originalQuestion();
        });
    })
}

//Add Role function TODO: Finish the below function
const addRole = () => {
    inquirer.prompt([
        {
            type:'input',
            name:'roleName',
            message: 'Enter the name of the role: ',
            validate: (input) =>{  //checks if you entered a role
                if(!input.trim()){
                    return 'Please enter the name of the role';
                }
                return true;
                
            }
        },
        {
            type:'input',
            name:'salary',
            message: 'Enter the salary for the role: ',
            validate: (input) =>{  //checks if you entered a salary
                if(!input.trim()){
                    return 'Please enter your Github username';
                }
                return true;
                
            }
        },
        {
            type:'list',
            name:'roleDepartment',
            message: 'What department does the role belong too?',
            choices: ['Accounting',
            'Legal',
            'Research',
            'Engineering',
            'Administration', 
            'Sales']
        }
    ]).then((res) => {
        ///Add here!
    })
}

//Add Employee function TODO: Finish the below function
const addEmployee = () => {
    inquirer.prompt([
        {
            type:'input',
            name:'employeeFistName',
            message: `What is the employee's first name? `,
            validate: (input) =>{  //checks if you entered a name
                if(!input.trim()){
                    return 'Please enter your Github username';
                }
                return true;
                
            }
        },
        {
            type:'input',
            name:'employeeLastName',
            message: `What is the employee's last name? `,
            validate: (input) =>{  //checks if you entered a name
                if(!input.trim()){
                    return 'Please enter your Github username';
                }
                return true;
                
            }
        },
        {
            type:'list',
            name:'initialRole',
            message: 'What is the employee role?',
            choices: ['Accounts Payable','Accounts Receivables','Lawyer','Research','Engineer', 'Data Scientist', 'Director', 'Administrative Assistant', 'Sales Rep']
        }
    ]).then((res) => {
        //Add here!
    })
}

//Update Employee role function TODO: Finish the below function
const updateEmployeeRole = () =>{
    inquirer.prompt([
        {
            type:'list',
            name:'employeesUpdate',
            message: `Which employee's role would you like to update?`,
            choices: ['None', 'John Dow','Kyle Lu','Ashley Jones','Jane Bean', 'Will Earn', 'Andrew Bean']
        },
        {
            type:'list',
            name:'roleUpdate',
            message: 'What role do you want to re-assign the selected employee?',
            choices: ['Accounts Payable','Accounts Receivables','Lawyer','Research','Engineer', 'Data Scientist', 'Director', 'Administrative Assistant', 'Sales Rep']
        }
    ]).then((res) => {
        //add here
    })
}

originalQuestion();
