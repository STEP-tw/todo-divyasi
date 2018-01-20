const timeStamp = require('./utility/time.js').timeStamp;
const WebApp = require('./webapp');
const fs = require('fs');
const utils = require('./utility/utils.js');

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

let redirectLoggedOutUserToLogin = (req, res)=>{
  let allowedUrlForLoogedUser = ['/home'];
  let sessionid = req.cookies.sessionid;
  if (req.urlIsOneOf(allowedUrlForLoogedUser) && !app.sessionManager.getSession(sessionid)) {
    res.redirect('/login');
  }
}

let redirectLoggedUserToHome = (req, res) => {
  let sessionid = req.cookies.sessionid;
  if (req.urlIsOneOf(['/','/login']) && app.sessionManager.getSession(sessionid)) {
    res.redirect('/home');
    return;
  }
}

app.use((req,res)=>{
  logger(fs,req,res);
})
app.use(redirectLoggedOutUserToLogin);

app.use(redirectLoggedUserToHome);

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

app.get('/home',(req,res)=>{
  let html = fs.readFileSync('public/homePage','utf8');
  res.setHeader('Content-Type','text/html');
  res.write(html.replace('LOGIN_MESSAGE',req.cookies.message||''));
  res.end();
});

app.get('/addTodo',(req,res)=>{
  let html = fs.readFileSync('public/addTodo','utf8');
  res.setHeader('Content-Type','text/html');
  res.write(html.replace('LOGIN_MESSAGE',req.cookies.message||''));
  res.end();
});


app.post('/login',(req,res)=>{
  let user = registeredUsers.find(u=>req.body.userName==u.userName);
  if(user) {
    let sessionid = app.sessionManager.createSession(req.body.userName);
  res.setHeader('Set-Cookie',[`sessionid=${sessionid}`,`message='';Max-Age=0`]);
    res.redirect('/home');
    return;
  }
  res.setHeader('Set-Cookie',`message=login failed;Max-Age=5`);
  res.redirect('/login');
});

module.exports = app;
