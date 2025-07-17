function enterSite() {
    console.log('Enter site function called');
    
    const ageVerifyPage = document.getElementById('ageVerify');
    const mainSitePage = document.getElementById('mainSite');
    
    console.log('Age verify page:', ageVerifyPage);
    console.log('Main site page:', mainSitePage);
    
    if (ageVerifyPage && mainSitePage) {
        // Hide age verification page
        ageVerifyPage.style.display = 'none';
        ageVerifyPage.classList.remove('active');
        
        // Show main site page
        mainSitePage.style.display = 'block';
        mainSitePage.classList.add('active');
        
        // Remove fixed positioning to allow scrolling
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
        
        console.log('Page switching completed successfully');
        
        // Initialize page effects after switching
        setTimeout(() => {
            initPageEffects();
            initSmoothNavigation();
            initEmailLinks();
            console.log('All functionality initialized after page switch');
        }, 100);
    } else {
        console.error('Could not find required page elements');
    }
}

function exitSite() {
    alert('You must be 21 or older to access this site.');
    window.location.href = 'https://www.google.com';
}

// Simple scroll function that works immediately
function scrollToSection(sectionId) {
    console.log('Scrolling to section:', sectionId);
    const targetSection = document.getElementById(sectionId);
    
    if (targetSection) {
        const headerHeight = 120;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        console.log('Target found, scrolling to:', targetPosition);
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    } else {
        console.error('Section not found:', sectionId);
    }
}

// Enhanced smooth scroll navigation
function initSmoothNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id], footer[id]');
    
    // Add click handlers for smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = 120; // Account for fixed header
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active states
                updateActiveNavLink(this);
            }
        });
    });
    
    // Enhanced scroll spy for active navigation states
    let scrollTimer = null;
    window.addEventListener('scroll', function() {
        if (scrollTimer) {
            clearTimeout(scrollTimer);
        }
        
        scrollTimer = setTimeout(() => {
            let current = '';
            const scrollPos = window.scrollY + 200; // Adjusted for header
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            // Update active navigation link
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        }, 10);
    });
}

function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Enhanced page loading effects with improved performance
function initPageEffects() {
    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation for grid items
                const siblings = entry.target.parentElement.children;
                const index = Array.prototype.indexOf.call(siblings, entry.target);
                entry.target.style.transitionDelay = `${index * 0.1}s`;
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.info-card, .product-card-featured, .wholesale-feature, .oregon-highlight');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add parallax effect to floating elements
    initParallaxEffects();
}

// Parallax effects for floating elements
function initParallaxEffects() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    if (floatingElements.length > 0) {
        let scrollTimer = null;
        
        window.addEventListener('scroll', function() {
            if (scrollTimer) {
                cancelAnimationFrame(scrollTimer);
            }
            
            scrollTimer = requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                
                floatingElements.forEach((element, index) => {
                    const speed = 0.2 + (index * 0.1);
                    element.style.transform = `translateY(${rate * speed}px)`;
                });
            });
        });
    }
}

// Enhanced header scroll effects
function initHeaderEffects() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    let scrollTimer = null;
    
    window.addEventListener('scroll', function() {
        if (scrollTimer) {
            clearTimeout(scrollTimer);
        }
        
        scrollTimer = setTimeout(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.style.background = 'linear-gradient(135deg, rgba(0, 0, 0, 0.98) 0%, rgba(26, 26, 26, 0.95) 100%)';
                header.style.backdropFilter = 'blur(25px)';
                header.style.boxShadow = '0 15px 50px rgba(0, 0, 0, 0.4)';
            } else {
                header.style.background = 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(26, 26, 26, 0.9) 100%)';
                header.style.backdropFilter = 'blur(20px)';
                header.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.3)';
            }
            
            lastScrollTop = scrollTop;
        }, 10);
    });
}

// Improved mobile navigation
function initMobileNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add touch-friendly interactions for mobile
    navLinks.forEach(link => {
        link.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        link.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Performance optimization for animations
function optimizeAnimations() {
    // Reduce animations on slower devices
    const isSlowDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    
    if (isSlowDevice) {
        const style = document.createElement('style');
        style.textContent = `
            .floating-element,
            .particle {
                animation-duration: 60s !important;
            }
            .info-card:hover,
            .product-card-featured:hover {
                transition-duration: 0.2s !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Error handling for email links
function initEmailLinks() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track email clicks for analytics if needed
            console.log('Email link clicked:', this.href);
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing premium site functionality');
    
    // Ensure button events are attached
    const yesButton = document.querySelector('.btn-yes');
    const noButton = document.querySelector('.btn-no');
    
    if (yesButton) {
        yesButton.onclick = enterSite;
        console.log('Yes button event attached');
    }
    if (noButton) {
        noButton.onclick = exitSite;
        console.log('No button event attached');
    }
    
    // Initialize all enhanced features
    initHeaderEffects();
    initMobileNavigation();
    initEmailLinks();
    optimizeAnimations();
    
    // Force initialize navigation even on main page
    setTimeout(() => {
        initSmoothNavigation();
        console.log('Navigation initialized');
    }, 500);
    
    // Add loading animation completion
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

// Preload images for better performance
function preloadImages() {
    const imageUrls = ['ROUNDLOGO.PNG', 'TINCTURE.png', 'VAPEPEN.png'];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize preloading
preloadImages();
