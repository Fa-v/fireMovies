(function() {
  console.log('Hello Movies! 🎬');

  const moviesDb = firebase.database().ref('movies');

  /* Get Movies */
  function getMovies() {
    moviesDb.once('value', snapshot => {
      const allMovies = snapshot.val();
      renderMovieList(allMovies);
    });
  }
  function renderMovieList(allMovies) {
    const list = document.getElementById('movie-list');
    const template = Object.keys(allMovies)
      .map(id => {
        const movie = allMovies[id];
        return getMovieItem(movie, id);
      })
      .join('');
    list.innerHTML = template;
  }

  function getMovieItem(movie, id) {
    return `<li data-id=${id}>${
      movie.Title
    } <button data-action="details">Details</button><button data-action="edit">Edit</button><button data-action="delete">Delete</button></li>`;
  }

  /* Add movie */
  function addMovie(data) {
    return moviesDb.push(data);
  }
  /* Update movie */
  function updateMovie(id, data) {
    return moviesDb.child(id).set(data);
  }

  /* Delete movie */
  function deleteMovie(id) {
    moviesDb.child(id).remove();
  }

  function getMovieDataByTitle(title) {
    const key = '';
    const omDbUrl = `http://www.omdbapi.com/?t=${title}&apikey=${key}`;
    return fetch(omDbUrl).then(response => response.json());
  }
  getMovies();

  const searchBtn = document.getElementById('search-btn');
  const movieInput = document.getElementById('movie');
  const movieList = document.getElementById('movie-list');

  searchBtn.addEventListener('click', function(e) {
    let title = movieInput.value.trim();
    getMovieDataByTitle(title).then(addMovie);
  });

  movieList.addEventListener('click', function(e) {
    e.stopPropagation();

    const action = e.target.dataset.action;
    const id = e.target.dataset.id;
    const actions = {
      edit: id => {
        editDetails(id);
      },
      delete: action => {
        console.log('delete called', action);
      },
      details: action => {
        console.log('details called', action);
      }
    };
    actions[action](action);
  });

  function editDetails(id) {
    console.log('edit', id);
  }
})();
