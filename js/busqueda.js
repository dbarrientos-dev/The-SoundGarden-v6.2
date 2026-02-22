// ======================================================
// BUSQUEDA.JS — The SoundGarden 🎸
// Búsqueda tipo Win98 con opción de limpiar
// ======================================================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-buscar");
  const input = document.getElementById("buscar-producto");
  const btnLimpiar = document.getElementById("btn-limpiar");
  const productos = document.querySelectorAll(".producto");

  // Filtrar productos
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const texto = input.value.toLowerCase().trim();
    let encontrados = 0;

    productos.forEach(prod => {
      const nombre = prod.dataset.nombre.toLowerCase();
      const categoria = prod.dataset.categoria.toLowerCase();

      if (nombre.includes(texto) || categoria.includes(texto)) {
        prod.style.display = "inline-block";
        encontrados++;
      } else {
        prod.style.display = "none";
      }
    });

    if (encontrados === 0) {
      alert("❗ No se encontraron productos con ese nombre o categoría.");
    }
  });

  // Mostrar todos los productos al presionar “Limpiar”
  btnLimpiar.addEventListener("click", () => {
    input.value = "";
    productos.forEach(prod => (prod.style.display = "inline-block"));
    input.focus();
  });
});
