const listadoTitulos = document.querySelectorAll('h1');

console.log("FOR CLASICO 👇");

for(let i=0; i< listadoTitulos.length; i++){
    console.log(listadoTitulos[i])
}

console.log("FOR EACH 👇");

listadoTitulos.forEach( elemento => {
    console.log("Elemento:");    
    console.log(elemento)
});

console.log("FOR OF 👇");

for (const item of listadoTitulos) {
   console.log(item);
}