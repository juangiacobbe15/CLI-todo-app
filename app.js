require('colors');

const { inquirerMenu, 
        pause,
        getInputValue,
        listTasksToDelete,
        confirm,
        showChecklist
    } = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/fileHandling');
const Tasks = require('./models/tasks');

console.clear();

const main = async () => {
    let opt = '';
    const tasks = new Tasks();

    const tasksDB = readDB();

    if( tasksDB ) {
        tasks.loadTasksFromArray(tasksDB);
    }

    do {
        opt = await inquirerMenu();

        switch(opt) {
            case '1': //Create task
                const desc = await getInputValue('Description:');
                tasks.createTask(desc);
            break;

            case '2': //Show all tasks
                tasks.fullList();
            break;

            case '3': //Show completed tasks
                tasks.listPendingCompleted(true);
            break;

            case '4': //Show pending tasks
                tasks.listPendingCompleted(false);
            break;

            case '5': //Complete tasks
                const ids = await showChecklist(tasks.listArr);

                tasks.toggleCompleted(ids);
            break;

            case '6': //Delete task
                const id = await listTasksToDelete(tasks.listArr);
                
                if(id !== '0') {
                    const ok = await confirm('Are you sure to delete this task?');
    
                    if( ok ) {
                        tasks.deleteTask(id);
                        console.log('Task deleted succesfully.');
                    }
                }
            break;
        }

        saveDB( tasks.listArr );

        if(opt !== '0') await pause();

    } while(opt != '0');
}

main();