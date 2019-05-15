const config = require('../../config');
const got = require('got');

function normalizeData(data) {
  return new Promise((resolve, reject) => {
    resolve(
      Object.keys(data).reduce(function(newData, key) {
        let newKey = key.toLowerCase();
        if (data[key] === 'N/A' || (data[key] === 'N/A') === 'false') {
          data[key] = false;
        }
        newData = {
          ...newData,
          [newKey]: data[key]
        };
        return newData;
      }, {})
    ),
      error => reject(error);
  });
}

async function getMovieData(title) {
  const url = `http://www.omdbapi.com/?t=${title}&apikey=${config.omdbKey}`;
  try {
    const response = await got(url);
    const data = await normalizeData(JSON.parse(response.body));
    return data;
  } catch (error) {
    return error;
  }
}

module.exports = { getMovieData };
