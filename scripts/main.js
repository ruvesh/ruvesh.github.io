/**
 * Portfolio main script
 * - Mobile nav toggle
 * - Scroll-based header styling & active nav highlighting
 * - IntersectionObserver reveal animations
 * - Contact form input validation helpers
 */

document.addEventListener('DOMContentLoaded', () => {
    const header    = document.getElementById('header');
    const navbar    = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks  = document.querySelectorAll('.nav-link');
    const sections  = document.querySelectorAll('section');
    const reveals   = document.querySelectorAll('.reveal');
    const phoneInput = document.getElementById('phone');
    const nameInput  = document.getElementById('name');

    // ─── Mobile Nav Toggle ───────────────────────────────
    navToggle.addEventListener('click', () => {
        const isOpen = navbar.classList.toggle('open');
        navToggle.querySelector('i').className = isOpen ? 'bx bx-x' : 'bx bx-menu';
    });

    // Close mobile nav when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('open');
            navToggle.querySelector('i').className = 'bx bx-menu';
        });
    });

    // ─── Scroll: Header background ──────────────────────
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    // ─── Scroll: Active nav link highlighting ───────────
    const activateNavLink = () => {
        let current = '';
        sections.forEach(section => {
            const top     = section.offsetTop - 200;
            const height  = section.offsetHeight;
            if (window.scrollY >= top && window.scrollY < top + height) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', activateNavLink, { passive: true });

    // ─── IntersectionObserver: Reveal on Scroll ─────────
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => revealObserver.observe(el));

    // ─── Form Validation ────────────────────────────────
    if (phoneInput) {
        phoneInput.addEventListener('change', (event) => {
            const input = event.target;
            input.setCustomValidity(
                input.validity.patternMismatch
                    ? 'Please enter a valid 10 digit mobile number'
                    : ''
            );
        });
    }

    if (nameInput) {
        nameInput.addEventListener('change', (event) => {
            const input = event.target;
            let val = input.value.trim().replace(/\s\s+/g, ' ');
            input.value = val.split('').filter(ch => isAllowedChar(ch.charCodeAt(0))).join('');
        });
    }
});

// ─── Exported helpers (used by inline onkeypress) ───────
const blockSpecialCharacters = (e) => isAllowedChar(e.key.charCodeAt(0));

const isAllowedChar = (ch) =>
    (ch >= 65 && ch <= 90)   ||   // A–Z
    (ch >= 97 && ch <= 122)  ||   // a–z
    ch === 32;                     // space