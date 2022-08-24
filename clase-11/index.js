const formulario = document.querySelector('form');
const nombre = document.querySelector('#nombre');
const pass = document.querySelector('#pass');
const tel = document.querySelector('#tel');
const hobbies = document.getElementsByName('hobbies');
const nacionalidad = document.getElementsByName('nacionalidad');

const persona = {
    nombre: "",
    pass: "",
    tel: "",
    hobbies: [],
    nac: ""
}

formulario.addEventListener('submit', function(evento){
    evento.preventDefault();

    persona.nombre = normalizarNombre(nombre.value);
    persona.pass = pass.value;
    persona.tel = tel.value;

    hobbies.forEach( (hobbie, i) => {
        const labels = document.querySelectorAll('fieldset label')
        if(hobbie.checked){
            console.log(hobbie.id)
            console.log(labels[i])
        }
    })
    nacionalidad.forEach( pais => {
        if(pais.checked){
            console.log(pais.id)
        }
    })

    console.table(persona)

    // limpiamos los campos
    formulario.reset();
    
});

function normalizarNombre(nombre) {
    return nombre.toUpperCase();
}
