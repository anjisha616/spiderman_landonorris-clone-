/* =============================================
   SPIDER-MAN PREMIUM WEBSITE
   JavaScript Interactions & Animations
   ============================================= */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize all components
    initNavigation();
    initHeroAnimations();
    initMaskReveal();
    initParallaxTilt();
    initScrollReveal();
    initSuitTabs();
    initCounterAnimation();
    initPowerLevels();
    initContactForm();
    
});

/* =============================================
   NAVIGATION
   - Transparent to solid on scroll
   - Mobile hamburger menu
   - Active link highlighting
   - Smooth scrolling
   ============================================= */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Navbar scroll effect - adds solid background when scrolled
    function handleNavScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Active link highlighting based on scroll position
    function highlightActiveLink() {
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Update desktop nav
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
                
                // Update mobile nav
                mobileNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Throttled scroll handler for better performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                handleNavScroll();
                highlightActiveLink();
                scrollTimeout = null;
            }, 10);
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close mobile menu when link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initial check
    handleNavScroll();
    highlightActiveLink();
}

/* =============================================
   HERO TEXT REVEAL ANIMATION
   - Staggered text reveal on page load
   ============================================= */
function initHeroAnimations() {
    const revealElements = document.querySelectorAll('.reveal-text');
    
    // Small delay to ensure page is ready
    setTimeout(() => {
        revealElements.forEach((element) => {
            element.classList.add('revealed');
        });
    }, 300);
}

/* =============================================
   MASK REVEAL EFFECT
   - Hover: Shows Spider-Man mask over Peter Parker
   - Mobile: Tap to toggle mask
   - Includes dramatic lighting and zoom effects
   ============================================= */
function initMaskReveal() {
    const imageContainer = document.getElementById('heroImageContainer');
    const spidermanMask = document.getElementById('spidermanMask');
    const hoverHint = document.getElementById('hoverHint');
    
    // Check if touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        // Mobile: Tap to toggle mask
        imageContainer.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            
            // Update hint text
            if (hoverHint) {
                if (this.classList.contains('active')) {
                    hoverHint.querySelector('.hint-text').textContent = 'Tap to hide';
                } else {
                    hoverHint.querySelector('.hint-text').textContent = 'Tap to reveal';
                }
            }
        });
        
        // Update hint for mobile
        if (hoverHint) {
            hoverHint.querySelector('.hint-text').textContent = 'Tap to reveal';
        }
    } else {
        // Desktop: Cursor-tracking mask reveal (Lando Norris style)
        let isHovering = false;
        
        imageContainer.addEventListener('mouseenter', function() {
            isHovering = true;
            this.classList.add('is-hovering');
            if (hoverHint) hoverHint.style.opacity = '0';
        });
        
        imageContainer.addEventListener('mouseleave', function() {
            isHovering = false;
            this.classList.remove('is-hovering');
            // Reset mask to fully visible
            if (spidermanMask) {
                spidermanMask.style.clipPath = 'circle(100% at 50% 50%)';
            }
            if (hoverHint) hoverHint.style.opacity = '1';
        });
        
        imageContainer.addEventListener('mousemove', function(e) {
            if (!isHovering || !spidermanMask) return;
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate percentage position
            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;
            
            // Apply radial gradient mask that follows cursor
            // Larger radius for more dramatic reveal effect
            const radius = 35; // Larger reveal area for better effect
            spidermanMask.style.clipPath = `circle(${radius}% at ${xPercent}% ${yPercent}%)`;
        });
    }
}

/* =============================================
   PARALLAX TILT EFFECT
   - Hero image follows mouse movement
   - Creates 3D tilt effect
   ============================================= */
function initParallaxTilt() {
    const imageContainer = document.getElementById('heroImageContainer');
    const imageWrapper = document.getElementById('heroImageWrapper');
    
    // Only apply on non-touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        return;
    }
    
    // Configuration
    const maxRotation = 8; // Maximum rotation in degrees
    const perspective = 1000; // CSS perspective value
    
    imageWrapper.addEventListener('mousemove', (e) => {
        const rect = imageWrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate mouse position relative to center
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        // Calculate rotation (inverted for natural feel)
        const rotateY = (mouseX / (rect.width / 2)) * maxRotation;
        const rotateX = -(mouseY / (rect.height / 2)) * maxRotation;
        
        // Apply transform
        imageContainer.style.transform = `
            perspective(${perspective}px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg)
            scale3d(1.02, 1.02, 1.02)
        `;
    });
    
    // Reset on mouse leave
    imageWrapper.addEventListener('mouseleave', () => {
        imageContainer.style.transform = `
            perspective(${perspective}px) 
            rotateX(0deg) 
            rotateY(0deg)
            scale3d(1, 1, 1)
        `;
    });
}

