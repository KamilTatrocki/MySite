document.addEventListener('DOMContentLoaded', () => {


    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    // Toggle Mobile Menu
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mobileNav.classList.toggle('active');
        });
    }

    // Close Mobile Menu when a link is clicked
    const mobileLinks = mobileNav ? mobileNav.querySelectorAll('a') : [];
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (mobileNav && mobileNav.classList.contains('active') &&
            !mobileNav.contains(event.target) &&
            !menuToggle.contains(event.target)) {
            mobileNav.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });


    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Typewriter Effect
    const ctaElement = document.querySelector('.hero-cta');
    if (ctaElement) {
        const text = ctaElement.textContent.trim();
        ctaElement.textContent = ''; // Clear text

        // Ensure cursor is visible/hidden correctly during typing if needed, 
        // but CSS animation 'blinkingCursor' has a 3s delay which aligns with our typing delay.

        setTimeout(() => {
            let i = 0;
            const speed = 2000 / text.length; // Calculate speed to fit exactly in 2 seconds
            const typeWriter = () => {
                if (i < text.length) {
                    ctaElement.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, speed);
                }
            };
            typeWriter();
        }, 3000); // 3s delay before typing starts
    }

    console.log('Portfolio script loaded successfully.');
});
