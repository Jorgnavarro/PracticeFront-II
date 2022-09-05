const formulario = document.querySelector('form');
const nombre = document.querySelector('#nombre');
const pass = document.querySelector('#pass');
const tel = document.querySelector('#tel');
const pelis = document.querySelector('#peliculas');

//const hobbies = document.getElementsByName('hobbies');
const nacionalidad = document.getElementsByName('nacionalidad');

const persona = {
    nombre: "",
    pass: "",
    tel: "",
    hobbies: [],
    nacionalidad: "",
    peliculas: [],
};

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    persona.nombre = normalizarTexto(nombre.value);
    persona.pass = eliminarEspacios(pass.value);
    persona.tel = eliminarEspacios(tel.value);

    persona.peliculas = normalizarTexto(pelis.value).split(',')

    const hobbies = document.querySelectorAll('input[name="hobbies"]:checked');
    hobbies.forEach(hobbie => {
        //document.querySelector(`label[for="${hobbie.id}"]`).innerText
        //hobbie.parentElement.innerText => <label >VideoJuegos <input /></label>

        persona.hobbies.push(hobbie.id.replace('hobbies',''))
    })

    nacionalidad.forEach(pais => {
        if(pais.checked){
            persona.nacionalidad = pais.id.replace('nacionalidad','')
        }
    });

    // const pais = document.querySelectorAll('input[name="nacionalidad"]:checked');
    // persona.nacionalidad = pais.id.replace('nacionalidad','');

    console.log(persona);
    formulario.reset();
});

const normalizarTexto = (value) => value.trim().toLowerCase();
const eliminarEspacios = (value) => value.trim();