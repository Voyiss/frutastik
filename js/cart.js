// Lógica y persistencia del Carrito de Compras de Frutastik

class CartManager {
  constructor() {
    this.storageKey = 'frutastik_cart_v1';
    this.items = this.loadCart();
  }

  loadCart() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error al cargar carrito:', e);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items));
      this.dispatchUpdate();
    } catch (e) {
      console.error('Error al guardar carrito:', e);
    }
  }

  dispatchUpdate() {
    const event = new CustomEvent('cart:updated', {
      detail: {
        items: this.items,
        totals: this.getTotals()
      }
    });
    window.dispatchEvent(event);
  }

  // Genera un ID único para items considerando variantes (ej: manzana con topping de skwinkles vs de gomitas)
  generateItemId(productId, option) {
    return option ? `${productId}__${encodeURIComponent(option)}` : productId;
  }

  addItem(product, option = null, quantity = 1) {
    const itemId = this.generateItemId(product.id, option);
    const existingIndex = this.items.findIndex(item => item.id === itemId);

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({
        id: itemId,
        productId: product.id,
        name: product.name,
        option: option,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }

    this.saveCart();
    return itemId;
  }

  updateQuantity(itemId, delta) {
    const index = this.items.findIndex(item => item.id === itemId);
    if (index === -1) return;

    this.items[index].quantity += delta;
    if (this.items[index].quantity <= 0) {
      this.items.splice(index, 1);
    }

    this.saveCart();
  }

  removeItem(itemId) {
    this.items = this.items.filter(item => item.id !== itemId);
    this.saveCart();
  }

  clear() {
    this.items = [];
    this.saveCart();
  }

  getItems() {
    return this.items;
  }

  getTotals() {
    const totalCount = this.items.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return {
      count: totalCount,
      total: totalPrice,
      formattedTotal: `$${totalPrice.toFixed(2)} MXN`
    };
  }
}

// Instancia global
window.cart = new CartManager();
