/* ============================================
   WANDERLUST TRAVEL — JavaScript Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initSearchAndFilters();
    initTravelQuiz();
    initDestinationModal();
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
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, i * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));
}

/* ----- DESTINATION DATA ----- */
const DESTINATIONS = {
    maldives: {
        id: 'maldives',
        name: 'Maldives Overwater Paradise',
        category: 'beach',
        badge: '🏖 Beach',
        location: '📍 South Malé Atoll, Maldives',
        season: 'Nov–Apr (Dry Season)',
        language: 'Dhivehi & English',
        currency: 'Maldivian Rufiyaa (MVR)',
        visa: '30-day Visa on Arrival (Free)',
        image: 'images/beach-maldives.png',
        description: 'Experience ultimate luxury in private overwater villas suspended by pristine turquoise lagoons. Snorkel directly from your villa with manta rays, dine on private beaches under the starlight, and wake up to endless panoramic ocean views.',
        attractions: [
            'Private Overwater Villas & Lagoon Deck Access',
            'Scuba Diving & Coral Reef Snorkeling with Sea Turtles',
            'Seaplane Transfers & Sunset Sandbank Excursions'
        ],
        tips: 'Dress modestly when visiting local inhabited islands. Alcohol is exclusively available within private resort properties.'
    },
    bali: {
        id: 'bali',
        name: 'Bali Sunset Coast',
        category: 'beach',
        badge: '🏖 Beach',
        location: '📍 Tanah Lot, Bali, Indonesia',
        season: 'May–Sep (Dry Season)',
        language: 'Indonesian & Balinese',
        currency: 'Indonesian Rupiah (IDR)',
        visa: '30-day Visa on Arrival',
        image: 'images/beach-bali.png',
        description: 'Witness magical sunsets along Bali\'s dramatic, volcanic rocky coastline. Explore ancient sea temples perched on cliffs, surf world-class breaks, and retreat to private, jungle-fringed infinity pools overlooking the Indian Ocean.',
        attractions: [
            'Tanah Lot & Uluwatu Cliff Sea Temples',
            'Surfing & Beachfront Cafes in Canggu & Seminyak',
            'Tegallalang Rice Terraces & Ubud Sacred Monkey Forest'
        ],
        tips: 'Always dress respectfully when visiting temples (sarongs are available at entry). Be mindful of monkeys and keep valuables secure.'
    },
    santorini: {
        id: 'santorini',
        name: 'Santorini Mediterranean Dream',
        category: 'beach',
        badge: '🏖 Beach',
        location: '📍 Oia, Santorini, Greece',
        season: 'May–Oct (Warm Weather)',
        language: 'Greek & English',
        currency: 'Euro (EUR)',
        visa: 'Schengen Area Visa Policy',
        image: 'images/beach-santorini.png',
        description: 'Wander through iconic whitewashed villages perched high on volcanic cliffs above the deep blue Aegean Sea. Indulge in world-class Cycladic cuisine, dip in hot volcanic springs, and view the most famous sunsets on Earth.',
        attractions: [
            'Oia Sunset Viewpoint & Scenic Caldera Walking Path',
            'Red Beach, Black Sand Kamari Beach & Boat Cruises',
            'Wine Tastings at Historic Volcanic Vineyards'
        ],
        tips: 'Book caldera-view dining and accommodation months in advance. Wear comfortable shoes as streets are steep and paved with cobblestones.'
    },
    angkor: {
        id: 'angkor',
        name: 'Angkor Wat Sunrise Experience',
        category: 'temple',
        badge: '🛕 Temple',
        location: '📍 Siem Reap, Cambodia',
        season: 'Nov–Feb (Cool & Dry)',
        language: 'Khmer & English',
        currency: 'Cambodian Riel & US Dollar',
        visa: 'E-Visa or Visa on Arrival',
        image: 'images/temple-angkor.png',
        description: 'Witness the iconic, unforgettable sunrise over the largest religious monument on Earth. Explore over 400 acres of ancient ruins, root-strangled jungle temples, and stone galleries displaying exquisite Hindu and Buddhist mythology.',
        attractions: [
            'Angkor Wat Main Complex Sunrise Viewing',
            'Ta Prohm Temple (Famed for giant tree root structures)',
            'Bayon Temple (Decorated with hundreds of smiling stone faces)'
        ],
        tips: 'Ensure knees and shoulders are covered at all times when entering sacred temple structures. Staying hydrated is absolutely essential.'
    },
    kyoto: {
        id: 'kyoto',
        name: 'Kyoto Shrine Trail',
        category: 'temple',
        badge: '🛕 Temple',
        location: '📍 Kyoto, Japan',
        season: 'Oct–Nov (Autumn Leaves) & Mar-May (Sakura)',
        language: 'Japanese',
        currency: 'Japanese Yen (JPY)',
        visa: 'Visa Exempt for most travelers',
        image: 'images/temple-kyoto.png',
        description: 'Walk through thousands of vermilion torii gates, meditate in historic Zen rock gardens, and participate in traditional tea ceremonies. Kyoto serves as Japan\'s imperial cultural capital, housing over 2,000 temples and shrines.',
        attractions: [
            'Fushimi Inari Shrine (Thousands of Torii Gates)',
            'Kinkaku-ji (The breathtaking Golden Pavilion)',
            'Kiyomizu-dera Temple (Wooden stage overlooking Kyoto city)'
        ],
        tips: 'Purchase an IC card (Suica/Pasmo) for seamless train and bus travel. Photography is strictly prohibited on certain streets in Gion.'
    },
    paris: {
        id: 'paris',
        name: 'Romantic Paris, France',
        category: 'country',
        badge: '🌍 Country',
        location: '📍 Paris, France',
        season: 'Apr–Jun & Sep-Oct',
        language: 'French',
        currency: 'Euro (EUR)',
        visa: 'Schengen Area Visa Policy',
        image: 'images/country-paris.png',
        description: 'Fall in love with the City of Light — picnic beneath the Eiffel Tower, stroll along the Seine River banks at twilight, explore world-renowned art galleries like the Louvre, and savor delicate pastries in cozy corner cafes.',
        attractions: [
            'Eiffel Tower Summit & Seine River Dinner Cruises',
            'Louvre Museum, Musee d\'Orsay & Notre-Dame Cathedral',
            'Montmartre Artist Quarter & Sacre-Coeur Basilica'
        ],
        tips: 'Reserve entry passes for major landmarks online weeks ahead. Watch out for active pickpockets in dense public transit stations.'
    },
    japan: {
        id: 'japan',
        name: 'Cherry Blossom Japan',
        category: 'country',
        badge: '🌍 Country',
        location: '📍 Tokyo & Kyoto, Japan',
        season: 'Mar–May (Cherry Blossoms)',
        language: 'Japanese',
        currency: 'Japanese Yen (JPY)',
        visa: 'Visa Exempt for most travelers',
        image: 'images/country-japan.png',
        description: 'Experience the magic of sakura season beneath Mount Fuji, wander through neon-lit streets in Tokyo, master sushi-making, ride super-fast bullet trains, and soak in traditional hot springs (onsen).',
        attractions: [
            'Tokyo Skyline Views, Shibuya Crossing & Senso-ji Temple',
            'Mount Fuji Cherry Blossom Festivals & Lake Ashi Cruises',
            'Shinkansen (Bullet Train) travel between cultural hubs'
        ],
        tips: 'Keep trash with you as public trash cans are extremely rare. Tipping in Japanese restaurants is not customary and may be refused.'
    },
    switzerland: {
        id: 'switzerland',
        name: 'Alpine Switzerland',
        category: 'country',
        badge: '🌍 Country',
        location: '📍 Interlaken, Switzerland',
        season: 'Jun–Aug (Hiking) & Dec-Mar (Skiing)',
        language: 'German, French, Italian & English',
        currency: 'Swiss Franc (CHF)',
        visa: 'Schengen Area Visa Policy',
        image: 'images/country-switzerland.png',
        description: 'Breathe crisp mountain air surrounded by towering snow-capped alpine peaks. Ride scenic railway systems, hike through flower-filled valleys, cruise pristine blue lakes, and taste artisanal Swiss chocolates.',
        attractions: [
            'Jungfraujoch Railway (The Top of Europe Station)',
            'Lauterbrunnen Valley (Spectacular valley of 72 waterfalls)',
            'Lake Brienz & Lake Thun Panoramic Boat Cruises'
        ],
        tips: 'Purchase the Swiss Travel Pass for cost-efficient, unlimited train, bus, and boat transfers across the entire country.'
    }
};

