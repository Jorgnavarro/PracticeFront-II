const number = document.querySelector('#number');
const button = document.querySelector('button');

let count = 0;

const interval = setInterval(() => number.innerText = count++, 100);

button.addEventListener('click', () => clearInterval(interval));