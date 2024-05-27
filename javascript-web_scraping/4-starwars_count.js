#!/usr/bin/node

const request = require('request');

const url = process.argv[2];

request(url, (error, response, body) => {
  if (error) {
    console.log(error);
  } else {
    const films = JSON.parse(body).results;
    const wedgeFilms = films.filter(film =>
      film.characters.includes('https://swapi-api.hbtn.io/api/people/18/')
    );
    console.log(wedgeFilms.length);
  }
});
