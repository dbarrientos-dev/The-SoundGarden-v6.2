// ======================================================
// SCRIPT DE OFERTA Y AJUSTE DINÁMICO DEL BANNER
// ======================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Crear y mostrar la oferta dinámica al cargar la página
  function mostrarOferta() {
    const ofertaDiv = document.createElement("div");
    ofertaDiv.className = "alert alert-success text-center";
    ofertaDiv.textContent = "🎸 ¡Hoy 20% OFF en guitarras Slam!";
    document.body.prepend(ofertaDiv);

    // Eliminar la alerta después de 6 segundos
    setTimeout(() => ofertaDiv.remove(), 6000);
  }

  // Ejecutar una oferta automática al cargar
  mostrarOferta();

  // 2. Asignar la función al botón (si existe en la página)
  const botonOferta = document.getElementById("btn-oferta");
  if (botonOferta) {
    botonOferta.addEventListener("click", mostrarOferta);
  }

  // 3. Ajustar el texto del banner según la hora
  const horas = new Date().getHours();
  const bannerTitulo = document.querySelector(".banner h2");

  if (bannerTitulo) {
    if (horas >= 18 || horas < 6) {
      bannerTitulo.textContent += " — Ofertas Nocturnas 🌙";
    } else if (horas >= 12) {
      bannerTitulo.textContent += " — Promos de la Tarde 🔥";
    } else {
      bannerTitulo.textContent += " — Descuentos Matutinos ☀️";
    }
  }
});
