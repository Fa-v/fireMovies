const {
  createMovie,
  getAllMovies,
  getMovie,
  updateMovie,
  deleteMovie
} = require('./database');
const { getMovieData } = require('./api');

function getMovies(req, res) {
  getAllMovies().then(data => {
    res.send(data);
  });
}

function getCurrentMovie(req, res) {
  const id = req.params.id;
  getMovie(id)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(error => res.status(500).send(error));
}

function newMovie(req, res) {
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
}

function modifyMovie(req, res) {
  const { id, title } = req.body;

  updateMovie(id, title)
    .then(() => res.status(200).send({ id, name: title }))
    .catch(error => res.status(500).send(error));
}

function deleteCurrentMovie(req, res) {
  const id = req.params.id;
  deleteMovie(id).then(() => res.status(200).send({ id }));
}

module.exports = {
  getMovies,
  getCurrentMovie,
  newMovie,
  modifyMovie,
  deleteCurrentMovie
};
