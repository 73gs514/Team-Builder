// requirements
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const html = require("./src/HTMLtemp.js");
/* const generateHTML = require('./src/htmlTEMP'); */



// async functions
const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);

let teamArray = [];
let teamString = ``;

console.clear();
console.log("---------------------------------------------");
console.log("Team Portfolio Generator by nosremetnarg")

// function to run application
async function main() {
    try {
        await prompt()

        for (let i = 0; i < teamArray.length; i++) {
            teamString = teamString + html.generateCard(teamArray[i]);
        }

        let finalHtml = html.generateHTML(teamString)

        console.clear();
        console.log("---------------------------------------------");
        console.log("Generating index.html file....");
        console.log("---------------------------------------------");

        writeFileAsync("index.html", finalHtml);

        console.clear();
        console.log("---------------------------------------------");
        console.log("index.html file created successfully");
        console.log("---------------------------------------------");

    } catch (err) {
        return console.log(err);
    }
}

// Inquirer prompts to collect user data
async function prompt() {
    let responseDone = "";

    do {
        try {
            console.log("---------------------------------------------");
            let response = await inquirer.prompt([
                {
                    type: "input",
                    name: "name",
                    message: "What is employee's name?",
                    
                },
                {
                    type: "input",
                    name: "id",
                    message: "Enter employee's ID: ",
                    
                },
                {
                    type: "input",
                    name: "email",
                    message: "Enter employee's email address: ",
                    
                },
                {
                    type: "list",
                    name: "role",
                    message: "What is the employee's role: ",
                    choices: [
                        "Engineer",
                        "Intern",
                        "Manager"
                    ]
                }
            ]);

            let response2 = ""

            if (response.role === "Engineer") {
                response2 = await inquirer.prompt([{
                    type: "input",
                    name: "github",
                    message: "What is the employee's github username?: ",
                    
                }, ]);

                // add to team Arr
                const engineer = new Engineer(response.name, response.id, response.email, response2.github);
                teamArray.push(engineer);
                console.log(teamArray)
            
            } else if (response.role === "Manager") {
                response2 = await inquirer.prompt([{
                    type: "input",
                    name: "officeNumber",
                    message: "What is the employee's office number?: ",
                    
                }, ]);

                // add to team Arr
                const manager = new Manager( response.name, response.id, response.email, response2.officeNumber);
                teamArray.push(manager);
                console.log(teamArray)

            } else if (response.role === "Intern") {
                response2 = await inquirer.prompt([{
                    type: "input",
                    name: "school",
                    message: "What school is employee attending: ",
                   
                }, ]);

                // add to team Arr
                const intern = new Intern( response.name, response.id, response.email, response2.school);
                teamArray.push(intern);
                console.log(teamArray)
            }
        } catch (err) {
            return console.log(err);
        }
        responseDone = await inquirer.prompt([{
            type: "list",
            name: "finish",
            message: "Do you want to continue?: ",
            choices: [
                "Yes",
                "No"
            ]
        },]);
    } while (responseDone.finish === "Yes");
}

// initial program
main();