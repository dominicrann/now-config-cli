#! /usr/bin/env node

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
			message: 'What is the name of the project? 📋',
			default: path.basename(process.cwd()),
		},
		
		{
			type: 'list',
			name: 'version',
			message: 'What is the version of Now.sh you wish to deploy with? 🔮',
			choices: [1, 2]
		},
		{
			type: 'confirm',
			name: 'specifyAlias',
			message: 'Would you like to specify an alias? 📖',
			defualt: false
		},
		{
			type: 'text',
			name: 'alias',
			message: 'Specify your alias 📖',
			defualt: '',
			when: function(answers){
				return answers.specifyAlias == true;
			}
		},
		{
			type: 'number',
			name: 'tabSize',
			message: 'What indentation would you like in your now.json file (in tabs)',
			default: 2,
		},
		{
			type: 'confirm',
			name: 'public',
			message: 'Do you want the source view and logs view to be publicly accessible?',
			default: true,
		},
		{
			type: 'confirm',
			name: 'githubEnabled',
			message: 'Do you want Now For Github to auto publish this project per commit/pull request?',
			default: true,
		},
		
		]);
	
	config.version = answers.version;
	config.name = answers.name;
	config.alias = answers.alias;
	config.public = answers.public;
	config.github = {
		enabled: answers.githubEnabled
	};

	console.log(chalk.green.bold('Creating/updating now.json File...'));

	fs.writeFileSync(nowPath, JSON.stringify(config, null, answers.tabSize), 'utf8');
	console.log(chalk.white.bold('========================================='));

	console.log(chalk.green.bold('created/updated now.json file Successfully'));
	console.log(chalk.white.bold('========================================='));

	console.log(chalk.green.bold('To deploy with Now.sh type: now'));
	console.log(chalk.bold('😃'));	
	
	process.exit(0);








}

if (existingConfig) {
	inquirer.prompt(

		{
			type: 'confirm',
			name: 'overide',
			message: '⛔🚨 now.json already exists would you like to override it? ⛔🚨',
			default: true
		},

	).then(answers => {
		if (answers.overide) {
			buildConfig();

		} else {
			console.log(chalk.green('Bye'));
			process.exit(0);

		}
	});

} else {






	buildConfig();
}