const timeStamp = require('./serverUtility/time.js').timeStamp;
const WebApp = require('./webapp');
const fs = require('fs');
const lib = require('./lib/handlers.js');

let registeredUsers = [{userName:'divya'}];

let loginPage = fs.readFileSync('public/login','utf8');
let homePage = fs.readFileSync('public/homePage','utf8');

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
  let allowedUrlForLoogedUser = ['/', 'homePage','todo'];
  if (req.urlIsOneOf(allowedUrlForLoogedUser) && !req.user) {
    res.redirect('/login');
  }
}
app.usePostProcess(redirectLoggedOutUserToLogin);

app.use((req,res)=>{
  logger(fs,req,res);
})


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

app.get('/homePage',(req,res)=>{
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
 lib.registerUser(session,registeredUsers,req,res)
});

module.exports = app;
