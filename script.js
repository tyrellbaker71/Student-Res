/* =========================================
   GERMISTON HOUSE — script.js
   ========================================= */

// ---- NAVBAR: Scroll behaviour ----
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });


// ---- MOBILE NAV TOGGLE ----
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  // Animate hamburger → X
  const spans = navToggle.querySelectorAll('span');
  const isOpen = navLinks.classList.contains('open');
  if (isOpen) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  });
});


// ---- SCROLL REVEAL ----
const revealElements = document.querySelectorAll(
  '.about-feature, .contact-card, .gallery-item, .section-label, .section-title, .section-sub'
);

// Add reveal class
revealElements.forEach((el, index) => {
  el.classList.add('reveal');
  // Stagger children within grids
  const parent = el.parentElement;
  if (parent && (parent.classList.contains('about-grid') ||
                 parent.classList.contains('gallery-grid') ||
                 parent.classList.contains('contact-cards'))) {
    const siblings = Array.from(parent.children);
    const i = siblings.indexOf(el);
    if (i >= 0 && i < 5) {
      el.classList.add(`reveal-delay-${i + 1}`);
    }
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => observer.observe(el));


// ---- GALLERY: Broken image fallback ----
document.querySelectorAll('.gallery-item img').forEach((img, index) => {
  img.addEventListener('error', () => {
    // Replace broken image with a styled placeholder
    const num = index + 1;
    img.style.display = 'none';
    const placeholder = document.createElement('div');
    placeholder.style.cssText = `
      width: 100%; height: 100%;
      background: linear-gradient(135deg,
        hsl(${220 + (num * 7) % 30}, 30%, ${88 - (num % 4) * 4}%),
        hsl(${220 + (num * 11) % 40}, 25%, ${82 - (num % 3) * 3}%));
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Cormorant Garamond', serif;
      font-size: 2rem;
      font-weight: 600;
      color: rgba(15, 31, 61, 0.2);
      letter-spacing: 0.05em;
    `;
    placeholder.textContent = `${num < 10 ? '0' : ''}${num}`;
    img.parentElement.insertBefore(placeholder, img);
  });
});
