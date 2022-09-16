// evaluar si hay un token para mandarlo directo a sus tareas
let jwt = localStorage.getItem('jwt');

if(jwt) window.location.replace('./mis-tareas.html');


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
        };

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
            body: JSON.stringify(settings)
        }

        fetch(url, config)
            .then((res) => res.json())
            .then(data => {
                if(data.jwt) {
                    localStorage.setItem('jwt', data.jwt);

                    window.location.replace('./mis-tareas.html')
                    // window.location.href = './mis-tareas.html'
                }else {
                    form.reset();
                    alert(data);
                }
            });

        // fetch(url, config)
        //     .then((res) => {
        //         if(res.status >= 400) throw new Error(res.statusText)
        //         else return res.json()
        //     })
        //     .then(data => console.log(data))
        //     .catch(() => console.log('error'))
    };
});