'use strict';

/* ============================================================
   🧩 UTILIDADES BÁSICAS (HELPERS)
   ------------------------------------------------------------
   Pequeñas funciones reutilizables para seleccionar elementos,
   crear nodos, formatear precios y manejar eventos.
   ============================================================ */

/**
 * Selecciona un elemento del DOM.
 * Ejemplo: const titulo = $('h1');
 */
const $ = (selector) => document.querySelector(selector);

/**
 * Selecciona todos los elementos que cumplan un selector.
 * Retorna un array en lugar de un NodeList.
 * Ejemplo: const botones = $$('button');
 */
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

/**
 * Crea un nuevo elemento HTML.
 * Ejemplo: const div = createEl('div', { textContent: 'Hola' });
 */
const createEl = (tag, options = {}) => {
  const el = document.createElement(tag);
  Object.assign(el, options); // Asigna las propiedades pasadas
  return el;
};

/**
 * Convierte un número a formato de precio simple.
 * Ejemplo: formatPrice(19.5) → "$19.50"
 */
const formatPrice = (value) => {
  const num = Number(value) || 0;
  return `$${num.toFixed(2)}`;
};

/**
 * Evita que una función se ejecute muchas veces seguidas.
 * Se usa, por ejemplo, en eventos de scroll o input.
 */
const debounce = (fn, delay = 150) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

/**
 * Delegación de eventos.
 * Escucha eventos en un contenedor y actúa sobre elementos hijos
 * que coincidan con el selector indicado.
 * Ejemplo:
 *   on(document, 'click', '.btn', (e, btn) => console.log(btn));
 */
const on = (parent, eventType, selector, handler) => {
  (parent || document).addEventListener(eventType, (event) => {
    const target = event.target.closest(selector);
    if (target) handler(event, target);
  });
};


/* ============================================================
   ⚙️ CONFIGURACIÓN GENERAL DEL PROYECTO
   ------------------------------------------------------------
   Aquí definimos constantes, claves de almacenamiento y
   parámetros globales que controlan el comportamiento del sitio.
   ============================================================ */

/**
 * Claves únicas usadas en localStorage.
 * Sirven para guardar datos de manera persistente entre sesiones.
 */
const STORAGE_KEYS = {
  CART: 'soundgarden_cart_v1',   // Carrito de compras
  THEME: 'soundgarden_theme_v1'  // Preferencia de tema (claro/oscuro)
};

/**
 * Configuración global del sitio.
 * Puede adaptarse según entorno (producción, pruebas, local).
 */
const CONFIG = {
  // Coordenadas predeterminadas (ejemplo: vista inicial de mapa o ubicación de tienda)
  defaultMapView: [51.505, -0.09],
  
  // Nivel de zoom predeterminado
  defaultMapZoom: 15,
  
  // URL opcional para cargar productos desde una API o archivo JSON
  // Ejemplo: 'https://api.thesoundgarden.com/products'
  productFetchUrl: null
};
/* ============================================================
   📱 3.1 MENÚ MÓVIL (GLOBAL / HOME)
   ------------------------------------------------------------
   Controla la apertura y cierre del menú de navegación móvil.
   Elementos requeridos:
     - Botón con id="mobileMenuBtn"
     - Contenedor de navegación con clase ".main-nav"
   ============================================================ */

function initMobileMenu() {
  const mobileMenuBtn = $('#mobileMenuBtn');
  const mainNav = $('.main-nav');

  // Verificación defensiva: evita errores si los elementos no existen
  if (!mobileMenuBtn || !mainNav) {
    console.warn('⚠️ initMobileMenu: elementos requeridos no encontrados.');
    return;
  }

  // Estado inicial: cerrado
  mobileMenuBtn.setAttribute('aria-expanded', 'false');

  // Listener principal: alternar visibilidad del menú
  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('show');
    mobileMenuBtn.setAttribute('aria-expanded', isOpen.toString());

    // Animación opcional (clase CSS)
    mainNav.classList.toggle('nav-animada', isOpen);
  });

  // Cierre automático si se hace clic fuera del menú
  document.addEventListener('click', (e) => {
    if (!mainNav.contains(e.target) && e.target !== mobileMenuBtn) {
      mainNav.classList.remove('show', 'nav-animada');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  });
}
/* ============================================================
   🗺️ 3.2 MAPA (PÁGINA: contacto / ubicaciones)
   ------------------------------------------------------------
   - Inicializa un mapa Leaflet si la librería está disponible.
   - Elemento esperado: <div id="map"></div>
   - Usa configuración global definida en CONFIG.
   ============================================================ */

