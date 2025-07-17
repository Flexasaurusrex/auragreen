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

function submitWholesaleForm(event) {
    event.preventDefault();
    
    // Get form data
    const form = event.target;
    const formData = new FormData(form);
    
    // Extract form values
    const company = formData.get('company') || '';
    const firstName = formData.get('firstName') || '';
    const lastName = formData.get('lastName') || '';
    const email = formData.get('email') || '';
    const phone = formData.get('phone') || '';
    const businessType = formData.get('businessType') || '';
    const monthlyVolume = formData.get('monthlyVolume') || '';
    const referral = formData.get('referral') || '';
    const message = formData.get('message') || '';
    
    // Create email content
    const subject = `Wholesale Inquiry - ${company}`;
    const body = `
WHOLESALE INQUIRY - AURA GREEN THCa

Company/Business: ${company}
Contact Person: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Business Type: ${businessType}
Estimated Monthly Volume: ${monthlyVolume}
Referral Source: ${referral}

Additional Information:
${message}

---
Please send detailed wholesale pricing information and details about the referral discount program.

Thank you!
    `.trim();
    
    // Create mailto link
    const mailtoLink = `mailto:pengusaurusrex@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show confirmation message
    alert('Thank you for your wholesale inquiry! Your email client will open with a pre-filled message. Please send the email and we\'ll respond within 24 hours with detailed pricing and referral program information.');
    
    // Reset form
    form.reset();
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
