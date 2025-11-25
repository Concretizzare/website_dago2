/**
 * D'Agostino Giovanni e Marco - Website Scripts
 * Restyling 2024
 */

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const body = document.body;

// Navigation Controller
class NavigationController {
    constructor() {
        this.hamburger = hamburger;
        this.navLinks = navLinks;
        this.isOpen = false;

        if (this.hamburger && this.navLinks) {
            this.init();
        }
    }

    init() {
        // Hamburger click
        this.hamburger.addEventListener('click', () => this.toggle());

        // Keyboard support
        this.hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggle();
            }
        });

        // Close on nav link click
        this.navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                // Handle anchor links on same page
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        this.close();
                        setTimeout(() => {
                            target.scrollIntoView({ behavior: 'smooth' });
                        }, 300);
                    }
                } else if (href.includes('#')) {
                    // External page with anchor - let it navigate normally
                    this.close();
                } else {
                    this.close();
                }
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.navLinks.contains(e.target) && !this.hamburger.contains(e.target)) {
                this.close();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Close on resize to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isOpen) {
                this.close();
            }
        });
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        this.isOpen = true;
        this.hamburger.classList.add('active');
        this.navLinks.classList.add('open');
        this.hamburger.setAttribute('aria-expanded', 'true');
        body.classList.add('no-scroll');
    }

    close() {
        this.isOpen = false;
        this.hamburger.classList.remove('active');
        this.navLinks.classList.remove('open');
        this.hamburger.setAttribute('aria-expanded', 'false');
        body.classList.remove('no-scroll');
    }
}

// Smooth Scroll for anchor links (fallback)
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '';
        }

        lastScroll = currentScroll;
    });
}

// Intersection Observer for animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .product-card, .brand-card, .work-card, .feature-card, .contact-card');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

// Counter animation for stats
function initCounterAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    if (!stats.length) return;

    const animateCounter = (el) => {
        const target = parseInt(el.textContent.replace(/\D/g, ''));
        const suffix = el.textContent.replace(/[\d]/g, '');
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const update = () => {
            current += step;
            if (current < target) {
                el.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(update);
            } else {
                el.textContent = target + suffix;
            }
        };

        update();
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => observer.observe(stat));
    }
}

// Lazy loading images
function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading supported
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            img.src = img.src;
        });
    } else {
        // Fallback for older browsers
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        imageObserver.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }
}

// WhatsApp button animation
function initWhatsAppButton() {
    const whatsappBtn = document.querySelector('.floating-whatsapp');
    if (!whatsappBtn) return;

    // Pulse animation on load
    setTimeout(() => {
        whatsappBtn.style.animation = 'pulse 2s ease-in-out';
    }, 3000);
}

// Form validation (if contact form exists)
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputs = form.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (input.required && !input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });

        if (isValid) {
            // Handle form submission
            console.log('Form submitted');
        }
    });
}

// Initialize all modules
document.addEventListener('DOMContentLoaded', () => {
    new NavigationController();
    initSmoothScroll();
    initNavbarScroll();
    initScrollAnimations();
    initCounterAnimation();
    initLazyLoading();
    initWhatsAppButton();
    initFormValidation();
});

// Add CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(style);
