window.onload = () => {
    navLinks = document.querySelectorAll('header nav a');
    sections = document.querySelectorAll('section');
};

window.onscroll = () => {
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
};