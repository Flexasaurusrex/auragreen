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
});
