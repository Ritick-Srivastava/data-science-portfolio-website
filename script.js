// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 11, 16, 0.95)';
        navbar.style.padding = '0.5rem 0';
    } else {
        navbar.style.background = 'rgba(10, 11, 16, 0.8)';
        navbar.style.padding = '1rem 0';
    }
});

// Contact Form Submission (Mock)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! This is a demo, but your message would be sent in a real application.');
        contactForm.reset();
    });
}

// Reveal animations on scroll
const reveal = () => {
    const reveals = document.querySelectorAll('.project-card');
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 150;
        if (revealTop < windowHeight - revealPoint) {
            reveals[i].style.opacity = '1';
            reveals[i].style.transform = 'translateY(0)';
        }
    }
};

window.addEventListener('scroll', reveal);