/* ----- SEARCH & FILTER ----- */
function initSearchAndFilters() {
    const heroSearch = document.getElementById('heroSearch');
    const heroSearchBtn = document.getElementById('heroSearchBtn');
    const filterTabs = document.getElementById('filterTabs');
    
    if (!heroSearch && !filterTabs) return;

    let activeFilter = 'all';
    let searchQuery = '';

    const applyFilters = () => {
        const query = searchQuery.toLowerCase().trim();
        const cards = document.querySelectorAll('.dest-card');
        
        cards.forEach(card => {
            const name = (card.dataset.name || '').toLowerCase();
            const category = (card.dataset.category || '').toLowerCase();
            const text = card.textContent.toLowerCase();
            
            const matchesCategory = activeFilter === 'all' || category === activeFilter;
            const matchesSearch = !query || name.includes(query) || category.includes(query) || text.includes(query);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'flex';
                setTimeout(() => { card.style.opacity = '1'; }, 10);
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
            }
        });

        // Hide/Show section elements based on whether they contain visible cards
        const sections = ['beaches', 'temples', 'countries'];
        sections.forEach(id => {
            const section = document.getElementById(id);
            if (!section) return;

            const grid = section.querySelector('.card-grid');
            if (!grid) return;

            const visibleCards = Array.from(grid.querySelectorAll('.dest-card')).filter(c => c.style.display !== 'none');
            
            if (visibleCards.length > 0) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    };

    // Debounced search input
    if (heroSearch) {
        let searchTimeout;
        heroSearch.addEventListener('input', () => {
            searchQuery = heroSearch.value;
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(applyFilters, 200);
        });

        heroSearch.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchQuery = heroSearch.value;
                applyFilters();
                const targetSec = document.getElementById('explore') || document.getElementById('beaches');
                if (targetSec) {
                    targetSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    }

    if (heroSearchBtn) {
        heroSearchBtn.addEventListener('click', () => {
            searchQuery = heroSearch.value;
            applyFilters();
        });
    }

    // Filter tab button click
    if (filterTabs) {
        const buttons = filterTabs.querySelectorAll('.filter-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeFilter = btn.dataset.filter;
                applyFilters();
            });
        });
    }
}

