const db = new DataBase();

/**
 * Cargamos las películas guardadas
 */

getMovies();

/**
* Proceso de búsqueda de películas
* @param {evento} event 
*/
var search = function(event){
  event.preventDefault();    
  var searchTerm = document.getElementById('search-input').value;
  
  //en cada búsqueda ocultamos el alert de los resultados
  var alert = document.getElementById('alert-search');
  alert.classList.add('invisible');
  
  searchMovies(searchTerm, 1, (data) => {
    var resultsContainer = document.getElementById('searchResults');
    
    if(data.Response === "True"){
      var movies = data.Search;
      var _html = '';
      movies.forEach(movie => {
        _html += printTmplMini(movie);
      });
      resultsContainer.innerHTML =  _html;
    }else{
      alert.classList.remove('invisible')
    }
  });
}

var form = document.getElementById('searchForm');
form.addEventListener('submit', search);



/**
* Proceso de consulta de detalles de la película a la API
*/

function getDetailsAPI(imdbID, btnDelete = false){
  document.getElementById('modalAlerts').innerHTML = '';
  getMovieData(imdbID, data => {

    let editable = false;
    document.getElementById('btn-save-modal').dataset.imdb = imdbID;
    document.getElementById('btn-save-modal').dataset.details = JSON.stringify(data);
    //mostramos el btn de guardar o borrar en función de sí está en la bbdd o nó
    if(btnDelete){
      document.getElementById('btn-delete-modal').dataset.imdb = imdbID;
      document.getElementById('btn-edit-modal').dataset.imdb = imdbID;
      document.getElementById('btn-delete-modal').classList.remove('d-none');
      document.getElementById('btn-save-modal').classList.add('d-none');
      editable = true;
    }

    var _html = printDetails(data, editable);
    document.getElementById('modalContent').innerHTML = _html;
    $('#detailsMovie').modal('show')

  })
}

/**
 * 
 * Proceso almacenamiento de los detalles de la película
 */

 async function saveMovie(target){

  var imdbID = target.dataset.imdb;
  var details = (target.dataset.details ? JSON.parse(target.dataset.details) : null)
  //console.log(imdbID);
  if(!details){
    var details = await new Promise((resolve, reject) => {
      getMovieData(imdbID, data => {
        resolve(data);
      });
    })
  }
    
  var id = await db.saveMovie(imdbID, details);
  document.getElementById('searchResults').innerHTML = '';
  document.getElementById('search-input').value = '';
  $('#detailsMovie').modal('hide');
  getMovies();
 }

 /**
  * Recargamos la vista con las películas guardadas
  */

function getMovies(){
  
  db.getMovies().then(movies => {
    var html = movies.reverse().map(cardMovie)
    document.getElementById('movies').innerHTML = html.join('');
  })
}


/**
 * Borramos la película seleccionada
 */

function deleteMovie(target){

  var imdbID = target.dataset.imdb;
  if(db.deleteMovie(imdbID)){
    getMovies();
    $('#detailsMovie').modal('hide');
  }
}

/**
 * Editamos la película
 */

function editMovie(target){

  var imdbID = target.dataset.imdb;
  var newData = {
    Title: document.getElementById('movieTitle').innerText,
    Plot: document.getElementById('moviePlot').innerText,
    Director: document.getElementById('movieDirector').innerText,
    Actors: document.getElementById('movieActors').innerText,
    Writer: document.getElementById('movieWriter').innerText,
    Country: document.getElementById('movieCountry').innerText,
    Genre: document.getElementById('movieGenre').innerText,
    Released: document.getElementById('movieReleased').innerText,
  }

  if(db.editMovie(imdbID, newData)){
    document.getElementById('btn-edit-modal').classList.add('d-none');
    document.getElementById('modalAlerts').innerHTML = '<div class="alert alert-success" role="alert">Película editada con éxito</div>';
    getMovies();
  }else{
    document.getElementById('modalAlerts').innerHTML = '<div class="alert alert-error" role="alert">Ohh!! Ha ocurrido un error al editar.</div>';
  }
}


/**
* Proceso de consulta de detalles de la película a la API
*/

function getDetails(imdbID){

  document.getElementById('modalAlerts').innerHTML = '';
  db.getMovie(imdbID)
  .then((data) => {
    document.getElementById('btn-delete-modal').dataset.imdb = imdbID;
    document.getElementById('btn-edit-modal').dataset.imdb = imdbID;
    document.getElementById('btn-delete-modal').classList.remove('d-none');
    document.getElementById('btn-save-modal').classList.add('d-none');
    let editable = true;
    

    var _html = printDetails(data, editable);
    document.getElementById('modalContent').innerHTML = _html;
    $('#detailsMovie').modal('show')
  })

}