function initMap() {
  const mapContainer = $('#map');

  // Validación defensiva: evita errores si no existe el div o Leaflet no está cargado
  if (!mapContainer) {
    console.warn('⚠️ initMap: elemento #map no encontrado.');
    return;
  }

  if (typeof L === 'undefined') {
    console.warn('⚠️ initMap: Leaflet no está disponible. ¿Olvidaste incluir leaflet.js?');
    return;
  }

  try {
    const { defaultMapView, defaultMapZoom } = CONFIG;

    const map = L.map(mapContainer).setView(defaultMapView, defaultMapZoom);

    // Capa base (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map);

    // Marcador principal con tooltip emergente
    const marker = L.marker(defaultMapView)
      .addTo(map)
      .bindPopup('<b>Ubicación principal</b><br>Visítanos en este punto.')
      .openPopup();

    // Ajuste: enfoque automático al marcador si se redimensiona la ventana
    window.addEventListener('resize', () => {
      map.setView(defaultMapView);
    });

  } catch (error) {
    console.error('❌ Error al inicializar el mapa:', error);
  }
}
/* 3.3 Formulario de contacto (página: contacto)
   - Validación ligera en cliente (front-end).
   - No reemplaza la validación del servidor.
   - Requiere: form#contactForm e inputs con IDs #name, #email, #message.
*/
function initContactForm() {
  const form = $('#contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obtener campos
    const nameEl = $('#name');
    const emailEl = $('#email');
    const messageEl = $('#message');
    const submitBtn = form.querySelector('.submit-btn');
    const formMsg = $('#formMessage');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Limpiar errores previos
    $$('.error-message').forEach(el => el.textContent = '');

    // Validación
    const errors = {
      name: !nameEl?.value.trim() && 'Por favor ingresa tu nombre',
      email: !emailRegex.test(emailEl?.value.trim()) && 'Ingresa un correo válido',
      message: !messageEl?.value.trim() && 'Escribe tu mensaje'
    };

    // Mostrar errores
    for (const [field, message] of Object.entries(errors)) {
      const errorEl = $(`#${field}Error`);
      if (errorEl && message) errorEl.textContent = message;
    }

    // Si hay algún error, detener envío
    if (Object.values(errors).some(Boolean)) return;

    // Estado “enviando”
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');
    }

    // Simulación de envío (reemplazar con fetch() en producción)
    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
      }

      if (formMsg) {
        formMsg.textContent = '¡Gracias! Tu mensaje ha sido recibido.';
        formMsg.classList.add('success');
        setTimeout(() => formMsg.classList.remove('success'), 4000);
      }

      form.reset();
    }, 900);
  });
}

/* ==========================
   3.4 Login y recuperación (página: login)
   - Validación ligera y simulación de flujo de autenticación.
   - Detecta reCAPTCHA (grecaptcha) si existe.
   - Elementos esperados:
       form#loginForm, input#email, input#password,
       a#forgotPassword, div#passwordRecoveryModal, form#recoveryForm
   ========================== */

function initLoginForm() {
  const form = $('#loginForm');
  if (!form) return;

  // --- Manejador del login ---
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailEl = $('#email');
    const passwordEl = $('#password');
    const email = emailEl?.value.trim();
    const password = passwordEl?.value.trim();

    // Validación mínima
    if (!email || !password) {
      alert('Por favor ingresa tus credenciales.');
      return;
    }

    // Validar reCAPTCHA si está presente
    if (typeof grecaptcha !== 'undefined') {
      const response = grecaptcha.getResponse();
      if (!response) {
        alert('Completa la verificación CAPTCHA.');
        return;
      }
    }

    // Simulación de login
    console.log('Login simulado:', { email });
    form.classList.add('loading');

    // En producción: usar fetch POST a /api/login y manejar tokens
    setTimeout(() => {
      form.classList.remove('loading');
      window.location.href = '../admin/index.html';
    }, 800);
  });

  // --- Modal de recuperación de contraseña ---
  const forgotLink = $('#forgotPassword');
  const modal = $('#passwordRecoveryModal');
  const closeBtn = modal?.querySelector('.close-modal');
  const recoveryForm = $('#recoveryForm');

  // Abrir modal
  if (forgotLink && modal) {
    forgotLink.addEventListener('click', (ev) => {
      ev.preventDefault();
      modal.style.display = 'flex';
    });
  }

  // Cerrar modal
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  // Cerrar modal al hacer clic fuera del contenido
  window.addEventListener('click', (ev) => {
    if (ev.target === modal) modal.style.display = 'none';
  });

  // Envío del formulario de recuperación
  if (recoveryForm) {
    recoveryForm.addEventListener('submit', (ev) => {
      ev.preventDefault();
      alert('Se ha enviado un enlace de recuperación (simulado).');
      modal.style.display = 'none';
      recoveryForm.reset();
    });
  }
}
/* ==========================
   3.5 Productos y carrito (página: menú / tienda)
   - Control del catálogo y carrito de compra.
   - Persistencia con localStorage.
   - Usa delegación de eventos para mejor rendimiento.
   - Compatible con carga remota si CONFIG.productFetchUrl está definida.
   ========================== */

