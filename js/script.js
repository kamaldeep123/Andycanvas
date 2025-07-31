// Enhanced JavaScript for Bare Canvas Creations
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate hamburger bars
            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (hamburger.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
                } else {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                const bars = hamburger.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                const bars = hamburger.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting with intersection observer
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px'
    };

    const navObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar on scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }

    // Gallery Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        
                        setTimeout(() => {
                            item.style.transition = 'all 0.3s ease';
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        item.style.transition = 'all 0.3s ease';
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Enhanced Form Validation and UX
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            // Focus effects
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
                this.style.borderColor = '#e74c3c';
                this.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
            });

            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.style.borderColor = '#e74c3c';
                    this.parentElement.classList.add('error');
                } else if (this.value.trim()) {
                    this.style.borderColor = '#27ae60';
                    this.parentElement.classList.remove('error');
                    this.parentElement.classList.add('valid');
                } else {
                    this.style.borderColor = '#e0e0e0';
                    this.parentElement.classList.remove('error', 'valid');
                }
            });

            // Input validation
            input.addEventListener('input', function() {
                if (this.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (this.value && !emailRegex.test(this.value)) {
                        this.style.borderColor = '#e74c3c';
                        this.parentElement.classList.add('error');
                    } else if (this.value) {
                        this.style.borderColor = '#27ae60';
                        this.parentElement.classList.remove('error');
                        this.parentElement.classList.add('valid');
                    }
                }
                
                // Character counter for textarea
                if (this.tagName === 'TEXTAREA') {
                    let counter = this.parentElement.querySelector('.char-counter');
                    if (!counter) {
                        counter = document.createElement('div');
                        counter.className = 'char-counter';
                        this.parentElement.appendChild(counter);
                    }
                    const maxLength = 1000;
                    const remaining = maxLength - this.value.length;
                    counter.textContent = `${this.value.length}/${maxLength}`;
                    counter.style.color = remaining < 100 ? '#e74c3c' : '#666';
                }
            });
        });

        // Form submission with loading state
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            const errors = [];

            // Validate required fields
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e74c3c';
                    field.parentElement.classList.add('error');
                    errors.push(`${field.previousElementSibling.textContent} is required`);
                }
            });

            // Email validation
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value)) {
                    isValid = false;
                    emailField.style.borderColor = '#e74c3c';
                    errors.push('Please enter a valid email address');
                }
            }

            if (!isValid) {
                e.preventDefault();
                
                // Show error message
                let errorDiv = contactForm.querySelector('.form-errors');
                if (!errorDiv) {
                    errorDiv = document.createElement('div');
                    errorDiv.className = 'form-errors';
                    submitBtn.parentElement.insertBefore(errorDiv, submitBtn);
                }
                
                errorDiv.innerHTML = `
                    <div style="background: #fee; border: 1px solid #e74c3c; color: #c0392b; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                        <strong>Please fix the following errors:</strong>
                        <ul style="margin: 0.5rem 0 0 1.5rem;">
                            ${errors.map(error => `<li>${error}</li>`).join('')}
                        </ul>
                    </div>
                `;
                
                // Scroll to first error
                const firstError = contactForm.querySelector('.error input, .error select, .error textarea');
                if (firstError) {
                    firstError.focus();
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                
                return false;
            }

            // Show loading state
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Your Message...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            
            // Remove any previous error messages
            const errorDiv = contactForm.querySelector('.form-errors');
            if (errorDiv) {
                errorDiv.remove();
            }
            
            // Show success message (will be replaced by redirect)
            setTimeout(() => {
                const successDiv = document.createElement('div');
                successDiv.innerHTML = `
                    <div style="background: #dff0d8; border: 1px solid #27ae60; color: #27ae60; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                        <i class="fas fa-check-circle"></i> <strong>Message sent successfully!</strong> Redirecting...
                    </div>
                `;
                submitBtn.parentElement.insertBefore(successDiv, submitBtn);
            }, 1000);
        });

        // Auto-save form data to localStorage
        const formData = {};
        inputs.forEach(input => {
            const savedValue = localStorage.getItem(`barecanvas_${input.name}`);
            if (savedValue && input.type !== 'checkbox') {
                input.value = savedValue;
            }
            
            input.addEventListener('input', function() {
                if (this.type === 'checkbox') {
                    localStorage.setItem(`barecanvas_${this.name}`, this.checked);
                } else {
                    localStorage.setItem(`barecanvas_${this.name}`, this.value);
                }
            });
        });
    }

    // Enhanced Scroll Reveal Animations
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe elements with reveal classes
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Intersection Observer for animations
    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special animation for service cards
                if (entry.target.classList.contains('service-card')) {
                    entry.target.style.animationDelay = `${Math.random() * 0.3}s`;
                    entry.target.classList.add('animate-in');
                }
                
                // Special animation for gallery items
                if (entry.target.classList.contains('gallery-item')) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, Math.random() * 200);
                }

                // Special animation for section headers
                if (entry.target.classList.contains('section-header')) {
                    entry.target.classList.add('animate-header');
                }
                
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .gallery-item, .faq-item, .testimonial-card, .process-step');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        animationObserver.observe(el);
    });

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                
                if (numericValue) {
                    let currentValue = 0;
                    const increment = numericValue / 60;
                    const timer = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= numericValue) {
                            currentValue = numericValue;
                            clearInterval(timer);
                        }
                        target.textContent = finalValue.replace(numericValue, Math.floor(currentValue));
                    }, 16);
                }
                
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            const heroImage = heroSection.querySelector('.hero-bg-image');
            if (heroImage) {
                heroImage.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // Lazy loading for images
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        imageObserver.observe(img);
    });

    // Enhanced gallery hover effects
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            
            // Add glow effect
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 20px rgba(231, 76, 60, 0.2)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });

    // Service card enhanced hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(360deg)';
            }
            
            // Add subtle background color change
            this.style.background = 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)';
        });

        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
            this.style.background = '#ffffff';
        });
    });

    // Add transition to service icons
    document.querySelectorAll('.service-icon').forEach(icon => {
        icon.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    // Custom cursor effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .gallery-item, .service-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            document.body.style.cursor = 'pointer';
        });
        element.addEventListener('mouseleave', () => {
            document.body.style.cursor = 'default';
        });
    });

    // Smooth reveal animation for page load
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Animate hero elements
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-features, .hero-buttons');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });

    // Add loading class for initial animations
    if (!document.body.classList.contains('loaded')) {
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-features, .hero-buttons');
        heroElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        });
    }

    // Enhanced form field interactions
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        const label = group.querySelector('label');
        
        if (input && label) {
            input.addEventListener('focus', () => {
                label.style.color = '#e74c3c';
                label.style.transform = 'translateY(-2px)';
            });
            
            input.addEventListener('blur', () => {
                label.style.color = '#333';
                label.style.transform = 'translateY(0)';
            });
        }
    });

    // Add custom checkbox styling
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.parentElement;
            if (this.checked) {
                label.classList.add('checked');
            } else {
                label.classList.remove('checked');
            }
        });
    });
});

// Utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Modal functionality for gallery (if needed)
function openModal(modalId) {
    // Implementation for modal gallery view
    console.log('Opening modal:', modalId);
    // You can implement a full-screen image modal here
}

// Add CSS for enhanced animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.8s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .form-group {
        position: relative;
        transition: all 0.3s ease;
    }
    
    .form-group.focused label {
        color: #e74c3c;
        transform: translateY(-2px);
    }
    
    .form-group.error input,
    .form-group.error select,
    .form-group.error textarea {
        border-color: #e74c3c;
        box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
    }
    
    .form-group.valid input,
    .form-group.valid select,
    .form-group.valid textarea {
        border-color: #27ae60;
        box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.1);
    }
    
    .char-counter {
        position: absolute;
        bottom: 5px;
        right: 10px;
        font-size: 0.8rem;
        color: #666;
    }
    
    .checkbox-label {
        display: flex;
        align-items: flex-start;
        gap: 0.7rem;
        cursor: pointer;
        font-size: 0.95rem;
        line-height: 1.5;
    }
    
    .checkbox-label input[type="checkbox"] {
        width: auto;
        margin: 0;
    }
    
    .checkbox-label.checked {
        color: #27ae60;
    }
    
    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
    
    @media (max-width: 768px) {
        .form-row {
            grid-template-columns: 1fr;
        }
    }
    
    .form-intro {
        color: #666;
        margin-bottom: 2rem;
        font-size: 1.05rem;
        line-height: 1.6;
    }
    
    .form-note {
        text-align: center;
        color: #666;
        font-size: 0.9rem;
        margin-top: 1rem;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 8px;
        border-left: 4px solid #e74c3c;
    }
    
    .form-note i {
        color: #e74c3c;
        margin-right: 0.5rem;
    }
    
    .contact-features {
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 1px solid #eee;
    }
    
    .contact-features h3 {
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: #2c3e50;
    }
    
    .feature-list {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
    }
    
    .feature-list .feature-item {
        display: flex;
        align-items: center;
        gap: 0.7rem;
        color: #666;
        font-size: 0.9rem;
    }
    
    .feature-list .feature-item i {
        color: #e74c3c;
        font-size: 1rem;
        width: 16px;
    }
`;

document.head.appendChild(style);