'use strict';

const TEXT = {
  en: {
    'meta.title': 'Anderson Costa — Embedded Software and Field Systems',
    'meta.description': 'Anderson Costa has worked in software development since 1997, focusing on firmware, embedded systems, and CAN, J1939, and ISOBUS networks. Author of Fundamentos de CAN, J1939 e ISOBUS.',
    'nav.label': 'Primary navigation', 'nav.home': 'Arcostasi — home', 'nav.menu': 'Menu', 'nav.close': 'Close menu',
    'nav.about': 'About', 'nav.book': 'Book', 'nav.projects': 'Projects', 'nav.contact': 'Contact',
    'language.label': 'Language',
    'hero.kicker': 'Embedded software developer · Technical author',
    'hero.subtitle': 'Embedded software for machines at work in the field.',
    'hero.summary': 'Firmware, electronics, and communication networks for agricultural and industrial automation. Software developer since 1997, based in Maringá, Paraná, Brazil.',
    'hero.bookCta': 'Explore the book', 'hero.projectsCta': 'Selected projects',
    'about.kicker': 'Engineering in practice', 'about.title': 'From signal to machine.',
    'about.summary': 'My work connects firmware, electronics, and application software. The focus is on reliable systems and communication between tractors, implements, and industrial equipment.',
    'about.areas': 'Technical focus areas', 'about.layerTitle': 'Physical layer',
    'about.layerBody': 'Differential signals, bus timing, and instrument-based diagnostics.',
    'about.protocolTitle': 'Protocols', 'about.protocolBody': 'CAN, SAE J1939, and ISOBUS (ISO 11783), from arbitration to message interpretation.',
    'about.embeddedTitle': 'Embedded systems', 'about.embeddedBody': 'C/C++ firmware, microcontrollers, real-time software, and equipment integration.',
    'book.kicker': 'Technical reference · First edition · 2026',
    'book.subtitle': 'From bits to diagnostics in agricultural tractors and implements',
    'book.summary': 'A practical guide to the networks that connect tractors and implements: from the CAN physical layer to SAE J1939 and ISOBUS, with exercises and diagnostic case studies.',
    'book.details': 'Book details', 'book.pages': 'pages', 'book.chapters': 'chapters', 'book.exercises': 'exercises',
    'book.cases': 'diagnostic cases', 'book.siteCta': 'Visit the book website', 'book.sampleCta': 'Read a free sample',
    'book.coverLink': 'Open the official book website', 'book.coverAlt': 'Cover of Fundamentos de CAN, J1939 e ISOBUS',
    'projects.kicker': 'Selected work', 'projects.title': 'Projects', 'projects.all': 'All repositories',
    'projects.torquebus': 'An open workbench for automotive networks: CAN capture, DBC decoding, diagnostics, simulation, and dashboards.',
    'projects.avr': 'An offline Arduino simulator with a visual circuit editor, peripherals, and real-time diagnostics.',
    'projects.harbour': 'A Rust compiler project for CA-Clipper and Harbour compatibility, with a C backend, tests, and continuous integration.',
    'projects.6502': 'An interactive MOS 6502 computer with an assembler, live bus views, and a test runner.',
    'projects.6502stack': 'MOS 6502 · Assembly · Simulation',
    'contact.kicker': 'Contact', 'contact.title': 'Let’s talk embedded systems.', 'contact.book': 'Book'
  },
  pt: {
    'meta.title': 'Anderson Costa — Software embarcado e sistemas de campo',
    'meta.description': 'Anderson Costa desenvolve software desde 1997, com foco em firmware, sistemas embarcados e redes CAN, J1939 e ISOBUS. Autor de Fundamentos de CAN, J1939 e ISOBUS.',
    'nav.label': 'Navegação principal', 'nav.home': 'Arcostasi — início', 'nav.menu': 'Menu', 'nav.close': 'Fechar menu',
    'nav.about': 'Sobre', 'nav.book': 'Livro', 'nav.projects': 'Projetos', 'nav.contact': 'Contato',
    'language.label': 'Idioma',
    'hero.kicker': 'Desenvolvedor de software embarcado · Autor técnico',
    'hero.subtitle': 'Software embarcado para máquinas que trabalham no campo.',
    'hero.summary': 'Firmware, eletrônica e redes de comunicação para automação agrícola e industrial. Desenvolvedor desde 1997, em Maringá, Paraná.',
    'hero.bookCta': 'Conheça o livro', 'hero.projectsCta': 'Projetos selecionados',
    'about.kicker': 'Engenharia aplicada', 'about.title': 'Do sinal à máquina.',
    'about.summary': 'Meu trabalho aproxima firmware, eletrônica e software de aplicação. O foco está em sistemas confiáveis e na comunicação entre tratores, implementos e equipamentos industriais.',
    'about.areas': 'Áreas técnicas', 'about.layerTitle': 'Camada física',
    'about.layerBody': 'Sinais diferenciais, temporização do barramento e diagnóstico com instrumentos.',
    'about.protocolTitle': 'Protocolos', 'about.protocolBody': 'CAN, SAE J1939 e ISOBUS (ISO 11783), da arbitragem à interpretação das mensagens.',
    'about.embeddedTitle': 'Sistemas embarcados', 'about.embeddedBody': 'Firmware em C/C++, microcontroladores, software de tempo real e integração com equipamentos.',
    'book.kicker': 'Obra de referência técnica · 1ª edição · 2026',
    'book.subtitle': 'Do bit ao diagnóstico em tratores e implementos agrícolas',
    'book.summary': 'Um guia prático pelas redes que conectam tratores e implementos: da camada física CAN aos protocolos SAE J1939 e ISOBUS, com exercícios e estudos de caso de diagnóstico.',
    'book.details': 'Dados do livro', 'book.pages': 'páginas', 'book.chapters': 'capítulos', 'book.exercises': 'exercícios',
    'book.cases': 'casos de diagnóstico', 'book.siteCta': 'Visite o site do livro', 'book.sampleCta': 'Leia a amostra gratuita',
    'book.coverLink': 'Visite o site oficial do livro', 'book.coverAlt': 'Capa de Fundamentos de CAN, J1939 e ISOBUS',
    'projects.kicker': 'Trabalho selecionado', 'projects.title': 'Projetos', 'projects.all': 'Todos os repositórios',
    'projects.torquebus': 'Bancada aberta para redes veiculares: captura CAN, decodificação DBC, diagnósticos, simulação e dashboards.',
    'projects.avr': 'Simulador offline de Arduino com editor visual de circuitos, periféricos e diagnóstico em tempo real.',
    'projects.harbour': 'Compilador em Rust para compatibilidade com CA-Clipper e Harbour, com backend em C, testes e integração contínua.',
    'projects.6502': 'Computador MOS 6502 interativo com assembler, visualização do barramento e execução de testes.',
    'projects.6502stack': 'MOS 6502 · Assembly · Simulação',
    'contact.kicker': 'Contato', 'contact.title': 'Vamos conversar sobre sistemas embarcados.', 'contact.book': 'Livro'
  },
  es: {
    'meta.title': 'Anderson Costa — Software embebido y sistemas de campo',
    'meta.description': 'Anderson Costa desarrolla software desde 1997, con foco en firmware, sistemas embebidos y redes CAN, J1939 e ISOBUS. Autor de Fundamentos de CAN, J1939 e ISOBUS.',
    'nav.label': 'Navegación principal', 'nav.home': 'Arcostasi — inicio', 'nav.menu': 'Menú', 'nav.close': 'Cerrar menú',
    'nav.about': 'Perfil', 'nav.book': 'Libro', 'nav.projects': 'Proyectos', 'nav.contact': 'Contacto',
    'language.label': 'Idioma',
    'hero.kicker': 'Desarrollador de software embebido · Autor técnico',
    'hero.subtitle': 'Software embebido para máquinas que trabajan en el campo.',
    'hero.summary': 'Firmware, electrónica y redes de comunicación para la automatización agrícola e industrial. Desarrollador desde 1997, en Maringá, Paraná, Brasil.',
    'hero.bookCta': 'Conoce el libro', 'hero.projectsCta': 'Proyectos seleccionados',
    'about.kicker': 'Ingeniería aplicada', 'about.title': 'De la señal a la máquina.',
    'about.summary': 'Mi trabajo conecta firmware, electrónica y software de aplicación. El foco está en sistemas confiables y en la comunicación entre tractores, implementos y equipos industriales.',
    'about.areas': 'Áreas técnicas', 'about.layerTitle': 'Capa física',
    'about.layerBody': 'Señales diferenciales, temporización del bus y diagnóstico con instrumentos.',
    'about.protocolTitle': 'Protocolos', 'about.protocolBody': 'CAN, SAE J1939 e ISOBUS (ISO 11783), desde el arbitraje hasta la interpretación de mensajes.',
    'about.embeddedTitle': 'Sistemas embebidos', 'about.embeddedBody': 'Firmware en C/C++, microcontroladores, software en tiempo real e integración con equipos.',
    'book.kicker': 'Obra técnica de referencia · 1.ª edición · 2026',
    'book.subtitle': 'Del bit al diagnóstico en tractores e implementos agrícolas',
    'book.summary': 'Una guía práctica de las redes que conectan tractores e implementos: desde la capa física CAN hasta SAE J1939 e ISOBUS, con ejercicios y casos de diagnóstico.',
    'book.details': 'Datos del libro', 'book.pages': 'páginas', 'book.chapters': 'capítulos', 'book.exercises': 'ejercicios',
    'book.cases': 'casos de diagnóstico', 'book.siteCta': 'Visita el sitio del libro', 'book.sampleCta': 'Lee una muestra gratuita',
    'book.coverLink': 'Abre el sitio oficial del libro', 'book.coverAlt': 'Portada de Fundamentos de CAN, J1939 e ISOBUS',
    'projects.kicker': 'Trabajo seleccionado', 'projects.title': 'Proyectos', 'projects.all': 'Todos los repositorios',
    'projects.torquebus': 'Banco de trabajo abierto para redes automotrices: captura CAN, decodificación DBC, diagnóstico, simulación y paneles.',
    'projects.avr': 'Simulador Arduino sin conexión, con editor visual de circuitos, periféricos y diagnóstico en tiempo real.',
    'projects.harbour': 'Proyecto de compilador en Rust compatible con CA-Clipper y Harbour, con backend en C, pruebas e integración continua.',
    'projects.6502': 'Computadora MOS 6502 interactiva con ensamblador, visualización del bus y ejecución de pruebas.',
    'projects.6502stack': 'MOS 6502 · Ensamblador · Simulación',
    'contact.kicker': 'Contacto', 'contact.title': 'Hablemos de sistemas embebidos.', 'contact.book': 'Libro'
  }
};

