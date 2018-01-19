class Task {
  constructor(todoItem, id) {
    this.todoItem = todoItem;
    this.id = id;
    this.status = false;
  }
  editTodoItem (todoItem) {
    this.todoItem = todoItem;
  }
  editStatus (status) {
    this.status = status;
  }
  getStatus () {
    return this.status;
  }
  getTodoItem () {
    return this.todoItem;
  }
}


module.exports = Task;
