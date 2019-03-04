(function(){

  var search = function(event){
    event.preventDefault();
    console.log('search');
    
    var searchTerm = document.getElementById('search-input').value;
    
    searchMovies(searchTerm, 1, (data) => {
      var resultsContainer = document.getElementById('searchResults');

      if(data.Response){
        var movies = data.Search;
        var _html = '';
        movies.forEach(movie => {
          _html += printTmplMini(movie);
        });
        resultsContainer.innerHTML =  _html;
      }else{

      }
    });
  }
  
  var form = document.getElementById('searchForm');
  form.addEventListener('submit', search);

})()