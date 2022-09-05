
/* -------------------------- estado por defecto ------------------------- */

const estadoUsuario = {
    email: "",
    password: "",
    rol: "",
    legal: false
};

const erroresPresentes = [];

const errores = {
    email: 'Email no válido o incorrecto.',
    password: 'Contraseña no válida o incorrecta.',
    legal: 'Es necesario aceptar los términos y condiciones.'
};


/* ---------------------------------- nodos --------------------------------- */

const rol = document.querySelector('#rol');
const email = document.querySelector('#email');
const legal = document.querySelector('#legal');
const password = document.querySelector('#password');
const cajaErrores = document.querySelector('.errores');
const formulario = document.querySelector('form');


// email.addEventListener('focus', function(){
//     console.log("Se dispario el evento FOCUS");
// });
// email.addEventListener('blur', function(){
//     console.log("Se dispario el evento BLUR");
// });
// email.addEventListener('input', function(evento){
//     console.log(evento.target.value)
//     // console.log("Se dispario el evento onChance");
// });


function listarErrores(listado) {
    listado.forEach(item => {
        let error = `<p><small>${item}</small></p>`
        cajaErrores.innerHTML += error
    })
}


formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    validarEmail(normalizarTexto(email.value));
    validarPassword(normalizarContrasenia(password.value));
    validarLegal(legal.checked);

    listarErrores(erroresPresentes);
})

/* -------------------------------------------------------------------------- */
/*                              NORMALIZAR                                    */
/* -------------------------------------------------------------------------- */
function normalizarTexto(texto) {
    // paso todo a minusculas y quito espacios sobrantes 👇
    return texto.toLowerCase().trim()
}

function normalizarContrasenia(texto) {
    // quito espacios sobrantes 👇
    return texto.trim()
}


/* -------------------------------------------------------------------------- */
/*                              VALIDAR                                       */
/* -------------------------------------------------------------------------- */


function validarEmail(email) {
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    
    //regex.test(email) === false

    //!regex.test(email)
    if(!email.includes('@')){
        erroresPresentes.push(errores.email)
    }

}

function validarPassword(password) {
    if(password.length < 4 || password.length > 8) {
        erroresPresentes.push(errores.password);
    }
}

function validarLegal(verificacion) {
    //!verificacion
    if (verificacion == false) {
        erroresPresentes.push(errores.legal);
    }
}









const nombres = ['pedro', 'carlos', 'jose', 'marcos']
//forEach
//map

//filter => nuevo array
//find => objecto
//findIndex => posicion (numero)

//sort()
//reverse()

// {
//     key: value
// }
// obj.key => nombre excato
// obj[variable] => variable































