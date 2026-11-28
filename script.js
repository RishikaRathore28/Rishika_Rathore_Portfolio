/* =========================================================
   RISHIKA RATHORE | PORTFOLIO JAVASCRIPT
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    // Initialise AOS only after its library has loaded.
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 70
        });
    }

    // Mobile navigation menu
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpening = mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            menuToggle.setAttribute('aria-expanded', String(isOpening));
            menuToggle.innerHTML = isOpening
                ? '<i class="fas fa-xmark text-base"></i>'
                : '<i class="fas fa-bars text-base"></i>';
        });

        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.innerHTML = '<i class="fas fa-bars text-base"></i>';
            });
        });
    }

    // Scroll-to-top button
    const scrollTopBtn = document.getElementById('scroll-top');

    const updateScrollButton = () => {
        if (!scrollTopBtn) return;

        if (window.scrollY > 400) {
            scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        } else {
            scrollTopBtn.classList.add('opacity-0', 'pointer-events-none');
        }
    };

    window.addEventListener('scroll', updateScrollButton, { passive: true });
    updateScrollButton();

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Highlight the navigation item for the current section
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-pill-link');

    const updateActiveNavigation = () => {
        let currentSection = 'home';

        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 140) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${currentSection}`;
            link.classList.toggle('active', isActive);
        });
    };

    window.addEventListener('scroll', updateActiveNavigation, { passive: true });
    updateActiveNavigation();

    // Automatically update the footer year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Contact form: open the visitor's email application.
    // This is a front-end mailto solution, not a server-side form handler.
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', event => {
            event.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                if (formStatus) formStatus.textContent = 'Please complete all fields.';
                return;
            }

            const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
            const body = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            );

            if (formStatus) {
                formStatus.textContent = 'Opening your email application to send the message…';
            }

            window.location.href =
                `mailto:rishika14328@gmail.com?subject=${subject}&body=${body}`;
        });
    }
});
