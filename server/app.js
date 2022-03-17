const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', routes);

console.log('Listening on port 8080');
app.listen(8080);
