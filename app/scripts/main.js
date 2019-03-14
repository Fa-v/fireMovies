console.log('Hello Movies! 🎬');

const moviesDb = firebase.database().ref('movies');

/* Get Movies */
function getMovies() {
  moviesDb.once('value', snapshot => {
    const allMovies = snapshot.val();
  });
}

getMovies();

/* Get Movie Details */

/* Add movie */

/* Update movie */

/* Delete movie */
