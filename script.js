/**
 * BAJRA LAW & ASSOCIATES - Interactive Elements Script
 */

// Web3Forms configuration (Get your free access key at https://web3forms.com)
const WEB3FORMS_ACCESS_KEY = '921ce6af-301c-43ce-aac0-46796b49c943';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Hamburger Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('is-active');
            navMenu.classList.toggle('is-active');
            // Prevent scrolling when mobile menu is open
            document.body.classList.toggle('menu-open');
        });

        // Mobile: tap the Practice Areas nav-item link to toggle dropdown
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            const trigger = item.querySelector('.nav-link');
            if (trigger) {
                trigger.addEventListener('click', (e) => {
                    // Only intercept on mobile (hamburger visible)
                    if (window.getComputedStyle(hamburger).display !== 'none') {
                        e.preventDefault();
                        item.classList.toggle('is-open');
                    }
                });
            }
        });

        // Close menu when a non-dropdown link is clicked
        navLinks.forEach(link => {
            if (!link.closest('.nav-item') && !link.closest('.nav-dropdown')) {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('is-active');
                    navMenu.classList.remove('is-active');
                    document.body.classList.remove('menu-open');
                });
            }
        });

        // Close menu when a dropdown sub-link is clicked
        document.querySelectorAll('.nav-dropdown a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('is-active');
                navMenu.classList.remove('is-active');
                document.body.classList.remove('menu-open');
            });
        });
    }


    // 2. Sticky Header Shrink on Scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
        }
    });

    // 3. Highlight Active Navigation Item Based on URL
    const currentPath = window.location.pathname;
    const pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1);

    // Pages that belong under "Practice Areas"
    const practicePages = ['science-tech.html', 'litigation.html', 'foreign-counsel.html', 'legislative-review.html', 'capacity-building.html', 'evolving-law.html', 'practice.html'];
    const isPracticePage = practicePages.includes(pageName);

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        // Skip dropdown sub-links
        if (link.closest('.nav-dropdown')) return;

        if (isPracticePage && linkHref === 'practice.html') {
            link.classList.add('active');
        } else if (!isPracticePage && (pageName === linkHref || (pageName === '' && linkHref === 'index.html'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 4. Hero Slider Logic (Only on Index Page)
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-btn-prev');
    const nextBtn = document.querySelector('.slider-btn-next');
    const dotsContainer = document.querySelector('.slider-dots');

    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;
        const intervalTime = 8000; // 8 seconds per slide

        // Create Navigation Dots
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetInterval();
            });
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.slider-dot');

        function updateSlider() {
            slides.forEach((slide, idx) => {
                if (idx === currentSlide) {
                    slide.classList.add('active');
                    dots[idx].classList.add('active');
                } else {
                    slide.classList.remove('active');
                    dots[idx].classList.remove('active');
                }
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlider();
        }

        function goToSlide(index) {
            currentSlide = index;
            updateSlider();
        }

        // Add Event Listeners for controls
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetInterval();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetInterval();
            });
        }

        // Auto play function
        function startInterval() {
            slideInterval = setInterval(nextSlide, intervalTime);
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }

        // Start slider
        startInterval();
    }

    // 5. Contact Form Submission (Only on Contact Page)
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple client-side validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                showFormStatus('Please fill in all required fields.', 'error');
                return;
            }

            // Simple email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormStatus('Please enter a valid email address.', 'error');
                return;
            }

            // Show submitting state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending Message...';

            // Web3Forms Integration
            const formData = new FormData(contactForm);
            formData.append('access_key', WEB3FORMS_ACCESS_KEY);
            formData.append('subject', `Inquiry: ${subject}`);
            formData.append('from_name', name);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(async (response) => {
                const res = await response.json();
                if (response.status === 200) {
                    showFormStatus('Thank you! Your message has been sent successfully. We will get back to you shortly.', 'success');
                    contactForm.reset();
                } else {
                    showFormStatus(res.message || 'Something went wrong. Please try again later.', 'error');
                }
            })
            .catch(() => {
                showFormStatus('Failed to send message. Please check your internet connection.', 'error');
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            });
        });

        function showFormStatus(msg, type) {
            formStatus.className = 'form-message'; // Reset
            formStatus.classList.add(type);
            formStatus.textContent = msg;
            
            // Scroll to the status message
            formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // 6. News Article Modal Logic and Dynamic Article Loading
    const newsGrid = document.getElementById('newsGrid');
    if (newsGrid) {
        // Create Modal Elements and append to Body
        const modal = document.createElement('div');
        modal.className = 'article-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-hidden', 'true');
        modal.innerHTML = `
            <div class="article-modal-container">
                <button class="article-modal-close" aria-label="Close modal">&times;</button>
                <div class="article-modal-hero">
                    <img src="" alt="" class="modal-img">
                    <div class="article-modal-header-text">
                        <div class="article-modal-meta">
                            <span class="modal-date"></span>
                            <span>&bull;</span>
                            <span class="modal-category"></span>
                        </div>
                        <h2 class="modal-title"></h2>
                    </div>
                </div>
                <div class="article-modal-content">
                    <div class="article-modal-body"></div>
                </div>
                <div class="article-modal-footer">
                    <button class="article-modal-btn modal-consult-btn">Consult a Lawyer</button>
                    <button class="article-modal-btn-secondary modal-close-btn">Close Article</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const modalTitle = modal.querySelector('.modal-title');
        const modalDate = modal.querySelector('.modal-date');
        const modalCategory = modal.querySelector('.modal-category');
        const modalImg = modal.querySelector('.modal-img');
        const modalBody = modal.querySelector('.article-modal-body');
        const closeBtn = modal.querySelector('.article-modal-close');
        const closeBtnSec = modal.querySelector('.modal-close-btn');
        const consultBtn = modal.querySelector('.modal-consult-btn');

        let articlesData = [];

        // Open Modal Function
        function openArticle(index) {
            const data = articlesData[index];
            if (!data) return;

            modalTitle.textContent = data.title;
            modalDate.textContent = data.date;
            modalCategory.textContent = data.category;
            modalImg.src = data.image;
            modalImg.alt = data.title;
            
            // Parse Markdown content using marked.js if available, otherwise fallback to text
            if (typeof marked !== 'undefined' && marked.parse) {
                modalBody.innerHTML = marked.parse(data.content || '');
            } else {
                modalBody.innerHTML = data.content || '';
            }

            modal.classList.add('is-active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('modal-open');
        }

        // Close Modal Function
        function closeArticle() {
            modal.classList.remove('is-active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('modal-open');
        }

        // Fetch articles from assets/articles.json
        fetch('assets/articles.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load articles database');
                }
                return response.json();
            })
            .then(data => {
                articlesData = data.articles || [];
                
                // Clear grid and populate
                newsGrid.innerHTML = '';
                
                if (articlesData.length === 0) {
                    newsGrid.innerHTML = '<p class="no-articles">No news articles found.</p>';
                    return;
                }

                articlesData.forEach((article, index) => {
                    const card = document.createElement('article');
                    card.className = 'news-card';
                    card.innerHTML = `
                        <div class="news-img-wrap">
                            <img src="${article.image || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&h=400&q=80'}" alt="${article.title}">
                        </div>
                        <div class="news-content">
                            <div class="news-meta">
                                <span>${article.date || ''}</span>
                                <span>&bull;</span>
                                <span>${article.category || 'General'}</span>
                            </div>
                            <h3><a href="#" class="news-title-link">${article.title}</a></h3>
                            <p class="news-excerpt">${article.excerpt || ''}</p>
                            <a href="#" class="news-readmore">Read Full Article &rarr;</a>
                        </div>
                    `;

                    // Attach click listeners to specific elements inside this card
                    const readMoreLink = card.querySelector('.news-readmore');
                    const titleLink = card.querySelector('.news-title-link');

                    if (readMoreLink) {
                        readMoreLink.addEventListener('click', (e) => {
                            e.preventDefault();
                            openArticle(index);
                        });
                    }

                    if (titleLink) {
                        titleLink.addEventListener('click', (e) => {
                            e.preventDefault();
                            openArticle(index);
                        });
                    }

                    newsGrid.appendChild(card);
                });
            })
            .catch(error => {
                console.error('Error fetching articles:', error);
                newsGrid.innerHTML = '<p class="error-message">Error loading news articles. Please try again later.</p>';
            });

        // Close actions
        closeBtn.addEventListener('click', closeArticle);
        closeBtnSec.addEventListener('click', closeArticle);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeArticle();
            }
        });

        // Keydown Close ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('is-active')) {
                closeArticle();
            }
        });

        // Consult button redirect
        if (consultBtn) {
            consultBtn.addEventListener('click', () => {
                closeArticle();
                window.location.href = 'contact.html?ref=consult';
            });
        }
    }

    // 7. Auto-fill subject field on contact page if referenced from news articles
    const urlParams = new URLSearchParams(window.location.search);
    const refParam = urlParams.get('ref');
    if (refParam === 'consult' && contactForm) {
        const subjectInput = document.getElementById('subject');
        if (subjectInput) {
            subjectInput.value = 'Legal Consultation Request';
        }
    }

    // 8. Dynamic Team Member Loading
    const teamGrid = document.getElementById('teamGrid');
    if (teamGrid) {
        fetch('assets/team.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load team data');
                }
                return response.json();
            })
            .then(data => {
                const members = data.members || [];
                teamGrid.innerHTML = '';

                if (members.length === 0) {
                    teamGrid.innerHTML = '<p class="no-members">No team members found.</p>';
                    return;
                }

                members.forEach(member => {
                    const card = document.createElement('div');
                    card.className = 'team-member';
                    card.innerHTML = `
                        <div class="team-img-wrap">
                            <img src="${member.image || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=500&q=80'}" alt="${member.name}, ${member.role}">
                        </div>
                        <div class="team-info">
                            <h4>${member.name}</h4>
                            <span class="team-role">${member.role}</span>
                            <p class="team-bio">${member.bio || ''}</p>
                            ${member.email ? `
                            <a href="mailto:${member.email}" class="team-contact">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                ${member.email}
                            </a>
                            ` : ''}
                        </div>
                    `;
                    teamGrid.appendChild(card);
                });
            })
            .catch(error => {
                console.error('Error fetching team members:', error);
                teamGrid.innerHTML = '<p class="error-message">Error loading team members. Please try again later.</p>';
            });
    }
});