const html = document.documentElement;
const nav = document.querySelector('.topo');
const toggle = document.getElementById('nav-toggle');
const links = document.getElementById('nav-links');
let language = 'en';
let menuOpen = false;

function setLanguage(next) {
  if (!TEXT[next]) return;
  language = next;
  const copy = TEXT[language];
  html.lang = language === 'pt' ? 'pt-BR' : language === 'es' ? 'es' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const value = copy[element.dataset.i18n];
    if (value !== undefined) element.textContent = value;
  });
  document.querySelectorAll('[data-i18n-alt]').forEach(element => {
    const value = copy[element.dataset.i18nAlt];
    if (value !== undefined) element.alt = value;
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(element => {
    const value = copy[element.dataset.i18nAria];
    if (value !== undefined) element.setAttribute('aria-label', value);
  });
  document.querySelectorAll('[data-i18n-content]').forEach(element => {
    const value = copy[element.dataset.i18nContent];
    if (value !== undefined) element.setAttribute('content', value);
  });
  document.title = copy['meta.title'];
  toggle.textContent = copy[menuOpen ? 'nav.close' : 'nav.menu'];
  document.querySelectorAll('[data-language]').forEach(button => {
    const active = button.dataset.language === language;
    button.classList.toggle('ativo', active);
    button.setAttribute('aria-pressed', String(active));
  });
  try { localStorage.setItem('arcostasi-language', language); } catch { /* Preference storage is optional. */ }
}

document.querySelectorAll('[data-language]').forEach(button => {
  button.addEventListener('click', () => setLanguage(button.dataset.language));
});

toggle.addEventListener('click', () => {
  menuOpen = !menuOpen;
  toggle.setAttribute('aria-expanded', String(menuOpen));
  links.classList.toggle('aberto', menuOpen);
  toggle.textContent = TEXT[language][menuOpen ? 'nav.close' : 'nav.menu'];
});

links.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = TEXT[language]['nav.menu'];
    links.classList.remove('aberto');
  });
});

const setNavSurface = () => nav.classList.toggle('scrolled', window.scrollY > 12);
setNavSurface();
window.addEventListener('scroll', setNavSurface, { passive: true });

try {
  const savedLanguage = localStorage.getItem('arcostasi-language');
  if (savedLanguage && TEXT[savedLanguage]) setLanguage(savedLanguage);
} catch { /* Keep English when preference storage is unavailable. */ }
