// Email validation function
function validateEmail() {
    const email = document.getElementById('email').value;
    const emailError = document.getElementById('email-error');
    const emailInput = document.getElementById('email');
    
    // Clear previous error
    emailError.innerHTML = '';
    emailError.classList.remove('active');
    emailInput.classList.remove('error');
    
    // Clear success message if email input changes
    const successMessage = document.getElementById('success-message');
    successMessage.innerHTML = '';
    successMessage.classList.remove('active');
    
    // Check if email is empty
    if (email.trim() === '') {
        return;
    }
    
    // Check if email contains @
    if (!email.includes('@')) {
        emailError.innerHTML = 'Please include an \'@\' in the email address. \'' + email + '\' is missing an \'@\'.';
        emailError.classList.add('active');
        emailInput.classList.add('error');
        return false;
    }
    
    // Check if email has proper domain (srmist.edu.in)
    if (!email.endsWith('@srmist.edu.in')) {
        emailError.innerHTML = 'Please use your SRM email address (ending with @srmist.edu.in).';
        emailError.classList.add('active');
        emailInput.classList.add('error');
        return false;
    }
    
    return true;
}

// Form submission validation
function validateResetForm() {
    const isEmailValid = validateEmail();
    
    // Prevent form submission if validation fails
    if (!isEmailValid) {
        return false;
    }
    
    // Show success message
    const email = document.getElementById('email').value;
    const successMessage = document.getElementById('success-message');
    successMessage.innerHTML = 'Password reset link has been sent to ' + email + '. Please check your inbox.';
    successMessage.classList.add('active');
    
    // Clear the form
    document.getElementById('email').value = '';
    
    // Prevent actual form submission for demo purposes
    return false;
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for real-time validation
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('blur', validateEmail);
    
    // Form submission
    const resetForm = document.getElementById('resetForm');
    resetForm.addEventListener('submit', function(event) {
        if (!validateResetForm()) {
            event.preventDefault();
        }
    });
});