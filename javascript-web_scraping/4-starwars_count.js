#!/usr/bin/node

const request = require('request');

const url = process.argv[2];

request(url, (error, response, body) => {
  if (error) {
    console.log(error);
  } else {
    const films = JSON.parse(body).results;
    const wedgeFilmsCount = films.reduce((count, film) => {
      if (film.characters.some(character => character.endsWith('/18/'))) {
        return count + 1;
      }
      return count;
    }, 0);
    console.log(wedgeFilmsCount);
  }
});
