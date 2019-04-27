(function() {
  console.log('Hello Movies! 🎬');
  const movies = {};
  const movieInput = document.getElementById('movie');
  const movieList = document.getElementById('movie-list');
  const moviesDb = firebase.database().ref('movies');
  const detailsSect = document.createElement('div');

  /* Get Movies */
  function getMovies() {
    moviesDb.on('value', snapshot => {
      const allMovies = snapshot.val() || {};
      renderMovieList(allMovies);
    });
  }

  /* Add movie */
  function addMovie(data) {
    const normalizedData = normalizeData(data);

    return moviesDb.push(normalizedData);
  }

  /* Update movie */
  function updateMovie(id, title) {
    return moviesDb.child(id).update({ Title: title });
  }

  /* Delete movie */
  function deleteMovie(id) {
    const confirmDelete = window.confirm(
      'Estas segur@ que quieres borrar la peli?'
    );
    if (confirmDelete) {
      return moviesDb.child(id).remove();
    }
  }

  /* Normalize data */
  function normalizeData(data) {
    return Object.keys(data).reduce(function(newData, key) {
      let newKey = key.toLowerCase();
      newData = {
        ...newData,
        [newKey]: data[key]
      };
      return newData;
    }, {});
  }

  /* Fetch data from OMBD API */
  function getMovieDataByTitle(title) {
    const key = '';
    const omDbUrl = `http://www.omdbapi.com/?t=${title}&apikey=${key}`;
    return fetch(omDbUrl).then(response => response.json());
  }

  /* Movie Details */
  function getMovieDetails(id) {
    moviesDb.child(id).once('value', snapshot => {
      const details = snapshot.val();
      renderDetails(details);
    });
  }

  /* Edit title */
  function editDetails(id) {
    const newTitle = prompt('Escribe el nuevo título');
    if (newTitle) {
      updateMovie(id, newTitle);
    }
  }

  /* Hide details section */
  function closeDetails() {
    detailsSect.innerHTML = '';
  }

  /* Render Movie list */
  function renderMovieList(allMovies) {
    const list = document.getElementById('movie-list');
    const template = Object.keys(allMovies)
      .map(id => {
        const movie = allMovies[id];
        return movieListTmpl(movie, id);
      })
      .join('');
    list.innerHTML = template;
  }

  /* Movie list template */
  function movieListTmpl(movie, id) {
    return `<li data-id=${id}>${movie.title}
    <button data-action="details">Details</button>
    <button data-action="edit">Edit</button>
    <button data-action="delete">Delete</button>
    </li>`;
  }

  /* Render Movie details */
  function renderDetails(movieDetails) {
    detailsSect.innerHTML = '';
    const hideDetailsBtn = document.createElement('button');
    hideDetailsBtn.innerText = 'Cerrar X';
    hideDetailsBtn.setAttribute('data-action', 'close');

    template = detailsTmpl(movieDetails);

    detailsSect.insertAdjacentElement('afterbegin', hideDetailsBtn);
    detailsSect.insertAdjacentHTML('beforeend', template);
    movieList.append(detailsSect);
  }

  /* Movie details template */
  function detailsTmpl(data) {
    let template = Object.keys(data)
      .map(key => {
        let html = '';
        if (key === 'poster') {
          return `<img src=${data[key]}/>`;
        }
        return `
          <p>${key}: ${data[key]}</p>
        `;
      })
      .join('');
    return template;
  }

  /* Events */
  movieInput.addEventListener('keyup', function(e) {
    let title = movieInput.value.trim();
    if (e.keyCode === 13 && title) {
      getMovieDataByTitle(title).then(addMovie);
      movieInput.value = '';
    }
  });

  movieList.addEventListener('click', function(e) {
    e.stopPropagation();

    const action = e.target.dataset.action;
    const id = e.target.parentElement.dataset.id;
    if (event.target.nodeName === 'BUTTON') {
      const actions = {
        edit: action => {
          editDetails(id);
        },
        delete: action => {
          deleteMovie(id);
        },
        details: action => {
          getMovieDetails(id);
        },
        close: action => {
          closeDetails();
        }
      };
      actions[action](action);
    }
  });

  getMovies();
  return movies;
})();
