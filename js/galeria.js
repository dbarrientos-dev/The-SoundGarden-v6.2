document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll(".btn-filtro");
  const productos = document.querySelectorAll(".producto");

  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      // Actualizar botón activo
      botones.forEach(b => b.classList.remove("activo"));
      boton.classList.add("activo");

      const categoria = boton.dataset.categoria;

      productos.forEach(producto => {
        if (categoria === "todos" || producto.dataset.categoria === categoria) {
          producto.style.display = "block";
          producto.classList.add("fade-in");
        } else {
          producto.style.display = "none";
        }
      });
    });
  });
});
