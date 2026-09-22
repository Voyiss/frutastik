# 🐨 Frutastik — "El Paraíso del Antojo"
### Catálogo Web Digital con Carrito y Pedidos Automáticos por WhatsApp

Sitio web responsivo para pedidos directos sin comisiones de aplicaciones intermediarias. Diseñado para alojarse de forma **100% gratuita y permanente en GitHub Pages**.

---

## 🌟 Características

- **Catálogo Visual Completo:** Manzanas forradas con pulparindo, gomitas preparadas, vasos koala, botanas crujientes, combos y bebidas frías.
- **Precios de Venta Directa:** Precios oficiales de mostrador (sin las comisiones de plataformas de delivery).
- **Personalización de Antojos:** Selección de toppings (skwinkles, gomitas, cacahuates, tamarindos) y tipo de papas (naturales, adobadas o combinadas).
- **Carrito de Compras Interactivo:**
  - Persistente (no se borra si se recarga la página).
  - Contador animado y botón flotante en dispositivos móviles.
  - Opciones de entrega: **A domicilio** (con dirección) o **Pasar a recoger**.
  - Campo para notas o peticiones especiales (*"con bastante chamoy"*, *"sin picante"*).
- **Checkout Inteligente por WhatsApp:**
  - Al hacer clic en *"Enviar Pedido por WhatsApp"*, se genera automáticamente el enlace codificado y abre WhatsApp (móvil o web) con el mensaje listo para enviar al número **`56 1120 9477`**.
- **Cero Dependencias Pesadas:** HTML5, CSS3 y Vanilla JavaScript puro. Carga instantánea en cualquier celular.

---

## 🚀 Cómo Publicar en GitHub Pages (Paso a Paso Gratis)

### Opción A: Desde la Web de GitHub (La más rápida si no usas terminal)

1. Entra a [github.com](https://github.com/) e inicia sesión con tu cuenta.
2. Haz clic en el botón verde **"New"** (Nuevo repositorio).
3. Ponle de nombre al repositorio (por ejemplo: `frutastik` o `catalogo-frutastik`).
4. Selecciona **Public** (Público) y dale clic en **"Create repository"**.
5. En la pantalla que aparece, haz clic en **"uploading an existing file"** (subir archivos existentes).
6. Arrastra todos los archivos de esta carpeta (`index.html`, carpeta `css`, carpeta `js`, carpeta `assets`) y haz clic en **Commit changes**.
7. Ve a la pestaña **Settings** (Configuración) del repositorio -> Menú lateral izquierdo **Pages**.
8. En **Branch**, selecciona `main` (o `master`) y la carpeta `/ (root)`. Haz clic en **Save**.
9. ¡Listo! En 1 a 2 minutos tu sitio estará en vivo en una URL como:
   ```
   https://tu-usuario.github.io/frutastik/
   ```

---

### Opción B: Usando Git por Terminal

Si tienes Git en tu computadora, solo corre en esta carpeta:

```bash
git init
git add .
git commit -m "Catálogo digital Frutastik con pedidos por WhatsApp"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/NOMBRE-DEL-REPO.git
git push -u origin main
```

Luego ve a **Settings** -> **Pages** en tu repositorio de GitHub y activa la rama `main`.

---

## 📱 Número de WhatsApp Configurado
- WhatsApp: **56 1077 4092** (formato internacional: `+52 56 1077 4092`)
- Si en el futuro tu amigo cambia de número telefónico, solo edita la línea en [`js/products.js`](file:///d:/usuario/duana/documentos/Proyectos%20especiales/Frutastika%20koala/js/products.js):
  ```javascript
  const STORE_CONFIG = {
    phone: '525610774092', // Reemplaza aquí con el nuevo número con lada 52
    ...
  }
  ```
