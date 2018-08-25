const env = 'development';
const express = require('express');
const settings = require('./config/settings')[env];
const database = require('./config/database');
const server = require('./config/server');
const routes = require('./config/routes');
const port = settings.port;  

database(settings);

const app = express();

server(app);
routes(app);

app.listen(port, () => {
    console.log(`Express ready and listening on port ${port}...`);
});