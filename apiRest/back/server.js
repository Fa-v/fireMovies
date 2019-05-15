const express = require('express');
const helmet = require('helmet');
const config = require('../config');
const app = express();
const port = config.port;

app.use(helmet());

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.listen(port);
