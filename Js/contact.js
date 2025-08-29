document.addEventListener('DOMContentLoaded', function() {

    /* ========================
       Mobile Menu Toggle
    ======================== */
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    /* ========================
       Contact Form Submission
    ======================== */
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simulate form submission
        setTimeout(() => {
            successMessage.classList.add('show');

            // Hide the message after 3 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 3000);

            // Reset the form
            contactForm.reset();
        }, 500);
    });

    /* ========================
       Ripple Effect on Submit Button
    ======================== */
    document.querySelectorAll('.submit-btn').forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            const rect = this.getBoundingClientRect();
            ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
            ripple.style.left = e.clientX - rect.left - (ripple.offsetWidth / 2) + 'px';
            ripple.style.top = e.clientY - rect.top - (ripple.offsetHeight / 2) + 'px';

            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        });
    });

    /* ========================
       Close mobile menu when clicking outside
    ======================== */
    document.addEventListener('click', function(e){
        if(!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)){
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });

    /* ========================
       Form validation enhancements
    ======================== */
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '#14B8A6';
            }
        });

        input.addEventListener('focus', function() {
            this.style.borderColor = '#14B8A6';
        });
    });

    /* ========================
       Smooth animations on scroll for contact sections
    ======================== */
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Observe contact cards
    document.querySelectorAll('.contact-info-card, .contact-form-card, .social-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});