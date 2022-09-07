const container = document.querySelector('.container');
const boton = document.querySelector('#btn-dog');

const endpoint = 'https://dog.ceo/api/breed/boxer/images';

boton.addEventListener('click', async () => {
    fetch(endpoint)
        .then((data) => data.json())
        .then((data2) => render(data2))
        .catch((error) => {
            console.log(error)
        });
});

function render(data) {
    let img =  document.createElement('img');
    img.setAttribute('src', data.message[0])
    img.setAttribute('alt', 'foto perrito');

    container.appendChild(img); 
};