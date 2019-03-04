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

  var mini_tmpl  = `
    <div class="card movie-mini-card" style="width: 18rem;" >
      <img src="${data.Poster}" class="card-img-top" alt="${data.Title}">
      <div class="card-body">
        <h5 class="card-title">${data.Title}</h5>
        <p>
          <span class="badge badge-light">${data.Year}</span>
          <span class="badge badge-${classType}">${data.Type}</span>
        </p>
        <button type="button" id="more-info-btn" class="btn btn-primary btn-sm" data-imdb="${data.imdbID}"><i class="fas fa-info-circle"></i> Más Info</button>
        <button type="button" id="save-btn" class="btn btn-danger btn-sm" data-imdb="${data.imdbID}"><i class="fas fa-heart"></i> Guardar</button>
      </div>
    </div>
  `;

  return mini_tmpl;
}