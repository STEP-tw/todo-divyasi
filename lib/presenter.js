const showListOfAllTodos = (data, userName)=> {
  let userTodoList = data[userName].allTodos;
  return userTodoList.map(todo=>{
    let title = todo.title;
    let id = todo.id;
    return `<a href='/todo/view/${id}'>${title}</a>`
  }).join('<br>')
}

const viewTodo = function(data, userName, todoId) {
  console.log(userName);
  console.log(data[userName]);
  let todo = data[userName].allTodos.find(t=>t.id == todoId);
  let todoItems = getTodoItemsInHtml(todo.allItems);
  return `<p>Title:${todo.title}</p><br><p>Description:${todo.description}</p><br><p>Todo Items:<br>${todoItems}</p>`
}

const getTodoItemsInHtml = function(todoItems) {
  return todoItems.map(item=>{
    return `<p>${item.objective}</p>`;
  }).join('<br>');
}

exports.showListOfAllTodos = showListOfAllTodos;
exports.viewTodo = viewTodo;
