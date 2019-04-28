const firebase = require('firebase');
const config = require('../config');
firebase.initializeApp(config.firebaseConfig);
const moviesDb = firebase.database().ref('filmsServer');

function getAllFilms() {
  return new Promise((resolve, reject) => {
    moviesDb.once(
      'value',
      snapshot => {
        resolve(snapshot.val());
      },
      error => reject(error)
    );
  });
}

function createFilm(data) {
  return moviesDb.push(data);
}

function updateFilm(id, data) {
  return moviesDb.child(id).update({ title: data });
}

function deleteFilm(id) {
  return moviesDb.child(id).remove();
}

module.exports = { getAllFilms, createFilm, updateFilm, deleteFilm };
