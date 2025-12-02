document.addEventListener('DOMContentLoaded', function() {

    const scrollProgress = document.getElementById('scroll-progress');
    
    function updateScrollProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        scrollProgress.style.width = progress + '%';
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    
    
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    function toggleMenu() {

        mobileMenu.classList.toggle('open');
        
        const isExpanded = mobileMenu.classList.contains('open');
        menuButton.setAttribute('aria-expanded', isExpanded);
        menuButton.innerHTML = isExpanded ? '✕' : '☰';
    }
    
    menuButton.addEventListener('click', toggleMenu);
    
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);
            
            if (mobileMenu.classList.contains('open')) {
                toggleMenu();
            }
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    

    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    
    function updateActiveSection() {
        const sections = ['home', 'about', 'skills', 'projects', 'contact'];
        
        for (const sectionId of sections) {
            const section = document.getElementById(sectionId);
            if (section) {
                const rect = section.getBoundingClientRect();
                
                // Check if section is in viewport (near top)
                if (rect.top <= 150 && rect.bottom >= 150) {
                    // Remove active class from all links
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    
                    // Add active class to current section link
                    const activeLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                    break;
                }
            }
        }
    }
    
    window.addEventListener('scroll', updateActiveSection);
    

    const submitButton = document.getElementById('submit-btn');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formMessage = document.getElementById('form-message');
    
    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = 'form-message show ' + type;
    }
    
    function hideMessage() {
        formMessage.className = 'form-message';
    }
    
    function validateForm() {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
        
        if (!name || !email || !message) {
            showMessage('Please fill out all required fields.', 'error');
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return false;
        }
        
        return true;
    }
    
    function handleSubmit() {

        if (validateForm()) {
            // Show success message
            showMessage('Thank you for your message! I will be in touch shortly.', 'success');
            
            nameInput.value = '';
            emailInput.value = '';
            messageInput.value = '';
            
            setTimeout(hideMessage, 5000);
        }
    }
    
    submitButton.addEventListener('click', handleSubmit);
    
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                handleSubmit();
            }
        });
    });
    
    
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    
    updateActiveSection();
    
    updateScrollProgress();
    
    console.log('Portfolio JavaScript loaded successfully!');
});

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

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});