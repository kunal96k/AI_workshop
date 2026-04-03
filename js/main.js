// ============================================================
// CAPERNAUM SOLUTIONS - ULTRA PREMIUM EXPERIENCE JS
// Level 200% Creativity
// Designed by Technokraft Services LLP
// ============================================================

// ===== PRELOADER & INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('loader-progress');
    let loaded = false;

    function finishLoading() {
        if (loaded) return;
        loaded = true;

        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => {
                if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
            }, 1000);
        }

        document.body.style.overflow = ''; // Ensure scroll is enabled
        document.body.classList.add('loaded');
        triggerInitialAnimations();
    }

    function simulateProgress() {
        if (!progressBar) {
            finishLoading();
            return;
        }

        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
                setTimeout(finishLoading, 200);
            } else {
                width += Math.random() * 5 + 2;
                if (width > 100) width = 100;
                progressBar.style.width = width + '%';
            }
        }, 30);
    }

    simulateProgress();
    setTimeout(finishLoading, 3500);
});

function triggerInitialAnimations() {
    // Trigger split text animations in hero immediately
    const heroTitle = document.querySelector('h1[data-split-text]');
    if (heroTitle) {
        if (!heroTitle.dataset.splitDone) splitTextIntoWords(heroTitle);

        const words = heroTitle.querySelectorAll('.split-word');
        words.forEach((word, i) => {
            setTimeout(() => {
                word.classList.add('visible');
            }, i * 80);
        });
    }
}

// ===== TEXT SPLIT UTILITY =====
function splitTextIntoWords(element) {
    if (element.dataset.splitDone === "true") return;

    const originalText = element.textContent.trim();
    if (!originalText) return;

    const words = originalText.split(/\s+/);
    element.innerHTML = '';

    words.forEach((word, i) => {
        const span = document.createElement('span');
        span.className = 'split-word';
        span.textContent = word + '\u00A0';
        span.style.transitionDelay = (i * 0.05) + 's';
        span.style.display = 'inline-block';
        element.appendChild(span);
    });

    element.dataset.splitDone = "true";
}

document.querySelectorAll('[data-split-text]').forEach(el => {
    splitTextIntoWords(el);
});

// ===== CUSTOM CURSOR REMOVED =====

// ===== MAGNETIC BUTTON EFFECT =====
const magneticButtons = document.querySelectorAll('[data-magnetic]');
magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ===== SCROLL PROGRESS BAR =====
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.width = progress + '%';
    }
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (navbar) {
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        if (currentScroll > lastScroll && currentScroll > 300) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
    }
    lastScroll = currentScroll;
});

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        if (navOverlay) navOverlay.classList.toggle('active');
        document.body.classList.toggle('menu-active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
}

if (navOverlay) {
    navOverlay.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.classList.remove('menu-active');
        document.body.style.overflow = '';
    });
}

// ===== MOBILE DROPDOWN TOGGLE =====
const dropdowns = document.querySelectorAll('.dropdown-toggle');
dropdowns.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        // Only active on mobile/tablet view where hover isn't primary
        if (window.innerWidth <= 1024) {
            e.preventDefault();
            const parent = toggle.parentElement;

            // Toggle current
            parent.classList.toggle('open');

            // Close siblings
            const siblings = parent.parentElement.querySelectorAll('.dropdown');
            siblings.forEach(sib => {
                if (sib !== parent && sib.classList.contains('open')) {
                    sib.classList.remove('open');
                }
            });
        }
    });
});

// ===== ADVANCED SCROLL CHOREOGRAPHY (AUTO-STAGGER) =====
const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add visible class with a tiny random variance for "organic" feel
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, Math.random() * 50);

            // Handle counters inside
            if (entry.target.classList.contains('stat-item')) {
                const counter = entry.target.querySelector('.stat-number');
                if (counter && !counter.dataset.counted) {
                    animateCounter(counter);
                    counter.dataset.counted = 'true';
                }
            }

            // Unobserve after showing to save performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 1. Auto-tag Headings & Text
document.querySelectorAll('h1, h2, h3, p.section-subtitle').forEach(el => {
    if (!el.classList.contains('reveal') && !el.classList.contains('reveal-left') && !el.classList.contains('no-anim')) {
        el.classList.add('reveal-smooth');
        if (el.tagName === 'H2') el.classList.add('reveal-left');
    }
    observer.observe(el);
});

// 2. Auto-Stagger Grids & Lists
const staggerGroups = document.querySelectorAll('.services-grid, .features-grid, .showcase-grid, .about-features, .stats-grid, .trust-content');

staggerGroups.forEach(group => {
    const children = group.children;
    Array.from(children).forEach((child, index) => {
        child.classList.add('reveal-smooth');
        if (index % 2 === 0) child.classList.add('reveal-scale');
        const delay = Math.min((index + 1) * 100, 800);
        child.classList.add(`delay-${delay}`);
        observer.observe(child);
    });
});

// 3. Catch-all for manually tagged elements
document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-flip, .reveal-smooth').forEach(el => {
    observer.observe(el);
});

// 4. Animate Buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.classList.add('reveal-scale');
    observer.observe(btn);
});

// ===== COUNTER ANIMATION =====
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(ease * target);
        element.textContent = current + suffix;
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target + suffix;
        }
    }
    requestAnimationFrame(update);
}

// ===== SMOOTH PARALLAX =====
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    document.querySelectorAll('.float-shape').forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * 0.05}deg)`;
    });
    document.querySelectorAll('.glow-orb').forEach((orb, index) => {
        const speed = (index + 1) * 0.05;
        orb.style.transform = `translateY(${scrollY * speed * -1}px)`;
    });
});

// ===== BACK TO TOP =====
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    if (backToTop) {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== 3D TILT EFFECT =====
document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
});

// ===== CONTACT FORM SUBMIT =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        if (btn) {
            btn.textContent = 'Sending...';
            btn.disabled = true;
            setTimeout(() => {
                btn.textContent = 'Message Sent!';
                btn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
                setTimeout(() => {
                    btn.textContent = 'Send Message';
                    btn.style.background = '';
                    btn.disabled = false;
                    contactForm.reset();
                }, 2500);
            }, 1500);
        }
    });
}
