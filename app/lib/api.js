const got = require('got');
const config = require('../config');

async function getMovieData(title) {
  const url = `http://www.omdbapi.com/?t=${title}&apikey=${config.omdbKey}`;
  try {
    const response = await got(url);
    return JSON.parse(response.body);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getMovieData };
