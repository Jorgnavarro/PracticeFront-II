const formulario = document.querySelector('form');
const nombre = document.querySelector('#nombre');
const pass = document.querySelector('#pass');
const tel = document.querySelector('#tel');
const pelis = document.querySelector('#peliculas');

//const hobbies = document.getElementsByName('hobbies');
//const nacionalidad = document.getElementsByName('nacionalidad');

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

    persona.nombre = normalizarNombre(nombre.value);
    persona.pass = eliminarEspacios(pass.value);
    persona.tel = eliminarEspacios(tel.value);

    const peliculas = normalizarNombre(pelis.value).split(',')
    persona.peliculas = peliculas

    // hobbies.forEach((hobbie) => {
    //     if(hobbie.checked) {
    //         let text = document.querySelector(`label[for=${hobbie.id}]`)
    //         persona.hobbies.push(text.innerText)
    //     }
    // })

    const hobbies = document.querySelectorAll('input[name="hobbies"]:checked')
    hobbies.forEach(hobbie => {
        let text = document.querySelector(`label[for=${hobbie.id}]`)
        persona.hobbies.push(text.innerText)
    });

    const nacionalidad = document.querySelector('input[name="nacionalidad"]:checked')
    const pais = document.querySelector(`label[for=${nacionalidad.id}]`)
    persona.nacionalidad = pais.innerText

    console.log(persona)
});