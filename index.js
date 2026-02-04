/**
 * ================================================
 * PROFESSIONAL PORTFOLIO - JavaScript
 * Interactive effects and animations
 * ================================================
 */

// Career start date (first professional job - June 2024)
const CAREER_START_DATE = new Date('2024-06-01');

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initDynamicStats();
    initNavigation();
    initParticles();
    initScrollEffects();
    initFadeAnimations();
});

/**
 * Calculate and display dynamic statistics
 */
function initDynamicStats() {
    // Calculate years of experience (round up)
    const now = new Date();
    const yearsExp = Math.floor((now - CAREER_START_DATE) / (1000 * 60 * 60 * 24 * 365));
    const yearsDisplay = yearsExp + '+';

    const yearsEl = document.getElementById('years-experience');
    if (yearsEl) yearsEl.textContent = yearsDisplay;

    // Count companies - count timeline items excluding education
    const timelineItems = document.querySelectorAll('.timeline-item');
    let companyCount = 0;
    timelineItems.forEach(item => {
        // Check if it's not education (doesn't have graduation emoji)
        const marker = item.querySelector('.timeline-marker');
        if (marker && !marker.textContent.includes('🎓')) {
            companyCount++;
        }
    });

    const realmsEl = document.getElementById('realms-conquered');
    if (realmsEl) realmsEl.textContent = companyCount;

    // Count certifications
    const certCards = document.querySelectorAll('.cert-card');
    const certsEl = document.getElementById('sacred-scrolls');
    if (certsEl) certsEl.textContent = certCards.length;
}


/**
 * Navigation functionality
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class for background
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        // Animate hamburger to X
        const spans = navToggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (navLinks.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(6px, 6px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        });
    });

    // Smooth scroll for anchor links
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
}

/**
 * Create floating particle effects in hero section
 */
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, i);
    }
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Random horizontal position
    particle.style.left = Math.random() * 100 + '%';

    // Random animation delay for staggered effect
    particle.style.animationDelay = (Math.random() * 12) + 's';

    // Random animation duration for varied speeds
    particle.style.animationDuration = (Math.random() * 6 + 8) + 's';

    // Random size
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';

    // Professional blue color variations
    const colorChoice = Math.random();
    let color, glow;

    if (colorChoice > 0.6) {
        // Primary blue
        const opacity = Math.random() * 0.3 + 0.3;
        color = `rgba(59, 130, 246, ${opacity})`;
        glow = '0 0 8px rgba(59, 130, 246, 0.4)';
    } else if (colorChoice > 0.3) {
        // Accent cyan
        const opacity = Math.random() * 0.3 + 0.25;
        color = `rgba(6, 182, 212, ${opacity})`;
        glow = '0 0 10px rgba(6, 182, 212, 0.35)';
    } else {
        // Light blue highlight
        const opacity = Math.random() * 0.25 + 0.2;
        color = `rgba(56, 189, 248, ${opacity})`;
        glow = '0 0 12px rgba(56, 189, 248, 0.3)';
    }

    particle.style.background = color;
    particle.style.boxShadow = glow;

    container.appendChild(particle);
}


/**
 * Scroll-based effects
 */
function initScrollEffects() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        // Parallax for hero content
        if (hero) {
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.25}px)`;
                heroContent.style.opacity = 1 - (scrolled * 0.0015);
            }
        }
    });

    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop &&
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Intersection Observer for fade-in animations
 */
function initFadeAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered delay based on element index
                const siblings = entry.target.parentElement.querySelectorAll('.fade-in');
                const index = Array.from(siblings).indexOf(entry.target);

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Console greeting for developers
 */
console.log(`
%c👋 Hello, Developer!

%cYou've found Adem Yildirim's portfolio source code.

I'm a Backend Engineer passionate about building 
scalable systems with Python, TypeScript, and Cloud technologies.

Want to connect? Email: yadem5193@gmail.com

%c✨ Happy coding! ✨
`,
    'font-size: 18px; color: #3b82f6; font-weight: bold;',
    'font-size: 12px; color: #94a3b8;',
    'font-size: 14px; color: #06b6d4;'
);
