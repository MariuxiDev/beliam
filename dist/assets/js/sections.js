/* Secciones de la referencia: comparador, opiniones, FAQ y cuadrícula social. */
(() => {
  'use strict';
  const config = window.BELIAM;
  const $ = selector => document.querySelector(selector);
  const comparison = config.beforeAfter;
  $('#compare-before-image').src = comparison.before;
  $('#compare-after-image').src = comparison.after;
  $('#compare-disclosure').hidden = !comparison.demo;
  const range = $('#compare-slider');
  range.addEventListener('input', () => {
    $('#image-compare').style.setProperty('--compare-position', `${range.value}%`);
    range.setAttribute('aria-valuetext', `${range.value}% de la imagen anterior visible`);
  });

  const testimonials = config.testimonials;
  $('#testimonials-disclosure').hidden = !testimonials.demo;
  // La referencia usa seis veces el mismo testimonio de demostración.
  const entries = testimonials.demo && testimonials.items.length === 1
    ? Array.from({ length: 6 }, () => testimonials.items[0]) : testimonials.items;
  entries.forEach((entry, i) => {
    const card = document.createElement('article'); card.className = `testimonial-v05 s${i + 1}`;
    const top = document.createElement('div'); top.className = 'testimonial-card-top';
    const stars = document.createElement('span'); stars.className = 'rate-wrap';
    const rating = Math.max(0, Math.min(5, Number(entry.rating) || 0)); stars.textContent = '★'.repeat(rating); stars.setAttribute('aria-label', `${rating} de 5 estrellas${testimonials.demo ? ' en el contenido de muestra' : ''}`); top.append(stars);
    if (testimonials.demo) { const badge = document.createElement('span'); badge.className = 'demo-badge'; badge.textContent = 'DEMO'; top.append(badge); }
    const quote = document.createElement('blockquote'); quote.className = 'tes-text'; quote.textContent = entry.text;
    if(testimonials.demo) quote.lang = 'en';
    const author = document.createElement('div'); author.className = 'tes-author';
    if(entry.avatar) { const wrap = document.createElement('div'); wrap.className = 'author_image'; const photo = document.createElement('img'); photo.src = entry.avatar; photo.alt = ''; photo.width = 48; photo.height = 48; photo.loading = 'lazy'; wrap.append(photo); author.append(wrap); }
    const info = document.createElement('div'); const name = document.createElement('p'); name.className = 'info__name'; name.textContent = entry.name;
    const role = document.createElement('p'); role.className = 'info__duty'; role.textContent = entry.role; info.append(name,role); author.append(info);
    card.append(top,quote,author); $('#testimonial-wall').append(card);
  });

  config.faqs.forEach((item, i) => {
    const details = document.createElement('details'); details.className = 'faq-accordion_item-5'; details.name = 'beliam-faq'; details.open = i === 0;
    const summary = document.createElement('summary'); const question = document.createElement('span'); question.textContent = item.question;
    const plus = document.createElement('span'); plus.className = 'faq-plus'; plus.textContent = '+'; plus.setAttribute('aria-hidden','true'); summary.append(question,plus);
    const content = document.createElement('div'); content.className = 'accordion-content'; const text = document.createElement('p'); text.textContent = item.answer; content.append(text); details.append(summary,content); $('#cosmetic-faq').append(details);
    details.addEventListener('toggle', () => { if(details.open) $('#cosmetic-faq').querySelectorAll('details').forEach(other => { if(other !== details) other.open = false; }); });
  });

  const socialIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7"/></svg>';
  const grid = $('#instagram-grid'); const invitation = $('#instagram-invitation');
  config.instagramGallery.forEach((item, i) => {
    const figure = document.createElement('figure'); figure.className = 'instagram-photo';
    const image = document.createElement('img'); image.src = item.src; image.alt = item.alt; image.width = 848; image.height = 848; image.loading = 'lazy'; image.decoding = 'async';
    const caption = document.createElement('figcaption'); caption.setAttribute('aria-hidden','true'); caption.innerHTML = socialIcon; figure.append(image,caption);
    if (i < 4) grid.insertBefore(figure,invitation); else grid.append(figure);
  });
  const link = $('#instagram-link'); const instagram = config.contact.socials.instagram;
  let isHttps = false; try { isHttps = new URL(instagram).protocol === 'https:'; } catch { /* enlace todavía sin configurar */ }
  if (isHttps) { link.href = instagram; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = 'Visitar Instagram'; link.setAttribute('aria-label', 'Visitar Instagram de BeLiam (se abre en una pestaña nueva)'); }
  else if (/^\d{10,15}$/.test(config.contact.whatsapp)) {
    link.href = `https://wa.me/${config.contact.whatsapp}?text=${encodeURIComponent('Hola, BeLiam. Me gustaría conocer su cuenta oficial de Instagram.')}`;
    link.target = '_blank'; link.rel = 'noopener noreferrer';
  }
})();
