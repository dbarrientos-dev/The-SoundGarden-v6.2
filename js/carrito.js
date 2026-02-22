document.addEventListener("DOMContentLoaded", () => {
  const btnCarrito = document.getElementById("btn-carrito");
  const panelCarrito = document.getElementById("carrito");
  const listaCarrito = document.getElementById("lista-carrito");
  const total = document.getElementById("total");
  const vaciarBtn = document.getElementById("vaciar-carrito");

  // Mostrar / ocultar carrito
  btnCarrito.addEventListener("click", () => {
    panelCarrito.classList.toggle("mostrar");
    mostrarCarrito();
  });

  // Botones "Agregar al carrito"
  const botonesAgregar = document.querySelectorAll(".btn-agregar");

  botonesAgregar.forEach(boton => {
    boton.addEventListener("click", e => {
      const producto = e.target.closest(".producto");
      const nombre = producto.querySelector("h3").textContent;
      const precio = parseFloat(producto.querySelector("p").textContent.replace("$", "").replace(".", "").replace(",", "."));

      agregarAlCarrito(nombre, precio);
    });
  });

  // Función: agregar producto
  function agregarAlCarrito(nombre, precio) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push({ nombre, precio });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
  }

  // Función: mostrar carrito
  function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    listaCarrito.innerHTML = "";
    let totalCompra = 0;

    carrito.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = `${item.nombre} - $${item.precio.toLocaleString()}`;
      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "❌";
      btnEliminar.style.background = "none";
      btnEliminar.style.border = "none";
      btnEliminar.style.cursor = "pointer";
      btnEliminar.addEventListener("click", () => eliminarDelCarrito(index));

      li.appendChild(btnEliminar);
      listaCarrito.appendChild(li);
      totalCompra += item.precio;
    });

    total.textContent = `Total: $${totalCompra.toLocaleString()}`;
  }

  // Función: eliminar producto individual
  function eliminarDelCarrito(index) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
  }

  // Vaciar carrito
  vaciarBtn.addEventListener("click", () => {
    localStorage.removeItem("carrito");
    mostrarCarrito();
  });
});
