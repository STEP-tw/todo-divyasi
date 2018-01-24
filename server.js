const http = require('http');
const PORT = 5000;
const app = require('./app.js');
const fs = require('fs');
const SessionManager = require('./lib/sessionManager.js');
const UserStore = require('./lib/userStore.js');

app.sessionManager = new SessionManager();
app.userStore = new UserStore(fs,"./data/todoData.json");

const server = http.createServer(app);
server.on('error',e=>console.error('**error**',e.message));
server.listen(PORT,(e)=>console.log(`server listening at ${PORT}`));
