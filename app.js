const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const empType = [
    "Intern",
    "Engineer"
]

const employees = [];
let id = 0;

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function managerQuestions () {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Manager name:"
            },
            {
                type: "input",
                name: "email",
                message: "Manager email:"
            },
            {
                type: "input",
                name: "officeNumber",
                message: "Manager office number:"
            }
        ]).then((response) => {
                const newMgr = new Manager(response.name, id, response.email, response.officeNumber);
                employees.push(newMgr);
                id++;
                createTeam();
            })
}

function employeeQuestions () {
    inquirer
    .prompt([
        {
            type: "list",
            name: "employeeType",
            message: "What type of employee?",
            choices: empType
        }
    ]).then((response) => {
        if (response.employeeType === "Intern") {
            inquirer
                .prompt([
                    {
                        type: "input",
                        name: "name",
                        message: "Employee name:"
                    },
                    {
                        type: "input",
                        name: "email",
                        message: "Interns email address:"
                    },
                    {
                        type: "input",
                        name: "school",
                        message: "Interns school:"
                    }
                ]).then((response) => {
                    const newInt = new Intern(response.name, id, response.email, response.school);
                    employees.push(newInt);
                    console.log(employees);
                    createTeam();
                });
        } else {
            inquirer
                .prompt([
                    {
                        type: "input",
                        name: "name",
                        message: "Employee name:"
                    },
                    {
                        type: "input",
                        name: "email",
                        message: "Engineers email address:"
                    },
                    {
                        type: "input",
                        name: "github",
                        message: "Engineers github username:"
                    }
                ]).then((response) => {
                    const newEng = new Engineer(response.name, id, response.email, response.github)
                    employees.push(newEng);
                    console.log(employees);
                    createTeam(); 
                });
        }
    })
    
}

managerQuestions();

function createTeam () {
    inquirer.prompt(
        {
        type: "list",
        name: "more",
        message: "Would you like to add another employee?",
        choices: [
            "yes",
            "no"
        ]
    }).then((response => {
        switch (response.more) {
            case "yes" : 
                id++;
                employeeQuestions();
                break;
            default : writeFile();
        }
    }));
    
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// let renderedHtml = render(employees);

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

function writeFile(){
    fs.writeFileSync(outputPath, render(employees), "utf-8");
}

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