function initProductsModule() {
  const menuContainer = $('#menu-container');
  const filterContainer = $('#filter-container');
  const cartIcon = $('#cart-icon');
  const cartModal = $('#cart-modal');
  const overlay = $('#overlay');
  const searchInput = $('#productSearch');  // opcional
  const sortSelect = $('#productSort');     // opcional

  if (!menuContainer) return; // sin contenedor, no se ejecuta

  /* --------------------------
     1) Carga de productos
  -------------------------- */
  let products = window._THE_SOUNDGARDEN_PRODUCTS || [];

  const loadProductsFromServer = async () => {
    if (!CONFIG.productFetchUrl) return;
    try {
      const res = await fetch(CONFIG.productFetchUrl);
      if (!res.ok) throw new Error('No se pudo obtener productos');
      const data = await res.json();
      if (Array.isArray(data)) products = data;
    } catch (err) {
      console.warn('Fetch productos falló:', err);
    }
  };

  const dedupe = (list) =>
    Array.from(new Map((list || []).map((p) => [p.id, p])).values());

  /* --------------------------
     2) Carrito y persistencia
  -------------------------- */
  let cart = JSON.parse(localStorage.getItem(STORAGE_KEYS.CART) || '[]');

  const saveCart = () =>
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));

  const findProduct = (id) =>
    products.find((p) => Number(p.id) === Number(id));

  const addToCart = (id) => {
    const product = findProduct(id);
    if (!product) return;

    const existing = cart.find((item) => item.id === id);
    if (existing) existing.qty += 1;
    else cart.push({ ...product, qty: 1 });

    cart = dedupe(cart);
    saveCart();
    renderCart();
  };

  const removeFromCart = (id) => {
    cart = cart.filter((item) => item.id !== id);
    saveCart();
    renderCart();
  };

  const clearCart = () => {
    cart = [];
    saveCart();
    renderCart();
  };

  /* --------------------------
     3) Renderizado
  -------------------------- */
  const renderProducts = (list) => {
    menuContainer.innerHTML = '';
    list.forEach((p) => {
      const card = createEl('div', { className: 'product-card' });
      card.innerHTML = `
        <img src="${p.img || 'img/default.jpg'}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${formatPrice(p.price)}</p>
        <button class="add-to-cart" data-id="${p.id}">Agregar</button>
      `;
      menuContainer.appendChild(card);
    });
  };

  const renderCart = () => {
    const list = cartModal?.querySelector('.cart-items');
    const totalEl = cartModal?.querySelector('.cart-total');
    if (!list || !totalEl) return;

    list.innerHTML = '';
    let total = 0;

    cart.forEach((item) => {
      total += item.price * item.qty;
      const row = createEl('div', { className: 'cart-item' });
      row.innerHTML = `
        <span>${item.name}</span>
        <span>${formatPrice(item.price * item.qty)}</span>
        <button class="remove-item" data-id="${item.id}">✕</button>
      `;
      list.appendChild(row);
    });

    totalEl.textContent = formatPrice(total);
  };

  /* --------------------------
     4) Filtros, búsqueda y orden
  -------------------------- */
  const filterProducts = () => {
    const query = searchInput?.value.toLowerCase() || '';
    let filtered = products.filter((p) =>
      p.name.toLowerCase().includes(query)
    );

    if (sortSelect) {
      const value = sortSelect.value;
      if (value === 'price-asc') filtered.sort((a, b) => a.price - b.price);
      if (value === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    }

    renderProducts(filtered);
  };

  /* --------------------------
     5) Event Listeners
  -------------------------- */
  on(menuContainer, 'click', '.add-to-cart', (e, target) => {
    addToCart(Number(target.dataset.id));
  });

  on(cartModal, 'click', '.remove-item', (e, target) => {
    removeFromCart(Number(target.dataset.id));
  });

  if (cartIcon && cartModal && overlay) {
    cartIcon.addEventListener('click', () => {
      cartModal.classList.add('visible');
      overlay.classList.add('visible');
    });

    overlay.addEventListener('click', () => {
      cartModal.classList.remove('visible');
      overlay.classList.remove('visible');
    });
  }

  if (searchInput) searchInput.addEventListener('input', debounce(filterProducts, 300));
  if (sortSelect) sortSelect.addEventListener('change', filterProducts);

  /* --------------------------
     6) Inicialización final
  -------------------------- */
  (async () => {
    await loadProductsFromServer();
    renderProducts(products);
    renderCart();
  })();
}

  /* ==========================================================
   3.6 Interfaz de Usuario (UI templates)
   - Genera dinámicamente productos, filtros, búsqueda y carrito
   - Usa funciones auxiliares definidas previamente
   ========================================================== */

// === UI templates ===
const createProductCard = (product) => {
  const card = createEl('div', {
    className: 'product-card',
    dataset: { category: product.category || 'sin-categoria' }
  });

  card.innerHTML = `
    <div class="image-container">
      <img src="${product.image || ''}" alt="${product.name || 'Producto'}"
           class="product-image" loading="lazy">
    </div>
    <div class="product-details">
      <h3 class="product-title">${product.name || 'Sin nombre'}</h3>
      <p class="product-description">${product.description || ''}</p>
      <p class="product-price">${formatPrice(product.price || 0)}</p>
      <button class="add-to-cart" data-id="${product.id}">
        Añadir al Carrito
      </button>
    </div>
  `;
  return card;
};

// === Renderizado de productos ===
function renderProducts(list) {
  menuContainer.innerHTML = '';
  if (!list || list.length === 0) {
    menuContainer.innerHTML = '<p>No hay productos disponibles.</p>';
    return;
  }
  const frag = document.createDocumentFragment();
  list.forEach(p => frag.appendChild(createProductCard(p)));
  menuContainer.appendChild(frag);
}

// === Generación dinámica de botones de filtro ===
function generateFilterButtons() {
  if (!filterContainer) return;
  const categories = ['all', ...new Set(products.map(p => p.category || 'sin-categoria'))];
  const names = { all: 'Todos' };

  filterContainer.innerHTML = '';
  categories.forEach(cat => {
    const btn = createEl('button', {
      className: 'filter-btn',
      textContent: names[cat] || cat
    });
    btn.dataset.category = cat;
    if (cat === 'all') btn.classList.add('active');
    filterContainer.appendChild(btn);
  });
}

// === Aplicar filtro por categoría ===
function applyFilter(category) {
  if (category === 'all') renderProducts(products);
  else renderProducts(products.filter(p => p.category === category));
}

