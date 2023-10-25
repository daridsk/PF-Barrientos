//compras (carrito)
//sumar => los precios

const productos = [
  { 
    id: 'producto-01',
    nombre: 'taza', 
    imagen: '../assets/img/taza.png',
    precio: 1000 
  },
  { 
    id: 'producto-02',
    nombre: 'vaso', 
    imagen: '../assets/img/vaso.png',
    precio: 1300 
  },
  { id: 'producto-03',
    nombre: 'copa',
    imagen: '../assets/img/copa.png',
    precio: 1500 
  },
  { id: 'producto-04',
    nombre: 'gorra', 
    imagen: '../assets/img/gorra.png',
    precio: 2000 
  },
  { id: 'producto-05',
    nombre: 'remera',
    imagen: '../assets/img/remera.png',
    precio: 3000 
  },
  { id: 'producto-06',
    nombre: 'termo',
    imagen: '../assets/img/termo.png',
    precio: 2500 
  },
];

const contenedorProductos = document.querySelector('#contenedor-productos');
let botonesAgregar = document.querySelectorAll('.productos__button');

function cargarEstructuraProductos () {

  productos.forEach(producto => {

    const section = document.createElement('section');
    section.classList.add('productos');
    section.innerHTML = `
      <article id="container-productos" class="productos__container">
        <div>
            <img class="productos__imagen" src="${producto.imagen}" alt="${producto.nombre}">
        </div>
        <div class="productos__info">
            <p>${producto.nombre}</p>
        </div>
        <div class="productos__precio">
            <p>$${producto.precio}</p>
        </div>
        <div class="boton-producto-container">
            <button  type="button" class="btn btn-secondary productos__button" id="${producto.id}">agregar</button>
        </div>
      </article>
    `;

    contenedorProductos.append(section);

  })

  actualizarBotonesAgregar();

}

cargarEstructuraProductos();

function actualizarBotonesAgregar() {
  botonesAgregar = document.querySelectorAll('.productos__button');

  botonesAgregar.forEach(boton => {
    boton.addEventListener('click', agregarAlCarrito);
  });
}

let carrito;
let carritoLocalStorage = localStorage.getItem('productos-agregados');

if (carritoLocalStorage) {
  carrito = JSON.parse(carritoLocalStorage);
} else {
  carrito = [];
}

function agregarAlCarrito(e) {
  
  const idBoton = e.target.id;
  const productoAgregado = productos.find(producto => producto.id === idBoton);

  if(carrito.some(producto => producto.id === idBoton)) {

    const posicion = carrito.findIndex(producto => producto.id === idBoton);
    carrito[posicion].cantidad++;

  } else {

    productoAgregado.cantidad = 1;
    carrito.push(productoAgregado);

  }

  localStorage.setItem('productos-agregados', JSON.stringify(carrito));

}


/* const carrito = [];
let respuestaUsuario = prompt('¿Quieres realizar un pedido?');
while (respuestaUsuario?.trim().toUpperCase() === "SI") {
  let respuestaIngresada = prompt('Ingrese el nombre del producto que desea agregar al carrito')?.trim().toLowerCase();

  // Valida que exista el producto que ingreso la persona para no enviar un null al carrito
  const existeProducto = productos.some((elemento) => elemento.nombre === respuestaIngresada?.trim().toLowerCase());
  if (!existeProducto) {
    alert('Ese producto no existe en nuestro stock');
  }
  else {
  // Agregamos el producto seleccionado al carrito
  carrito.push(productos.find((elemento) => elemento.nombre === respuestaIngresada?.trim().toLowerCase()));
  console.log('carrito', carrito);
  }

  respuestaIngresada = prompt('¿Quieres realizar otro pedido?');
  if (respuestaIngresada?.trim().toUpperCase() === "SI") {
    continue
  }
  else {
    // Sacamos el total
    const totalSinIVA = carrito.reduce((acumulador, elemento) => acumulador + elemento.precio, 0);
    console.log('total sin IVA', totalSinIVA);
    alert(`Su pedido ya fue hecho y el total con IVA es de $ ${totalSinIVA * IVA} \n ¡Gracias por su compra!`);
    break;
  }
}
 */