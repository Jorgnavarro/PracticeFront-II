// Llamamos a resolve(...) cuando lo que estabamos haciendo finaliza con éxito, y reject(...) cuando falla.
// En este ejemplo, usamos setTimeout(...) para simular código asíncrono, es decir una petición al servidor.
// La variable cuentaBancaria simula la informacion en la base de datos.
// En la "vida real", vamos a recurrir a un fetch() [lo cual se ve la proxima clase].

console.log("Banco mobile");

const nodoContainer = document.querySelector('.bancaMobile');
const boton = document.querySelector('button');

boton.addEventListener('click', function () {
    let usuario = {
        estadoCuenta: "activa",
        nombre: "Michael Scott",
        fondos: Number(prompt('ingrese su saldo'))
    }

    new Promise((resolve, reject) => {
        setTimeout(() => {
            if(usuario.fondos > 5000) {
                resolve('Tienes saldo en cuenta')
            }else {
                reject('No tienes saldo suficiente => Promise')
            }
        }, 1500);
    }).then((data) => {
        let texto = document.createElement('p')
        texto.innerText = data;

        document.body.appendChild(texto)
    })
    .catch((error) => {
        let texto = document.createElement('p')
        texto.innerText = error

        document.body.appendChild(texto)
    })
});
















// console.log('hola')

// setTimeout(() => {
//     console.log('setTimeout')
// }, 0);

// Promise.resolve().then(() => console.log('promise'))
// console.log('adios')
//-------------------------------------------------------
// function track() {
//     console.trace()
// }

// function saludar(name) {
//     track()
// }
// function abrirPuerta() {
//     saludar()
// }
// function entrar() {
//     abrirPuerta()
// }
//--------------------------------


