const express = require('express');
const helmet = require('helmet');
const config = require('./config');
const path = require('path');
const {
  getAllMovies,
  createMovie,
  getMovieDetail,
  updateMovie,
  deleteMovie
} = require('./lib/controller');
const bodyParser = require('body-parser');

const app = express();
const port = config.port;

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(helmet());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', getAllMovies);
app.get('/movies/:id', getMovieDetail);
app.get('/movies/:id/delete', deleteMovie);
app.post('/create', createMovie);
app.post('/movies/:id/update', updateMovie);

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
