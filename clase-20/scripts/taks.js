// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.
const jwt = localStorage.getItem('jwt');

if(!jwt){
    // usamos el replace para no guardar en el historial la url anterior
    location.replace('/');
}


/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener('load', function () {

  /* ---------------- variables globales y llamado a funciones ---------------- */
  const btnCerrarSesion = document.querySelector('#closeApp');
  const nombreUsuario = document.querySelector('.user-info p');
  const contenedorTareasPendientes = document.querySelector('.tareas-pendientes');
  const contenedorTareasTerminadas = document.querySelector('.tareas-terminadas');
  // const formCrearTarea = document.querySelector('form.nueva-tarea')

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
        authorization: JWT,
      },
    };

    fetch(`${URL_BASE}/tasks`, config)
      .then(res => res.json())
      .then(data => renderizarTareas(data));
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
    const contadorPendientes = document.querySelector('#cantidad-pendientes');
    const contadorFinalizadas = document.querySelector('#cantidad-finalizadas');

    const tareasfinalizadas = listado.filter(element => element.completed);
    const tareasPendientes = listado.filter(element => !element.completed);

    const crearTarjeta = (element) => `
      <div>
        <p>${element.description}</p>
        <span>Tarea Nº ${element.id}</span>
      </div>
    `;

    contadorFinalizadas.innerHTML = tareasfinalizadas.length;
    contadorPendientes.innerHTML = tareasPendientes;

    tareasPendientes.forEach(element => {
      contenedorTareasPendientes.innerHTML += crearTarjeta(element)
    });

    tareasfinalizadas.forEach(element => {
      contenedorTareasTerminadas.innerHTML += crearTarjeta(element)
    });

  };

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado() {
    
    



  }


  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {
   
    

    

  };

});