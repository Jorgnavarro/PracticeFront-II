const icono = document.querySelector('#icono')

function alternarTema() {
    const cambio = document.body.classList.toggle('dark');
    
    if(cambio){
        icono.innerText = '🌞'
    } else{
        icono.innerText = '🌛'
    }
}