const express = require('express');
const helmet = require('helmet');
const app = express();
const port = process.env.PORT || 3000;

const {
  getAllMovies,
  createMovie,
  getMovieDetail,
  updateMovie,
  deleteMovie
} = require('./lib/controller');

app.use(helmet());
app.get('/', getAllMovies);
app.get('/create/:name', createMovie);
app.get('/movies/:id', getMovieDetail);
app.get('/movies/:id/update', updateMovie);
app.get('/movies/:id/delete', deleteMovie);

app.listen(port, function() {
  console.log(`listening from port ${port}`);
});
