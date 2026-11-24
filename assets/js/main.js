(() => {
  'use strict';
  const config = window.BELIAM;
  const $ = (s) => document.querySelector(s);
  const icons = {
    hair: '<path d="M10 3c-5 2-6 9-4 14m8-14c6 3 6 11 4 17M12 5c-4 2-2 6-4 10s0 5 0 5M15 7c-3 4 2 7-1 13"/>',
    brow: '<path d="M3 13c5-8 13-8 18-2-8-3-12-2-18 2Zm3 5c4-3 8-3 12 0"/>',
    eye: '<path d="M3 12c5 7 13 7 18 0M5 15l-2 3m6-1-1 4m7-4 1 4m4-6 2 3M5 7c4-3 10-3 14 0"/>',
    face: '<path d="M7 3C2 9 5 18 12 21c5-3 8-8 6-13M11 3c-4 5-2 8 0 10l-1 2h4m-3 3h3M19 2v5m-2-2h4"/>',
    hands: '<path d="M3 14c4-2 7-2 10-1l4 1c2 1 1 3-1 3h-5m-5 3h10l6-6c1-2-1-3-3-2M3 17l3 3M11 3c-3 2 3 3 0 5m5-5c-3 2 3 3 0 5"/>',
    brush: '<path d="m6 15 9-11 4 3-9 11ZM6 15c-4 1-1 4-4 6 4 1 7 0 8-3M13 7l4 3"/>',
    nails: '<path d="M7 21V8a2 2 0 0 1 4 0v5-8a2 2 0 0 1 4 0v8-5a2 2 0 0 1 4 0v9c0 3-2 5-5 5h-3l-7-6c-2-2 0-4 2-2l1 1M8 9h2m2-3h2m2 3h2"/>'
  };
  const icon = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.face}</svg>`;
  const validPhone = /^\d{10,15}$/.test(config.contact.whatsapp);
  function whatsappUrl(message) {
    return `https://wa.me/${config.contact.whatsapp}?text=${encodeURIComponent(message)}`;
  }
  const generalMessage = 'Hola, BeLiam. Me gustaría recibir información y solicitar una cita.';
  document.querySelectorAll('[data-whatsapp]').forEach(a => {
    if (validPhone) { a.href = whatsappUrl(generalMessage); a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    else a.hidden = true;
  });
  const phone = $('[data-phone]');
  phone.textContent = config.contact.displayPhone || 'Escríbenos por WhatsApp';
  if (validPhone) { phone.href = whatsappUrl(generalMessage); phone.target = '_blank'; phone.rel = 'noopener noreferrer'; }
  else { phone.hidden = true; $('.form-submit').disabled = true; $('#form-status').textContent = 'El canal de citas estará disponible próximamente.'; }

  const list = $('#service-list');
  const select = $('#service-select');
  function showService(service, fromClick = false) {
    list.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.service === service.id)));
    $('#service-title').textContent = service.name;
    $('#service-description').textContent = service.description;
    $('#service-group').textContent = service.group.toUpperCase();
    $('#service-symbol').innerHTML = icon(service.icon);
    $('#service-contact').onclick = () => { select.value = service.id; };
    if (fromClick) select.value = service.id;
  }
  config.services.forEach((service, index) => {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'service-item'; button.dataset.service = service.id;
    button.setAttribute('aria-pressed', String(index === 0)); button.setAttribute('aria-controls', 'service-title service-description');
    button.innerHTML = icon(service.icon);
    const label = document.createElement('span'); label.textContent = service.name; button.append(label);
    const plus = document.createElement('span'); plus.className = 'service-plus'; plus.setAttribute('aria-hidden', 'true'); plus.textContent = '+'; button.append(plus);
    button.addEventListener('click', () => showService(service, true)); list.append(button);
    select.add(new Option(service.name, service.id));
  });
  if (config.services.length) showService(config.services[0]);
  // Aviso accesible al cambiar el panel sin mover el foco del botón.
  $('#service-description').setAttribute('aria-live', 'polite');

  const menuButton = $('.menu-toggle');
  const mobileMenu = $('#mobile-menu');
  function closeMenu(returnFocus = false) {
    mobileMenu.hidden = true; menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Abrir menú'); document.body.classList.remove('menu-open');
    if (returnFocus) menuButton.focus();
  }
  menuButton.addEventListener('click', () => {
    const opening = mobileMenu.hidden; mobileMenu.hidden = !opening; menuButton.setAttribute('aria-expanded', String(opening)); menuButton.setAttribute('aria-label', opening ? 'Cerrar menú' : 'Abrir menú'); document.body.classList.toggle('menu-open', opening);
  });
  mobileMenu.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !mobileMenu.hidden) closeMenu(true);
    if (e.key === 'Tab' && !mobileMenu.hidden) {
      const links = [...mobileMenu.querySelectorAll('a')];
      if (e.shiftKey && document.activeElement === menuButton) { e.preventDefault(); links.at(-1).focus(); }
      else if (!e.shiftKey && document.activeElement === links.at(-1)) { e.preventDefault(); menuButton.focus(); }
    }
  });
  window.matchMedia('(min-width: 992px)').addEventListener('change', e => { if(e.matches) closeMenu(); });

  const dialog = $('#gallery-dialog');
  config.gallery.forEach(item => {
    const figure = document.createElement('figure'); figure.className = `gallery-card hover-img ${item.type}`;
    const button = document.createElement('button'); button.type = 'button'; button.className = 'gallery-button'; button.setAttribute('aria-label', `Ampliar: ${item.title}`);
    const imageWrap = document.createElement('div'); imageWrap.className = 'img-style';
    const img = document.createElement('img'); img.src = item.src; img.alt = item.alt; img.loading = 'lazy'; img.decoding = 'async'; img.width = item.type === 'identity' ? 2170 : 1402; img.height = item.type === 'identity' ? 725 : 1122; img.style.objectPosition = item.position;
    imageWrap.append(img); button.append(imageWrap);
    const expand = document.createElement('span'); expand.className = 'gallery-expand'; expand.textContent = '+'; expand.setAttribute('aria-hidden', 'true'); button.append(expand);
    const caption = document.createElement('figcaption'); const title = document.createElement('h3'); title.textContent = item.title; const note = document.createElement('p'); note.textContent = item.caption; caption.append(title, note);
    figure.append(button, caption); $('#gallery-grid').append(figure);
    button.addEventListener('click', () => {
      $('#lightbox-title').textContent = item.title; $('#lightbox-image').src = item.src; $('#lightbox-image').alt = item.alt; $('#lightbox-caption').textContent = item.caption;
      dialog.showModal(); document.body.style.overflow = 'hidden';
    });
  });
  $('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { document.body.style.overflow = ''; });
  dialog.addEventListener('click', e => { if(e.target === dialog) { const r = dialog.getBoundingClientRect(); if(e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });

  $('#appointment-form').addEventListener('submit', event => {
    event.preventDefault();
    if (!validPhone || !event.currentTarget.reportValidity()) return;
    const name = $('#client-name').value.trim(); const message = $('#client-message').value.trim();
    const service = config.services.find(s => s.id === select.value);
    const text = [`Hola, BeLiam.${name ? ` Soy ${name}.` : ''}`, service ? `Me interesa el servicio de ${service.name.toLowerCase()} y me gustaría consultar disponibilidad para una cita.` : 'Me gustaría recibir orientación sobre sus servicios y consultar disponibilidad para una cita.', message].filter(Boolean).join('\n\n');
    // Abre el borrador; el visitante revisa y envía desde WhatsApp. No confirma citas.
    window.location.assign(whatsappUrl(text));
  });

  const { address, hours, mapUrl, socials } = config.contact;
  if (address) { $('#contact-location').textContent = address; $('#contact-address-note').textContent = `${config.brand.city}, ${config.brand.country}`; }
  if (hours.length) $('#contact-hours').textContent = hours.join(' · ');
  const safeHttps = value => { try { return new URL(value).protocol === 'https:'; } catch { return false; } };
  if (safeHttps(mapUrl)) { $('#map-link').href = mapUrl; $('#map-link').target = '_blank'; $('#map-link').rel = 'noopener noreferrer'; $('#map-link').hidden = false; }
  const socialIcons = {
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7"/>',
    facebook: '<path d="M14 21v-8h3l.5-4H14V7c0-1 .4-2 2-2h2V1.5A23 23 0 0 0 15 1c-3 0-5 2-5 5v3H7v4h3v8Z" fill="currentColor" stroke="none"/>',
    tiktok: '<path d="M14 3h3a5 5 0 0 0 4 4v3a8 8 0 0 1-4-1v7a6 6 0 1 1-6-6v3a3 3 0 1 0 3 3Z"/>'
  };
  const socialLabels = { instagram: 'Instagram', facebook: 'Facebook', tiktok: 'TikTok' };
  document.querySelectorAll('[data-social-links]').forEach(container => {
    Object.entries(socials).forEach(([name, url]) => {
      if (!safeHttps(url) || !socialIcons[name]) return;
      const link = document.createElement('a');
      link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', `${socialLabels[name]} de BeLiam (se abre en una pestaña nueva)`);
      link.title = socialLabels[name];
      link.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${socialIcons[name]}</svg>`;
      const label = document.createElement('span'); label.textContent = socialLabels[name];
      if (container.hasAttribute('data-compact')) label.className = 'sr-only';
      link.append(label); container.append(link);
    });
    container.hidden = !container.childElementCount;
  });

  const backToTop = $('.back-to-top');
  let backToTopFrame = 0;
  function updateBackToTop() {
    backToTop.hidden = window.scrollY < Math.min(window.innerHeight * 0.65, 600);
    backToTopFrame = 0;
  }
  window.addEventListener('scroll', () => {
    if (!backToTopFrame) backToTopFrame = requestAnimationFrame(updateBackToTop);
  }, { passive: true });
  window.addEventListener('resize', updateBackToTop);
  backToTop.addEventListener('click', () => {
    const heading = $('#hero-title'); heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  });
  updateBackToTop();
  $('#year').textContent = new Date().getFullYear();
  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (!entry.isIntersecting) return; $('.desktop-nav').querySelectorAll('a').forEach(a => { if(a.hash === `#${entry.target.id}`) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); }); }), { rootMargin: '-15% 0px -60% 0px' });
    document.querySelectorAll('main section[id]').forEach(s => navObserver.observe(s));
    if (!window.gsap && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const elements = [...document.querySelectorAll('.reveal')];
      const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting) { entry.target.classList.remove('pending'); observer.unobserve(entry.target); } }), { threshold: .06 });
      document.documentElement.classList.add('motion-ready');
      elements.forEach(el => { el.classList.add('pending'); observer.observe(el); });
    }
  }
})();
