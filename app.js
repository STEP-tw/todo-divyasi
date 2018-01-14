const timeStamp = require('./serverUtility/time.js').timeStamp;
const WebApp = require('./webapp');
const fs = require('fs');
const lib = require('./lib/handlers.js');

let registeredUsers = ['divya'];


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

app.use((req,res)=>{
  logger(fs,req,res);
})


app.get('/',(req,res)=>{
  res.redirect('/login.html');
})

app.get('/login.html',(req,res)=>{
  let html = fs.readFileSync('public/login.html','utf8');
  res.setHeader('Content-Type','text/html');
  res.write(html.replace('LOGIN_MESSAGE',req.cookies.message||''));
  res.end();
});

app.get('/homePage.html',(req,res)=>{
  let html = fs.readFileSync('public/homePage.html','utf8');
  res.setHeader('Content-Type','text/html');
  res.write(html.replace('LOGIN_MESSAGE',req.cookies.message||''));
  res.end();
});

app.get('/todo.html',(req,res)=>{
  let html = fs.readFileSync('public/todo.html','utf8');
  res.setHeader('Content-Type','text/html');
  res.write(html.replace('LOGIN_MESSAGE',req.cookies.message||''));
  res.end();
});

app.post('/login.html',(req,res)=>{
 lib.registerUser(registeredUsers,req,res)
});


module.exports = app;
