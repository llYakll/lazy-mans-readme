const inquirer = require('inquirer');
const fs = require('fs');

// Array of questions
const questions = [
    { type: 'input', name: 'title', message: 'What is the title of your project?' },
    { type: 'input', name: 'description', message: 'Briefly describe your project:' },
    { type: 'input', name: 'installation', message: 'How do you install the project or its dependencies?' },
    { type: 'input', name: 'usage', message: 'How do you use the project?' },
    { type: 'list', name: 'license', message: 'Choose a license for your project:', choices: ['MIT', 'Apache', 'GPL', 'BSD', 'None'] },
    { type: 'input', name: 'contributing', message: 'How can others contribute to the project?' },
    { type: 'input', name: 'screenshots', message: 'This can be left empty' },
    { type: 'input', name: 'username', message: 'What is your GitHub username?' },
    { type: 'input', name: 'email', message: 'What is your email address?' }
];

// Function to write data to file
const writeToFile = (filename, data) => {
    // Write data to a file with the specified filename
    fs.writeFile(filename, data, err => {
        if (err) throw err; // If an error occurs during the writing process
        console.log(`${filename} file generated, buy me a coffee.`);
    });
};

// Map license choices to corresponding badge URLs
const licenseBadges = {
    'MIT': '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
    'Apache': '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)',
    'GPL': '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)',
    'BSD': '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)',
    'None': 'No license specified'
};

module.exports = { writeToFile };

// Prompt the user using the questions array and wait for their responses
inquirer.prompt(questions)
    .then(answers => {
        const licenseBadge = licenseBadges[answers.license];
        // Once the user has provided their answers, make the markdown content using template literals
        const markdownContent = `
# ${answers.title}
${licenseBadge}

## Description
${answers.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Screenshots](#screenshots)
- [Questions](#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
${answers.license === 'None' ? 'No license specified' : `This application is covered under the ${answers.license} license.`}

## Contributing
${answers.contributing}

## Screenshots
${answers.screenshots}

## Questions
For additional questions, contact ${answers.email}.
GitHub: [${answers.username}](https://github.com/${answers.username})
`;
        // Write the content of markdownContent to a README.md file
        writeToFile('README.md', markdownContent);
    })
    .catch(error => {
        console.error('Error occurred:', error);
    });
