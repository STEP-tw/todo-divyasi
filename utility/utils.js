let deleteTodo = (data, userName, todoId) => {
  let todoList = data[userName].allTodos;
  let todo = todoList.find(t => t.id == todoId);
  let indexOfTodo = todoList.indexOf(todo);
  todoList.splice(indexOfTodo,indexOfTodo+1);
  return data;
}

let deleteTodoItem = (data, userName, todoId, todoItemId) => {
  let todoList = data[userName].allTodos;
  let todo = todoList.find(t => t.id == todoId);
  let item = todo.allItems.find(i=>i.id==todoItemId);
  let indexOfTodoItem = todo.allItems.indexOf(item);
  todo.allItems.splice(indexOfTodoItem,indexOfTodoItem+1);
  return data;
}

exports.deleteTodo = deleteTodo;
exports.deleteTodoItem = deleteTodoItem;
