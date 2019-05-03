const firebase = require('firebase');
const config = require('../config');
firebase.initializeApp(config.firebaseConfig);
const moviesDb = firebase.database().ref('filmsServer');

function getAllFilms() {
  return new Promise((resolve, reject) => {
    moviesDb.once(
      'value',
      snapshot => {
        const data = snapshot.val();
        let newData = Object.keys(data).map(id => {
          data[id].id = id;
          return data[id];
        });
        resolve(newData);
      },
      error => reject(error)
    );
  });
}

function createFilm(data) {
  return moviesDb.push(data);
}

function getFilmDetails(id) {
  return new Promise((resolve, reject) => {
    moviesDb.child(id).once(
      'value',
      snapshot => {
        resolve(snapshot.val());
      },
      error => reject(error)
    );
  });
}

function updateFilm(id, title) {
  return moviesDb.child(id).update({ title: title });
}

function deleteFilm(id) {
  return moviesDb.child(id).remove();
}

module.exports = {
  getAllFilms,
  createFilm,
  getFilmDetails,
  updateFilm,
  deleteFilm
};
