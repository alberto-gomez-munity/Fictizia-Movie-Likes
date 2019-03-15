/**
 * Librería de funciones helpers
 */

function editInput(element, action){

  if(action == 'in'){
    element.contentEditable = 'true';
    
    //asocio el contenido actual a un atributo data, para poder recuperarlo al salir
    let currentContent = element.innerText;
    element.dataset.content = currentContent;
  }else{
    element.contentEditable = 'false';

    let newContent = element.innerText;
    let currentContent = element.dataset.content;
    //comparo ambos valores y si son diferentes lo editamos en la base de datos
    if(newContent !== currentContent){
      document.getElementById('btn-edit-modal').classList.remove('d-none');
    }
    element.dataset.content = '';
  }
}