// PostConcussionHelp - JS Enhancements v6 (Footer Active Link)

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation Toggle ---
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = mainNav.classList.toggle('active');
            navToggle.classList.toggle('active', isActive);
            navToggle.setAttribute('aria-expanded', isActive);
            body.style.overflow = isActive ? 'hidden' : '';
        });

        document.addEventListener('click', (event) => {
            const isClickInsideNav = mainNav.contains(event.target);
            const isClickOnToggle = navToggle.contains(event.target);
            if (!isClickInsideNav && !isClickOnToggle && mainNav.classList.contains('active')) {
                closeMobileNav();
            }
        });

         mainNav.querySelectorAll('a').forEach(link => {
             link.addEventListener('click', () => {
                 if (mainNav.classList.contains('active')) {
                     setTimeout(closeMobileNav, 50);
                 }
             });
         });

         function closeMobileNav() {
             mainNav.classList.remove('active');
             navToggle.classList.remove('active');
             navToggle.setAttribute('aria-expanded', 'false');
             body.style.overflow = '';
         }
    }

    // --- Smooth Scrolling for Internal Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.length > 1 && href.startsWith('#')) {
                 const targetId = href.substring(1);
                 const targetElement = document.getElementById(targetId);
                 if (targetElement) {
                    e.preventDefault();
                    const header = document.querySelector('.main-header');
                    const headerOffset = header ? header.offsetHeight : 70;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset - 20; // 20px buffer

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                 }
             }
        });
    });

    // --- Subtle Fade-In Effect on Scroll ---
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.05
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    };

    // Ensure IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const elementsToFadeIn = document.querySelectorAll(
            '.intro-section, .feature-item, .product-highlight-item, .main-article section, .info-card, .product-item-text-only, blockquote, .page-header p, .support-columns > div, .professional-help-list li, .footer-col, .product-card' // Added .product-card
            );

        elementsToFadeIn.forEach(el => {
            el.classList.add('fade-in-element');
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers: make elements visible immediately
        const elementsToFadeIn = document.querySelectorAll('.fade-in-element');
        elementsToFadeIn.forEach(el => {
            el.classList.add('is-visible');
        });
    }


    // --- Header Scroll Effect ---
    const header = document.querySelector('.main-header');
    if (header) {
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 50) {
                header.classList.add('is-scrolled');
            } else {
                 header.classList.remove('is-scrolled');
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, { passive: true });
    }

    // --- Footer Active Link Highlight ---
    const currentPath = window.location.pathname.split('/').pop(); // Get the current HTML file name
    const footerLinks = document.querySelectorAll('.footer-col ul li a');

    footerLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) { // Handle index page case
            link.classList.add('active');
        }
    });


}); // End DOMContentLoaded