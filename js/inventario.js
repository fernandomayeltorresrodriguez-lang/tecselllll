// REEMPLAZA ESTA URL CON TU ENLACE DE GOOGLE APPS SCRIPT
var urlAPI = "https://script.google.com/macros/s/AKfycbyK1n1uVWqGHvK6_K4EvuIQAu2_KM-UopT-ayofSgpm92hDT1oS6_RT_gnaRjhmiEYIjA/exec";
var listaProductos = [];

function cargarInventario() {
    fetch(urlAPI)
        .then(function(res) { return res.json(); })
        .then(function(data) {
            listaProductos = data;
            mostrarTodo();
        })
        .catch(function(err) {
            console.error("Error al cargar datos:", err);
            var contenedor = document.getElementById("productos");
            if (contenedor) {
                contenedor.innerHTML = "<p>Error al conectar con Google Sheets.</p>";
            }
        });
}

// 1. Mostrar el inventario completo
function mostrarTodo() {
    renderizarProductos(listaProductos);
}

// 2. Filtrar productos con stock menor a 10 piezas (Almacenista)
function filtrarStockBajo() {
    var filtrados = listaProductos.filter(function(p) { return Number(p[1]) < 10; });
    renderizarProductos(filtrados);
}

// 3. Filtrar productos con stock mayor a 20 piezas (Almacenista)
function filtrarStockAlto() {
    var filtrados = listaProductos.filter(function(p) { return Number(p[1]) > 20; });
    renderizarProductos(filtrados);
}

// 4. Filtrar productos con precio mayor a $1,500 (Cliente)
function filtrarPrecioMayor() {
    var filtrados = listaProductos.filter(function(p) { return Number(p[2]) > 1500; });
    renderizarProductos(filtrados);
}

// 5. Filtrar productos con precio menor a $1,500 (Cliente)
function filtrarPrecioMenor() {
    var filtrados = listaProductos.filter(function(p) { return Number(p[2]) < 1500; });
    renderizarProductos(filtrados);
}

// Función auxiliar para pintar las tarjetas en la pantalla
function renderizarProductos(productos) {
    var contenedor = document.getElementById("productos");
    if (!contenedor) return;
    
    contenedor.innerHTML = "";

    if (productos.length === 0) {
        contenedor.innerHTML = "<p>No hay productos que coincidan con este criterio.</p>";
        return;
    }

    productos.forEach(function(item) {
        var nombre = item[0];
        var stock = item[1];
        var precio = item[2];
        var claseCard = Number(stock) < 10 ? "card alerta-stock" : "card";

        contenedor.innerHTML += `
            <div class="${claseCard}">
                <h3>${nombre}</h3>
                <p><strong>Stock:</strong> ${stock} pzas</p>
                <p><strong>Precio:</strong> $${Number(precio).toLocaleString()}</p>
            </div>
        `;
    });
}