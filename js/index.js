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
* Proceso de consulta de detalles de la película
*/

function getDetails(imdbID){
  getMovieData(imdbID, data => {
    console.log(imdbID);

    document.getElementById('btn-save-modal').dataset.imdb = imdbID;
    document.getElementById('btn-save-modal').dataset.details = JSON.stringify(data);

    var _html = printDetails(data);    
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
  
  var db = new DataBase();
  
  var id = await db.saveMovie(imdbID, details);
  console.log(id);
  getMovies();
 }

 /**
  * Recargamos la vista con las películas guardadas
  */

  function getMovies(){
    var db = new DataBase();
    db.getMovies().then(movies => {
      var html = movies.reverse().map(cardMovie)
      document.getElementById('movies').innerHTML = html.join('');
    })
    
    
  }
