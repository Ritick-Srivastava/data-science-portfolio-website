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
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.15
});

// Setup reveal elements
const setupReveals = () => {
    // Section headers reveal up
    document.querySelectorAll('.section-title, .education-card').forEach(el => {
        el.classList.add('reveal', 'reveal-up');
        revealObserver.observe(el);
    });

    // Staggered contents
    const staggerConfigs = [
        { container: '.project-grid', items: '.project-card', revealClass: 'reveal-up' },
        { container: '.timeline', items: '.timeline-item', revealClass: 'reveal-left' },
        { container: '.skills-grid', items: '.skill-category', revealClass: 'reveal-right' }
    ];

    staggerConfigs.forEach(config => {
        const container = document.querySelector(config.container);
        if (container) {
            container.classList.add('stagger-container');
            container.querySelectorAll(config.items).forEach((item, index) => {
                item.classList.add('reveal', config.revealClass);
                item.style.setProperty('--order', index);
                revealObserver.observe(item);
            });
        }
    });
};

setupReveals();
