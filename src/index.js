let config = {

};

const chalk = require('chalk');

const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const existingConfig = fs.existsSync('now.json');
const nowPath = path.join(process.cwd(), 'now.json');


async function buildConfig() {

	const answers = await inquirer
		.prompt([{
			type: 'text',
			name: 'name',
			message: 'What is the name of the project?',
			default: path.basename(process.cwd()),
		},
		{
			type: 'number',
			name: 'version',
			message: 'What is the version of Now.sh you wish to deploy with?',
			default: 2,
		},
		{
			type: 'number',
			name: 'tabSize',
			message: 'What indentation would you like in your now.json file (in tabs)',
			default: 2,
		},
		]);
	config.version = answers.version;
	config.name = answers.name;
	console.log(chalk.green.bold('Creating/updating now.json File...'));

	fs.writeFileSync(nowPath, JSON.stringify(config, null, answers.tabSize), 'utf8');
	console.log(chalk.white.bold('========================================='));

	console.log(chalk.green.bold('created/updated now.json file Successfully'));
	console.log(chalk.white.bold('========================================='));

	console.log(chalk.green.bold('Bye Bye'));






}

// const questions = [];
if (existingConfig) {
	inquirer.prompt(

		{
			type: 'confirm',
			name: 'overide',
			message: 'now.json already exists would you like to override it?',
			default: true
		},

	).then(answers => {
		if (answers.overide) {
			buildConfig();

		} else {
			console.log('Bye');

		}
	});

} else {






	buildConfig();
}