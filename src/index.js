let config = {

};

const chalk = require('chalk');

const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const existingConfig = fs.existsSync('now.json');
const nowPath = path.join(process.cwd(), 'now.json');


async function buildConfig() {
	// console.log('working');


	const answers = await inquirer
		.prompt([
			{
				type: 'text',
				name: 'name',
				message: 'What is the name of the project?',
				default: path.basename(process.cwd()),
			},
			{
				type: 'number',
				name: 'version',
				message: 'What is the version of now you wish to deploy with?',
				default: 2,
			},
		]);
	config.version = answers.version;
	config.name = answers.name;
	fs.writeFileSync(nowPath, JSON.stringify(config, null, 2), 'utf8');
	console.log(chalk.green.bold('created now.json Successfully'));





}

// const questions = [];
if (existingConfig) {
	inquirer.prompt(

		{
			type: 'confirm',
			name: 'overide',
			message: 'now.json already exists would you like to override it?',
			default: false
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