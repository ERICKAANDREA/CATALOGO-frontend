import {cargarDatosProducto, modal} from "./script.js"

const form = document.querySelector("form")

window.editarProducto = function(id){
    fetch("http://localhost:3000/productos/" + id)
    .then(response => response.json())
    .then(data => {        
        const {editar, imagen_producto, nombre, descripcion, precio} = form.elements
      
        editar.value = data.id
        imagen_producto.value = data.imagen_producto
        nombre.value = data.nombre
        descripcion.value = data.descripcion
        precio.value = data.precio

        modal.show()
    })
}

window.eliminarProducto = function(id){
    Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar!',
        cancelButtonText: "Cancelar",
    }).then(function (result) {
        if (result.isConfirmed) {
          fetch(`http://localhost:3000/producto/${id}`, {
            method: "DELETE",
          })
            .then((response) => response.json())
            .then((data) => {
              Swal.fire("Eliminado!", data.message, "success");
              cargarDatosProducto();
            });
        }
      });
    };

window.limpiarFormulario = function(){
    form.reset()
}

// paginacion
let pagina = 1;
const contador = document.querySelector("#paginacion h2");

window.paginaSiguiente = function () {
  pagina++;
  contador.innerText = pagina;
  cargarDatosProducto(pagina);
}

window.paginaAnterior = function () {
  if (pagina - 1 === 0) {
    Swal.fire("Error", "Esta es la primera pagina", "error");
  } else {
    pagina--;
    contador.innerText = pagina;
    cargarDatosProducto(pagina);
  }
}