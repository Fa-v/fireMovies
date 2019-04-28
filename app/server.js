const express = require('express');
const helmet = require('helmet');
const config = require('./config');
const app = express();
const port = config.port;
const {
  getAllMovies,
  createMovie,
  getMovieDetail,
  updateMovie,
  deleteMovie
} = require('./lib/controller');
const db = require('./lib/database');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(helmet());

app.get('/', getAllMovies);
app.get('/create/:name', createMovie);
app.get('/movies/:id', getMovieDetail);
app.get('/movies/:id/update', updateMovie);
app.get('/movies/:id/delete', deleteMovie);

app.listen(port, function() {
  console.log(`listening from port ${port}`);
});
