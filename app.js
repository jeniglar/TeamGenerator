const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const employees = [];

const employeeQuestion = [
    {
        type: "list",
        name: "role",
        message: "Please select the employee's role:",
        choices: [
            "Manager",
            "Engineer",
            "Intern",
            "Exit"
        ]
    }
];

const managerQuestions = [
    {
        type: "input",
        name: "office",
        message: "Please enter the manager's office number"
    },
    {
        type: "input",
        name: "name",
        message: "Please enter the employee's name"
    },
    {
        type: "input",
        name: "id",
        message: "Please enter the employee's ID number"
    },
    {
        type: "input",
        name: "email",
        message: "Please enter the employee's email address"
    }
];

const engineerQuestions = [
    {
        type: "input",
        name: "GitHub",
        message: "Please enter the engineer's GitHub user name"
    },
    {
        type: "input",
        name: "name",
        message: "Please enter the employee's name"
    },
    {
        type: "input",
        name: "id",
        message: "Please enter the employee's ID number"
    },
    {
        type: "input",
        name: "email",
        message: "Please enter the employee's email address"
    }
];

const internQuestions = [
    {
        type: "input",
        name: "school",
        message: "Please enter the intern's school"
    },
    {
        type: "input",
        name: "name",
        message: "Please enter the employee's name"
    },
    {
        type: "input",
        name: "id",
        message: "Please enter the employee's ID number"
    },
    {
        type: "input",
        name: "email",
        message: "Please enter the employee's email address"
    }
];

function init() {
    inquirer.prompt(employeeQuestion).then(function (position) {
        console.log(position.role);
        if(position.role === "Manager") {
            inquirer.prompt(managerQuestions).then(function (answer) {
                console.log(answer);
                const manager = new Manager(answer.name, answer.id, answer.email, answer.office);
                employees.push(manager);
                init();
            });
        } else if (position.role === "Engineer") {
           inquirer.prompt(engineerQuestions).then(function (answer) {
                console.log(answer);
                const engineer = new Engineer(answer.name, answer.id, answer.email, answer.GitHub);
                employees.push(engineer);
                init();
            });
        } else if (position.role === "Intern") {
            inquirer.prompt(internQuestions).then(function (answer) {
                console.log(answer);
                const intern = new Intern(answer.name, answer.id, answer.email, answer.school);
                employees.push(intern);
                init();
            });
        } else if (position.role === "Exit") {
            console.log(employees);
            fs.writeFileSync(outputPath, render(employees), "utf-8"); 
        }
    })
};

init();
