const { v4: uuidv4 } = require('uuid');

class Task {
    id = '';
    desc = '';
    completed = false;
    completedIn = null;

    constructor( desc ) {
        this.id = uuidv4();
        this.desc = desc;
        this.completed = false;
        this.completedIn = null;
    }
}

module.exports = Task;