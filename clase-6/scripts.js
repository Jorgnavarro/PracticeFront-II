// Resolucion mesa de trabajo 5
//const tema = confirm('Desea aplicar el tema oscuro?');

// if(tema) {
//   document.body.classList.add('dark')
// }else{
//   document.body.classList.revome('dark')
// }


const container = document.createElement('div');


const nombres = ['pedro', 'jose', 'maria', 'pepe']

nombres.forEach((elemt, i)=>{ 
  //creamos el elemento p
  const item = document.createElement('p');

  //creamos el template y se lo agregamos a la p
  const labels= document.createTextNode(`nombre: ${elemt}, posicion: ${i}`);
  item.appendChild(labels);

  //agregamos un class al enlemento
  item.classList.add(`item-${i + 1}`);
  
  //pasamos como hijo el elemento al container;
  container.appendChild(item)
})
//pasamos el conatiner que tiene todas las <p></p> como hijo del body
document.body.appendChild(container)