// === Búsqueda y ordenamiento ===
function applySearchAndSort() {
  let list = products.slice();
  const q = searchInput ? searchInput.value.trim().toLowerCase() : '';

  if (q) {
    list = list.filter(p =>
      (p.name || '').toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q)
    );
  }

  if (sortSelect) {
    const v = sortSelect.value;
    if (v === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (v === 'price-desc') list.sort((a, b) => b.price - a.price);
  }

  renderProducts(list);
}

// === Funciones del carrito ===
function updateCartCount() {
  const el = $('#cart-count');
  if (!el) return;
  const total = cart.reduce((s, it) => s + it.quantity, 0);
  el.textContent = total;
}

function updateCartItems() {
  const container = $('#cart-items');
  const totalEl = $('#cart-total');
  if (!container || !totalEl) return;

  container.innerHTML = '';
  if (cart.length === 0) {
    container.innerHTML = '<p>Tu carrito está vacío</p>';
    totalEl.textContent = '$0.00';
    return;
  }

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    const div = createEl('div', { className: 'cart-item' });
    div.innerHTML = `
      <img src="${item.image || ''}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.name}</h4>
        <p class="cart-item-price">${formatPrice(item.price)}</p>
        <div class="cart-item-quantity">
          <button class="quantity-btn decrease" data-id="${item.id}">-</button>
          <span class="item-quantity">${item.quantity}</span>
          <button class="quantity-btn increase" data-id="${item.id}">+</button>
          <button class="remove-item" data-id="${item.id}" aria-label="Eliminar">🗑️</button>
        </div>
      </div>
    `;
    container.appendChild(div);
  });

  totalEl.textContent = formatPrice(total);
}

// === Añadir producto al carrito ===
function addToCartById(id) {
  const product = findProduct(id);
  if (!product) return console.warn('Producto no encontrado', id);

  const idx = cart.findIndex(i => i.id === id);
  if (idx !== -1) cart[idx].quantity += 1;
  else cart.push({
    id: product.id,
    name: product.name,
    price: Number(product.price) || 0,
    image: product.image || '',
    quantity: 1
  });

  saveCart();
  updateCartCount();
  updateCartItems();
  showToast('Añadido al carrito');
}

// === Cambiar cantidad de un producto ===
function changeQuantity(id, delta) {
  const idx = cart.findIndex(i => i.id === id);
  if (idx === -1) return;
  cart[idx].quantity += delta;
  if (cart[idx].quantity <= 0) cart.splice(idx, 1);
  saveCart();
  updateCartCount();
  updateCartItems();
}

// === Eliminar producto del carrito ===
function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCartCount();
  updateCartItems();
}

// === Mostrar/Ocultar carrito ===
function toggleCart() {
  if (!cartModal || !overlay) return;
  cartModal.classList.toggle('active');
  overlay.classList.toggle('active');
}

