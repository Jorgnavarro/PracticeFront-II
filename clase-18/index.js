// Posteo un nuevo recurso
const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';
const BASE_URL_GET = 'https://jsonplaceholder.typicode.com/posts/12/comments';

const payload = {
    title: 'Titulo del comentario',
    body: 'Comentario para subir al servidor.',
    postId: 12,
}

const configuraciones = {
    method: 'POST',
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(payload)
}

fetch(BASE_URL, configuraciones)
.then(data => data.json())
.then(data2 => console.log(data2))
.catch(error => console.log(error))


/* ------------------------------------ . ----------------------------------- */
/* -------------------------- PEDIR varios recursos ------------------------- */
// nodos
const btnPedir = document.querySelector('.pedirComentarios p');
const comentariosContenedor = document.querySelector('.comentarios');

function crearComponenteComentario(texto) {
    texto.forEach(e => {
        let text =  `<p>${e.body}</p>`

        comentariosContenedor.innerHTML += text;
    })
}


btnPedir.addEventListener('click', async() => {
    try {
        let info = await fetch(BASE_URL_GET);
            info = await info.json();
            crearComponenteComentario(info);
        
    } catch (error) {
        console.log((error))
    }
})

