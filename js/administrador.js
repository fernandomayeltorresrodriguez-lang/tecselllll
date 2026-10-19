// 6. Permitir que el administrador agregue nuevos productos
function agregarProductoAdmin(event) {
    event.preventDefault();
    var nombre = document.getElementById("nuevoNombre").value;
    var stock = document.getElementById("nuevoStock").value;
    var precio = document.getElementById("nuevoPrecio").value;

    if (!nombre || stock === "" || precio === "") {
        alert("Por favor completa todos los campos.");
        return;
    }

    // Añade el producto a la lista global en memoria
    if (typeof listaProductos !== 'undefined') {
        listaProductos.push([nombre, Number(stock), Number(precio)]);
        alert("¡Producto '" + nombre + "' agregado exitosamente al inventario!");
        
        document.getElementById("formAgregar").reset();
        
        // Actualiza la vista si la función mostrarTodo está disponible
        if (typeof mostrarTodo === 'function') {
            mostrarTodo();
        }
    } else {
        alert("Error: La lista de inventario no está cargada.");
    }
}