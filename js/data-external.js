'use strict'

/**
 * Config OMDb API
 * apiKey = 2bd64f66
 */

var END_POINT = 'http://www.omdbapi.com/?apikey=2bd64f66';

function ajaxRequest(url, cb) {

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      cb(data)  
    })
    .catch(function(error) {
      console.log(error)
    });
}

function searchMovies(termSearch, page = 1, cb) {
  
  var url = encodeURI(`${END_POINT}&s=${termSearch}&=page=${page}`);

  ajaxRequest(url, (data) => {
    //console.log(data);
    cb(data);
  })
}


function getMovieData(imdb, cb){

  var url = encodeURI(`${END_POINT}&i=${imdb}`);

  ajaxRequest(url, (data) => {
    //console.log(data);
    cb(data);
  })
}
