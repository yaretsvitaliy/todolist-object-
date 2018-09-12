class Task {
    constructor(name) {
        this.name = name;
        this.isDone = false; // готово - не готово
        this.onCheckCallback = null;
        this.onDeleteCallback = null;
    }

    render() {
        let li = document.createElement('li');
        li.innerHTML = `<input type="checkbox" data-role="check" ${  this.isDone ? "checked" : "" }><label> ${this.name} </label>
            <button data-role="delete" class="deleteBtn">
        <img class = 'img' src="images/close.png"> </button>`;
        const deleteButtons = li.querySelector('[data-role="delete"]');
        deleteButtons.addEventListener('click', this._deleteTask.bind(this));
        const checkBox = li.querySelector('[data-role="check"]');
        checkBox.addEventListener('click', this._checkTask.bind(this));

        return li;
    }

    _deleteTask() {
        if (!!this.onDeleteCallback) {
            this.onDeleteCallback(this);
        }
    }

    _checkTask() {
        if (!!this.onCheckCallback) {
            this.onCheckCallback(this);
        }
    }
}