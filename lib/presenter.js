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
  let todoItems = getTodoItemsInHtml(todo.allItems, todo.id);
  let todoInHtmlForm = `<p>Title:${todo.title}</p><br><p>Description:${todo.description}</p><br>Todo Items:<br>${todoItems}`;
  let logoutAndHomeOptions=`<a href="/home"> << Home </a><br><a href="/logout">  logout</a>`
  return logoutAndHomeOptions+todoInHtmlForm;
};

const getTodoItemsInHtml = function(todoItems, todoId) {
  return todoItems.map(item=>{
    return `<p>${item.objective}</p><a href="/todo/delete/${todoId}/${item.id}">Delete</a>`;
  }).join('<br>');
};

exports.showListOfAllTodos = showListOfAllTodos;
exports.viewTodo = viewTodo;
exports.getTodoItemsInHtml = getTodoItemsInHtml;
