

const inquirer = require('inquirer');
const fs = require('fs');
//array of questions
const questions = [
    { type: 'input', name: 'title', message: 'What is the title of your project?' },
    { type: 'input', name: 'description', message: 'Briefly describe your project:' },
    { type: 'input', name: 'installation', message: 'How do you install the project or its dependencies?' },
    { type: 'input', name: 'usage', message: 'How do you use the project?' },
    { type: 'list', name: 'license', message: 'Choose a license for your project:', choices: ['MIT', 'Apache', 'GPL', 'BSD', 'None'] },
    { type: 'input', name: 'contributing', message: 'How can others contribute to the project?' },
    { type: 'input', name: 'screenshots', message: 'this can be left empty' },
    { type: 'input', name: 'username', message: 'What is your GitHub username?' },
    { type: 'input', name: 'email', message: 'What is your email address?' }
];

const writeToFile = (filename, data) => {
// Write data to a file with the specified filename
    fs.writeFile(filename, data, err => {
        if (err) throw err;//If an error occurs during the writing process
        console.log(`${filename} file generated, buy me a coffee.`);
    });// Log a success message indicating the file has been created
};

module.exports = { writeToFile };

inquirer.prompt(questions)// Prompt the user using the questions array and wait for their responses
    .then(answers => {
        const markdownContent = `# ${answers.title}//injects user provided information for the 'title' property
        // Once the user has provided their answers, make the markdown content using template literals
## Description
${answers.description}// same, but with description

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Screenshots](#screenshots)
- [Questions](#questions)

## Installation
${answers.installation}//yep.

## Usage
${answers.usage}//you get it

## License
${answers.license === 'None' ? 'No license specified' : `This application is covered under the ${answers.license} license.`}

## Contributing
${answers.contributing}

## Screenshots
${answers.screenshots}

## Questions
For additional questions, contact ${answers.email}.
GitHub: [${answers.username}](https://github.com/${answers.username})`;
//writes the content of markdowncontent to a readme.md
        writeToFile('README.md', markdownContent);
    })
    .catch(error => {
        console.error('Error occurred:', error);
    });