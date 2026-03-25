export const products = [
  {
    id: 'aurora-sound-pro',
    name: 'Aurora Sound Pro',
    category: 'tecnologia',
    categoryLabel: 'Tecnologia',
    price: 15990,
    stock: 9,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    description: 'Auriculares inalambricos con cancelacion de ruido y estuche de carga rapida.',
    longDescription:
      'Pensados para sesiones largas de estudio o trabajo, combinan audio envolvente, autonomia extendida y una construccion liviana.',
  },
  {
    id: 'terra-mug-stone',
    name: 'Terra Mug Stone',
    category: 'hogar',
    categoryLabel: 'Hogar',
    price: 2490,
    stock: 15,
    image:
      'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?auto=format&fit=crop&w=900&q=80',
    description: 'Taza de ceramica artesanal con esmalte mate y acabado irregular.',
    longDescription:
      'Ideal para cafe o te, con una estetica calida y minimalista que suma personalidad al escritorio o la cocina.',
  },
  {
    id: 'flux-keyboard-mini',
    name: 'Flux Keyboard Mini',
    category: 'tecnologia',
    categoryLabel: 'Tecnologia',
    price: 18990,
    stock: 5,
    image:
      'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=900&q=80',
    description: 'Teclado mecanico compacto con switches tactiles y retroiluminacion blanca.',
    longDescription:
      'Una opcion portable y robusta para quienes buscan una experiencia de escritura comoda sin ocupar demasiado espacio.',
  },
  {
    id: 'orbit-sling-bag',
    name: 'Orbit Sling Bag',
    category: 'accesorios',
    categoryLabel: 'Accesorios',
    price: 7990,
    stock: 12,
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    description: 'Bandolera urbana impermeable con divisiones internas para uso diario.',
    longDescription:
      'Perfecta para llevar tablet, celular, billetera y accesorios pequenos con acceso rapido y seguro.',
  },
]

export const getProducts = (categoryId) => {
  if (!categoryId) {
    return products
  }

  return products.filter((product) => product.category === categoryId)
}

export const getProductById = (itemId) =>
  products.find((product) => product.id === itemId)
