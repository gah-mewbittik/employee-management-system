const inquirer = require('inquirer');
const fs = require('fs');

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
        name:'username',
        message: 'Enter your github username: ',
        validate: (input) =>{  //checks if you entered a username
            if(!input.trim()){
                return 'Please enter your Github username';
            }
            return true;
            
        }
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