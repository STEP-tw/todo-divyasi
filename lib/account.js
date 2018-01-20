let Todo = require('./todo.js');

class Account {
  constructor(userName, userId) {
    this.userName = userName;
    this.userId = userId;
    this.allTodos = [];
    this.count = 0;
  }
  addTodo(todoDetails) {
    let title = todoDetails.title;
    let desc = todoDetails.descption;
    let todo = new Todo(title, ++this.count, desc);
    this.allTodos.push(todo);
  }
  getTodo (todoId) {
    let todo = this.allTodos.find(todo => todo.todoId == todoId);
    return todo;
  }
  deleteTodo (todoId) {
    let selectedTodo = this.getTodo(todoId);
    let indexOfSelectedTodo = this.allTodos.indexOf(selectedTodo);
    this.allTodos.splice(indexOfSelectedTodo, 1);
  }
  getAllTodoTitle () {
    let allTodoTitle = this.allTodos.map(todo => todo.title);
    return allTodoTitle;
  }
  addTodoItemInTodo (todoId, newItem) {
    let todo = this.getTodo(todoId);
    todo.addTodoItem(newItem);
  }
  getTodoItemById(todoId, todoItemId) {
    let todo = this.getTodo(todoId);
    return todo.getTodoItem(todoItemId);
  }
  deleteTodoItemById (todoId, todoItemId) {
    let todo = this.getTodo(todoId);
    todo.deleteTodoItem(todoItemId);
  }
  markTodoAsDone(todoId) {
    let todo = this.getTodo(todoId);
    return todo.editStatus('true');
  }
  markTodoAsUndone(todoId) {
    let todo = this.getTodo(todoId);
    return todo.editStatus('false');
  }
}

module.exports = Account;