// === Sistema de notificaciones rápidas (toast) ===
function showToast(msg, time = 1200) {
  let t = $('#toast');
  if (!t) {
    t = createEl('div', { id: 'toast', className: 'toast' });
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('visible');
  setTimeout(() => t.classList.remove('visible'), time);
}

  // Delegación de eventos: botones de añadir
  on(document, 'click', '.add-to-cart', (ev, btn) => {
    const id = Number(btn.dataset.id);
    addToCartById(id);
    // feedback rápido
    btn.disabled = true;
    const prev = btn.textContent;
    btn.textContent = 'Añadido';
    setTimeout(() => { btn.disabled = false; btn.textContent = prev; }, 800);
  });

  // Delegación para el carrito (aumentar/disminuir/remover)
  on(document, 'click', '.quantity-btn.decrease', (ev, btn) => changeQuantity(Number(btn.dataset.id), -1));
  on(document, 'click', '.quantity-btn.increase', (ev, btn) => changeQuantity(Number(btn.dataset.id), +1));
  on(document, 'click', '.remove-item', (ev, btn) => removeFromCart(Number(btn.dataset.id)));

  // Botón para alternar carrito
  if (cartIcon) cartIcon.addEventListener('click', toggleCart);
  if (overlay) overlay.addEventListener('click', toggleCart);
  const closeCartBtn = $('#close-cart'); if (closeCartBtn) closeCartBtn.addEventListener('click', toggleCart);

  // Binds para search y sort (si existen)
  if (searchInput) searchInput.addEventListener('input', debounce(applySearchAndSort, 200));
  if (sortSelect) sortSelect.addEventListener('change', applySearchAndSort);

  // Inicialización: cargar productos (posible fetch), dedupe y render
  (async () => {
    await loadProductsFromServer();
    products = dedupe(products);
    generateFilterButtons();
    renderProducts(products);
    updateCartCount();
    updateCartItems();

    // filtros dinámicos
    on(filterContainer || document, 'click', '.filter-btn', (ev, btn) => {
      // quitar active
      $$('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.category);
    });
  })();

/* ==========================================================
   3.6 Carrusel simple y banner (página: home)
   ----------------------------------------------------------
   - Implementa un carrusel de imágenes con botones anterior/siguiente.
   - Se desplaza automáticamente cada 5 segundos.
   - Al pasar el cursor (hover), el movimiento se pausa.
   - El desplazamiento es circular (vuelve al inicio tras la última imagen).
   - Requiere en HTML:
       .carrusel-images → contenedor principal con imágenes dentro.
       .prev y .next → botones de navegación.
   ========================================================== */

function initCarousel() {
  // Selecciona el contenedor principal del carrusel.
  const carrusel = $('.carrusel-images');
  if (!carrusel) return; // Si no existe, sale sin ejecutar nada.

  // Selecciona todas las imágenes del carrusel.
  const images = $$('.carrusel-images img');

  // Índice actual de la imagen mostrada y referencia al intervalo automático.
  let idx = 0; 
  let interval;

  // Botones de navegación.
  const prevBtn = $('.prev');
  const nextBtn = $('.next');

  /**
   * Muestra la imagen correspondiente al índice dado.
   * Usa un desplazamiento CSS (translateX) para mover el contenedor.
   */
  const showImage = (i) => {
    // Asegura un índice circular (si llega al final, vuelve al inicio).
    idx = (i + images.length) % images.length;

    // Mueve el carrusel horizontalmente.
    carrusel.style.transform = `translateX(${-idx * 100}%)`;
  };

  /** Avanza una imagen hacia adelante */
  const next = () => showImage(idx + 1);

  /** Retrocede una imagen hacia atrás */
  const prev = () => showImage(idx - 1);

  // Asocia los botones de navegación (si existen).
  if (prevBtn) prevBtn.addEventListener('click', prev);
  if (nextBtn) nextBtn.addEventListener('click', next);

  // Pausa el desplazamiento automático al pasar el cursor.
  carrusel.addEventListener('mouseenter', () => clearInterval(interval));

  // Reanuda el desplazamiento automático al quitar el cursor.
  carrusel.addEventListener('mouseleave', () => {
    interval = setInterval(next, 5000);
  });

  // Inicia el desplazamiento automático solo si hay imágenes.
  if (images.length > 0) interval = setInterval(next, 5000);
}

/* ==========================================================
   3.7 Lightbox / Swiper / otros (si existen)
   ----------------------------------------------------------
   - Inicializa librerías externas de UI (Lightbox y Swiper).
   - Se asegura de que cada librería esté cargada antes de usarla.
   - Aplica configuraciones básicas y comportamiento responsive.
   - Requiere en HTML:
       - Contenedor con clase .swiper-container para carrusel Swiper.
       - Botones .gallery-button-next / .gallery-button-prev (opcional).
   ========================================================== */

function initOptionalPlugins() {
  // =======================
  // LIGHTBOX (galería de imágenes ampliadas)
  // =======================
  // Verifica si la librería está definida antes de configurarla.
  if (typeof lightbox !== 'undefined' && lightbox.option) {
    lightbox.option({
      resizeDuration: 200,               // Duración de la animación de redimensionado.
      wrapAround: true,                  // Permite navegación circular en la galería.
      alwaysShowNavOnTouchDevices: true  // Muestra flechas en dispositivos táctiles.
    });
  }

  // =======================
  // SWIPER (carrusel avanzado)
  // =======================
  // Comprueba que la clase exista y que la librería esté disponible.
  if (typeof Swiper !== 'undefined' && $('.swiper-container')) {
    // eslint-disable-next-line no-undef
    new Swiper('.swiper-container', {
      slidesPerView: 4,                 // Cantidad de slides visibles por defecto.
      spaceBetween: 24,                 // Separación en píxeles entre slides.
      pagination: {                     // Configuración de la paginación (puntos).
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {                     // Configuración de los botones de navegación.
        nextEl: '.gallery-button-next',
        prevEl: '.gallery-button-prev'
      },
      loop: true,                       // Permite que el carrusel sea infinito.
      
      // Configuración responsive (ajusta cantidad de slides por ancho de pantalla).
      breakpoints: {
        1024: { slidesPerView: 4 },
        768:  { slidesPerView: 3 },
        640:  { slidesPerView: 2 },
        320:  { slidesPerView: 1 }
      }
    });
  }
}

/* ==========================================================
   3.8 Smooth Scrolling + Highlight (Scroll Spy Mejorado)
   ----------------------------------------------------------
   - Desplazamiento suave entre secciones (smooth scrolling).
   - Usa IntersectionObserver para detectar qué sección está visible.
   - Activa dinámicamente el enlace correspondiente en la barra de navegación.
   - Requiere:
       - Secciones con clase .service-section e id único.
       - Navegación con .service-nav y enlaces <a href="#id">.
   ========================================================== */

function initScrollSpyAndSmooth() {
  // =======================
  // CONFIGURACIÓN INICIAL
  // =======================
  const navLinks = $$('.service-nav a');
  if (navLinks.length === 0) return; // Si no hay navegación, no se inicializa.

  // =======================
  // DESPLAZAMIENTO SUAVE (Smooth Scrolling)
  // =======================
  navLinks.forEach(link => link.addEventListener('click', function (ev) {
    ev.preventDefault();
    const target = document.querySelector(this.getAttribute('href')); // Busca el destino por ID.
    if (!target) return;

    // Desplazamiento con margen superior (por headers fijos, por ejemplo).
    window.scrollTo({
      top: target.offsetTop - 80,
      behavior: 'smooth' // Animación nativa.
    });
  }));

  // =======================
  // HIGHLIGHT AUTOMÁTICO (Scroll Spy)
  // =======================
  const sections = $$('.service-section');

  // IntersectionObserver detecta qué sección está visible en el viewport.
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');

        // Limpia todos los enlaces activos y activa el actual.
        $$('.service-nav a').forEach(l => l.classList.remove('active'));
        const activeLink = document.querySelector(`.service-nav a[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, {
    // Margen que define cuándo una sección se considera “visible”.
    rootMargin: '-20% 0px -60% 0px'
  });

  // Observa todas las secciones
  sections.forEach(section => observer.observe(section));
}
/* ==========================================================
   3.9 Accordion (Accesible)
   ----------------------------------------------------------
   - Implementa un acordeón simple y accesible.
   - Estructura esperada en el HTML:
        <div class="accordion-item">
          <div class="accordion-header">Título</div>
          <div class="accordion-content">Contenido</div>
        </div>
   - Requiere las clases:
        .accordion-item      → contenedor del bloque
        .accordion-header    → botón de apertura
        .accordion-content   → contenido plegable
   ========================================================== */

function initAccordion() {
  // Recorre todos los elementos del acordeón
  $$('.accordion-item').forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
    if (!header || !content) return; // Verificación de estructura válida

    // =======================
    // Configuración de accesibilidad
    // =======================
    header.setAttribute('role', 'button');
    header.setAttribute('tabindex', '0'); // Permite navegación por teclado
    header.setAttribute('aria-expanded', 'false'); // Estado accesible inicial
    content.setAttribute('aria-hidden', 'true');

    // =======================
    // Comportamiento al hacer click
    // =======================
    header.addEventListener('click', () => {
      const isActive = item.classList.toggle('active');
      header.setAttribute('aria-expanded', isActive);
      content.setAttribute('aria-hidden', !isActive);

      // Transición del contenido (altura animada)
      content.style.maxHeight = isActive ? content.scrollHeight + 'px' : null;
    });

    // =======================
    // Accesibilidad por teclado (Enter o Espacio)
    // =======================
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault(); // Evita desplazamiento accidental con la barra espaciadora
        header.click();     // Simula el click
      }
    });
  });
}
/* ==========================================================
   3.10 Animate on Scroll (AOS mejorado con IntersectionObserver)
   ----------------------------------------------------------
   - Activa animaciones cuando los elementos entran al viewport.
   - Evita el uso excesivo de listeners de scroll → rendimiento superior.
   - Estructura esperada:
        <div class="animate__animated" data-ao-class="animate__fadeInUp"></div>
   - Clases:
        .animate__animated → marca base (sin animación inicial)
        data-ao-class      → define qué animación aplicar (opcional)
   ========================================================== */

function initAnimateOnScroll() {
  // Selecciona todos los elementos animables
  const elements = $$('.animate__animated');
  if (elements.length === 0) return;

  // Configura el observador: se activa cuando el 15% del elemento es visible
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return; // No está visible aún

      const el = entry.target;

      // Determina la clase de animación: prioridad → data-ao-class, luego segunda clase
      const animationClass = el.dataset.aoClass || el.classList[1];
      if (animationClass) el.classList.add(animationClass);

      // Evita reanimar elementos ya mostrados (mejor rendimiento)
      obs.unobserve(el);
    });
  }, { threshold: 0.15 });

  // Observa cada elemento
  elements.forEach(el => observer.observe(el));
}
/* ==========================================================
   3.11 Botón "Volver arriba" y Tema Oscuro Persistente
   ----------------------------------------------------------
   - Botón de retorno: #btn-arriba → aparece al hacer scroll.
   - Interruptor de tema: #modo-toggle → guarda preferencia en localStorage.
   - Claves de almacenamiento: STORAGE_KEYS.THEME
   ========================================================== */

function initUiHelpers() {
  const btn = $('#btn-arriba');
  const toggle = $('#modo-toggle');

  /* --------------------------------------------
     BOTÓN "VOLVER ARRIBA"
     -------------------------------------------- */
  if (btn) {
    // Mostrar/ocultar con debounce (para no saturar el scroll)
    window.addEventListener('scroll', debounce(() => {
      const visible = document.documentElement.scrollTop > 200;
      btn.style.display = visible ? 'block' : 'none';
    }, 80));

    // Scroll suave hacia el inicio
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* --------------------------------------------
     TEMA OSCURO PERSISTENTE
     -------------------------------------------- */
  if (toggle) {
    const root = document.documentElement;

    // Cargar tema almacenado o usar modo por defecto
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'auto';
    applyTheme(savedTheme);
    toggle.value = savedTheme;

    // Escucha cambios manuales del usuario
    toggle.addEventListener('change', (e) => {
      const theme = e.target.value;
      applyTheme(theme);
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    });

    // Aplica el tema según la preferencia seleccionada
    function applyTheme(mode) {
      root.dataset.theme = mode;
      if (mode === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.dataset.theme = prefersDark ? 'dark' : 'light';
      }
    }

    // Escucha cambios del sistema operativo (si el modo es 'auto')
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      const current = localStorage.getItem(STORAGE_KEYS.THEME) || 'auto';
      if (current === 'auto') applyTheme('auto');
    });
  }
}

/* ==========================================================
   3.11 Botón "Volver arriba" y Experimento de Modo Noche 🌙
   ----------------------------------------------------------
   - Botón: #btn-arriba → aparece al hacer scroll.
   - Botón de modo: #modo-toggle → alterna tema claro/oscuro.
   - Guarda preferencia en localStorage (STORAGE_KEYS.THEME)
   ========================================================== */

function initUiHelpers() {
  const btn = $('#btn-arriba');
  const modoBtn = $('#modo-toggle');

  // --- Botón "volver arriba" ---
  if (btn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        btn.style.display = 'block';
      } else {
        btn.style.display = 'none';
      }
    });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Experimento de modo noche ---
  if (modoBtn) {
    // Leer el tema guardado en localStorage
    const temaGuardado = localStorage.getItem(STORAGE_KEYS.THEME);

    // Si el tema guardado era oscuro, aplicarlo
    if (temaGuardado === 'dark') {
      document.body.classList.add('oscuro');
    }

    // Actualizar el texto del botón según el tema actual
    modoBtn.textContent = document.body.classList.contains('oscuro')
      ? '☀️ Modo claro'
      : '🌙 Modo oscuro';

    // Alternar entre claro y oscuro al hacer clic
    modoBtn.addEventListener('click', () => {
      document.body.classList.toggle('oscuro');
      const esOscuro = document.body.classList.contains('oscuro');

      // Cambiar el texto del botón dinámicamente
      modoBtn.textContent = esOscuro ? '☀️ Modo claro' : '🌙 Modo oscuro';

      // Guardar preferencia
      localStorage.setItem(STORAGE_KEYS.THEME, esOscuro ? 'dark' : 'light');
    });
  }
}
/* ==========================
   5) Inicializador general
   - Llama a cada initX según disponibilidad de elementos.
   - Versión simplificada y funcional para entorno junior.
   ========================== */

// --- Funciones auxiliares mínimas ---
function $(sel) { return document.querySelector(sel); }
function debounce(fn, delay = 100) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

/* ==========================
   3.11 Botón "volver arriba" y modo oscuro persistente
   ========================== */
function initUiHelpers() {
  const btn = $('#btn-arriba');
  const modoBtn = $('#modo-toggle');

  // --- Botón "Volver arriba" ---
  if (btn) {
    window.addEventListener('scroll', debounce(() => {
      btn.style.display = (document.documentElement.scrollTop > 200) ? 'block' : 'none';
    }, 80));

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Modo oscuro / claro persistente ---
  if (modoBtn) {
    // Cargar preferencia guardada
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') document.body.classList.add('oscuro');

    // Establecer texto inicial del botón
    modoBtn.textContent = document.body.classList.contains('oscuro')
      ? '☀️ Modo claro'
      : '🌙 Modo oscuro';

    // Alternar modo al hacer clic
    modoBtn.addEventListener('click', () => {
      document.body.classList.toggle('oscuro');
      const nowDark = document.body.classList.contains('oscuro');
      modoBtn.textContent = nowDark ? '☀️ Modo claro' : '🌙 Modo oscuro';
      localStorage.setItem('theme', nowDark ? 'dark' : 'light');
    });
  }
}

/* ==========================
   Login básico (demo funcional)
   ========================== */
function initLoginForm() {
  const loginForm = document.getElementById('loginForm');
  if (!loginForm) return;

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Limpiar mensajes de error previos
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    let valid = true;

    if (!username) {
      document.getElementById('usernameError').textContent = 'Por favor ingresa tu nombre de usuario';
      valid = false;
    }
    if (!password) {
      document.getElementById('passwordError').textContent = 'Por favor ingresa tu contraseña';
      valid = false;
    }

    if (!valid) return;

    // Simulación de inicio de sesión (sin backend)
    console.log('Iniciando sesión con:', { username, password });
    alert(`Inicio de sesión exitoso: ${username}`);
  });
}

/* ==========================
   Inicializador global
   ========================== */
function initAll() {
  initUiHelpers();  // helpers visuales
  initLoginForm();  // formulario de login
  console.log('✅ app.js inicializado — módulos activos.');
}

/* Ejecutar cuando el DOM esté listo */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}

/* =========================================================
   ⚙️ CONFIGURACIÓN DE MENÚ Y MODO DE TEMA
   ---------------------------------------------------------
   Controla la apertura del menú de configuración y el
   sistema de temas claro, oscuro o automático.
   ========================================================= */

const btnConfig = document.getElementById("btn-config");
const menuConfig = document.getElementById("menu-config");
const themeSelect = document.getElementById("theme-mode");

btnConfig.addEventListener("click", () => {
  const visible = menuConfig.classList.toggle("menu-visible");
  btnConfig.setAttribute("aria-expanded", visible);
  menuConfig.setAttribute("aria-hidden", !visible);
});

themeSelect.addEventListener("change", (e) => {
  const mode = e.target.value;
  document.body.dataset.theme = mode;
  localStorage.setItem("theme-mode", mode);
});

document.addEventListener("click", (e) => {
  if (!btnConfig.contains(e.target) && !menuConfig.contains(e.target)) {
    menuConfig.classList.remove("menu-visible");
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("theme-mode") || "auto";
  document.body.dataset.theme = saved;
  themeSelect.value = saved;
});

/* =========================================================
   🌅 SALUDO DINÁMICO SEGÚN LA HORA
   ---------------------------------------------------------
   Muestra un mensaje distinto según la hora del día.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const hora = new Date().getHours();
  let saludo, colorFondo;

  if (hora < 12) {
    saludo = "☀️ ¡Buenos días, músico! Empieza tu día con ritmo en The SoundGarden.";
    colorFondo = "linear-gradient(90deg, #ffafbd, #ffc3a0)";
  } else if (hora < 19) {
    saludo = "🌵 ¡Buenas tardes! Descubre instrumentos hechos con alma cuyabra.";
    colorFondo = "linear-gradient(90deg, #89f7fe, #66a6ff)";
  } else {
    saludo = "🌙 ¡Buenas noches, artista! La inspiración no duerme en The SoundGarden.";
    colorFondo = "linear-gradient(90deg, #2b5876, #4e4376)";
  }

  const saludoBanner = document.createElement("div");
  saludoBanner.innerHTML = `<strong>${saludo}</strong>`;
  saludoBanner.style.cssText = `
    background: ${colorFondo};
    color: white;
    padding: 12px 20px;
    text-align: center;
    font-family: 'Oswald', sans-serif;
    font-size: 1rem;
    letter-spacing: 0.5px;
    border-bottom: 3px solid rgba(255,255,255,0.2);
    animation: aparecer 1.2s ease-out forwards;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  `;

  document.body.prepend(saludoBanner);
});

// =========================
// CONFIGURACIÓN DE TEMA
// =========================
const btnConfigs = document.getElementById("btn-config");
const menuConfigs = document.getElementById("menu-config");
const themeSelects = document.getElementById("theme-mode");

// Mostrar / ocultar menú de configuración
btnConfig.addEventListener("click", () => {
  menuConfig.classList.toggle("menu-visible");
});

// ---- GESTIÓN DE TEMA ----
const THEME_KEY = "sg_theme_v1";

// Función: aplica el tema actual
function applyTheme(theme) {
  document.body.removeAttribute("data-theme"); // Limpia todo antes
  if (theme === "dark") {
    document.body.setAttribute("data-theme", "dark");
  } else if (theme === "light") {
    document.body.setAttribute("data-theme", "light");
  } else if (theme === "auto") {
    // Detectar modo del sistema
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.body.setAttribute("data-theme", prefersDark ? "dark" : "light");
  }
}

// Cargar preferencia del usuario
const savedTheme = localStorage.getItem(THEME_KEY) || "auto";
themeSelect.value = savedTheme;
applyTheme(savedTheme);

// Escuchar cambios del usuario
themeSelect.addEventListener("change", () => {
  const selected = themeSelect.value;
  localStorage.setItem(THEME_KEY, selected);
  applyTheme(selected);
});

// Escuchar cambios del sistema (si está en modo auto)
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
  const current = localStorage.getItem(THEME_KEY);
  if (current === "auto") applyTheme("auto");
});

// =========================
// BOTÓN VOLVER ARRIBA
// =========================
const btnArriba = document.getElementById("btn-arriba");

window.addEventListener("scroll", () => {
  const scrolled = document.documentElement.scrollTop > 200;
  btnArriba.style.display = scrolled ? "block" : "none";
});

btnArriba.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// =========================
// BANNER DE COOKIES
// =========================
const cookieBanner = document.getElementById("cookie-banner");
const acceptBtn = document.getElementById("accept-cookies");

// Detectar página actual (solo mostrar en index o productos)
const currentPage = window.location.pathname.split("/").pop();
const showCookieBanner = ["index.html", "productos.html", ""].includes(currentPage);

// Mostrar solo si corresponde y no se ha aceptado
if (cookieBanner && showCookieBanner && !localStorage.getItem("cookiesAccepted")) {
  cookieBanner.style.display = "flex";
}

if (acceptBtn) {
  acceptBtn.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    cookieBanner.style.opacity = "0";
    setTimeout(() => cookieBanner.remove(), 400);
  });
}

// SLIDERS Y SI NO INICIAN:

  // Seguridad: si no existe slider, no hacemos nada.
  (function () {
    const slider = document.getElementById('slider');
    if (!slider) return;

    const slides = Array.from(slider.querySelectorAll('.slide'));
    const indicatorsContainer = document.getElementById('slider-indicators');
    let currentSlide = 0;
    let autoplayInterval = null;
    const AUTOPLAY_DELAY = 5000; // 5s entre slides

    // Crear indicadores dinámicamente — ayudan a la navegación y accesibilidad.
    slides.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.className = 'indicator';
      btn.setAttribute('aria-label', `Ir a la diapositiva ${i + 1}`);
      btn.setAttribute('data-index', i);
      btn.type = 'button';
      btn.addEventListener('click', () => showSlide(i));
      indicatorsContainer.appendChild(btn);
    });

    const indicators = Array.from(indicatorsContainer.children);

    // Muestra la slide por índice (manejo seguro de rango)
    function showSlide(index) {
      if (!slides.length) return;
      currentSlide = ((index % slides.length) + slides.length) % slides.length; // wrap
      slides.forEach((s, i) => {
        const isActive = i === currentSlide;
        s.classList.toggle('active', isActive);
        s.setAttribute('aria-hidden', String(!isActive));
      });
      // Actualizar indicadores visuales y atributos
      indicators.forEach((ind, i) => {
        ind.classList.toggle('active', i === currentSlide);
        ind.setAttribute('aria-pressed', String(i === currentSlide));
      });
    }

    // Función global para mantener compatibilidad con onclick existentes
    window.changeSlide = function(direction) {
      showSlide(currentSlide + direction);
      resetAutoplay();
    };

    // Autoplay
    function startAutoplay() {
      stopAutoplay(); // por seguridad
      autoplayInterval = setInterval(() => {
        showSlide(currentSlide + 1);
      }, AUTOPLAY_DELAY);
    }
    function stopAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
      }
    }
    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    // Pausa al hover y reanuda al salir (mejora UX)
    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);

    // Soporte de teclado: flechas izquierda/derecha y escape para cerrar modales potenciales
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        showSlide(currentSlide + 1);
        resetAutoplay();
      } else if (e.key === 'ArrowLeft') {
        showSlide(currentSlide - 1);
        resetAutoplay();
      }
    });

    // Inicialización
    showSlide(0);
    startAutoplay();
  })();
