// ======================================================
// SOUNDGARDEN - Banner dinámico para la página de productos
// Muestra ofertas diarias y cambia el mensaje según la hora.
// ======================================================

document.addEventListener("DOMContentLoaded", () => {
  const dias = [
    "domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"
  ];
  const hoy = new Date();
  const diaSemana = dias[hoy.getDay()];
  const hora = hoy.getHours();

  // === 1. Determinar producto destacado según el día ===
  let producto, emoji, color1, color2;

  switch (diaSemana) {
    case "lunes":
      producto = "Guitarras Fender 🎸";
      color1 = "#ff8c00"; color2 = "#ffb347";
      emoji = "🔥";
      break;
    case "martes":
      producto = "Bajos Ibanez 🎶";
      color1 = "#2193b0"; color2 = "#6dd5ed";
      emoji = "🎵";
      break;
    case "miércoles":
      producto = "Amplificadores Marshall ⚡";
      color1 = "#141E30"; color2 = "#243B55";
      emoji = "⚙️";
      break;
    case "jueves":
      producto = "Pedales Boss 🎛";
      color1 = "#8E2DE2"; color2 = "#4A00E0";
      emoji = "🎚";
      break;
    case "viernes":
      producto = "Baterías Pearl 🥁";
      color1 = "#ff512f"; color2 = "#f09819";
      emoji = "💥";
      break;
    case "sábado":
      producto = "Micrófonos Shure 🎤";
      color1 = "#283048"; color2 = "#859398";
      emoji = "🎙";
      break;
    default:
      producto = "Accesorios Soundgarden 🎧";
      color1 = "#56ab2f"; color2 = "#a8e063";
      emoji = "🪄";
  }

  // === 2. Mensaje según la hora ===
  let mensajeHora = "";
  if (hora < 12) mensajeHora = "☀️ Despierta con ritmo — ¡ofertas matutinas activas!";
  else if (hora < 18) mensajeHora = "🎶 Tarde de inspiración — tu sonido ideal te espera.";
  else mensajeHora = "🌙 Noche de rock — descuentos eléctricos para ti.";

  // === 3. Crear banner dinámico ===
  const banner = document.createElement("div");
  banner.className = "banner-productos";
  banner.innerHTML = `
    <h2>${emoji} ${producto}</h2>
    <p>${mensajeHora}</p>
    <button class="btn-oferta-dia">Ver oferta</button>
  `;
  banner.style.background = `linear-gradient(90deg, ${color1}, ${color2})`;

  document.body.prepend(banner);

  // === 4. Evento del botón ===
  const btnOferta = banner.querySelector(".btn-oferta-dia");
  btnOferta.addEventListener("click", () => {
    alert(`🎸 Oferta exclusiva: 15% de descuento en ${producto}!`);
  });

  // === 5. Auto-desaparición elegante ===
  setTimeout(() => banner.remove(), 10000);
});
