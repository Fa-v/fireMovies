const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('../config');
const {
  createMovie,
  getAllMovies,
  getMovie,
  updateMovie,
  deleteMovie
} = require('../back/lib/database');
const { getMovieData } = require('../back/lib/api');
const app = express();
const port = config.port;

app.use(helmet());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/movies', (req, res) => {
  getAllMovies().then(data => {
    res.send(data);
  });
});

app.get('/api/movies/:id', (req, res) => {
  const id = req.params.id;
  getMovie(id)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(error => res.status(500).send(error));
});

app.post('/api/movies', (req, res) => {
  const title = req.body.title;
  getMovieData(title)
    .then(data => {
      return createMovie(data);
    })
    .then(() => {
      res.status(200).send({ name: title });
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

app.put('/api/movies/', (req, res) => {
  const { id, title } = req.body;

  updateMovie(id, title)
    .then(() => res.status(200).send({ id, name: title }))
    .catch(error => res.status(500).send(error));
});

app.delete('/api/movies/:id', (req, res) => {
  const id = req.params.id;
  deleteMovie(id).then(() => res.status(200).send({ id }));
});

app.listen(port);
