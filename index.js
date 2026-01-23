/**
 * ================================================
 * SKYRIM-INSPIRED PORTFOLIO - JavaScript
 * Interactive effects and animations
 * ================================================
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initParticles();
    initScrollEffects();
    initFadeAnimations();
});

/**
 * Navigation functionality
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class for background
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
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
 * Create floating snowflake effects in hero section (Frozen Tundra)
 */
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 40; // More snowflakes

    for (let i = 0; i < particleCount; i++) {
        createSnowflake(particlesContainer, i);
    }
}

function createSnowflake(container, index) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Random horizontal position
    particle.style.left = Math.random() * 100 + '%';

    // Random animation delay for staggered effect
    particle.style.animationDelay = (Math.random() * 10) + 's';

    // Random animation duration for varied fall speeds
    particle.style.animationDuration = (Math.random() * 5 + 6) + 's';

    // Random size (snowflakes vary in size)
    const size = Math.random() * 5 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';

    // Frozen Tundra colors - whites, ice blues, silver
    const colorChoice = Math.random();
    let color, glow;

    if (colorChoice > 0.6) {
        // Pure white snow
        const opacity = Math.random() * 0.4 + 0.4;
        color = `rgba(248, 251, 255, ${opacity})`;
        glow = '0 0 8px rgba(248, 251, 255, 0.6)';
    } else if (colorChoice > 0.3) {
        // Crystal ice
        const opacity = Math.random() * 0.4 + 0.3;
        color = `rgba(212, 234, 245, ${opacity})`;
        glow = '0 0 10px rgba(212, 234, 245, 0.5)';
    } else {
        // Frost blue
        const opacity = Math.random() * 0.3 + 0.3;
        color = `rgba(126, 200, 227, ${opacity})`;
        glow = '0 0 12px rgba(126, 200, 227, 0.4)';
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
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled * 0.002);
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
                }, index * 100);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Typing effect for hero subtitle (optional enhancement)
 */
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

/**
 * Add hover sound effect (optional - requires audio files)
 */
function addHoverSound(selector, soundUrl) {
    const elements = document.querySelectorAll(selector);
    const audio = new Audio(soundUrl);
    audio.volume = 0.2;

    elements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            audio.currentTime = 0;
            audio.play().catch(() => { }); // Catch autoplay restrictions
        });
    });
}

/**
 * Easter egg - Konami code for dragon shout
 */
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateDragonShout();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateDragonShout() {
    // Create dragon shout effect - Frozen Tundra style
    const shout = document.createElement('div');
    shout.innerHTML = '<span style="font-size: 4rem;">🐉</span><br>FUS RO DAH!';
    shout.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: 'Cinzel', serif;
        font-size: 3rem;
        color: #d4eaf5;
        text-shadow: 0 0 30px rgba(212, 234, 245, 0.8), 0 0 60px rgba(126, 200, 227, 0.5);
        z-index: 10000;
        animation: shoutEffect 2s ease-out forwards;
        text-align: center;
    `;

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shoutEffect {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            30% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(2); }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(shout);

    // Screen shake effect (frost storm)
    document.body.style.animation = 'shake 0.5s ease-out';
    const shakeStyle = document.createElement('style');
    shakeStyle.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(shakeStyle);

    setTimeout(() => {
        shout.remove();
        document.body.style.animation = '';
    }, 2000);
}

/**
 * Console greeting for developers - Frozen Tundra Edition
 */
console.log(`
%c❄️ Welcome, Dragonborn Developer ❄️

%cYou've discovered the frozen source of Adem Yıldırım's portfolio.

"In the land of code, where the cold winds blow,
A Backend Engineer through ice and snow,
Through AWS clouds and Azure's frozen might,
Building systems that scale through polar night."

Want to collaborate? Send a raven to: yadem5193@gmail.com

%c✨ May your code compile on the first try! ✨
`,
    'font-size: 20px; color: #7ec8e3; font-weight: bold;',
    'font-size: 12px; color: #8fa4b8; font-style: italic;',
    'font-size: 14px; color: #d4eaf5;'
);

