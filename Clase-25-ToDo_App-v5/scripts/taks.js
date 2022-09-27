/* ---- SEGURIDAD: Si no se encuentra en localStorage info del usuario 👇 --- */
// creamos una funcion y la hicimo AUTOEJECUTABLE👇
(function comprobacion() {
  // no lo deja acceder a la página, redirigiendo al login inmediatamente.
  const jwt = localStorage.getItem('jwt');

  if (!jwt) {
    // usamos el replace para no guardar en el historial la url anterior
    window.location.replace('./index.html')
  }

  console.log("PASÓ CORRECTAMENTE LA COMPROBACION");
})()

/* ------------------------------------ ☝ ----------------------------------- */


/* ----- comienzan las funcionalidades una vez que carga el documento 👇 ---- */
window.addEventListener('load', function () {

  /* ---------------- variables globales y llamado a funciones ---------------- */
  const btnCerrarSesion = this.document.querySelector('#closeApp');
  const nombreUsuario = this.document.querySelector('.user-info p');
  const contenedorTareasPendientes = this.document.querySelector('.tareas-pendientes');
  const contenedorTareasTerminadas = this.document.querySelector('.tareas-terminadas');
  const formCrearTarea = this.document.querySelector('form.nueva-tarea');
  const inputNuevaTarea = this.document.querySelector('#nuevaTarea');


  const ENDPOINTBASE = 'https://ctd-fe2-todo-v2.herokuapp.com/v1';
  const JWT = this.localStorage.getItem('jwt');


  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener('click', function () {
    console.log("Cerrar sesion");
    const confirmacion = confirm('¿Seguro desea cerrar sesión?');

    // si lo confirmó, cerramos la sesion
    if (confirmacion) {
      //  limpiamos el storage
      localStorage.clear();
      // lo llevamos a la pantalla de login
      window.location.replace('./index.html')
    }


  });

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  async function obtenerNombreUsuario() {

    const url = `${ENDPOINTBASE}/users/getMe`;

    const configuraciones = {
      method: 'GET',
      headers: {
        authorization: JWT
      }
    }

    const resultado = await superFetch(url, configuraciones)

    // comprobamos haber obtenido un nombre
    if(resultado.firstName){
      nombreUsuario.textContent = resultado.firstName
    }


  };
  obtenerNombreUsuario()


  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  async function consultarTareas() {

    const url = `${ENDPOINTBASE}/tasks`;

    const configuraciones = {
      method: 'GET',
      headers: {
        authorization: JWT
      }
    }
   
    const resultado = await superFetch(url, configuraciones);
     // llamo a la funcion que pinta las tareas en pantalla
     renderizarTareas(resultado);



  };
  consultarTareas();


  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener('submit', function (evento) {
    evento.preventDefault();

    // preparamos el objeto a enviar al servidor
    const nueva = {
      description: inputNuevaTarea.value,
      completed: false
    }

    // armamos la carta(peticion) como la pide el servidor (ver documentacion)
    const configuraciones = {
      method:'POST',
      headers: {
        authorization: JWT,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nueva)
    }

    fetch(`${ENDPOINTBASE}/tasks`, configuraciones)
    .then( respuesta => respuesta.json())
    .then( info => {
      console.log("Tarea recien posteada 👇");
      console.log(info);
      // necesitamos recargar nuestra interfaz
      consultarTareas();
    })
    .catch( error => console.log(error))



    
  });


  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  

  function renderizarTareas(listado) {
    // limpiamos los contendores
    contenedorTareasPendientes.innerHTML = "";
    contenedorTareasTerminadas.innerHTML = "";

    console.log("pintando");
    // filtramos las terminadas
    const listadoTareasTerminadas = listado.filter( item => item.completed)
    const listadoTareasPendientes = listado.filter( item => !item.completed)

    console.log("Pendientes");
    console.log(listadoTareasPendientes);
    console.log("Terminadas");
    console.log(listadoTareasTerminadas);

    // listadoTareasPendientes.forEach( tarea => {
    //   // por cada tarea inyectamos un nodo li
    //   contenedorTareasPendientes.innerHTML += `
    //   <li class="tarea" data-aos="fade-down">
    //     <button class="change" id="${tarea.id}"><i class="fa-regular fa-circle"></i></button>
    //     <div class="descripcion">
    //       <p class="nombre">${tarea.description}</p>
    //       <p class="timestamp">${tarea.createdAt}</p>
    //     </div>
    //   </li>
    //   `
    // })

    // inyectamos las tareas pendientes 👇
    contenedorTareasPendientes.innerHTML = listadoTareasPendientes.map( tarea => crearComponenteTareaPendiente(tarea)).join('')





    listadoTareasTerminadas.forEach( tarea => {
      // por cada tarea inyectamos un nodo li
      contenedorTareasTerminadas.innerHTML += `
      <li class="tarea" data-aos="fade-up">
        <div class="hecha">
          <i class="fa-regular fa-circle-check"></i>
        </div>
        <div class="descripcion">
          <p class="nombre">${tarea.description}</p>
          <div class="cambios-estados">
            <button class="change completa" id="${tarea.id}" ><i class="fa-solid fa-rotate-left"></i></button>
            <button class="borrar" id="${tarea.id}"><i class="fa-regular fa-trash-can"></i></button>
          </div>
        </div>
      </li>
      `
    })

    const botonesChange = document.querySelectorAll('.change');
    const botonesDelete = document.querySelectorAll('.borrar');

    // recorremos lo botones de CAMBIAR para agregarle la escucha del click
    botonesChange.forEach( boton => {
      boton.addEventListener('click', function(evento){
        botonesCambioEstado(evento.target)
      })
    })
    
    // recorremos lo botones de BORRAR para agregarle la escucha del click




  };

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado(nodo) {
    console.log(nodo);

    const terminada = nodo.classList.contains('completa')

    // preparamos el objeto a enviar al servidor
    // siempre invertimos el valor de terminada segun el boton que dispara el click
    const cambio = {
      completed: !terminada
    }

    // armamos la carta(peticion) como la pide el servidor (ver documentacion)
    const configuraciones = {
      method:'PUT',
      headers: {
        authorization: JWT,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cambio)
    }

    fetch(`${ENDPOINTBASE}/tasks/${nodo.id}`, configuraciones)
    .then( respuesta => respuesta.json())
    .then( info => {
      consultarTareas()
    })





  }


  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {





  };

});



function crearComponenteTareaPendiente( { id, description, createdAt } ) {

  return `<li class="tarea" data-aos="fade-down">
            <button class="change" id="${id}"><i class="fa-regular fa-circle"></i></button>
            <div class="descripcion">
              <p class="nombre">${description}</p>
              <p class="timestamp">${createdAt}</p>
            </div>
          </li>
  `
}