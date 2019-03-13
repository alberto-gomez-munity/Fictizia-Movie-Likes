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
          <button onclick="getDetails('${data.imdbID}')" type="button" class="more-info-btn btn btn-primary btn-block btn-sm mb-2" data-imdb="${data.imdbID}"><i class="fas fa-info-circle"></i> Más Info</button>
          <button onclick="saveMovie(this)" data-imdb="${data.imdbID}" type="button" class="save-btn btn btn-danger btn-block btn-sm" data-imdb="${data.imdbID}"><i class="fas fa-heart"></i> Guardar</button>
        </div>
      </div>
    </div>
  `;

  return mini_tmpl;
}

function printDetails(data){

  switch(data.Poster) {
    case 'N/A':
      var image = '<img src="https://dummyimage.com/300x450/ddd/ffffff&text=No+image" class="card-img-top" alt="no hay imagen">';
      break;
    default:
      var image = `<img src="${data.Poster}" class="card-img-top" alt="${data.Title}">`;
      break;
  }


  var details_tmpl = `
    <h2>${data.Title}</h2>
    <p>${data.Plot}</p>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4">${image}</div>
        <div class="col-md-8 ml-auto">
          <table class="table">
            <tbody>
              <tr>
                <th>Dirección:</th>
                <td>${data.Director}</td>
              </tr>
              <tr>
                <th>Actores:</th>
                <td>${data.Actors}</td>
              </tr>
              <tr>
                <th>Escrita por:</th>
                <td>${data.Writer}</td>
              </tr>
              <tr>
                <th>País:</th>
                <td>${data.Country}</td>
              </tr>
              <tr>
                <th>Género:</th>
                <td>${data.Genre}</td>
              </tr>
              <tr>
                <th>Lanzamiento:</th>
                <td>${data.Released}</td>
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
  <div class="col-md-4" data-imdb="${data.imdbID}">
    <div class="card mb-4 shadow-sm">
      ${image}
      <div class="card-body">
        <h5 class="card-title">${data.Title}</h5>
        <p class="card-text">${data.Plot}</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
            <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
          </div>
          <small class="text-muted">Año: ${data.Year}</small>
        </div>
      </div>
    </div>
  </div>`;

  return card_tmpl;
}