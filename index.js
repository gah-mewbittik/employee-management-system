const inquirer = require('inquirer');
const fs = require('fs');

//TODO: Rewrite the questions for validation
// an array of questions for user input
const questions = [
 
    {
        type:'list',
        name:'wantToDo',
        message: 'What would you like to do?',
        choices: ['view all departments','view all roles','view all employees','add a department', 'add a role', 'add an employee','update an employee role']
    },
    {
        type:'input',
        name:'departmentName',
        message: 'Enter the name of the department: ',
        validate: (input) =>{  //checks if you entered a username
            if(!input.trim()){
                return 'Please enter your Github username';
            }
            return true;
            
        }
    },
    {
        type:'input',
        name:'roleName',
        message: 'Enter the name of the role: ',
        validate: (input) =>{  //checks if you entered a username
            if(!input.trim()){
                return 'Please enter your Github username';
            }
            return true;
            
        }
    },
    {
        type:'input',
        name:'salary',
        message: 'Enter the salary for the role: ',
        validate: (input) =>{  //checks if you entered a username
            if(!input.trim()){
                return 'Please enter your Github username';
            }
            return true;
            
        }
    },
    {
        type:'list',
        name:'roleBelong',
        message: 'What department does the role belong too?',
        choices: ['Accounting','Legal','Engineering','Administration', 'Sales']
    },
    {
        type:'input',
        name:'employeeFistName',
        message: `What is the employee's first name? `,
        validate: (input) =>{  //checks if you entered a username
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
        validate: (input) =>{  //checks if you entered a username
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
        choices: ['Accounts Payable','Accounts Receivables','Lawyer','Engineer', 'Data Scientist', 'Director', 'Administrative Assistant', 'Sales Rep']
    },
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
        choices: ['Accounts Payable','Accounts Receivables','Lawyer','Engineer', 'Data Scientist', 'Director', 'Administrative Assistant', 'Sales Rep']
    }
];

// function to write README file
function writeToFile(fileName, data) {
        
        fileName = `${data.title.toLowerCase().split(' ').join('')}.sql`;
    
        fs.writeFile(fileName, genMarkDown(data), (err) => {
        err ? console.log(err) : console.log('Success!')
        });
}

// function to initialize app
function init() {
    inquirer.prompt(questions)
    .then((data) => {
    
        writeToFile('README.md', data);
    })
    .catch((error) => {
        console.error(error.message);

    });
}

// Function call to initialize app
init();