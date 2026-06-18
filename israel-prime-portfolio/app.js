/* ==========================================================================
   JAVASCRIPT INTERACTIVE SCRIPT FOR ISRAEL PRIME PORTFOLIO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------------------
    // 1. MOBILE NAVIGATION TOGGLE (HAMBURGER MENU)
    // ----------------------------------------------------------------------
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Open/Close menu when clicking the hamburger button
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        mobileToggle.classList.toggle('active');
        
        // Let's animate the hamburger button bars into an "X" when active
        const bars = mobileToggle.querySelectorAll('.bar');
        if (mobileToggle.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Close menu when clicking on any link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            mobileToggle.classList.remove('active');
            
            const bars = mobileToggle.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });


    // ----------------------------------------------------------------------
    // 2. ACTIVE NAVIGATION HIGHLIGHT ON SCROLL
    // ----------------------------------------------------------------------
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // 120px offset for headers
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });


    // ----------------------------------------------------------------------
    // 3. PORTFOLIO FILTER SYSTEM
    // ----------------------------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' class from all buttons and add to clicked one
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                // Get the category of the project card
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === itemCategory) {
                    // Show item
                    item.style.display = 'block';
                    // Trigger a tiny animation refresh
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    // Hide item with transition
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300); // Matches CSS transition speeds
                }
            });
        });
    });


    // ----------------------------------------------------------------------
    // 4. TESTIMONIALS SLIDER
    // ----------------------------------------------------------------------
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('prev-test');
    const nextBtn = document.getElementById('next-test');
    let currentSlide = 0;

    // Show specific slide index
    function showSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Update currentSlide index with wrapping boundaries
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        // Add active class to show slide
        slides[currentSlide].classList.add('active');
    }

    // Next slide button trigger
    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    // Previous slide button trigger
    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });


    // ----------------------------------------------------------------------
    // 5. CONTACT FORM MOCK SUBMISSION & VALIDATION
    // ----------------------------------------------------------------------
    const contactForm = document.getElementById('portfolio-contact-form');
    const feedbackBox = document.getElementById('form-feedback');

    contactForm.addEventListener('submit', (event) => {
        // Prevent browser page reload
        event.preventDefault();

        // Get values from form
        const name = document.getElementById('form-name').value.trim();
        const email = document.getElementById('form-email').value.trim();
        const service = document.getElementById('form-service').value;
        const message = document.getElementById('form-message').value.trim();

        // Basic fields check (redundant but good practice)
        if (!name || !email || !service || !message) {
            feedbackBox.className = 'form-feedback error';
            feedbackBox.textContent = '❌ Please fill out all fields before sending.';
            return;
        }

        // Simulating sending behavior
        feedbackBox.className = 'form-feedback success';
        feedbackBox.textContent = '⏳ Sending your project details...';

        setTimeout(() => {
            feedbackBox.className = 'form-feedback success';
            feedbackBox.innerHTML = `<strong>🎉 Message Sent Successfully!</strong><br>Thank you ${name}, I will get back to you at ${email} shortly to discuss ${service}!`;
            
            // Reset fields
            contactForm.reset();
        }, 1500); // Simulates 1.5-second processing delay
    });

});
