const showListOfAllTodos = (data, userName)=> {
  let userTodoList = data[userName].allTodos;
  return userTodoList.map(todo=>{
    let title = todo.title;
    let id = todo.id;
    return `<a href='/todo/view/${id}'>${title}</a> <a href='/todo/delete/${id}'> delete</a>`
  }).join('<br>')
};

const viewTodo = function(data, userName, todoId) {
  let todo = data[userName].allTodos.find(t=>t.id == todoId);
  let todoItems = getTodoItemsInHtml(todo.allItems);
  return `<p>Title:${todo.title}</p><br><p>Description:${todo.description}</p><br>Todo Items:<br>${todoItems}`
};

const getTodoItemsInHtml = function(todoItems) {
  return todoItems.map(item=>{
    return `<p>${item.objective}</p>`;
  }).join('<br>');
};

exports.showListOfAllTodos = showListOfAllTodos;
exports.viewTodo = viewTodo;
exports.getTodoItemsInHtml = getTodoItemsInHtml;
