// Initialize Lucide Icons
lucide.createIcons();

// --- Navbar Scroll Effect ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// --- Mobile Navigation ---
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');
const mobileLinks = document.querySelectorAll('.mobile-link');

mobileBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    const icon = mobileNav.classList.contains('active') ? 'x' : 'menu';
    mobileBtn.innerHTML = `<i data-lucide="${icon}"></i>`;
    lucide.createIcons();
});

// Close mobile menu on link click
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        mobileBtn.innerHTML = `<i data-lucide="menu"></i>`;
        lucide.createIcons();
    });
});

// --- Intersection Observer for Scroll Animations ---
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Stop observing once animated
            observer.unobserve(entry.target);
        }
    });
};

const revealOptions = {
    threshold: 0.15, // Trigger when 15% visible
    rootMargin: "0px 0px -50px 0px" // Slight offset
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Trigger initial check for elements already in viewport on load
setTimeout(() => {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('active');
            revealObserver.unobserve(el);
        }
    });
}, 100);

// --- Form Submission Logic ---
const bookingForm = document.getElementById('bookingForm');
const formSuccess = document.getElementById('formSuccess');
const resetBtn = document.getElementById('resetBtn');

if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulating API call/submission delay
        const submitBtn = bookingForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i data-lucide="loader" class="icon-pulse"></i> Processing...';
        lucide.createIcons();
        // Grab data synchronously to avoid popup blockers
        const formData = new FormData(bookingForm);
        const data = Object.fromEntries(formData.entries());
        
        // Construct WhatsApp Message
        const whatsappNumber = "919488100023";
        let message = `Hello, I would like to book a dental scan appointment.\n\n`;
        message += `*Booking Details:*\n`;
        message += `- *Name:* ${data.name}\n`;
        message += `- *Phone:* ${data.phone}\n`;
        message += `- *Email:* ${data.email}\n`;
        message += `- *Scan Type:* ${data.scantype}\n`;
        message += `- *Preferred Date:* ${data.date}\n`;
        message += `- *Preferred Time:* ${data.time}`;
        
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        
        // Open WhatsApp immediately
        window.open(whatsappUrl, '_blank');
        
        // Show Success overlay and reset button
        formSuccess.classList.remove('hidden');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        bookingForm.reset();
        formSuccess.classList.add('hidden');
    });
}

// --- Counter Animation (Speedometer Effect) ---
const counters = document.querySelectorAll('.counter');

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    function easeOutQuad(t) {
        return t * (2 - t); // decelerating curve like a speedometer
    }

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuad(progress);
        const current = Math.floor(easedProgress * target);

        el.textContent = prefix + current + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = prefix + target + suffix;
        }
    }

    requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// --- Smooth Scrolling for Anchor Links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
