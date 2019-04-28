const {
  getAllFilms,
  createFilm,
  updateFilm,
  deleteFilm
} = require('./database');

function getAllMovies(req, res, next) {
  getAllFilms()
    .then(data => res.json(data))
    .then(next);
}

function createMovie(req, res, next) {
  const newTitle = { title: req.params.name };
  createFilm(newTitle).then(res.send('Movie created'));
}

function getMovieDetail(req, res) {
  res.send('Movie detail');
}

function updateMovie(req, res, next) {
  updateFilm(req.params.id, 'bambi').then(res.send());
}

function deleteMovie(req, res) {
  deleteFilm(req.params.id).then(res.send('Movie deleted'));
}

module.exports = {
  getAllMovies,
  createMovie,
  getMovieDetail,
  updateMovie,
  deleteMovie
};
