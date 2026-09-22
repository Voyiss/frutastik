// Catálogo de Productos Frutastik - "El paraíso del antojo"
// Precios de venta directa oficial

const CATEGORIES = [
  { id: 'all', name: 'Todos', icon: '✨' },
  { id: 'fruta-forrada', name: 'Fruta Forrada', icon: '🍏' },
  { id: 'gomitas', name: 'Gomitas', icon: '🍬' },
  { id: 'manzanas-prep', name: 'Manzanas Preparadas', icon: '✨' },
  { id: 'botanas', name: 'Botanas & Papas', icon: '🥔' },
  { id: 'combos', name: 'Combos Frutastikos', icon: '🎁' },
  { id: 'bebidas', name: 'Bebidas', icon: '🥤' }
];

const GOMITAS_MENU = [
  { id: 'frutitas', name: 'Frutitas', emoji: '🍓' },
  { id: 'panditas', name: 'Panditas', emoji: '🐻' },
  { id: 'lombrices', name: 'Lombrices', emoji: '🐛' },
  { id: 'aros-sandia', name: 'Aros de Sandía', emoji: '🍉' },
  { id: 'aros-durazno', name: 'Aros de Durazno', emoji: '🍑' },
  { id: 'aros-manzana', name: 'Aros de Manzana', emoji: '🍏' },
  { id: 'manguitos', name: 'Manguitos Enchilados', emoji: '🥭' }
];

