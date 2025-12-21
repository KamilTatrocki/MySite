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

    console.log('Portfolio script loaded successfully.');
});
