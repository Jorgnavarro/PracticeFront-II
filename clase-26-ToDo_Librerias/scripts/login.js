/* --------------- COMPROBACION, antes de la carga del DOM 👇 --------------- */

// evaluar si hay un token para mandarlo directo a sus tareas
const jwt = localStorage.getItem('jwt');

if (jwt) {
    // usamos el replace para no guardar en el historial la url anterior
    location.replace('./mis-tareas.html');
}
/* ------------------------------------ ☝ ----------------------------------- */

window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.querySelector('form');
    const email = document.querySelector('#inputEmail');
    const password = document.querySelector('#inputPassword');

    const loader = document.querySelector('.loader');
    const ingresar = document.querySelector('#ingresar');
    const btnSubmit = document.querySelector('form button');

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {

        event.preventDefault();

        const persona = {
            email: email.value,
            password: password.value
        };

        loader.classList.remove('oculto');
        form.classList.add('opacity');

        realizarLogin(persona)
    });

    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */

    // version Async Await
    async function realizarLogin(user) {
        const url = 'https://ctd-fe2-todo-v2.herokuapp.com/v1/users/login';

        const configuraciones = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }

        try {
            let respuesta = await fetch(url, configuraciones)
                respuesta = await respuesta.json();

            if (respuesta.jwt) {
                // guardamos ese token que nos llega
                localStorage.setItem('jwt', respuesta.jwt)
    
                window.location.replace('./mis-tareas.html')
            }
            
        } catch (error) {
            console.log(error)
            alert("Credenciales incorrectas.");
        } finally {
            loader.classList.add('oculto');
            form.classList.remove('opacity');
        }
    };
});