/* ----- INTERACTIVE TRAVEL MATCHER QUIZ ----- */
function initTravelQuiz() {
    const quizContainer = document.getElementById('quizContainer');
    if (!quizContainer) return;

    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const quizResult = document.getElementById('quizResult');

    const nextBtn = document.getElementById('goToStep2');
    const prevBtn = document.getElementById('backToStep1');
    const submitBtn = document.getElementById('submitQuiz');
    const restartBtn = document.getElementById('restartQuiz');
    const viewDetailsBtn = document.getElementById('viewResultDetails');

    let selectedVibe = 'beach';
    let selectedPace = 'relaxed';
    let currentMatchId = '';

    const switchStep = (fromStep, toStep) => {
        fromStep.classList.remove('active');
        setTimeout(() => {
            fromStep.style.display = 'none';
            toStep.style.display = 'block';
            setTimeout(() => {
                toStep.classList.add('active');
            }, 50);
        }, 400);
    };

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const checkedVibe = quizContainer.querySelector('input[name="quizVibe"]:checked');
            if (checkedVibe) selectedVibe = checkedVibe.value;
            switchStep(step1, step2);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            switchStep(step2, step1);
        });
    }

    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const checkedPace = quizContainer.querySelector('input[name="quizPace"]:checked');
            if (checkedPace) selectedPace = checkedPace.value;

            // Algorithm matching logic
            let matchedId = 'maldives';
            if (selectedVibe === 'beach') {
                matchedId = selectedPace === 'relaxed' ? 'maldives' : 'bali';
            } else if (selectedVibe === 'temple') {
                matchedId = selectedPace === 'relaxed' ? 'kyoto' : 'angkor';
            } else if (selectedVibe === 'country') {
                matchedId = selectedPace === 'relaxed' ? 'switzerland' : 'japan';
            }

            currentMatchId = matchedId;
            const dest = DESTINATIONS[matchedId];

            // Update DOM element references with results
            document.getElementById('resultName').textContent = dest.name;
            document.getElementById('resultText').textContent = dest.description;
            document.getElementById('resultImage').src = dest.image;
            document.getElementById('resultImage').alt = dest.name;
            document.getElementById('resultSeason').innerHTML = `<strong>Best Season:</strong> ${dest.season}`;
            document.getElementById('resultLocation').innerHTML = `📍 ${dest.location.replace('📍 ', '')}`;

            switchStep(step2, quizResult);
        });
    }

    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            // Reset inputs
            quizContainer.querySelector('input[name="quizVibe"][value="beach"]').checked = true;
            quizContainer.querySelector('input[name="quizPace"][value="relaxed"]').checked = true;
            switchStep(quizResult, step1);
        });
    }

    if (viewDetailsBtn) {
        viewDetailsBtn.addEventListener('click', () => {
            if (currentMatchId) {
                openModal(currentMatchId);
            }
        });
    }
}

