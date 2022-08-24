const formulario = document.querySelector('form');
const nombre = document.querySelector('#nombre');
const pass = document.querySelector('#pass');
const tel = document.querySelector('#tel');

// const hobbies = document.querySelectorAll('[name="hobbies"]');
const hobbies = document.getElementsByName('hobbies');
const nacionalidad = document.getElementsByName('nacionalidad');

const persona = {
    nombre: "",
    pass: "",
    tel: "",
    hobbies: [],
    nacionalidad: ""
};

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    persona.nombre = normalizarNombre(nombre.value);
    persona.pass = eliminarEspacios(pass.value);
    persona.tel = eliminarEspacios(tel.value);

    //const hobbies = document.querySelectorAll('input[name="hobbies"]:checked');

    hobbies.forEach(hobbie => {
        console.log(hobbie.id, hobbie)
    });


    console.log(document.querySelector('input[name="nacionalidad"]:checked'))
});

const normalizarNombre = (value) => value.trim().toLowerCase();
const eliminarEspacios = (value) => value.trim();
