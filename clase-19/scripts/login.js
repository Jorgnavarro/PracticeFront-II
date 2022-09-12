// evaluar si hay un token para mandarlo directo a sus tareas


window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.querySelector('form')
    const email = document.getElementById('inputEmail');
    const password = document.querySelector('#inputPassword');
  

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault();
       
        const persona = {
            email: email.value,
            password: password.value
        }

       // llamamos a a funcion para loggearnos
       realizarLogin(persona)
    });


    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarLogin(settings) {
        const url = 'https://ctd-todo-api.herokuapp.com/v1/users/login';

        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(settings),
        };

        fetch(url, config)
        .then(res => res.json())
        .then(data => {

            if(data.jwt) {
                // guardamos ese token que nos llega
                localStorage.setItem('jwt', data.jwt);
                                    
                // si es correcto el usuarios nos llega un token
                // entoces lo guardamos en el deposito para ir a la siguiente pantalla
                window.location.replace('./mis-tareas.html');

            }else {
                form.reset();
                alert('Datos incorrectos');
            };
        });


        // el bk no retorna un error correctamente, nosotros creamos el error en caso de un estatus distinto
        // fetch(url, config)
        //     .then(res => res.status >= 400 ? throw new Error('Datos incorrectos') : res.json())
        //     .then(data => {
        //         // si es correcto el usuarios nos llega un token

        //         // guardamos ese token que nos llega
        //         localStorage.setItem('jwt', data.jwt);
                                    
        //         // redirigimos a la siguiente pantalla
        //         window.location.replace('./mis-tareas.html');
        //     })
        //     .catch((error) => {
        //         form.reset();
        //         alert(error);
        //     });
    };
});