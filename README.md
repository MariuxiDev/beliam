# BeLiam · Web oficial

Sitio estático en español, basado en la arquitectura HTML/CSS/JavaScript de `referencia/demo-cosmetic`. Mantiene el aspecto del hero y el header de la referencia, con fotografías originales, animaciones GSAP/ScrollTrigger/SplitText y transiciones Swiper. Sin instalación de dependencias, backend ni operaciones Git. Los originales de `referencia/` permanecen intactos.

La presentación actual ocupa todo el ancho de la ventana, sin márgenes ni esquinas redondeadas en los extremos de las secciones. El orden comienza con Inicio y Acerca de BeLiam. El navbar utiliza el fondo de marca `#0d000a` al desplazarse, con desenfoque de 10 px y sombra de 0 1px 5px con blanco al 10%.

La paleta combina morado oscuro `#0d000a`, blanco `#ffffff` y lavanda claro `#f0eaf4` en superficies de apoyo. Las letras son blancas o grises neutros (`#1c1b1d` y `#5e5b60` sobre fondos claros; `#d5d1d4` para texto secundario sobre fondos oscuros). El dorado `#f9be3e` se reserva para los detalles que ya lo utilizaban y los artes de marca originales se conservan. La selección de servicios y el foco de teclado tienen estados contrastados. Estos cambios de color mantienen la estructura, tipografía, dimensiones y movimiento existentes.

## Ver y preparar

Con Node.js 20 o posterior:

```sh
npm.cmd start
```

Abrir `http://127.0.0.1:4173`. También es posible abrir `index.html` directamente: las fuentes, imágenes y scripts son locales.

```sh
npm.cmd run check
npm.cmd run build
```

`build` comprueba los recursos, enlaces internos y datos esenciales, y copia el sitio a `dist/`. Esa carpeta es el resultado publicable en cualquier hosting estático. Para comprobarla: `node scripts/serve.mjs --dist`. `Ctrl+C` detiene la vista previa. No se ha publicado el sitio ni configurado DNS o hosting.

## Datos comerciales

Editar **`assets/js/config.js`**:

- WhatsApp configurado: **0980271574**, formato internacional **593980271574**.
- `contact.address`: dirección definitiva. Vacía, se muestra únicamente Quito y se invita a consultar por WhatsApp.
- `contact.hours`: lista de horarios confirmados. Vacía, se invita a consultarlos.
- `contact.mapUrl`: enlace HTTPS de ubicación. Vacío, se oculta.
- `contact.socials`: enlaces HTTPS oficiales de Instagram, Facebook y TikTok. Los vacíos no se publican.

- `services`: categorías, textos y grupos. Se usa para crear tanto el explorador como el selector del formulario. No se han publicado precios ni procedimientos sin confirmar.
- `gallery`: añadir fotografías reales autorizadas con su descripción y pie de imagen.
- `beforeAfter`: fotografías del comparador. Actualmente `demo: true`, con imágenes de la referencia identificadas como demostración.
- `testimonials`: opiniones y estado de demostración. Se conservaron temporalmente los textos y el autor de muestra de la referencia por indicación del usuario; no se presentan como opiniones reales de BeLiam. Al proporcionar opiniones reales, sustituir `items` y desactivar `demo`.
- `faqs`: preguntas y respuestas del acordeón.
- `instagramGallery`: ocho fotografías de inspiración de la referencia. La cuadrícula es estática, no simula un feed conectado. Al configurar `contact.socials.instagram`, el botón conduce a esa cuenta. Mientras esté vacío, permite consultar la cuenta por WhatsApp.

Las tres redes de BeLiam están configuradas en `contact.socials` y se muestran como botones con nombre en Contacto e iconos en el pie de página. Abren en una pestaña nueva con `noopener noreferrer`. El bloque de Instagram enlaza a la cuenta oficial. El grupo flotante inferior derecho conserva el acceso a citas y añade el retorno al inicio, visible tras desplazarse; el botón de cita usa lavanda claro, borde oscuro y un contorno blanco para distinguirse en todos los fondos. La configuración y el funcionamiento de WhatsApp se mantienen.

El formulario prepara un mensaje y abre WhatsApp. **No envía mensajes automáticamente, guarda datos ni confirma reservas.** El visitante revisa y envía su solicitud; BeLiam coordina la disponibilidad.

Si se cambia el dominio, actualizar también canonical y Open Graph en `index.html`, `robots.txt` y `sitemap.xml`. Los tokens de marca, tipografía y espaciado están en `assets/css/style.css`.

## Reutilización de referencias

Se revisaron `index.html`, `about.html`, los estilos particulares de `demo-cosmetic` y los estilos y scripts compartidos. Se examinaron las secciones de los demás demos, con especial atención a los bloques narrativos de `demo-portfolio` y al tratamiento de información de ubicación de `demo-architect`.

