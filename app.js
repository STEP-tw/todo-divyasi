const express = require('express');
const timeStamp = require('./utility/time.js').timeStamp;
const fs = require('fs');
const presenter = require('./lib/presenter.js');
const utils = require('./utility/utils.js');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

let templates={};
templates.loginPage = fs.readFileSync('public/login','utf8');
templates.home = fs.readFileSync('public/homePage','utf8');
templates.viewTodo = fs.readFileSync('public/viewTodo', 'utf8');
let registeredUsers = [{userName:'divya'},{userName:'yogi'}];

/*============================================================================*/
const logger = function(fs,req,res,next) {
  let logs = ['--------------------------------------------------------------',
    `${timeStamp()}`,
    `${req.method}`,
    `${req.url}`,
    `${JSON.stringify(req.headers,null,2)}`,
    ''
  ].join('\n');
  console.log(`${req.method}    ${req.url}`);
  fs.appendFile('./data/log.json',logs,()=>{});
  next();
}
/*============================================================================*/

let app = express();

const loadUser = function(req, res,next) {
  let userName = app.sessionManager.getUserName(req.cookies.sessionid);
  if (userName) req.userName = userName;
  next();
}

let getHomePageContent = function (userName) {
  let html = templates.home;
  app.userStore.loadData();
  let userData = app.userStore.getUserData(userName);
  let todoList = presenter.showListOfAllTodos(userData);
  html = html.replace(`TODOLIST`,todoList);
  return html;
}

let redirectLoggedOutUserToLogin = (req, res,next)=>{
  let allowedUrlForLoogedUser = ['/home','/logout','/todo/create'];

  let sessionid = req.cookies.sessionid;
  if (allowedUrlForLoogedUser.includes(req.url) && !app.sessionManager.getUserName(sessionid)) {
    res.redirect('/login');
    return ;
  }
  next();
}

let redirectLoggedUserToHome = (req, res,next) => {
  let sessionid = req.cookies.sessionid;
  if (['/','/login'].includes(req.url) && app.sessionManager.getUserName(sessionid)) {
    res.redirect('/home');
    return ;
  }
  next();
}

let serveLoginPage = function (req,res) {
  res.set('Content-Type','text/html');
  res.send(templates.loginPage.replace('LOGIN_MESSAGE',req.cookies.message||''));
  res.end();
}

let serveLogoutPageWithLoginLink = function (req,res) {
  let html=`<p>successfully loggedout</p><br><br><a href=/login>login here</a>`
  res.set('Content-Type','text/html');
  res.set('Set-Cookie',`sessionid=0;Max-Age=5`);
  res.send(html);
  res.end();
}

let serveHomePage = function (req,res) {
  let html = getHomePageContent(req.userName);
  res.set('Content-Type','text/html');
  res.send(html);
  res.end();
}

let serveCreateTodoPage = function (req,res) {
  let html = fs.readFileSync('public/createTodo','utf8');
  res.set('Content-Type','text/html');
  res.send(html)
  res.end();
}

let addTodo = (userData, todoDetails)=>{
  let allTodos = userData.allTodos;
  allTodos.push(todoDetails);
  return userData;
}

let addTodoItem = function (userData, todoId, todoItem) {
  let allTodos = userData.allTodos;
  let todo = allTodos.find(t=>t.id==todoId);
  todo.allItems.push(todoItem);
  return userData;
}

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }))

app.use(loadUser);

app.use((req,res,next)=>{
  logger(fs,req,res,next);
})

app.use(redirectLoggedOutUserToLogin);

app.use(redirectLoggedUserToHome);

app.use((req, res,next)=>{
  if (req.url.startsWith('/todo/view/')) {
    app.userStore.loadData();
    let userData = app.userStore.getUserData(req.userName);
    let todoId = req.url.split('/')[3];
    let html = presenter.viewTodo(templates.viewTodo,userData,todoId);
    res.send(html);
    res.end();
  }
  next();
})

app.use((req, res,next)=>{
  if (req.url.startsWith('/todo/delete/')) {
    app.userStore.loadData();
    let userData=app.userStore.getUserData(req.userName);
    let todoId = req.url.split('/')[3];
    let todoItemId = req.url.split('/')[4];
    if (todoId && todoItemId) {
      userData = utils.deleteTodoItem(userData,todoId,todoItemId);
    }
    if (todoId && !todoItemId) {
      userData = utils.deleteTodo(userData,todoId);
    }
    app.userStore.modifyUserData(req.userName,userData);
    let html = getHomePageContent(req.userName);
    res.send(html);
    res.end();
  }
  next();
})

app.use((req, res,next)=>{
  if (req.method=='POST' && req.url.startsWith('/todo/add/')) {
    let todoId = req.url.split('/')[3];
    let todoItemId = new Date().getTime()
    let todoItem = {};
    todoItem.id = todoItemId
    todoItem.objective = req.body.objective;
    todoItem.status = false;
    app.userStore.loadData();
    let userData = app.userStore.getUserData(req.userName);
    let newUserData = addTodoItem(userData, todoId, todoItem);
    app.userStore.modifyUserData(req.userName, newUserData);
    let responseText = {id:todoItemId};
    res.send(JSON.stringify(responseText));
    res.end();
  }
  next();
})

app.get("/",serveLoginPage);

app.get("/login",serveLoginPage);

app.get("/logout",serveLogoutPageWithLoginLink);

app.get('/home',serveHomePage);

app.get('/todo/create',serveCreateTodoPage);

app.post('/login',(req,res)=>{
  let user = registeredUsers.find(u=>req.body.userName==u.userName);
  console.log(req.body);
  if(user) {
    let sessionid = app.sessionManager.createSession(req.body.userName);
    res.set('Set-Cookie',[`sessionid=${sessionid}`,`message='';Max-Age=0`]);
    req.userName=req.body.userName;
    serveHomePage(req,res);
    return;
  }
  res.set('Set-Cookie',`message=login failed;Max-Age=5`);
  res.redirect('/login');
});

app.post('/todo/create',(req,res)=> {
  let userName=req.userName;
  app.userStore.loadData();
  let todoId = new Date().getTime();
  let todoDetails = req.body;
  todoDetails.id = todoId;
  todoDetails.allItems = [];
  let userData=app.userStore.getUserData(userName);
  let newData = addTodo(userData, todoDetails);
  app.userStore.modifyUserData(userName,newData)
  serveHomePage(req,res);
})

module.exports = app;
