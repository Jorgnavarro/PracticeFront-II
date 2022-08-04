// Microdesafío
// Ya hemos programado un juego de piedra papel o tijera, pero ahora resulta que no
// queremos dejar las cosas tan a la suerte y decidimos hacer que gane solo el mejor de 3
// juegos.

let opcionUsuario;
let opcionPc;
const opciones = ['piedra', 'papel', 'tijera'];
let ganador;
let accUsuario = 0;
let accPc = 0;
let contador = 0;
 
const pedirOpcion = () => {
    let user;

    //ciclo que se repite hasta que seleccione una opcion correcta
    do {
      user = parseInt(prompt(`Elija una opcion:
      \n1. Piedra
      \n2. Papel
      \n3. Tijera`));
    } while (user > 3 || user < 1);
    
    opcionUsuario = opciones[user - 1];
    alert(`opcion usuario: ${opcionUsuario}`);
}
 
const elegirOpcion = () => {
  const random = parseInt(Math.random() * 3);
  opcionPc = opciones[random];
  alert(`opcion PC: ${opcionPc}`)
}
 
const calcularGanador = () => {
    contador++
  switch (opcionUsuario) {
    // el empate despues de fallo, segunda revision
    case opcionPc:
        alert('es un empate');
      break;
 
    case 'piedra':
      if (opcionPc == 'tijera') {
        accUsuario++;
        alert('ganador User')
      } else {
        accPc++;
        alert('ganador Pc')
      }
      break;
 
    case 'papel':
      if (opcionPc == 'piedra') {
        accUsuario++;
        alert('ganador User')
      } else {
        accPc++;
        alert('ganador Pc')
      }
      break;
 
    case 'tijera':
      if (opcionPc == 'papel') {
        accUsuario++;
        alert('ganador User')
      } else {
        accPc++;
        alert('ganador Pc')
      }
      break;
  }
}
 
function mostrarGanador() {
    let personaje;
    if(accUsuario >= 2){
        personaje = 'Usuario'
    }else if(accPc >= 2){
        personaje = 'Pc'
    }else{
        personaje ='Nadie'
    };
    
    alert(`EL ganador es ${personaje}`)
}

do {
    pedirOpcion();
    elegirOpcion();
    calcularGanador();
} while (contador < 3);

mostrarGanador();
