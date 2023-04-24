window.onload = () => {
    navLinks = document.querySelectorAll('header nav a');
    sections = document.querySelectorAll('section');
    menuIcon = document.querySelector('#menu-icon');
    navBar = document.querySelector('.navbar');

    // show or hide nav menu for small screen size on click of sandwich menu icon
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('bx-x');
        navBar.classList.toggle('drop-down');
    });

    addSiteAnimation();
};

// set active nav item based on currently scrolled section of site
window.addEventListener('scroll', () => {
    console.log('scrolling');
    console.log(sections);
    console.log(navLinks);
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

    ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
    ScrollReveal().reveal('.home-img, .skills-container, .timeline', { origin: 'bottom' });
    ScrollReveal().reveal('.about-img, .home-content h1', { origin: 'left' });
    ScrollReveal().reveal('.about-content, .home-content p', { origin: 'right' });
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