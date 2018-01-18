let Task = require('./task.js');

class Todo {
  constructor(title, todoId, desc) {
    this.title = title;
    this.desc = desc ;
    this.todoId = todoId;
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
  getTodoItem (todoId) {
    let itemById = this.allTodoItems.find(title => todoId == title.id);
    return itemById;
  }
  editTodoItem (todoId, newTodoItem) {
    let oldTodoItem = this.getTodoItem(todoId);
    oldTodoItem.editText(newTodoItem);
  }
  deleteTodoItem (todoId) {
    let specificTodoItem = this.getTodoItem(todoId);
    let indexOfSpecificTodoItem = this.allTodoItems.indexOf(specificTodoItem);
    this.allTodoItems.splice(indexOfSpecificTodoItem, 1);
  }
  markTodoItemAsDone (todoId) {
    let selectedTodoItem = this.getTodoItem(todoId);
    selectedTodoItem.editStatus(true);
  }
  markTodoItemAsUndone (todoId) {
    let selectedTodoItem = this.getTodoItem(todoId);
    selectedTodoItem.editStatus(false);
  }
}

module.exports = Todo;
