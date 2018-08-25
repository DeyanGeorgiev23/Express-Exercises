const http = require('http');
const port = 3000;
const handlers = require('./handlers');
const url = require('url');

http.createServer((req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname;
    for (let handler of handlers) {
        if (!handler(req, res)) {
            break;
        };
    };
}).listen(port);
console.log(`Server listen on port ${port}...`);