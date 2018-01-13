const http = require('http');
const PORT = 5000;
const app = require('./app.js');

const server = http.createServer(app);
server.listen(PORT);
