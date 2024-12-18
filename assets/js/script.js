import {api} from "./utils.js";
import "./funcionesProducto.js";

export const modal = new bootstrap.Modal("#staticBackdrop", {
  keyboard: false,
});

document.addEventListener('DOMContentLoaded', function() {
    cargarDatosProducto();
    const form= document.querySelector('form');
    const {imagen_producto, nombre, descripcion, precio, editar} = form.elements;

    form.addEventListener('submit', function(event) {
       event.preventDefault(); //Evita que se recargue la página

        const data= {
            imagen_producto: imagen_producto.value,
            nombre: nombre.value,
            descripcion: descripcion.value,
            precio: precio.value
        };

        // enviar los datos
        api({
            method: editar.value ? "PUT" : "POST",
            url: editar.value ? `/producto/${editar.value}` : "/producto",
            data,
          })
       .then(({data})=>{
        console.log(data);
        Swal.fire("Exito!", data.message, "success");
        cargarDatosProducto();
        form.reset();
        modal.hide()
       })

       .catch((err) => 
       Swal.fire("Error!: "+ err?.response?.data?.message, "error"));
    });
});  

export function cargarDatosProducto(pagina = 1) {
    const container = document.querySelector(".card-container");
    container.innerHTML = "";
    // peticion a localhost:3000/producto del server de node
    api.get(`/productos?page=${pagina}&perPage=9`).then(({ data }) => {
              
      for (const producto of data) {

            container.innerHTML += `
          <div class="card" style="width: 18rem; margin: 1rem;">
          <img src="${producto.imagen_producto}" class="card-img-top" alt="${producto.nombre}" style="height: 200px; object-fit: cover;">
          <div class="card-body">
          <div>
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.descripcion}</p>
            <p class="card-text text-muted">Precio: $${Math.round(producto.precio)}</p>
          </div>
            <div class="btn-group" role="group" aria-label="actions">
              <button id="boton_editar" type= "button" class="btn btn-primary" onclick="editarProducto(${producto.id})">
                <i class="fa-solid fa-pen-to-square"></i> 
              </button>
              <button  type= "button" class="btn btn-danger" onclick="eliminarProducto(${producto.id})">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        </div>`;
    }
  });
}