/* ----- DESTINATION MODAL ----- */
function openModal(destId) {
    const modal = document.getElementById('destinationModal');
    const dest = DESTINATIONS[destId];
    if (!modal || !dest) return;

    document.getElementById('modalImage').src = dest.image;
    document.getElementById('modalImage').alt = dest.name;
    document.getElementById('modalBadge').textContent = dest.badge;
    document.getElementById('modalTitle').textContent = dest.name;
    document.getElementById('modalLocation').textContent = dest.location;
    document.getElementById('modalSeason').textContent = dest.season;
    document.getElementById('modalLanguage').textContent = dest.language;
    document.getElementById('modalCurrency').textContent = dest.currency;
    document.getElementById('modalVisa').textContent = dest.visa;
    document.getElementById('modalDescription').textContent = dest.description;
    document.getElementById('modalTips').textContent = dest.tips;

    const attractionsList = document.getElementById('modalAttractions');
    attractionsList.innerHTML = '';
    dest.attractions.forEach(attr => {
        const li = document.createElement('li');
        li.textContent = attr;
        attractionsList.appendChild(li);
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent page scrolling
}

function closeModal() {
    const modal = document.getElementById('destinationModal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore page scrolling
}

function initDestinationModal() {
    const modal = document.getElementById('destinationModal');
    const closeBtn = document.getElementById('modalCloseBtn');
    if (!modal) return;

    // Listen on card button clicks dynamically
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.open-modal-btn');
        if (btn) {
            const destId = btn.dataset.destination;
            if (destId) openModal(destId);
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Esc key close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
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
            formContent.style.display = 'none';
            formSuccess.classList.add('show');
        }
    });

    form.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('input', () => {
            field.classList.remove('error');
        });
        field.addEventListener('change', () => {
            field.classList.remove('error');
        });
    });

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
