// variables globales
const form = document.querySelector('form');
const busqueda = document.querySelector('#busqueda');
const listadoBusquedas = document.querySelector('#busquedas-realizadas');


let busquedasRealizadas = JSON.parse(localStorage.getItem('historial'));

if(busquedasRealizadas){
    renderizarBusquedas(busquedasRealizadas)
}else{
    busquedasRealizadas = [];
}
console.log(busquedasRealizadas);


//frenamos la accion por defecto del formulario
//disparamos la logica
form.addEventListener('submit', (e)=>{
    e.preventDefault();

    let busquedaActual = captarData();

    //almaceamos las busquedas en localStorage
    //ejecutamos la busqueda
    busquedasRealizadas.push(busquedaActual);
    localStorage.setItem('historial', JSON.stringify(busquedasRealizadas));
    realizarBusqueda(busquedaActual);

    form.reset();
});



//tomamos los datos ingresados en el buscador
//limpiamos el texto
function captarData(){
    return busqueda.value.trim();
}

//renderizar busquedas almacenadas
function renderizarBusquedas(listado) {
    listado.forEach(e => {
        let node = document.createElement('p');
        node.textContent = e;
        listadoBusquedas.appendChild(node)
    });
}

//Redireccionamos la location a google con la url parseada
function realizarBusqueda(texto) {
    //`https://www.google.com/search?q=${texto}`
    window.location.href=`https://www.google.com/search?q=${texto}`
}