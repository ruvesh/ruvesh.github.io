window.onload = () => {
    navLinks = document.querySelectorAll('header nav a');
    sections = document.querySelectorAll('section');
    menuIcon = document.querySelector('#menu-icon');
    navBar = document.querySelector('.navbar');
    nameInput = document.getElementById('name');
    phoneInput = document.getElementById('phone');

    // show or hide nav menu for small screen size on click of sandwich menu icon
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('bx-x');
        navBar.classList.toggle('drop-down');
    });

    phoneInput.addEventListener('change', (event) => {
        const input = event.target;
        if (input.validity.patternMismatch) {
            input.setCustomValidity("Please enter a valid 10 digit mobile number");
        } else {
            input.setCustomValidity("");
        }
    }, false);

    nameInput.addEventListener('change', (event) => {
        const input = event.target;
        let inputVal = input.value.trim().replace(/\s\s+/g, ' ');
        input.value.split('').forEach((ch) => {
            if(!isAllowedChar(ch.charCodeAt(0))){
                inputVal = inputVal.replace(ch, '');
            }
        });

        input.value = inputVal;
    });

    addSiteAnimation();
};

// set active nav item based on currently scrolled section of site
window.addEventListener('scroll', () => {
    sections.forEach(section => {
        let top = window.scrollY;
        let offset = section.offsetTop - 150;
        let height = section.offsetHeight;
        let id = section.getAttribute('id');
        

        if(top >= offset && top < offset + height){
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    // close menu dropdown when scrolled or clicked on nav item
    menuIcon.classList.remove('bx-x');
    navBar.classList.remove('drop-down');
});

const addSiteAnimation = () => {
    performScrollAnimation();
    animateChronicle();
};

const performScrollAnimation = () => {
    ScrollReveal({
        reset: false,
        distance: '80px',
        duration: 2000,
        delay: 100
    });

    ScrollReveal().reveal('.home-img, .skills-container, .timeline, .contact form textarea', { origin: 'bottom' });
    ScrollReveal().reveal('.about-img, .home-content h1, .contact form input:nth-child(odd)', { origin: 'left' });
    ScrollReveal().reveal('.about-content, .home-content p, .contact form input:nth-child(even)', { origin: 'right' });
    ScrollReveal().reveal('.home-content, .heading, .contact form .btn', { origin: 'top' });
};

const animateChronicle = () => {
    const typed = new Typed('#chronicle', {
        strings: ['techie', 'programmer', 'solutionist'],
        startDelay: 800,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 1000,
        loop: true
    });
}

const blockSpecialCharacters = (e) => {
    let key = e.key;
    let keyCharCode = key.charCodeAt(0);

    return isAllowedChar(keyCharCode);
}

const isAllowedChar = (ch) => {
    return (ch >= 65 && ch <= 90)
        || (ch >= 97 && ch <= 122)
        || ch == 32;
}