const timeStamp = require('./utility/time.js').timeStamp;
const WebApp = require('./webapp');
const fs = require('fs');
const preseter = require('./lib/presenter.js');

let loginPage = fs.readFileSync('public/login','utf8');
let home = fs.readFileSync('public/homePage','utf8');
let registeredUsers = [{userName:'divya'},{userName:'yogi'}];

/*============================================================================*/
const logger = function(fs,req,res) {
  let logs = ['--------------------------------------------------------------',
    `${timeStamp()}`,
    `${req.method}`,
    `${req.url}`,
    `${JSON.stringify(req.headers,null,2)}`,
    ''
  ].join('\n');
  console.log(`${req.method}    ${req.url}`);
  fs.appendFile('./data/log.json',logs,()=>{});
}
/*============================================================================*/

let app = WebApp.create();

const loadUser = function(req, res) {
  let userName = app.sessionManager.getUserName(req.cookies.sessionid);
  if (userName) req.userName = userName;
}

let getHomePageContent = function (userName) {
  let html = fs.readFileSync('public/homePage','utf8');
  let data = fs.readFileSync('data/todoData.json', 'utf8');
  let todoList = preseter.showListOfAllTodos(JSON.parse(data), userName);
  html = html.replace(`TODOLIST`,todoList);
  return html;
}

let redirectLoggedOutUserToLogin = (req, res)=>{
  let allowedUrlForLoogedUser = ['/home','/logout','/todo/create'];
  let sessionid = req.cookies.sessionid;
  if (req.urlIsOneOf(allowedUrlForLoogedUser) && !app.sessionManager.getUserName(sessionid)) {
    res.redirect('/login');
  }
}

let redirectLoggedUserToHome = (req, res) => {
  let sessionid = req.cookies.sessionid;
  if (req.urlIsOneOf(['/','/login']) && app.sessionManager.getUserName(sessionid)) {
    res.redirect('/home');
    return;
  }
}

app.use(loadUser);

app.use((req,res)=>{
  logger(fs,req,res);
})

app.use(redirectLoggedOutUserToLogin);

app.use(redirectLoggedUserToHome);

app.use((req, res)=>{
  if (req.url.startsWith('/todo/view/')) {
    let data = fs.readFileSync('data/todoData.json', 'utf8');
    data=JSON.parse(data);
    let todoId = req.url.split('/')[3];
    let html = preseter.viewTodo(data, req.userName, todoId);
    res.write(html);
    res.end();
  }
})

app.get('/',(req,res)=>{
  res.setHeader('Content-Type','text/html');
  res.write(loginPage.replace('LOGIN_MESSAGE',req.cookies.message||''));
  res.end();
})

app.get('/login',(req,res)=>{
  res.setHeader('Content-Type','text/html');
  res.write(loginPage.replace('LOGIN_MESSAGE',req.cookies.message||''));
  res.end();
});

app.get('/logout',(req,res)=>{
  let html=`<p>successfully loggedout</p><br><br><a href=/login>login here</a>`
  res.setHeader('Content-Type','text/html');
  res.setHeader('Set-Cookie',`sessionid=0;Max-Age=5`);
  res.write(html);
  res.end();
});

app.get('/home',(req,res)=>{
  let html = getHomePageContent(req.userName)
  res.setHeader('Content-Type','text/html');
  res.write(html);
  res.end();
});

app.get('/todo/create',(req,res)=>{
  let html = fs.readFileSync('public/createTodo','utf8');
  res.setHeader('Content-Type','text/html');
  res.write(html)
  res.end();
});

app.post('/login',(req,res)=>{
  let user = registeredUsers.find(u=>req.body.userName==u.userName);
  if(user) {
    let sessionid = app.sessionManager.createSession(req.body.userName);
    let html = getHomePageContent(user.userName);
    res.setHeader('Set-Cookie',[`sessionid=${sessionid}`,`message='';Max-Age=0`]);
    res.setHeader('Content-Type','text/html');
    res.write(html);
    res.end();
    return;
  }
  res.setHeader('Set-Cookie',`message=login failed;Max-Age=5`);
  res.redirect('/login');
});

module.exports = app;
