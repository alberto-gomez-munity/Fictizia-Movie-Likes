'use strict'

class DataBase {
  
  constructor(){
    console.log('clase inicializada');
    this.database = firebase.database();
    
  }

  saveMovie(id,data){

    return this.database.ref('movies/'+id).set(data)
    .then((data) => {
      return id;
    })
  }

  getMovies(){

    var movies = [];
    var moviesRef = this.database.ref('movies/');
    return moviesRef.once('value').then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        movies.push(childData);
      });
      return movies
    });
  }
}

