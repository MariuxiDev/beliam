/* Movimiento adaptado de referencia/assets/js/gsapAnimation.js y carousel.js.
   Se reutilizan los motores originales, sin cargar scripts de tienda. */
(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const header = document.querySelector('.site-header');
  let scrollFrame = 0;
  const updateHeader = () => { header.classList.toggle('scrolling', window.scrollY > 55); scrollFrame = 0; };
  window.addEventListener('scroll', () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateHeader); }, { passive: true });
  updateHeader();

  // Franja continua de valores, equivalente al infinityslide de la referencia.
  const strip = document.querySelector('.brand-strip');
  const track = document.createElement('div'); track.className = 'strip-track';
  const group = document.createElement('div'); group.className = 'strip-group';
  while (strip.firstChild) group.append(strip.firstChild);
  track.append(group);
  const duplicate = group.cloneNode(true); duplicate.setAttribute('aria-hidden', 'true'); track.append(duplicate); strip.append(track);

  let manuallyPaused = reducedMotion.matches;
  let slider;
  const pauseButton = document.querySelector('.hero-pause');
  function updatePlayback() {
    if (!slider) return;
    const stopped = manuallyPaused || reducedMotion.matches || document.hidden;
    pauseButton.hidden = reducedMotion.matches;
    if (stopped) slider.autoplay.stop(); else slider.autoplay.start();
    pauseButton.setAttribute('aria-pressed', String(manuallyPaused || reducedMotion.matches));
    pauseButton.setAttribute('aria-label', stopped ? 'Reanudar imágenes del inicio' : 'Pausar imágenes del inicio');
    pauseButton.querySelector('.pause-label').textContent = stopped ? 'Reanudar' : 'Pausar';
    pauseButton.querySelector('.pause-icon').textContent = stopped ? '▷' : 'Ⅱ';
  }
  if (window.Swiper) {
    slider = new Swiper('.swiper-hero-background', {
      effect: 'fade', fadeEffect: { crossFade: true }, speed: reducedMotion.matches ? 0 : 1400,
      loop: true, allowTouchMove: true,
      autoplay: { delay: 6500, disableOnInteraction: false, pauseOnMouseEnter: true },
      pagination: {
        el: '.hero-pagination', clickable: true,
        renderBullet: (index, className) => `<button type="button" class="${className}" aria-label="Ver imagen de inspiración ${index + 1}"></button>`
      },
      a11y: { enabled: true, paginationBulletMessage: 'Ver imagen de inspiración {{index}}', slideLabelMessage: 'Imagen {{index}} de {{slidesLength}}' }
    });
    pauseButton.addEventListener('click', () => { manuallyPaused = !manuallyPaused; updatePlayback(); });
    document.addEventListener('visibilitychange', updatePlayback);
    // La rotación automática se detiene al navegar por el hero con teclado.
    document.querySelector('.hero').addEventListener('focusin', event => {
      if (event.target !== pauseButton && event.target.matches(':focus-visible')) { manuallyPaused = true; updatePlayback(); }
    });
    reducedMotion.addEventListener('change', () => { slider.params.speed = reducedMotion.matches ? 0 : 1400; updatePlayback(); });
    updatePlayback();
  } else {
    document.querySelector('.hero-slider-controls').hidden = true;
  }

  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  // gsap.matchMedia elimina y limpia los estilos de animación al activar movimiento reducido.
  const media = gsap.matchMedia();
  const boot = () => {
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const splits = [];
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.hero-image', { scale: 1.025, duration: 1.8 })
        .from('.hero-eyebrow', { y: 16, opacity: 0, duration: .7 }, .15)
        .from('.hero-line', { yPercent: 50, opacity: 0, duration: 1.15, stagger: .16 }, .25)
        .from('.hero-description,.hero-actions', { y: 24, opacity: 0, duration: .9, stagger: .13 }, .65)
        .from('.hero-invitation', { y: 35, scale: .94, opacity: 0, duration: 1 }, .9);

      gsap.utils.toArray('.reveal').forEach(el => {
        gsap.from(el, { y: 40, autoAlpha: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
      });
      gsap.from('.service-item', { y: 18, opacity: 0, stagger: .065, duration: .65, scrollTrigger: { trigger: '.service-list', start: 'top 88%', once: true } });

      // Mismo revelado de color por caracteres que text-color-change-3 del template.
      if (window.SplitText) {
        document.querySelectorAll('.color-text').forEach(el => {
          const text = el.textContent;
          const split = new SplitText(el, { type: 'words,chars', tag: 'span', wordsClass: 'word-wrapper', charsClass: 'char-wrapper' });
          splits.push(split); el.setAttribute('aria-label', text);
          split.words.forEach(word => word.setAttribute('aria-hidden', 'true'));
          gsap.fromTo(split.chars, { color: '#5e5b60' }, {
            color: el.dataset.color || '#1c1b1d', stagger: { each: .03, from: 'start' }, ease: 'power2.out',
            scrollTrigger: { trigger: '.brand-manifesto', start: 'top 85%', end: 'bottom 50%', scrub: 1.5 }
          });
        });
      }
      // Parallax y escala, con los mismos parámetros del motor de la demo.
      gsap.utils.toArray('.parallax-main').forEach(section => {
        [
          { selector: '.parallax-y', from: { yPercent: -10 }, to: { yPercent: 10 } },
          { selector: '.parallax-y-reverse', from: { yPercent: 10 }, to: { yPercent: -10 } },
          { selector: '.parallax-scale-out', from: { scale: 1.14 }, to: { scale: .95 } }
        ].forEach(({ selector, from, to }) => {
          section.querySelectorAll(selector).forEach(el => gsap.fromTo(el, from, { ...to, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: .5, invalidateOnRefresh: true } }));
        });
      });
      gsap.from('.wg-icon-2', { y: 65, opacity: .1, scale: .85, stagger: .12, duration: 1, scrollTrigger: { trigger: '.experience-values', start: 'top 88%', once: true } });
      gsap.utils.toArray('.gallery-card').forEach((card, i) => {
        gsap.from(card, { y: i ? 65 : 35, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 90%', once: true } });
      });
      gsap.utils.toArray('.testimonial-v05').forEach(card => {
        gsap.fromTo(card, { y: 90, opacity: .15, scale: .88 }, { y: 0, opacity: 1, scale: 1, ease: 'power2.out', scrollTrigger: { trigger: card, start: 'top 95%', end: 'top 50%', scrub: 1.5 } });
      });
      gsap.from('.instagram-photo', { y: 35, opacity: 0, stagger: .06, duration: .8, scrollTrigger: { trigger: '#instagram-grid', start: 'top 90%', once: true } });
      if (window.innerWidth >= 992) {
        gsap.to('.story-statement', { y: 75, ease: 'none', scrollTrigger: { trigger: '.story-grid', start: 'top 60%', end: 'bottom 50%', scrub: .8 } });
      }
      ScrollTrigger.refresh();
      return () => { splits.forEach(split => split.revert()); document.querySelectorAll('.color-text').forEach(el => el.removeAttribute('aria-label')); };
    });
  };
  if (document.fonts?.ready) document.fonts.ready.then(boot); else boot();
})();
