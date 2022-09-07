const container = document.querySelector('.container');
const boton = document.querySelector('#btn-dog');

const endpoint = 'https://rickandmortyapi.com/api/character/'

boton.addEventListener('click', async () => {
    let id = Math.floor(Math.random() * 30);

    let data = await getData(id);
    renderData(data)
})

async function getData(id) {
    try {
        let info = await fetch(`${endpoint}${id}`)
            info = await info.json();
            return info
    } catch (error) {
        return alert('error');
    }
};

function renderData(data) {
    let contenedor = `
        <div>
            <img src=${data.image} alt=${data.name}
            <h3>${data.name}</h3>
            <p>${data.species}</p>
        </div>
    `
    container.innerHTML = contenedor;
};
