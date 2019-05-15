const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('../config');
const {
  getMovies,
  getCurrentMovie,
  newMovie,
  modifyMovie,
  deleteCurrentMovie
} = require('../back/lib/controller');
const app = express();
const port = config.port;

app.use(helmet());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/movies', getMovies);

app.get('/api/movies/:id', getCurrentMovie);

app.post('/api/movies', newMovie);

app.put('/api/movies/', modifyMovie);

app.delete('/api/movies/:id', deleteCurrentMovie);

app.listen(port);
