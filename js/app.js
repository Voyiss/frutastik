// Aplicación principal de Frutastik: Renderizado, Filtros, Carrito y WhatsApp

document.addEventListener('DOMContentLoaded', () => {
  let currentCategory = 'all';
  let searchQuery = '';

  // Elementos del DOM
  const categoriesList = document.getElementById('categories-list');
  const productsGrid = document.getElementById('products-grid');
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search');
  const emptyState = document.getElementById('empty-state');
  
  // Elementos del Carrito
  const cartToggleBtn = document.getElementById('cart-toggle-btn');
  const floatingCartBar = document.getElementById('floating-cart-bar');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartBackdrop = document.getElementById('cart-backdrop');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartBadge = document.getElementById('cart-badge');
  const cartBadgeFloating = document.getElementById('cart-badge-floating');
  const floatingCartTotal = document.getElementById('floating-cart-total');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartEmptyMsg = document.getElementById('cart-empty-msg');
  const cartFooter = document.getElementById('cart-footer');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const cartTotalEl = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('send-whatsapp-order');
  const clearCartBtn = document.getElementById('clear-cart-btn');

  // Campos de formulario de pedido
  const customerNameInput = document.getElementById('customer-name');
  const pickupLocationInput = document.getElementById('pickup-location');
  const orderNotesInput = document.getElementById('order-notes');

  // Modal de Fotos
  const photoModal = document.getElementById('photo-modal');
  const photoModalImg = document.getElementById('photo-modal-img');
  const photoModalTitle = document.getElementById('photo-modal-title');
  const photoModalClose = document.getElementById('photo-modal-close');

  // 1. RENDERIZAR CATEGORÍAS
  function renderCategories() {
    categoriesList.innerHTML = CATEGORIES.map(cat => `
      <button class="category-btn ${cat.id === currentCategory ? 'active' : ''}" data-category="${cat.id}">
        <span class="cat-icon">${cat.icon}</span>
        <span class="cat-name">${cat.name}</span>
      </button>
    `).join('');

    categoriesList.querySelectorAll('.category-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentCategory = btn.getAttribute('data-category');
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProducts();
      });
    });
  }

  // 2. RENDERIZAR PRODUCTOS
  function renderProducts() {
    const filtered = PRODUCTS.filter(p => {
      const matchesCategory = currentCategory === 'all' || p.category === currentCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      productsGrid.innerHTML = '';
      emptyState.classList.remove('hidden');
      return;
    }

    emptyState.classList.add('hidden');

    productsGrid.innerHTML = filtered.map(p => {
      const hasOptions = p.options && p.options.length > 0;
      
      let optionsHtml = '';
      if (hasOptions) {
        optionsHtml = `
          <div class="product-options-wrapper">
            <label for="opt-${p.id}" class="options-label">Personaliza tu orden:</label>
            <select id="opt-${p.id}" class="product-option-select">
              ${p.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
            </select>
          </div>
        `;
      } else if (p.requiresGomitas) {
        optionsHtml = `
          <div class="product-options-wrapper gomitas-hint-box" onclick="window.handleAddToCart('${p.id}')">
            <span class="options-label">🍬 Elige tus 3 tipos de gomitas:</span>
            <span class="gomitas-hint-sub">Frutitas, Panditas, Lombrices, Aros, Manguitos...</span>
          </div>
        `;
      }

      const badgeHtml = p.badge ? `<span class="product-badge">${p.badge}</span>` : '';
      const buttonLabel = p.requiresGomitas ? '+ Elegir Gomitas' : '+ Agregar';

      return `
        <article class="product-card" data-id="${p.id}">
          <div class="card-img-container" onclick="window.openImageModal('${p.image}', '${p.name.replace(/'/g, "\\'")}')">
            <img src="${p.image}" alt="${p.name}" loading="lazy" class="product-img" />
            ${badgeHtml}
            <button class="zoom-btn" title="Ver foto grande">🔍</button>
          </div>
          <div class="card-body">
            <div class="card-category-tag">${p.categoryName}</div>
            <h3 class="card-title">${p.name}</h3>
            <p class="card-desc">${p.description}</p>
            ${optionsHtml}
            <div class="card-footer">
              <div class="price-tag">
                <span class="currency">$</span>${p.price} <span class="mxn">MXN</span>
              </div>
              <button class="add-btn" onclick="window.handleAddToCart('${p.id}')">
                <span>${buttonLabel}</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // Manejador global para agregar al carrito
  window.handleAddToCart = (productId) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    if (product.requiresGomitas) {
      openGomitasModal(product);
      return;
    }

    let selectedOption = null;
    const optionSelect = document.getElementById(`opt-${productId}`);
    if (optionSelect) {
      selectedOption = optionSelect.value;
    }

    window.cart.addItem(product, selectedOption, 1);
    showToast(`¡${product.name} agregado al carrito! 🛍️`);
    
    // Animación de pulso en el botón flotante
    cartToggleBtn.classList.add('pulse');
    if (floatingCartBar) floatingCartBar.classList.add('pulse');
    setTimeout(() => {
      cartToggleBtn.classList.remove('pulse');
      if (floatingCartBar) floatingCartBar.classList.remove('pulse');
    }, 500);
  };

  // 3. ACTUALIZAR INTERFAZ DEL CARRITO
  function updateCartUI() {
    const items = window.cart.getItems();
    const totals = window.cart.getTotals();

    // Actualizar badges y botones
    cartBadge.textContent = totals.count;
    if (cartBadgeFloating) cartBadgeFloating.textContent = totals.count;
    if (floatingCartTotal) floatingCartTotal.textContent = `$${totals.total} MXN`;
    
    if (totals.count > 0) {
      cartBadge.classList.add('visible');
      cartToggleBtn.classList.add('has-items');
      if (floatingCartBar) floatingCartBar.classList.add('has-items');
    } else {
      cartBadge.classList.remove('visible');
      cartToggleBtn.classList.remove('has-items');
      if (floatingCartBar) floatingCartBar.classList.remove('has-items');
    }

    // Actualizar contenido del drawer
    if (items.length === 0) {
      cartItemsContainer.innerHTML = '';
      cartEmptyMsg.classList.remove('hidden');
      cartFooter.classList.add('hidden');
      return;
    }

    cartEmptyMsg.classList.add('hidden');
    cartFooter.classList.remove('hidden');

    cartItemsContainer.innerHTML = items.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
        <div class="cart-item-details">
          <h4 class="cart-item-title">${item.name}</h4>
          ${item.option ? `<span class="cart-item-opt">👉 ${item.option}</span>` : ''}
          <div class="cart-item-price">$${item.price} c/u</div>
        </div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="window.cart.updateQuantity('${item.id}', -1)" title="Restar">-</button>
          <span class="qty-number">${item.quantity}</span>
          <button class="qty-btn" onclick="window.cart.updateQuantity('${item.id}', 1)" title="Sumar">+</button>
        </div>
        <div class="cart-item-subtotal">
          $${item.price * item.quantity}
        </div>
        <button class="remove-btn" onclick="window.cart.removeItem('${item.id}')" title="Eliminar item">🗑️</button>
      </div>
    `).join('');

    cartSubtotalEl.textContent = `$${totals.total} MXN`;
    cartTotalEl.textContent = `$${totals.total} MXN`;
  }

  // 4. CONTROL DEL DRAWER DEL CARRITO
  function openCart() {
    cartDrawer.classList.add('open');
    cartBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartDrawer.classList.remove('open');
    cartBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  cartToggleBtn.addEventListener('click', openCart);
  closeCartBtn.addEventListener('click', closeCart);
  cartBackdrop.addEventListener('click', closeCart);

  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      if (confirm('¿Deseas vaciar todo tu carrito?')) {
        window.cart.clear();
        showToast('Carrito vaciado');
      }
    });
  }

  // 5. ENVIAR PEDIDO A WHATSAPP
  checkoutBtn.addEventListener('click', () => {
    const items = window.cart.getItems();
    if (items.length === 0) {
      alert('Tu carrito está vacío. Agrega productos antes de hacer tu pedido.');
      return;
    }

    const customerName = customerNameInput.value.trim();
    if (!customerName) {
      alert('Por favor escribe tu nombre para que podamos identificar tu pedido.');
      customerNameInput.focus();
      return;
    }

    const pickupLocation = pickupLocationInput.value.trim();
    if (!pickupLocation) {
      alert('Por favor indícanos o recuérdanos en dónde entregarte.');
      pickupLocationInput.focus();
      return;
    }

    const notes = orderNotesInput.value.trim();
    const totals = window.cart.getTotals();

    // Armar el mensaje de WhatsApp con formato impecable
    let message = `¡Hola Frutastik! 🐨 Me gustaría hacer el siguiente pedido:\n\n`;
    message += `🛒 *DETALLE DEL PEDIDO:*\n`;

    items.forEach(item => {
      const optText = item.option ? ` (${item.option})` : '';
      message += `• ${item.quantity}x ${item.name}${optText} — $${item.price * item.quantity}\n`;
    });

    message += `\n💰 *TOTAL A PAGAR:* $${totals.total} MXN\n`;
    message += `───────────────────────\n`;
    message += `👤 *Cliente:* ${customerName}\n`;
    message += `📍 *Lugar de entrega:* ${pickupLocation}\n`;

    if (notes) {
      message += `📝 *Notas especiales:* ${notes}\n`;
    }

    message += `\n¿Me confirman de recibido y tiempo de entrega? ¡Gracias! 🙌`;

    // Generar URL para WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${STORE_CONFIG.phone}?text=${encodedMessage}`;

    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');
  });

  // 6. MODAL DE FOTOS
  window.openImageModal = (src, title) => {
    photoModalImg.src = src;
    photoModalTitle.textContent = title;
    photoModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function closePhotoModal() {
    photoModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  photoModalClose.addEventListener('click', closePhotoModal);
  photoModal.addEventListener('click', (e) => {
    if (e.target === photoModal) closePhotoModal();
  });

  // 6.1 MODAL DE PERSONALIZACIÓN DE GOMITAS
  let currentGomitasProduct = null;
  let selectedGomitas = [];

  const gomitasModal = document.getElementById('gomitas-modal');
  const gomitasModalBackdrop = document.querySelector('.gomitas-modal-backdrop');
  const gomitasModalTitle = document.getElementById('gomitas-modal-title');
  const gomitasModalSubtitle = document.getElementById('gomitas-modal-subtitle');
  const gomitasModalClose = document.getElementById('gomitas-modal-close');
  const gomitasOptionsList = document.getElementById('gomitas-options-list');
  const gomitasSelectedCounter = document.getElementById('gomitas-selected-counter');
  const gomitasQuickSelectBtn = document.getElementById('gomitas-quick-select-btn');
  const gomitasConfirmAddBtn = document.getElementById('gomitas-confirm-add-btn');

  function openGomitasModal(product) {
    currentGomitasProduct = product;
    selectedGomitas = [];
    gomitasModalTitle.textContent = `Personaliza tu ${product.name}`;
    gomitasModalSubtitle.textContent = `$${product.price} MXN • Elige hasta 3 tipos de gomitas`;
    
    renderGomitasCheckboxes();
    updateGomitasCounter();

    gomitasModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeGomitasModal() {
    gomitasModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  function renderGomitasCheckboxes() {
    gomitasOptionsList.innerHTML = GOMITAS_MENU.map(g => {
      const isChecked = selectedGomitas.includes(g.name);
      return `
        <label class="gomita-checkbox-item ${isChecked ? 'selected' : ''}" onclick="window.toggleGomitaSelection('${g.name}')">
          <span class="gomita-emoji">${g.emoji}</span>
          <span class="gomita-name">${g.name}</span>
          <span class="gomita-check-indicator">${isChecked ? '✓' : ''}</span>
        </label>
      `;
    }).join('');
  }

  window.toggleGomitaSelection = (gomitaName) => {
    const index = selectedGomitas.indexOf(gomitaName);
    if (index > -1) {
      selectedGomitas.splice(index, 1);
    } else {
      if (selectedGomitas.length >= 3) {
        showToast('¡Solo puedes elegir 3 tipos de gomitas!');
        return;
      }
      selectedGomitas.push(gomitaName);
    }
    renderGomitasCheckboxes();
    updateGomitasCounter();
  };

  function updateGomitasCounter() {
    const count = selectedGomitas.length;
    gomitasSelectedCounter.textContent = `${count} de 3 seleccionadas`;

    if (count > 0) {
      gomitasConfirmAddBtn.disabled = false;
      gomitasConfirmAddBtn.textContent = `+ Agregar al Carrito (${count} gomitas)`;
      gomitasConfirmAddBtn.classList.add('ready');
    } else {
      gomitasConfirmAddBtn.disabled = true;
      gomitasConfirmAddBtn.textContent = 'Selecciona al menos 1 gomita';
      gomitasConfirmAddBtn.classList.remove('ready');
    }
  }

  if (gomitasQuickSelectBtn) {
    gomitasQuickSelectBtn.addEventListener('click', () => {
      selectedGomitas = ['Panditas', 'Lombrices', 'Manguitos Enchilados'];
      renderGomitasCheckboxes();
      updateGomitasCounter();
      showToast('Seleccionado: Panditas, Lombrices y Manguitos');
    });
  }

  if (gomitasConfirmAddBtn) {
    gomitasConfirmAddBtn.addEventListener('click', () => {
      if (!currentGomitasProduct || selectedGomitas.length === 0) return;

      const optionString = selectedGomitas.join(', ');
      window.cart.addItem(currentGomitasProduct, optionString, 1);
      showToast(`¡${currentGomitasProduct.name} agregado con tus gomitas! 🍬`);

      closeGomitasModal();

      cartToggleBtn.classList.add('pulse');
      if (floatingCartBar) floatingCartBar.classList.add('pulse');
      setTimeout(() => {
        cartToggleBtn.classList.remove('pulse');
        if (floatingCartBar) floatingCartBar.classList.remove('pulse');
      }, 500);
    });
  }

  if (gomitasModalClose) gomitasModalClose.addEventListener('click', closeGomitasModal);
  if (gomitasModalBackdrop) gomitasModalBackdrop.addEventListener('click', closeGomitasModal);

  // 7. BÚSQUEDA INSTANTÁNEA
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    clearSearchBtn.style.display = searchQuery ? 'block' : 'none';
    renderProducts();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    clearSearchBtn.style.display = 'none';
    searchInput.focus();
    renderProducts();
  });

  // 8. TOAST NOTIFICATIONS
  function showToast(message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.className = 'toast show';
    setTimeout(() => {
      toast.className = 'toast';
    }, 2400);
  }

  // Escuchar actualizaciones del carrito
  window.addEventListener('cart:updated', () => {
    updateCartUI();
  });

  // Inicialización
  renderCategories();
  renderProducts();
  updateCartUI();
});
