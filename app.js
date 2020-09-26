const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const team = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//Starts Questions for Team Members 

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the team member's name?"
        },
        {
            type: "list",
            name: "role",
            message: "What is the team member's role?",
            choices: ["Manager", "Engineer", "Intern",]
        },
        {
            type: "input",
            name: "id",
            message: "What is the team member's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the team member's email?"
        },
    ])
        // Have to set a .then for when either 3 titles are clicked that it goes to the next prompt according to each Title
        .then(val => {
            if (val.role === "Manager") {
                managerTitle(val);
            }
            else if (val.role === "Engineer") {
                engineerTitle(val);
            }
            else if (val.role === "Intern") {
                internTitle(val);
            };
        })

}
// Function for the manager selection, gets office ID
function managerTitle(answers) {
    return inquirer.prompt([
        {
            type: "input",
            name: "officeNumber",
            message: "What is the number to this manager's office?",
        },
        {
            type: "list",
            name: "teamMember",
            message: "Would you like to add another team member?",
            choices: ["Yes", "No"]
        },
    ])
        .then(data => {
            if (data.teamMember === "Yes") {
                    let manager = new Manager(answers.name, answers.id, answers.email, data.officeNumber)
                    team.push(manager);
                promptUser();
            }
            else {
                let manager = new Manager(answers.name, answers.id, answers.email, data.officeNumber)
                team.push(manager);
                generateHTML(outputPath, render(team))
            }
        })
}
// Function for the Engineer's Github username
function engineerTitle(answers) {
    return inquirer.prompt([
        {
            type: "input",
            name: "github",
            message: "What is the github username of this engineer?",
        },
        {
            type: "list",
            name: "teamMember",
            message: "Would you like to add another team member?",
            choices: ["Yes", "No"]
        },
    ])
        .then(data => {
            if (data.teamMember === "Yes") {
                    let engineer = new Engineer(answers.name, answers.id, answers.email, data.github)
                    team.push(engineer);
                promptUser();
            }
            else {
                let engineer = new Engineer(answers.name, answers.id, answers.email, data.github)
                team.push(engineer);
                generateHTML(outputPath, render(team))
            }
        })
}

// Function for the Intern's School 

function internTitle(answers) {
    return inquirer.prompt([
        {
            type: "input",
            name: "school",
            message: "What school does this intern go to currently?",
        },
        {
            type: "list",
            name: "teamMember",
            message: "Would you like to add another team member?",
            choices: ["Yes", "No"]
        },
    ])
        .then(data => {
            if (data.teamMember === "Yes") {
                let intern = new Intern(answers.name, answers.id, answers.email, data.school)
                team.push(intern);
            promptUser();
        }
        else {
            console.log(answers)
            console.log(data)
            let intern = new Intern(answers.name, answers.id, answers.email, data.school)
            team.push(intern);
            generateHTML(outputPath, render(team))
        }
    })
}

function generateHTML(filename, data) {
    fs.writeFile(filename, data, "utf8", function (err) {
        if (err) {
            throw err;
        }
        console.log("Success!")
    })
}

promptUser();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
