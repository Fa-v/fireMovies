const firebase = require('firebase');
const config = require('../../config');
firebase.initializeApp(config.firebaseConfig);
const db = firebase.database().ref('apiRest');

function createMovie(data) {
  return db.push(data);
}

function getAllMovies() {
  return new Promise((resolve, reject) => {
    db.once(
      'value',
      snapshot => {
        const data = snapshot.val() || {};
        let newData = Object.keys(data).map(id => {
          data[id].id = id;
          return data[id];
        });
        resolve(newData);
      },
      err => reject(err)
    );
  });
}

function getMovie(id) {
  return new Promise((resolve, reject) => {
    db.child(id).once(
      'value',
      snapshot => {
        resolve(snapshot.val());
      },
      error => reject(error)
    );
  });
}

function updateMovie(id, title) {
  return db.child(id).update({ title: title });
}

function deleteMovie(id) {
  return db.child(id).remove();
}

module.exports = {
  createMovie,
  getAllMovies,
  getMovie,
  updateMovie,
  deleteMovie
};