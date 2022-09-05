/*
REQUERIMIENTOS PARA LA APP

- utilizar el formulario para captar el texto ingresado

- implementar el evento "submit", utilizarlo para guardar el comentario en un array

- cada vez que se agrega un nuevo comentario renderizarlo en una etiqueta "p"(sacar del html los hardcodeados y hacerlo dinamico)

- constantemente guardar la informacion en localStorage, si se recarga la pagina deberian mantenerse los comentarios
*/

/* --------------------------------- ESTADO --------------------------------- */
// apenas arranca  chequeo de guardar los comentarios previos
let listadoComentarios = JSON.parse(localStorage.getItem('comentarios')) || [] ;


/* ---------------------------------- NODOS --------------------------------- */
const formulario = document.querySelector('form');
const inputComentario = document.querySelector('#comentario');
const cajaComentarios = document.querySelector('.comentarios');


renderizarComentarios();

formulario.addEventListener( 'submit', function(evento){
    evento.preventDefault();

    // agregar al array
    listadoComentarios.push(inputComentario.value)


    // guardo en local
    localStorage.setItem('comentarios', JSON.stringify(listadoComentarios));

    // renderizar
    renderizarComentarios();

    formulario.reset();
})


/* -------------------------------- FUNCIONES ------------------------------- */
function renderizarComentarios(){
    cajaComentarios.innerHTML=""
    listadoComentarios.forEach(e => cajaComentarios.innerHTML += `<p>${e}</p>`);
}