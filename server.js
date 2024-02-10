const inquirer = require('inquirer');

const db = require('./db/connection');



// first question that shows all the options
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
                'update an employee role',
                'EXIT'
            ],//Bonus ('view employees by department', 'view utilized budget by department', 'Delete an employee', 'Delete a role', 'Delete a department', 'Exit' )
            loop: false
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
            case 'EXIT':
                db.end();
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
const viewAllEmployees = () => {     
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
    ]).then((res) => { // inserts new department  in to department Table
        let departmentName = res.departmentName;
        let insertQuery = "INSERT INTO department SET ?";
        db.query(insertQuery, {name: res.departmentName},(err, res) => {
            if(err) throw err;
            console.log(`Successfully Added the ${departmentName} Department`);
            originalQuestion();
        });
    })
}

//Get departments function
const getDepartments = () =>{
    return new Promise((resolve, reject) =>{
        db.query("SELECT * FROM department", (err, results) =>{
            if(err){
                reject(err);
            }else{
                resolve(results);
            }
        })
    })
}

//Add Role function 
const addRole = () => {
    getDepartments()
    .then((departments) => {
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
                    return 'Please enter the Salary for the role';
                }
                return true;
                
            }
        },
        {
            type:'list',
            name:'roleDepartment',
            message: 'What department does the role belong too?',
            choices: departments,
            loop: false
            
        }
    ]).then((res) => { // Adds input from user to create the new role in the role table
        let newRole = res.roleName;
        let departmentId = departments.find((department) => department.name === res.roleDepartment)?.id;
        let insertQuery = "INSERT INTO ROLE SET ?";
        db.query(insertQuery,{
            title: res.roleName,
            salary: res.salary,
            department_id: departmentId
        },(err, res) =>{
            if(err){
                console.error(err);
                throw err};
            
            console.log(`Successfully added the ${newRole} role`);
            originalQuestion();
        });
        }); 
    });
}

//Get departments function
const getRoles = () =>{
    return new Promise((resolve, reject) =>{
        db.query("SELECT * FROM role", (err, results) =>{
            if(err){
                reject(err);
            }else{
                resolve(results);
            }
        })
    })
}

//Get the Names of the Directors
const getDirectors = (callback) =>{
    db.query("SELECT first_name, last_name FROM employee WHERE role_id IN (SELECT role_id FROM role WHERE title = 'Director')",
    (err, results) => {
        if(err){
            console.log(err);
            throw err;
    }
        const directorNames = results.map((employee) => `${employee.first_name} ${employee.last_name}`);
        callback(directorNames);
    }
    );
};

//Get Employees function
const getEmployees = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM employee", (err, results) => {
            if(err){
                reject(err);
            }else{
                resolve(results);
            }
        })
    })
}


//Add Employee function 
const addEmployee = () => {
    getRoles()
    .then((roles) =>{ 
       getDirectors((directorNames) => {
        getEmployees().then((employees) => {
    inquirer.prompt([
        {
            type:'input',
            name:'employeeFirstName',
            message: `What is the employee's first name? `,
            validate: (input) =>{  //checks if you entered a name
                if(!input.trim()){
                    return 'Please enter the first name of the employee';
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
                    return 'Please enter the last name of the employee';
                }
                return true;
                
            }
        },
        {
            type:'list',
            name:'initialRole',
            message: 'What is the employee role?',
            choices: roles.map((role) => role.title), //accessing role titles
            loop: false
        },
        {
            type:'list',
            name:'employeesManager',
            message: 'Who will manage this employee?',
            choices: directorNames, //gets employee list
            loop: false
        }
    ]).then((res) => { // functionality that handles functions questions and responses
        let employeeFirstName = res.employeeFirstName;
        let employeeLastName = res.employeeLastName;
        let roleId = roles.find((role) => role.title === res.initialRole)?.id;
        let managerId = employees.find((employee) => `${employee.first_name} ${employee.last_name}` === res.employeesManager)?.id;
        let insertQuery = "INSERT INTO employee SET ?";
        db.query(insertQuery,{
            first_name: res.employeeFirstName,
            last_name: res.employeeLastName,
            role_id: roleId,
            manager_id: managerId
        },(err, res) =>{
            if(err){
                console.error(err);
                throw err};
            
            console.log(`Successfully added employee ${employeeFirstName} ${employeeLastName} `);
            originalQuestion();
        });
    });
    });
});
});
}

//Update Employee role function
const updateEmployeeRole = () =>{
    getEmployees().then((employees) => {
        getRoles().then((roles) => {
            getDirectors((directorNames) => {
    inquirer.prompt([
        {
            type:'list',
            name:'employeesUpdate',
            message: `Which employee's role would you like to update?`,
            choices: employees.map((employee) => `${employee.first_name} ${employee.last_name}`), //employee first & and last name
            loop: false
        },
        {
            type:'list',
            name:'roleUpdate',
            message: 'What role do you want to re-assign the selected employee?',
            choices: roles.map((role) => role.title), //list of roles
            loop: false
        },
        {
            type:'list',
            name:'managerUpdate',
            message: 'Who is the new manager for this employee?',
            choices: employees.map((employee) => `${employee.first_name} ${employee.last_name}`), //list of employees 
            loop: false
        }
    ]).then((res) => { // functionality that handles functions questions and responses
        let roleId = roles.find((role) => role.title === res.roleUpdate)?.id;
        let employeeName = res.employeesUpdate;
        let managerName = res.managerUpdate;

        let [firstName, lastName] = employeeName.split(' ');
        let [managerFirstName, managerLastName] = managerName.split(' ');
        
        let updateQuery = "UPDATE employee SET role_id = ?, manager_id = ? WHERE first_name = ?";
        db.query(updateQuery, [roleId, employees.find((employee) => employee.first_name === managerFirstName && employee.last_name
        === managerLastName)?.id, firstName, lastName],(err, res) =>{
            if(err){
                console.error(err);
                throw err};
            
            console.log(`Successfully updated ${employeeName}'s role `);
            originalQuestion();
        });
    })
})
})
})
}

originalQuestion();
