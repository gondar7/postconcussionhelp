// PostConcussionHelp - JS Enhancements v8 (Affiliate Links Open New Tab)

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

    // --- GA4 Affiliate Link Click Tracking ---
    // Select links that contain 'amzn.to' (Amazon affiliate links)
    const affiliateLinks = document.querySelectorAll('a[href*="amzn.to"]');

    affiliateLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent immediate navigation

            let productName = 'Unknown Product'; // Default product name
            const linkUrl = link.href;

            // Try to find product name based on surrounding elements
            const productCard = link.closest('.product-card');
            const productHighlightItem = link.closest('.product-highlight-item');
            const infoCard = link.closest('.info-card');
            const iconListItem = link.closest('.icon-list li'); // Check if link is directly in an icon-list item

            if (productCard) {
                // Found in a .product-card (recovery-strategies.html - Recommended Tools)
                const heading = productCard.querySelector('h4');
                if (heading) {
                     // Remove the icon text if present
                     const iconElement = heading.querySelector('i');
                     productName = iconElement ? heading.textContent.replace(iconElement.textContent, '').trim() : heading.textContent.trim();
                }
            } else if (productHighlightItem) {
                // Found in a .product-highlight-item (index.html - Product Highlight)
                const heading = productHighlightItem.querySelector('h4');
                 if (heading) {
                     // Remove the icon text if present
                     const iconElement = heading.querySelector('i');
                     productName = iconElement ? heading.textContent.replace(iconElement.textContent, '').trim() : heading.textContent.trim();
                 }
            } else if (infoCard) {
                 // Found in an .info-card (recovery-strategies.html, symptoms-challenges.html)
                 // Often multiple links here, try link text first
                 productName = link.textContent.trim();
                 // If link text is generic (like 'Style 1'/'Style 2'), try the card heading
                 if (productName.toLowerCase().startsWith('style') || productName === '') {
                     const heading = infoCard.querySelector('h4');
                      if (heading) {
                          const iconElement = heading.querySelector('i');
                          productName = iconElement ? heading.textContent.replace(iconElement.textContent, '').trim() : heading.textContent.trim();
                          // Append specific style if available from link text
                          if (link.textContent.trim().toLowerCase().startsWith('style')) {
                            productName += ` (${link.textContent.trim()})`;
                          }
                      }
                 }
            } else if (iconListItem) {
                 // Found in an .icon-list item (e.g., symptoms-challenges.html)
                 productName = link.textContent.trim();
                 // If link text is generic, try finding preceding strong text
                 if (productName === 'Eye Mask' || productName === 'Journal/Planner') {
                    // Keep as is, these are specific enough
                 } else {
                    // Fallback if needed, but link text is often best here
                 }
            } else {
                 // Fallback: Use link text if not empty
                 if (link.textContent.trim()) {
                     productName = link.textContent.trim();
                 }
            }

             // Clean up product name slightly (e.g., remove extra spaces)
             productName = productName.replace(/\s+/g, ' ').trim();


            // Send event to Google Analytics (GA4)
            if (typeof gtag === 'function') {
                gtag('event', 'select_content', {
                    'content_type': 'affiliate_link',
                    'item_id': productName, // Use item_id for the product name/identifier
                    'event_callback': function() {
                        // Callback ensures event is sent before navigating
                        // ** CHANGED TO OPEN IN NEW TAB **
                        window.open(linkUrl, '_blank');
                    }
                });

                 // Fallback timeout in case callback doesn't fire (e.g., due to ad blockers)
                 setTimeout(function() {
                     // ** CHANGED TO OPEN IN NEW TAB **
                     // Check if the window was already opened by the callback
                     // This is a simple check; more robust checks might involve tracking window handles
                     if (!window.opened) { // Basic check; might need refinement
                         window.open(linkUrl, '_blank');
                         window.opened = true; // Simple flag
                         setTimeout(() => { window.opened = false; }, 100); // Reset flag
                     }
                 }, 500); // Wait 500ms

            } else {
                console.log("gtag function not defined. Skipping GA event.");
                // If gtag isn't available, navigate immediately in a new tab
                // ** CHANGED TO OPEN IN NEW TAB **
                window.open(linkUrl, '_blank');
            }
        });
    });


}); // End DOMContentLoaded