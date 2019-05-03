const {
  getAllFilms,
  createFilm,
  getFilmDetails,
  updateFilm,
  deleteFilm
} = require('./database');
const { getMovieData } = require('./api');

function getAllMovies(req, res, next) {
  getAllFilms().then(data => {
    res.render('index', { data: data });
  });
}

function createMovie(req, res, next) {
  getMovieData(req.body.title)
    .then(res => createFilm(res))
    .then(data => res.redirect('/'));
}

function getMovieDetail(req, res) {
  getFilmDetails(req.params.id).then(data => {
    res.render('details', { movie: data });
  });
}

function updateMovie(req, res, next) {
  const newTitle = req.body.title.trim();
  updateFilm(req.params.id, newTitle).then(_ => {
    res.redirect('/');
  });
}

function deleteMovie(req, res) {
  deleteFilm(req.params.id).then(_ => res.redirect('/'));
}

module.exports = {
  getAllMovies,
  createMovie,
  getMovieDetail,
  updateMovie,
  deleteMovie
};
