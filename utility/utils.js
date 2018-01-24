let deleteTodo = (userData,todoId) => {
  let todoList = userData.allTodos;
  let todo = todoList.find(t => t.id == todoId);
  let indexOfTodo = todoList.indexOf(todo);
  todoList.splice(indexOfTodo,indexOfTodo+1);
  return userData;
}

let deleteTodoItem = (userData,todoId, todoItemId) => {
  let todoList = userData.allTodos;
  let todo = todoList.find(t => t.id == todoId);
  let item = todo.allItems.find(i=>i.id==todoItemId);
  let indexOfTodoItem = todo.allItems.indexOf(item);
  todo.allItems.splice(indexOfTodoItem,indexOfTodoItem+1);
  return userData;
}

exports.deleteTodo = deleteTodo;
exports.deleteTodoItem = deleteTodoItem;
