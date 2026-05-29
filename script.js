/* ============================================
   WANDERLUST TRAVEL — JavaScript Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initSearch();
    initContactForm();
    initNewsletter();
});

/* ----- NAVIGATION ----- */

function initNavigation() {
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    // Scroll-based header styling (only on pages with hero)
    if (header && !header.classList.contains('scrolled')) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 60);
        }, { passive: true });
    }

    // Hamburger toggle
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isOpen);
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

/* ----- SCROLL ANIMATIONS (IntersectionObserver) ----- */

function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-up');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Staggered delay for sibling elements
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, i * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));
}

/* ----- SEARCH & FILTER ----- */

function initSearch() {
    const heroSearch = document.getElementById('heroSearch');
    const heroSearchBtn = document.getElementById('heroSearchBtn');
    if (!heroSearch) return;

    const filterCards = () => {
        const query = heroSearch.value.toLowerCase().trim();
        const cards = document.querySelectorAll('.dest-card');
        let visibleCount = 0;

        cards.forEach(card => {
            const name = (card.dataset.name || '').toLowerCase();
            const category = (card.dataset.category || '').toLowerCase();
            const text = card.textContent.toLowerCase();
            const match = !query || name.includes(query) || category.includes(query) || text.includes(query);

            card.style.display = match ? 'flex' : 'none';
            card.style.opacity = match ? '1' : '0';
            if (match) visibleCount++;
        });

        // Show/hide section headers based on visible cards
        document.querySelectorAll('.card-grid').forEach(grid => {
            const section = grid.closest('.section');
            const visibleCards = grid.querySelectorAll('.dest-card[style*="display: flex"], .dest-card:not([style*="display"])');
            let hasVisible = false;
            visibleCards.forEach(c => {
                if (c.style.display !== 'none') hasVisible = true;
            });
        });
    };

    // Debounced search
    let searchTimeout;
    heroSearch.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(filterCards, 250);
    });

    if (heroSearchBtn) {
        heroSearchBtn.addEventListener('click', filterCards);
    }

    // Enter key
    heroSearch.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            filterCards();
            // Scroll to first results section
            const firstSection = document.getElementById('beaches');
            if (firstSection) {
                firstSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
}

/* ----- CONTACT FORM VALIDATION ----- */

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const formContent = document.getElementById('formContent');
    const formSuccess = document.getElementById('formSuccess');
    const sendAnother = document.getElementById('sendAnother');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate all fields
        const name = document.getElementById('contactName');
        const email = document.getElementById('contactEmail');
        const subject = document.getElementById('contactSubject');
        const message = document.getElementById('contactMessage');

        let isValid = true;

        // Name validation
        if (!name.value.trim()) {
            name.classList.add('error');
            isValid = false;
        } else {
            name.classList.remove('error');
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
            email.classList.add('error');
            isValid = false;
        } else {
            email.classList.remove('error');
        }

        // Subject validation
        if (!subject.value) {
            subject.classList.add('error');
            isValid = false;
        } else {
            subject.classList.remove('error');
        }

        // Message validation
        if (!message.value.trim()) {
            message.classList.add('error');
            isValid = false;
        } else {
            message.classList.remove('error');
        }

        if (isValid) {
            // Show success
            formContent.style.display = 'none';
            formSuccess.classList.add('show');
        }
    });

    // Remove error on input
    form.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('input', () => {
            field.classList.remove('error');
        });
        field.addEventListener('change', () => {
            field.classList.remove('error');
        });
    });

    // Send another message
    if (sendAnother) {
        sendAnother.addEventListener('click', () => {
            form.reset();
            formContent.style.display = 'block';
            formSuccess.classList.remove('show');
        });
    }
}

/* ----- NEWSLETTER ----- */

function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        const btn = form.querySelector('button');

        if (input && input.value.trim()) {
            const originalText = btn.textContent;
            btn.textContent = '✓ Subscribed!';
            btn.style.background = '#27ae60';
            input.value = '';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 3000);
        }
    });
}
