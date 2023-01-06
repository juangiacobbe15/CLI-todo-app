const Task = require('./task');

class Tasks {
    _list = {};

    get listArr() {
        const list = [];

        Object.keys(this._list).forEach( key => {
            const task = this._list[key];
            list.push(task);
        })

        return list;
    }

    constructor() {
        this._list = {};
    }

    loadTasksFromArray( tasks = [] ) {
        tasks.forEach( task => {
            this._list[task.id] = task;
        })
    }

    createTask( desc = '' ) {
        const task = new Task(desc);

        this._list[task.id] = task;
    }

    fullList() {
        console.log();

        Object.keys(this._list).forEach( (key, i) => {
            const idx = `${i + 1}.`.green;
            const task = this._list[key];
            const taskState = task.completed ? `Completed`.green : `Pending`.red;

            console.log(`${idx} ${task.desc} :: ${taskState}`);
        });
    }

    listPendingCompleted( completed = true ) {
        let i = 1;
        Object.keys(this._list).forEach((key) => {
            const idx = `${i}.`.green;
            const task = this._list[key];

            if(task.completed === completed) {
                console.log(`${idx} ${task.desc} :: ${task.completedIn}`);
                i++;
            }
        })
    }

    deleteTask( id = '' ) {
        if(this._list[id]) {
            delete this._list[id];
        }
    }

    toggleCompleted (ids = []) {
        ids.forEach(id => {
            const task = this._list[id];

            if(!task.completed) {
                task.completed = true;
                task.completedIn = new Date().toISOString();
            }
        });

        this.listArr.forEach(task => {
            if(!ids.includes(task.id)) {
                this._list[task.id].completed = false;
                this._list[task.id].completedIn = null;
            }
        })
    }
}

module.exports = Tasks;