/* =============================================
   SCROLL REVEAL ANIMATIONS
   - Elements fade/slide in when entering viewport
   - Uses Intersection Observer for performance
   ============================================= */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    // Intersection Observer configuration
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px 0px -100px 0px', // Trigger slightly before element enters view
        threshold: 0.1 // 10% visibility triggers the callback
    };
    
    // Callback when element enters/exits viewport
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optionally stop observing after reveal
                // observer.unobserve(entry.target);
            }
        });
    };
    
    // Create observer instance
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe each element
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

/* =============================================
   SUIT TABS
   - Switch between different suit displays
   ============================================= */
function initSuitTabs() {
    const tabs = document.querySelectorAll('.suit-tab');
    const panels = document.querySelectorAll('.suit-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetSuit = tab.getAttribute('data-suit');
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update active panel
            panels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `suit-${targetSuit}`) {
                    panel.classList.add('active');
                }
            });
        });
    });
}

/* =============================================
   COUNTER ANIMATION
   - Animated number counting for stats
   ============================================= */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

/* =============================================
   POWER LEVEL BARS
   - Animated fill effect for skill levels
   ============================================= */
function initPowerLevels() {
    const levelBars = document.querySelectorAll('.level-fill');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.getAttribute('data-level');
                entry.target.style.width = `${level}%`;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    levelBars.forEach(bar => observer.observe(bar));
}

/* =============================================
   CONTACT FORM
   - Form validation and submission handling
   ============================================= */
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Basic validation
        if (!data.name || !data.email || !data.message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showFormMessage('Signal sent successfully! Spider-Man has been alerted.', 'success');
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Helper function to show form messages
function showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message ${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
        padding: 1rem;
        margin-top: 1rem;
        border-radius: 4px;
        font-size: 0.875rem;
        animation: fadeIn 0.3s ease-out;
        ${type === 'success' 
            ? 'background: rgba(34, 197, 94, 0.2); color: #22c55e; border: 1px solid rgba(34, 197, 94, 0.3);'
            : 'background: rgba(239, 68, 68, 0.2); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3);'}
    `;
    
    // Insert after form
    const form = document.getElementById('contactForm');
    form.appendChild(messageEl);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageEl.style.opacity = '0';
        messageEl.style.transition = 'opacity 0.3s ease-out';
        setTimeout(() => messageEl.remove(), 300);
    }, 5000);
}

/* =============================================
   PARTICLE BACKGROUND (Optional Enhancement)
   - Creates subtle floating particles in hero
   ============================================= */
function initParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(230, 36, 41, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 10 + 10}s infinite linear;
            animation-delay: ${Math.random() * 5}s;
        `;
        container.appendChild(particle);
    }
}

/* =============================================
   SMOOTH SCROLL POLYFILL CHECK
   - Ensures smooth scrolling works everywhere
   ============================================= */
(function() {
    // Check if browser supports smooth scrolling
    if (!('scrollBehavior' in document.documentElement.style)) {
        // Simple polyfill for older browsers
        const smoothScroll = (target, duration = 500) => {
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            let startTime = null;
            
            const animation = (currentTime) => {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            };
            
            // Easing function
            const ease = (t, b, c, d) => {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            };
            
            requestAnimationFrame(animation);
        };
        
        // Override default scroll behavior
        window.smoothScrollTo = smoothScroll;
    }
})();

/* =============================================
   PRELOADER (Optional)
   - Shows loading screen while page loads
   ============================================= */
window.addEventListener('load', () => {
    // Page is fully loaded
    document.body.classList.add('loaded');
    
    // Initialize particles after load
    initParticles();
});

/* =============================================
   KEYBOARD NAVIGATION
   - Ensures accessibility for keyboard users
   ============================================= */
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (mobileMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }
});

/* =============================================
   PERFORMANCE OPTIMIZATION
   - Debounce function for scroll events
   ============================================= */
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/* =============================================
   RESIZE HANDLER
   - Handles responsive adjustments
   ============================================= */
let resizeTimeout;
window.addEventListener('resize', () => {
    // Debounce resize events
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            const hamburger = document.getElementById('hamburger');
            const mobileMenu = document.getElementById('mobileMenu');
            
            if (mobileMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    }, 250);
});

/* =============================================
   CONSOLE EASTER EGG
   - Fun message for developers
   ============================================= */
console.log(`
%c🕷️ SPIDER-MAN 🕷️
%c"With great power comes great responsibility."

Built with vanilla HTML, CSS & JavaScript
No frameworks. No libraries. Just pure web tech.

`, 
'color: #e62429; font-size: 24px; font-weight: bold;',
'color: #888; font-size: 12px;'
);
