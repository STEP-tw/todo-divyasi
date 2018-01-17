let Task = require('./task.js');

class Todo {
  constructor(title, titleId, desc) {
    this.title = title;
    this.desc = desc || '';
    this.titleId = titleId;
    this.count = 0;
    this.allTodoItems = [];
  }

  editTodoTitle (newTitle) {
    this.title = newTitle;
  }
  editTodoDesc (newDesc) {
    this.desc = newDesc;
  }
  addTodoItem (newItem) {
    let newTask = new Task(newItem, ++this.count);
    this.allTodoItems.push(newTask);
  }
  getTodoItem (titleId) {
    let itemById = this.allTodoItems.find(title => titleId == title.id);
    return itemById;
  }
  editTodoItem (titleId, newTodoItem) {
    let oldTodoItem = this.getTodoItem(titleId);
    oldTodoItem.editText(newTodoItem);
  }
  deleteTodoItem (titleId) {
    let specificTodoItem = this.getTodoItem(titleId);
    let indexOfSpecificTodoItem = this.allTodoItems.indexOf(specificTodoItem);
    this.allTodoItems.splice(indexOfSpecificTodoItem, 1);
  }
  markTodoItemAsDone (titleId) {
    let seleTodoItem = this.getTodoItem(titleId);
    seleTodoItem.editStatus(true);
  }
  markTodoItemAsUndone (titleId) {
    let seleTodoItem = this.getTodoItem(titleId);
    seleTodoItem.editStatus(false);
  }
}

module.exports = Todo;
