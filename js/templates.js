'use strict'

function printTmplMini(data) {

  switch(data.Type) {
    case 'series':
      var classType = 'success';
      break;
    case 'episode':
      var classType = 'warning';
      break;
    default:
      var classType = 'primary';
      break;
  }

  switch(data.Poster) {
    case 'N/A':
      var image = '<img src="https://dummyimage.com/300x450/ddd/ffffff&text=No+image" class="card-img-top" alt="no hay imagen">';
      break;
    default:
      var image = `<img src="${data.Poster}" class="card-img-top" alt="${data.Title}">`;
      break;
  }
  
  var mini_tmpl  = `
    <div class="card movie-mini-card" style="width: 18rem;" >
      ${image}
      <div class="card-body">
        <h5 class="card-title">${data.Title}</h5>
        <p>
          <span class="badge badge-light">${data.Year}</span>
          <span class="badge badge-${classType}">${data.Type}</span>
        </p>
        <div class="button-group">
          <button onclick="getDetailsAPI('${data.imdbID}')" type="button" class="more-info-btn btn btn-primary btn-block btn-sm mb-2" data-imdb="${data.imdbID}"><i class="fas fa-info-circle"></i> Más Info</button>
          <button onclick="saveMovie(this)" data-imdb="${data.imdbID}" type="button" class="save-btn btn btn-danger btn-block btn-sm" data-imdb="${data.imdbID}"><i class="fas fa-heart"></i> Guardar</button>
        </div>
      </div>
    </div>
  `;

  return mini_tmpl;
}

function printDetails(data, editable = false){

  switch(data.Poster) {
    case 'N/A':
      var image = '<img src="https://dummyimage.com/300x450/ddd/ffffff&text=No+image" class="card-img-top" alt="no hay imagen">';
      break;
    default:
      var image = `<img src="${data.Poster}" class="card-img-top" alt="${data.Title}">`;
      break;
  }

  var editableAttr = (editable ? 'onclick="editInput(this,\'in\')" onblur="editInput(this,\'out\')"' : '');
  var editableClass = (editable ? 'editable' : '');

  var details_tmpl = `
    <h2 ${editableAttr} class="${editableClass}" id="movieTitle">${data.Title}</h2>
    <p ${editableAttr} class="${editableClass}" id="moviePlot">${data.Plot}</p>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4">${image}</div>
        <div class="col-md-8 ml-auto">
          <table class="table">
            <tbody>
              <tr>
                <th>Dirección:</th>
                <td ${editableAttr} class="${editableClass}" id="movieDirector">${data.Director}</td>
              </tr>
              <tr>
                <th>Actores:</th>
                <td ${editableAttr} class="${editableClass}" id="movieActors">${data.Actors}</td>
              </tr>
              <tr>
                <th>Escrita por:</th>
                <td ${editableAttr} class="${editableClass}" id="movieWriter">${data.Writer}</td>
              </tr>
              <tr>
                <th>País:</th>
                <td ${editableAttr} class="${editableClass}" id="movieCountry">${data.Country}</td>
              </tr>
              <tr>
                <th>Género:</th>
                <td ${editableAttr} class="${editableClass}" id="movieGenre">${data.Genre}</td>
              </tr>
              <tr>
                <th>Lanzamiento:</th>
                <td ${editableAttr} class="${editableClass}" id="movieReleased">${data.Released}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  return details_tmpl;
}

function cardMovie(data){

  switch(data.Poster) {
    case 'N/A':
      var image = '<img src="https://dummyimage.com/300x450/ddd/ffffff&text=No+image" class="card-img-top" alt="no hay imagen">';
      break;
    default:
      var image = `<img src="${data.Poster}" class="card-img-top" alt="${data.Title}">`;
      break;
  }

  var card_tmpl = `
  <div class="col-md-4">
    <div class="card mb-4 shadow-sm" onclick="getDetails('${data.imdbID}',true)">
      ${image}
      <div class="card-body">
        <h5 class="card-title">${data.Title}</h5>
        <p class="card-text">${data.Plot}</p>
        <div class="d-flex justify-content-between align-items-center">
          <small class="text-muted">Año: ${data.Year}</small>
        </div>
      </div>
    </div>
  </div>`;

  return card_tmpl;
}