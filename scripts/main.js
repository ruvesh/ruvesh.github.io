/**
 * Portfolio main script
 * - Mobile nav toggle
 * - Scroll-based header styling & active nav highlighting
 * - IntersectionObserver reveal animations
 * - Contact form input validation helpers
 */

document.addEventListener('DOMContentLoaded', () => {
    const header     = document.getElementById('header');
    const navbar     = document.getElementById('navbar');
    const navToggle  = document.getElementById('nav-toggle');
    const navOverlay = document.getElementById('nav-overlay');
    const navLinks   = document.querySelectorAll('.nav-link');
    const sections   = document.querySelectorAll('section');
    const reveals    = document.querySelectorAll('.reveal');
    const phoneInput = document.getElementById('phone');
    const nameInput  = document.getElementById('name');

    const closeNav = () => {
        navbar.classList.remove('open');
        navOverlay.classList.remove('open');
        navToggle.querySelector('i').className = 'bx bx-menu';
    };

    // ─── Mobile Nav Toggle ───────────────────────────────
    navToggle.addEventListener('click', () => {
        const isOpen = navbar.classList.toggle('open');
        navOverlay.classList.toggle('open', isOpen);
        navToggle.querySelector('i').className = isOpen ? 'bx bx-x' : 'bx bx-menu';
    });

    // Close mobile nav when overlay or a link is clicked
    navOverlay.addEventListener('click', closeNav);
    navLinks.forEach(link => link.addEventListener('click', closeNav));

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

    // ─── CV Download (force via Blob for mobile) ────────
    const downloadBtn = document.getElementById('download-cv');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            // 1. Local Testing: Let the native HTML handle it
            // (It has target="_blank" and download="v-ruvesh-cv.pdf" which works perfectly locally)
            if (window.location.protocol === 'file:') {
                return;
            }

            // 2. Web Hosting (GitHub Pages): Force a direct download in the current tab via JS Blob
            e.preventDefault();
            const url = downloadBtn.getAttribute('href');
            
            fetch(url)
                .then(res => res.blob())
                .then(blob => {
                    const blobUrl = window.URL.createObjectURL(blob);
                    const tempLink = document.createElement('a');
                    tempLink.style.display = 'none';
                    tempLink.href = blobUrl;
                    tempLink.download = 'v-ruvesh-cv.pdf'; // Forces download
                    document.body.appendChild(tempLink);
                    tempLink.click();
                    
                    // Cleanup
                    setTimeout(() => {
                        document.body.removeChild(tempLink);
                        window.URL.revokeObjectURL(blobUrl);
                    }, 100);
                })
                .catch(() => {
                    // Fallback to opening in a new tab if fetch fails entirely
                    window.open(url, '_blank');
                });
        });
    }
});

// ─── Exported helpers (used by inline onkeypress) ───────
const blockSpecialCharacters = (e) => isAllowedChar(e.key.charCodeAt(0));

const isAllowedChar = (ch) =>
    (ch >= 65 && ch <= 90)   ||   // A–Z
    (ch >= 97 && ch <= 122)  ||   // a–z
    ch === 32;                     // space