- **Reutilizados:** contenedor `.container-5`, botones `.btn-wrap.btn-4`, revelado de imagen `.hover-img .img-style`, composición `.box-text-image-wrap` y base de galería `.cosmetic-gallery-grid`. Sus reglas originales se extrajeron a `assets/css/template-base.css`, con atribución técnica.
- **Adaptados:** estructura de navegación `.tf-header-5`, hero de `demo-cosmetic`, categorías de producto convertidas en exploración de servicios, narrativa editorial y galería responsive con ampliación accesible.
- **Movimiento del template:** hero con las dos fotografías originales y transición fade en Swiper; entrada escalonada, revelado al hacer scroll, color progresivo por caracteres y parallax con GSAP/ScrollTrigger/SplitText. Se reutiliza el bundle original de la referencia en `assets/vendor/`; no se instaló ninguna biblioteca nueva. La sección `section-cosmetic-beautiful` se adapta a una composición de fotografías y el logo BeLiam con profundidad y valores de marca.
- **Descartados:** carrito, checkout, autenticación, marcas de producto, comparativas de resultados, reseñas, vídeo automático, precarga bloqueante y plugins de tienda. No se necesita Bootstrap JS ni jQuery.
- **Mejoras de otras referencias:** ritmo narrativo y espacios del portfolio; información de contacto agrupada como en architect. Se unifican en los componentes de BeLiam; no se incorporó una segunda arquitectura.

## Archivos y recursos

- `index.html`: estructura, contenido oficial, SEO y navegación por secciones.
- `assets/css/template-base.css`: componentes reutilizados de la plantilla.
- `assets/css/style.css`: identidad BeLiam, fuentes locales, responsive y movimiento reducido.
- `assets/css/cosmetic.css`: header transparente y compacto al hacer scroll, hero de la demo, secciones animadas y footer con degradado oscuro de marca.
- `assets/css/sections.css`: ancho completo, opacidad del navbar, relieve suave del logo, comparador, testimonios, FAQ y cuadrícula de Instagram.
- `assets/js/config.js`: servicios, galería y datos comerciales.
- `assets/js/main.js`: menú, exploración, lightbox, formulario y contenido configurable.
- `assets/js/animations.js`: inicialización adaptada de GSAP/ScrollTrigger/SplitText y Swiper, pausa del hero y respeto de movimiento reducido.
- `assets/js/sections.js`: comparador con range accesible, opiniones de muestra, preguntas desplegables y contenido social configurable.
- `assets/vendor/`: motores locales copiados sin modificación de las referencias.
- `assets/images/beliam-logo.png`: logotipo original suministrado, copiado sin ninguna modificación.
- `assets/images/beliam-logo-supplied.png`: nuevo logo `Logo-solo.png` original, conservado sin cambios.
- `assets/images/beliam-logo-principal.png`: logo principal actual, basado en el nuevo `solo-logo-1.png`. Sin fondo, 2170 × 725, con transparencia alfa. Se usa en header, footer, experiencia, galería, favicon y Open Graph. La sensación de elevación se aplica con una sombra de 2 px en CSS; no se fuerza un bisel sobre la imagen.
- `assets/images/beliam-logo-principal-original.png`: copia íntegra del nuevo archivo suministrado.
- `assets/images/beliam-logo-transparent.png`: versión anterior sin fondo, conservada como recurso previo.
- `assets/images/beliam-logo-transparent-glow.png`: variante sin fondo con brillo ambiental para aplicaciones oscuras. Ambas versiones se editaron con ImageGen integrado y conservan canal alfa. Los prompts y la procedencia se documentan en `assets/images/LOGOS.md`.
- `assets/images/hero-cosmetic-1.jpg` y `hero-cosmetic-2.jpg`: fotografías originales del inicio de `demo-cosmetic`, reutilizadas por indicación expresa del usuario. Las imágenes de inspiración no se presentan como resultados realizados por BeLiam.
- `assets/images/salon-propuesta.jpg`: imagen conceptual suministrada, optimizada a JPEG; `salon-detail.jpg` es un recorte decorativo de esa misma propuesta.
- `assets/fonts/`: Montserrat y Playfair Display descargadas de Google Fonts, alojadas localmente con licencias SIL OFL. Se incluye el subconjunto latino con los caracteres españoles.
- `scripts/`: vista previa, verificación y preparación del sitio estático.
- `dist/`: resultado de `npm run build`, sin archivos de referencia ni herramientas de desarrollo.

La imagen del salón está expresamente identificada como **propuesta visual**, no como instalación real ni trabajo realizado. No se han inventado fotografías personales, testimonios, certificaciones, precios o resultados. La galería queda preparada para fotografías oficiales futuras.

## Accesibilidad y rendimiento

HTML semántico, enlace para saltar al contenido, menú con estado y cierre por Escape, foco de teclado visible, diálogo nativo con restauración del foco, etiquetas de formulario, imágenes con dimensiones y texto alternativo, carga diferida bajo el primer bloque y respeto de `prefers-reduced-motion`. No hay peticiones a servicios externos al cargar la página. WhatsApp, mapas o redes solo se abren al usar sus enlaces.

El hero incluye controles para cambiar de imagen y pausar la rotación. La rotación se desactiva al activar movimiento reducido y se detiene al navegar por sus enlaces con teclado. Las animaciones de scroll, la franja y el aura del footer también respetan movimiento reducido. El header pasa de transparente a una superficie oscura y legible al desplazarse.

El comparador Antes & Después se controla con ratón, tacto o teclas de dirección. Las preguntas utilizan `details`/`summary` nativos. Las opiniones y la selección visual de Instagram indican claramente su carácter demostrativo. No hay integración ni publicación automática en redes sociales.

La revisión automatizada comprueba integridad de recursos, destinos internos únicos, categorías y datos configurados. La revisión visual del navegador complementa estas comprobaciones; no sustituye una auditoría completa de accesibilidad.
