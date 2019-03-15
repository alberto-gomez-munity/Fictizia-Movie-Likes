'use strict'

class DataBase {
  
  constructor(){
    console.log('clase inicializada');
    this.database = firebase.database();
    
  }

  saveMovie(id,data){

    //guardo una señal temporal para poder ordenar los resultados al recuperarlos
    let time = new Date().getTime();
    data.time = time;
    
    return this.database.ref('movies/'+id).set(data)
    .then((data) => {
      return id;
    })
    .catch(() => {return false})
  }

  getMovies(){

    var movies = [];
    var moviesRef = this.database.ref('movies/').orderByChild('time');
    return moviesRef.once('value').then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        movies.push(childData);
      });
      return movies
    })
    .catch(() => {return false})
  }

  getMovie(imdb){

    var movies = [];
    var moviesRef = this.database.ref('movies/' + imdb);
    return moviesRef.once('value').then(function(snapshot) {
      return snapshot.val();
    })
    .catch(() => {return false})
  }

  deleteMovie(imdb){
    return this.database.ref('movies/' + imdb).remove()
    .then(() => {return true})
    .catch(() => {return false})
  }

  editMovie(id,data){
    console.log(id);
    console.log(data);

    return this.database.ref('movies/'+id).update(data)
    .then(() => {return true})
    .catch(() => {return false})
  }
}

