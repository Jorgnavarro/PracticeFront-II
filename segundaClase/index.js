// Objetivo

// Programaremos un pequeño juego interactivo de piedra, papel o tijera. El usuario podrá
// elegir entre una de las 3 opciones y la computadora elegirá al azar otra de las 3 opciones,
// entonces, se mostrará si ganó o perdió. Para realizar esta actividad recordemos las reglas
// de este juego:
// - Piedra gana contra tijera.
// - Tijera gana contra papel.
// - Papel gana contra piedra

let opciones = ['piedra', 'papel', 'tijera'];
let opcionUser;
let opcionPC;

const userMove = () => {
  let user;

  //ciclo que se repite hasta que seleccione una opcion correcta
  do {
    user = parseInt(prompt(`Elija una opcion:
    \n1. Piedra
    \n2. Papel
    \n3. Tijera`));
  } while (user > 3 || user < 1);
  
  opcionUser = opciones[user - 1];
  alert(`opcion usuario: ${opcionUser}`);
};

const pcMove = () => {
  //genera un número aleatorio y lo redondea
  let pc = Math.floor(Math.random() * 3);

  opcionPC = opciones[pc];
  alert(`opion PC :${opcionPC}`);
};

const opcionesGanadoras = () => {
  //opciones de mensaje para la jugada
  const mensajes = ['Pierde usuario', 'Empate', 'Gana Usuario'];

  //matriz de opciones de jugada
  //0 -> empate, 1 -> ganador, -1 -> perdedor
  const combinaciones = [
    ['piedra', 'piedra', 0], ['piedra', 'tijera', 1], ['piedra', 'papel', -1],
    ['papel', 'piedra', 1], ['papel', 'tijera', -1], ['papel', 'papel', 0],
    ['tijera', 'piedra', -1], ['tijera', 'tijera', 0], ['tijera', 'papel', 1],
  ];

  //recorre la matriz buscando coincidencias de jugada con los movimientos de los jugadores
  for (let i = 0; i < combinaciones.length; i++) {
    let ganadorU = combinaciones[i][0];
    let ganadorPC = combinaciones[i][1];

    //esta variable contiene el resultado de la jugada (-1, 0 ,1)
    let result = combinaciones[i][2];

    if(opcionUser === ganadorU && opcionPC === ganadorPC ){
      // le sumamos uno para que sean las posiciones del array de mensaje
      // result: -1 (perdio) -> -1 + 1 = 0 -> muestra: Pierde usuario
      // result: 0 (empate) -> 0 + 1 = 1 -> muestra: Empate
      // result: 1 (gana) -> 1 + 1 = 2 -> muestra: Gana Usuario
      alert(mensajes[result + 1]);
    };
  };
};

userMove();
pcMove();
opcionesGanadoras();