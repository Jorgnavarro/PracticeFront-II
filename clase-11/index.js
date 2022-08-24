const nombre = document.querySelector('#nombre');
const pass = document.querySelector('#pass');
const tel = document.querySelector('#tel');
const paises = document.getElementsByName('nacionalidad');
const hobbies =  document.getElementsByName('hobbies');
const button = document.querySelector('button');

const persona = {
    nombre:'',
    pass:'',
    telf:'',
}

button.addEventListener('click', (event) => {
    event.preventDefault();

    persona.nombre = nombre.value.toLowerCase();
    persona.pass =  pass.value.trim();
    persona.telf = tel.value.trim();

    hobbies.forEach((hobbie, i) => {
        const labels = document.querySelectorAll('fieldset label')
        if(hobbie.checked) {
            console.log(hobbie)
            console.log(labels[i].innerText)
        }
    })

    paises.forEach(pais => {
        if(pais.checked) console.log(pais)
    });

    mostrarDatos();
});

function mostrarDatos() {
    console.log(persona);
}


