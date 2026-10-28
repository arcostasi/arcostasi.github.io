'use strict';

const navbar = document.querySelector('.topo');
const toggle = document.getElementById('nav-toggle');
const links = document.getElementById('nav-links');

toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  links.classList.toggle('aberto', open);
});

links.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    links.classList.remove('aberto');
  });
});

const setNavSurface = () => navbar.classList.toggle('scrolled', window.scrollY > 12);
setNavSurface();
window.addEventListener('scroll', setNavSurface, { passive: true });
