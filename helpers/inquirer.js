const inquirer = require('inquirer');
require('colors');

const menuOpts = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you want to do?',
        choices: [
            {
                value:'1',
                name: `${'1.'.green} Create task`
            },
            {
                value:'2',
                name: `${'2.'.green} Show tasks`
            },
            {
                value:'3',
                name: `${'3.'.green} Show completed tasks`
            },
            {
                value:'4',
                name: `${'4.'.green} Show pending tasks`
            },
            {
                value:'5',
                name: `${'5.'.green} Complete task(s)`
            },
            {
                value:'6',
                name: `${'6.'.green} Delete task`
            },
            {
                value:'0',
                name: `${'0.'.green} Quit`
            }
        ]
    }
];

const inquirerMenu = async () => {
    console.log('==================='.green);
    console.log('  Select an option  '.white);
    console.log('===================\n'.green);

    const { option } = await inquirer.prompt(menuOpts);

    return option;
}

const pause = async () => {
    const pauseOpt = [
        {
            type: 'input',
            name: 'enter',
            message: `\nPress ${'ENTER'.green} to continue\n`
        }
    ]

    await inquirer.prompt(pauseOpt);
}

const getInputValue = async ( message ) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if(value.length === 0) {
                    return 'Please enter a value';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);

    return desc;
}

const listTasksToDelete = async ( tasks = [] ) => {
    const choices = tasks.map((task, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: task.id,
            name: `${idx} ${task.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancel'
    })

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Delete',
            choices
        }
    ]

    const { id } = await inquirer.prompt(questions);

    return id;
}

const showChecklist = async ( tasks = [] ) => {
    const choices = tasks.map((task, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: task.id,
            name: `${idx} ${task.desc}`,
            checked: (task.completed) ? true : false
        }
    });

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Select',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(question);

    return ids;
}

const confirm = async( message ) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(question);

    return ok;
}

module.exports = {
    inquirerMenu,
    pause,
    getInputValue,
    listTasksToDelete,
    confirm,
    showChecklist
}