/* ---------------------------------- texto --------------------------------- */
function validarTexto(texto) {
    
}

function normalizarTexto(texto) {
    
}

/* ---------------------------------- email --------------------------------- */
function validarEmail(email) {
    
}

function normalizarEmail(email) {
    
}

/* -------------------------------- password -------------------------------- */
function validarContrasenia(contrasenia) {
    
}

function compararContrasenias(contrasenia_1, contrasenia_2) {
    
}

async function superFetch(url, opciones) {
    let data;

    try {
        const respuesta = await fetch(url, opciones);
        if(respuesta.status !== 200){
            throw new Error("Hay algún error!!!!!!!");
        } else{
            data = await respuesta.json();

        }
    } catch (error) {
        data = error;
    }

    return data;
}