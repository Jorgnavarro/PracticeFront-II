// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.
const jwt = localStorage.getItem('jwt');

if(!jwt){
    // usamos el replace para no guardar en el historial la url anterior
    location.replace('/');
}

validarTexto('texto')

/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener('load', function () {

  /* ---------------- variables globales y llamado a funciones ---------------- */
  const btnCerrarSesion = document.querySelector('#closeApp');
  const nombreUsuario = document.querySelector('.user-info p');
  const contenedorTareasPendientes = document.querySelector('.tareas-pendientes');
  const contenedorTareasTerminadas = document.querySelector('.tareas-terminadas');
  const contadorTareaHecha = document.querySelector('#cantidad-finalizadas');
  const contadorTareaPendiente = document.querySelector('#cantidad-pendientes');

  const URL_BASE = 'https://ctd-todo-api.herokuapp.com/v1';
  const JWT = localStorage.getItem('jwt');


  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener('click', function () {
    localStorage.removeItem('jwt');
    window.location.replace('./index.html');
  });

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  function obtenerNombreUsuario() {
    const config = {
      method: 'GET',
      headers: {
        authorization: JWT,
      },
    };

    fetch(`${URL_BASE}/users/getMe`, config)
      .then(res => res.json())
      .then(data => {
        nombreUsuario.textContent = `${data.firstName} ${data.lastName}`
      });
  };
  obtenerNombreUsuario()

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  function consultarTareas() {

    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: JWT,
      },
    };

    fetch(`${URL_BASE}/tasks`, config)
      .then(res => res.json())
      .then(data => renderizarTareas(data))

  };
  consultarTareas()

  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  // formCrearTarea.addEventListener('submit', function (event) {
    



  // });


  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {
    const tareasHechas = listado.filter(element => element.completed === true);
    const tareasPendientes = listado.filter(element => element.completed === false);
 
    contenedorTareasPendientes.innerHTML = '';
    contenedorTareasTerminadas.innerHTML = '';

    tareasHechas.forEach(tarea => {
      let template = `
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
      `;

      contenedorTareasTerminadas.innerHTML += template;
    });

    tareasPendientes.forEach(tarea => {
      let template = `
        <li class="tarea" data-aos="fade-down">
          <button class="change" id="${tarea.id}"><i class="fa-regular fa-circle"></i></button>
          <div class="descripcion">
            <p class="nombre">${tarea.description}</p>
            <p class="timestamp">${tarea.createdAt}</p>
          </div>
        </li>
      `;

      contenedorTareasPendientes.innerHTML += template;
    });

    contadorTareaHecha.innerText = tareasHechas.length;
    contadorTareaPendiente.innerText = tareasPendientes.length;

    const listBtnCambio = document.querySelectorAll('.change')
    listBtnCambio.forEach(boton => {
      boton.addEventListener('click', botonesCambioEstado)
    });

    const listBtnBorrar = document.querySelectorAll('.borrar');
    listBtnBorrar.forEach(boton => {
      boton.addEventListener('click', botonBorrarTarea)
    });
    
  };

    /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */

  function botonesCambioEstado(evento) {
    const cambio = evento.target.classList.contains('completa');
    const id = evento.target.id;
   
    const config = {
      method: 'PUT',
      headers: {
        authorization: JWT,
      },                    // cambio ? false : true
      body: JSON.stringify({ completed: !cambio })
    };
    
    fetch(`${URL_BASE}/tasks/${id}`, config)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        consultarTareas();
      });
  }


  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea(evento) {
   
    const config = {
      method: 'DELETE',
      headers: {
        authorization: JWT,
      },
    };
    
    fetch(`${URL_BASE}/tasks/${evento.target.id}`, config)
      .then(data => data.json())
      .then(data => {
        console.log(data)
        consultarTareas();
      });
  };
});