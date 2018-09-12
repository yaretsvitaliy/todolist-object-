class TodoList {
    constructor(sectionName, elementID) {
        this.elementID = elementID;
        this.sectionName = sectionName;
        this._tasks = [];
        this._doneTask = [];
        this._el = document.querySelector("#" + this.elementID);
        this.render();
        this._addEventListenerOnAddTask();
    }

    render() {
        let render = document.querySelector(`#${this.elementID}`);
        render.innerHTML = `<div class="ToDoList"> <div class="containerName">${this.sectionName}</div>
      	<input placeholder="write task, please" type="text" class="task" id="inputTask">
      	<div class="containerBtn">
      		<button class="addTask" id="addTask">Add</button>
      	</div>
        <div data-role="tasks" class="tasks"></div>
        <footer id="footer"></footer>
        </div>`;

        this._renderTasks(this._tasks);
    }

    _renderTasks(array) {
        const tasksBlock = this._el.querySelector('[data-role="tasks"]');
        tasksBlock.innerHTML = '';
        for (let i = 0; i < array.length; i++) {
            tasksBlock.append(array[i].render());
        }
        this._renderFooter();
    }

    _renderFooter() {
        const footer = document.querySelector('#footer');
        footer.innerHTML = `<div class="inline">${this._tasks.length - this._doneTask.length} items left</div>
            <div class="inline" id="allTasks">All</div>
            <div class="inline" id="active">Active</div>
            <div class='inline' id="completed">Completed</div>
            <div class='inline' id='clear'>Clear</div>`;
        this.showCompletedTask();
        this.showActiveTask();
        this.showAllTask();
        this.showClearTask();
    }

    _addTask() {
        let elementValue = document.querySelector("#inputTask");
        let newTask = new Task(`${elementValue.value}`);
        this._tasks.push(newTask);
        elementValue.value = '';
        this._onTaskDeleteCallback();
        this._onTaskCheckCallback();
        this._renderTasks(this._tasks);
    }

    _addEventListenerOnAddTask() {
        let addBtn = document.querySelector('#addTask');
        addBtn.addEventListener('click', this._addTask.bind(this));
    }

    _onTaskDeleteCallback() {
        this._tasks.map(i => i.onDeleteCallback = this._onTaskDelete.bind(this));
    }

    _onTaskDelete(task) {
        let index = this._tasks.indexOf(task);
        this._tasks.splice(index, 1);
        this._renderTasks(this._tasks);
    }

    _onTaskCheckCallback() {
        this._tasks.map(i => i.onCheckCallback = this._onTaskChecked.bind(this));
    }

    _onTaskChecked(task) {
        // debugger;
        if (task.isDone === false) {
            task.isDone = true;
            this._doneTask.push(task);
        } else {
            task.isDone = false;
            this._doneTask = this._doneTask.filter(i => i !== task);
        }
        this._renderTasks(this._tasks);
    }

    showCompletedTask() {
        let completed = document.querySelector('#completed');
        completed.addEventListener('click', this._getCompleted.bind(this));
    }

    _getCompleted() {
        this._renderTasks(this._doneTask);
    }

    showActiveTask() {
        let active = document.querySelector('#active');
        active.addEventListener('click', this._getActive.bind(this));
    }

    _getActive() {
        this._renderTasks(this._tasks.filter(i => i.isDone === false));
    }

    showAllTask() {
        let allTask = document.querySelector('#allTasks');
        allTask.addEventListener('click', this._getAll.bind(this));
    }

    _getAll() {
        this._renderTasks(this._tasks);
    }

    showClearTask() {
        let clear = document.querySelector('#clear');
        clear.addEventListener('click', this._getClearTask.bind(this));
    }

    _getClearTask() {
        this._renderTasks(this._tasks = []);
        this._renderTasks(this._doneTask = []);
    }
}