const PRODUCTS = [
  // FRUTA FORRADA CON PULPARINDO
  {
    id: 'manzana-forrada',
    name: 'Manzana Forrada',
    category: 'fruta-forrada',
    categoryName: 'Fruta Forrada',
    price: 25,
    description: 'Deliciosa manzana fresca cubierta con Pulparindo artesanal, chilito y chamoy.',
    image: 'assets/products/manzana_forrada.jpg',
    popular: true,
    badge: '⭐ Favorito'
  },
  {
    id: 'manzana-forrada-topping',
    name: 'Manzana Forrada + Topping',
    category: 'fruta-forrada',
    categoryName: 'Fruta Forrada',
    price: 35,
    description: 'Manzana cubierta con Pulparindo + 1 topping a elegir (Gomitas, Skwinkles, Cacahuates o Tamarindo bites).',
    image: 'assets/products/manzana_forrada_topping.jpg',
    popular: true,
    badge: 'Popular',
    options: ['Gomitas Surtidas', 'Skwinkles Clásicos', 'Cacahuates Japoneses', 'Tamarindo Bites']
  },
  {
    id: 'vaso-koala-ch',
    name: 'Vaso Koala Chico',
    category: 'fruta-forrada',
    categoryName: 'Fruta Forrada',
    price: 30,
    description: 'Uvas frescas forradas con Pulparindo (porción chica) preparadas con gomitas, chilito y chamoy.',
    image: 'assets/products/vaso_koala_ch.jpg',
    popular: false
  },
  {
    id: 'vaso-koala-g',
    name: 'Vaso Koala Grande',
    category: 'fruta-forrada',
    categoryName: 'Fruta Forrada',
    price: 40,
    description: 'Porción grande de uvas frescas forradas con Pulparindo, preparadas con gomitas, chilito y chamoy.',
    image: 'assets/products/vaso_koala_g.jpg',
    popular: true,
    badge: '🔥 El más pedido'
  },

  // GOMITAS
  {
    id: 'gomi-vaso-natural',
    name: 'Gomi Vaso Natural',
    category: 'gomitas',
    categoryName: 'Gomitas',
    price: 30,
    description: 'Elige 3 tipos de gomitas deliciosas de nuestra barra de antojos al natural.',
    image: 'assets/products/gomi_vaso_natural.jpg',
    requiresGomitas: true,
    maxGomitas: 3
  },
  {
    id: 'gomi-vaso-enchilado',
    name: 'Gomi Vaso Enchilado',
    category: 'gomitas',
    categoryName: 'Gomitas',
    price: 35,
    description: 'Elige 3 tipos de gomitas y te las preparamos con chilito en polvo y chamoy.',
    image: 'assets/products/gomi_vaso_enchilado.jpg',
    popular: true,
    requiresGomitas: true,
    maxGomitas: 3
  },
  {
    id: 'gomi-vaso-ahogado',
    name: 'Gomi Vaso Ahogado',
    category: 'gomitas',
    categoryName: 'Gomitas',
    price: 40,
    description: 'Elige 3 tipos de gomitas y las bañamos ahogadas en nuestro chamoy de la casa.',
    image: 'assets/products/gomi_vaso_ahogado.jpg',
    badge: 'Especial',
    requiresGomitas: true,
    maxGomitas: 3
  },

  // MANZANAS PREPARADAS
  {
    id: 'gomi-manzana',
    name: 'Gomi Manzana',
    category: 'manzanas-prep',
    categoryName: 'Manzanas Preparadas',
    price: 40,
    description: 'Manzana forrada rebanada servida en charola con gomitas, chilito y chamoy.',
    image: 'assets/products/gomi_manzana.jpg',
    popular: true
  },
  {
    id: 'gomi-manzana-topping',
    name: 'Gomi Manzana + Topping',
    category: 'manzanas-prep',
    categoryName: 'Manzanas Preparadas',
    price: 50,
    description: 'Manzana forrada rebanada con 1 topping a elegir, gomitas, chilito y chamoy.',
    image: 'assets/products/gomi_manzana_topping.jpg',
    badge: 'Recomendado',
    options: ['Gomitas Surtidas', 'Skwinkles Clásicos', 'Cacahuates Japoneses', 'Tamarindo Bites']
  },
  {
    id: 'manzana-botanera',
    name: 'Manzana Botanera',
    category: 'manzanas-prep',
    categoryName: 'Manzanas Preparadas',
    price: 50,
    description: 'Manzana forrada rebanada acompañada con papas crujientes, gomitas, chilito y chamoy.',
    image: 'assets/products/manzana_botanera.jpg',
    popular: true,
    options: ['Papas Naturales', 'Papas Adobadas', 'Papas Combinadas']
  },

  // BOTANAS
  {
    id: 'gomi-papas-ch',
    name: 'Gomi Papas CH',
    category: 'botanas',
    categoryName: 'Botanas & Papas',
    price: 35,
    description: 'Papas naturales o adobadas (porción chica) preparadas con gomitas, chilito y chamoy.',
    image: 'assets/products/gomi_papas_ch.jpg',
    options: ['Papas Naturales', 'Papas Adobadas']
  },
  {
    id: 'gomi-papas-g',
    name: 'Gomi Papas Grande',
    category: 'botanas',
    categoryName: 'Botanas & Papas',
    price: 45,
    description: 'Porción grande de papas crujientes naturales o adobadas preparadas con gomitas, chilito y chamoy.',
    image: 'assets/products/gomi_papas_g.jpg',
    popular: true,
    options: ['Papas Naturales', 'Papas Adobadas']
  },
  {
    id: 'gomi-papas-mix',
    name: 'Gomi Papas MIX',
    category: 'botanas',
    categoryName: 'Botanas & Papas',
    price: 50,
    description: 'Papas naturales + adobadas combinadas, preparadas con gomitas, chilito y chamoy.',
    image: 'assets/products/gomi_papas_mix.jpg',
    badge: '💥 MIX Explosivo'
  },

  // COMBOS FRUTASTIKOS
  {
    id: 'fruti-mix',
    name: 'Fruti Mix',
    category: 'combos',
    categoryName: 'Combos Frutastikos',
    price: 50,
    description: 'Manzana forrada + Uvas forradas CH (porción chica) preparadas con gomitas, chilito y chamoy.',
    image: 'assets/products/fruti_mix.jpg',
    popular: true
  },
  {
    id: 'fruti-max',
    name: 'Fruti Max',
    category: 'combos',
    categoryName: 'Combos Frutastikos',
    price: 60,
    description: 'Manzana forrada + Uvas forradas G (porción grande) preparadas con gomitas, chilito y chamoy.',
    image: 'assets/products/fruti_max.jpg',
    badge: 'Súper Combo'
  },
  {
    id: 'frutastik-box',
    name: 'Frutastik Box',
    category: 'combos',
    categoryName: 'Combos Frutastikos',
    price: 80,
    description: 'Manzana forrada + uvas forradas + papas crujientes + gomitas preparadas con chilito y chamoy.',
    image: 'assets/products/frutastik_box.jpg',
    popular: true,
    badge: '👑 El Rey de la Casa'
  },

  // BEBIDAS
  {
    id: 'coca-cola',
    name: 'Coca-Cola 600 ml',
    category: 'bebidas',
    categoryName: 'Bebidas',
    price: 25,
    description: 'Refrescante Coca-Cola original de 600 ml bien fría.',
    image: 'assets/products/coca_cola.jpg'
  },
  {
    id: 'coca-cola-sin-azucar',
    name: 'Coca-Cola Sin Azúcar 600 ml',
    category: 'bebidas',
    categoryName: 'Bebidas',
    price: 25,
    description: 'Coca-Cola Sin Azúcar de 600 ml bien fría.',
    image: 'assets/products/coca_cola_sin_azucar.jpg'
  },
  {
    id: 'sprite',
    name: 'Sprite 600 ml',
    category: 'bebidas',
    categoryName: 'Bebidas',
    price: 25,
    description: 'Refrescante Sprite sabor lima-limón 600 ml.',
    image: 'assets/products/sprite.jpg'
  },
  {
    id: 'arizona',
    name: 'Té Arizona 570 ml',
    category: 'bebidas',
    categoryName: 'Bebidas',
    price: 25,
    description: 'Té Arizona en lata sabor Kiwi Fresa 570 ml bien frío.',
    image: 'assets/products/arizona.jpg'
  },
  {
    id: 'boing',
    name: 'Boing en Lata 340 ml',
    category: 'bebidas',
    categoryName: 'Bebidas',
    price: 20,
    description: 'Jugo Boing sabor manzana en lata 340 ml bien frío.',
    image: 'assets/products/boing.jpg'
  }
];

// Configuración general del negocio
const STORE_CONFIG = {
  name: 'Frutastik',
  slogan: 'El paraíso del antojo',
  phone: '525611209477',
  displayPhone: '56 1120 9477',
  currency: '$',
  currencyCode: 'MXN'
};
