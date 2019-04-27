function getAllMovies(req, res) {
  res.send('Hello movies! 🎬');
}

function createMovie(req, res) {
  res.send('You have a new movie');
}

function getMovieDetail(req, res) {
  res.send('Movie detail');
}

function updateMovie(req, res) {
  res.send('Update movie title');
}

function deleteMovie(req, res) {
  res.send('Delete a movie');
}

module.exports = {
  getAllMovies,
  createMovie,
  getMovieDetail,
  updateMovie,
  deleteMovie
};
