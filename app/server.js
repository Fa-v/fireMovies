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

/**
 * Error handler
 * @see https://gist.github.com/zcaceres/2854ef613751563a3b506fabce4501fd
 * @see https://thecodebarbarian.com/80-20-guide-to-express-error-handling
 */
app.get('*', function(req, res, next) {
  let err = new Error('Page Not Found');
  err.statusCode = 404;
  err.shouldRedirect = true;
  next(err);
});

app.use(function(err, req, res, next) {
  if (!err.statusCode) err.statusCode = 500;
  err;

  if (err.shouldRedirect) {
    res.render('404');
  } else {
    res.status(err.statusCode).send(err.message);
  }
});

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
