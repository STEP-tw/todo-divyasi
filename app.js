const timeStamp = require('./utility/time.js').timeStamp;
const WebApp = require('./webapp');
const fs = require('fs');
const lib = require('./lib/handlers.js');
const utils = require('./utility/utils.js');

let loginPage = fs.readFileSync('public/login','utf8');
let home = fs.readFileSync('public/homePage','utf8');

let session = {};
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

let redirectLoggedOutUserToLogin = (res, req)=>{
  let allowedUrlForLoogedUser = ['/', 'home','todo'];
  if (req.urlIsOneOf(allowedUrlForLoogedUser) && !req.user) {
    res.redirect('/login');
  }
}

let redirectLoggedUserToHome = (req, res) => {
  if (req.urlIsOneOf(['/','/login']) && utils.isValidSession(app.registeredUsers, req)) {
    res.redirect('/home');
    return;
  }
}
app.usePostProcess(redirectLoggedOutUserToLogin);

app.use((req,res)=>{
  logger(fs,req,res);
})

app.use(redirectLoggedUserToHome);

app.get('/',(req,res)=>{
  res.setHeader('Content-Type','text/html');
  res.write(loginPage);
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
 lib.registerUser(session,app.registeredUsers,req,res)
});

module.exports = app;
