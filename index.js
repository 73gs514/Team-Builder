const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern')
const team = [];
const render = require("./src/page_template");
const outputDir = path.resolve(__dirname, "output");
const outputPath = path.join(outputDir, "team.html");

const mainMenu = () => {
    inquirer.prompt({
        type: "list",
        name: "direction",
        message: "What type of employee would you like to create?",
        choices: ["Engineer", "Manager", "Intern", "Done"]
    }).then(answers => {
        if (answers.direction === "Manager") {
            askManager();
        } else if (answers.direction === "Engineer") {
            askEngineer();
        } else if (answers.direction === "Intern") {
            askIntern();
        } else {
            buildTeam();
        }
    }) 
} 

const askManager = () => {
    inquirer.prompt([
        {type: "input",
        name: "ManName",
        message: "What is the manager's name?"},
        {type: "input",
        name: "manId",
        message: "what is the manager's ID?"},
        {type: "input",
        name: "ManEmail",
        message: "What is the manager's email?"},
        {type: "input",
        name: "OfficeNum",
        message: "What is the manager's office number?"}
    ]).then(answers => {
        const manager = new Manager(answers.ManName, answers.manId, answers.ManEmail, answers.OfficeNum); 
        team.push(manager);
        mainMenu();
    })
};

const askEngineer = () => {
    inquirer.prompt([
        {type: "input",
        name: "EngName",
        message: "What is the engineer's name?"},
        {type: "input",
        name: "EngId",
        message: "what is the engineer's ID?"},
        {type: "input",
        name: "EngEmail",
        message: "What is the engineer's email?"},
        {type: "input",
        name: "EngGitHub",
        message: "What is the engineer's GitHub username?"}
    ]).then(answers => {
        const engineer = new Engineer(answers.EngName, answers.EngId, answers.EngEmail, answers.EngGitHub);
        team.push(engineer);
        mainMenu();
    })
}

const askIntern = () => {
    inquirer.prompt([
        {type: "input",
        name: "IntName",
        message: "What is the intern's name?"},
        {type: "input",
        name: "IntId",
        message: "what is the intern's ID?"},
        {type: "input",
        name: "IntEmail",
        message: "What is the intern's email?"},
        {type: "input",
        name: "IntSchool",
        message: "What is the intern's school?"}
    ]).then(answers => {
        const intern = new Intern(answers.IntName, answers.IntId, answers.IntEmail, answers.IntSchool);
        team.push(intern);
        mainMenu();
    })
};

function buildTeam () {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }
    fs.writeFileSync(outputPath, render(team), "utf-8");
}

mainMenu();