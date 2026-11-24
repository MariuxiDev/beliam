/* Único punto de edición de servicios y datos comerciales. No se publican valores vacíos. */
window.BELIAM = {
  brand: { name: 'BeLiam', domain: 'beliam.ec', city: 'Quito', country: 'Ecuador' },
  contact: {
    whatsapp: '593980271574', displayPhone: '098 027 1574',
    address: '', hours: [], mapUrl: '',
    socials: {
      instagram: 'https://www.instagram.com/beliam.ec/',
      facebook: 'https://www.facebook.com/beliam.ec/',
      tiktok: 'https://www.tiktok.com/@beliam.ec'
    }
  },
  services: [
    { id: 'cabello', name: 'Cabello', icon: 'hair', group: 'Estilo', description: 'Un espacio para cuidar tu cabello y expresar tu estilo. Conversemos sobre lo que buscas y las opciones de cuidado para ti.' },
    { id: 'cejas', name: 'Cejas', icon: 'brow', group: 'Mirada', description: 'Detalles que enmarcan tu expresión. Encuentra una atención personalizada para tus cejas, en armonía con tu esencia.' },
    { id: 'pestanas', name: 'Pestañas', icon: 'eye', group: 'Mirada', description: 'Dale protagonismo a tu mirada. Te orientamos sobre las opciones disponibles para el cuidado de tus pestañas.' },
    { id: 'faciales', name: 'Tratamientos faciales', icon: 'face', group: 'Bienestar', description: 'Un momento dedicado al cuidado de tu rostro. Consulta las alternativas disponibles para elegir una atención acorde a tus necesidades.' },
    { id: 'masajes', name: 'Masajes', icon: 'hands', group: 'Bienestar', description: 'Haz una pausa y dedica tiempo a tu bienestar. Escríbenos para conocer las opciones de masajes disponibles.' },
    { id: 'maquillaje', name: 'Maquillaje', icon: 'brush', group: 'Estilo', description: 'Tu personalidad, en cada detalle. Cuéntanos la ocasión y el estilo que tienes en mente para conversar sobre tu maquillaje.' },
    { id: 'unas', name: 'Uñas', icon: 'nails', group: 'Estilo', description: 'El cuidado también está en los pequeños detalles. Consulta las opciones disponibles para tus uñas y encuentra tu próximo estilo.' }
  ],
  beforeAfter: { demo: true, before: 'assets/images/skin-before.jpg', after: 'assets/images/skin-after.jpg' },
  testimonials: {
    demo: true,
    items: [{ text: "I'm on planes constantly and my skin was so dehydrated and angry. The travel size is perfect for my carry-on and actually WORKS, unlike all the other travel-sized stuff I've tried.", name: 'Kai Tanaka', role: 'Frequent Traveler', avatar: 'assets/images/testimonial-avatar.jpg', rating: 5 }]
  },
  faqs: [
    { question: '¿Qué servicios puedo encontrar en BeLiam?', answer: 'Belleza integral: cabello, cejas, pestañas, tratamientos faciales, masajes, maquillaje y uñas. Escríbenos para conocer las opciones disponibles y conversar sobre lo que buscas.' },
    { question: '¿Cómo puedo solicitar una cita?', answer: 'Puedes usar nuestro formulario para preparar tu mensaje o escribirnos directamente por WhatsApp. La disponibilidad y los detalles de tu cita se coordinan con BeLiam por ese canal.' },
    { question: '¿Dónde se encuentra BeLiam?', answer: 'Estamos en Quito, Ecuador. Consulta la ubicación y las indicaciones por WhatsApp.' },
    { question: '¿Cómo puedo consultar precios y horarios?', answer: 'Escríbenos indicando el servicio que te interesa. Por WhatsApp puedes consultar sus detalles, el precio y los horarios disponibles.' },
    { question: '¿Puedo recibir orientación antes de elegir un servicio?', answer: 'Sí. Selecciona «Me gustaría recibir orientación» en el formulario y cuéntanos qué tienes en mente. Conversemos para encontrar el cuidado que buscas.' }
  ],
  instagramGallery: Array.from({ length: 8 }, (_, i) => ({ src: `assets/images/instagram-${i + 1}.jpg`, alt: `Fotografía de inspiración de belleza ${i + 1} de la referencia` })),
  gallery: [
    { src: 'assets/images/salon-propuesta.jpg', alt: 'Propuesta visual del salón BeLiam, con espejos iluminados y detalles morados', title: 'Un espacio para tu esencia', caption: 'Propuesta de interiorismo · Imagen conceptual', position: '50% 50%', type: 'space' },
    { src: 'assets/images/beliam-oficial.png', alt: 'Logotipo de BeLiam sin fondo, con paloma y rosa morada', title: 'Nuestra identidad', caption: 'Logotipo oficial de BeLiam', position: '50% 50%', type: 'identity' }
  ]
};
