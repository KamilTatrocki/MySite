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

    // Image Slider Logic
    const sliderTrack = document.getElementById('slider-track');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dots = document.querySelectorAll('.slider-dot');

    if (sliderTrack && slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;

        const updateSlider = () => {
            // Reset dots
            dots.forEach(dot => dot.classList.remove('active'));
            // Activate current dot
            if (dots[currentSlide]) dots[currentSlide].classList.add('active');

            // Move track
            sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        };

        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
        };

        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateSlider();
            });
        });

        // Auto slide every 5 seconds
        setInterval(nextSlide, 5000);
    }

    console.log('Portfolio script loaded successfully.');
});
