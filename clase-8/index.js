const label = document.querySelector('.text-center p');
const button = document.querySelector('button');
let count = 0;

button.addEventListener('click', () => label.innerText = count++)
