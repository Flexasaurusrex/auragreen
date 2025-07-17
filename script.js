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
        
        console.log('Page switching completed successfully');
    } else {
        console.error('Could not find required page elements');
    }
}

function exitSite() {
    alert('You must be 21 or older to access this site.');
    window.location.href = 'https://www.google.com';
}

// Smooth scroll navigation
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
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active states
                updateActiveNavLink(this);
            }
        });
    });
    
    // Add scroll spy for active navigation states
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPos = window.scrollY + 150;
        
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
    });
}

function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Enhanced page loading effects
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
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.info-card, .product-card-featured, .wholesale-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Check if user has already verified age when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    
    // Always start with age verification page - removed session check for testing
    // if (sessionStorage.getItem('ageVerified') === 'true') {
    //     console.log('User already verified, entering site');
    //     enterSite();
    // }
    
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
    
    // Initialize smooth navigation and page effects
    initSmoothNavigation();
    initPageEffects();
});
