alert('Bienvenido'); // --> Muestra informacion

let confirmacion = confirm('Eres mayor de 18 años'); // --> Retorna u bool (true || false)

if(confirmacion) {
  let edad = prompt('Ingresa tu edad'); // --> Permite ingresar datos, llegan en string
  let name = prompt('Ingresa tu nombre');

  alert(`Datos del usuario: \nNombre :${name}, edad: ${edad}`);
}else {
  alert('Eres Mejor de edad');
}