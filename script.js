/**
 * BAJRA LAW & ASSOCIATES - Interactive Elements Script
 */

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

        // Close menu when a link is clicked
        navLinks.forEach(link => {
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
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (pageName === linkPath || (pageName === '' && linkPath === 'index.html')) {
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
        const intervalTime = 6000; // 6 seconds per slide

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

            // Simulate form submission delay
            setTimeout(() => {
                // Success output
                showFormStatus('Thank you! Your message has been sent successfully. We will get back to you shortly.', 'success');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }, 1500);
        });

        function showFormStatus(msg, type) {
            formStatus.className = 'form-message'; // Reset
            formStatus.classList.add(type);
            formStatus.textContent = msg;
            
            // Scroll to the status message
            formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // 6. News Article Modal Logic
    const newsCards = document.querySelectorAll('.news-card');
    if (newsCards.length > 0) {
        // Articles Data Store
        const articlesData = [
            {
                title: "Doing Business in Nepal: A Legal Guide for Foreign Investors (2026)",
                date: "June 10, 2026",
                category: "FDI & Investment",
                image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&h=500&q=80",
                content: `
                    <p>Nepal is increasingly becoming an attractive destination for foreign direct investment (FDI), particularly in hydropower, tourism, and services. The foreign investment regime is governed by the Foreign Investment and Technology Transfer Act (FITTA) and its recent updates.</p>
                    
                    <h4>Approval Authorities & Process</h4>
                    <p>Depending on the scale of investment, approval is granted either by the Department of Industries (DOI) or the Investment Board Nepal (IBN):</p>
                    <ul>
                        <li>Projects with investments up to NPR 6 Billion are handled by the Department of Industries (DOI).</li>
                        <li>Projects exceeding NPR 6 Billion or specific mega-projects are governed by the Investment Board Nepal (IBN).</li>
                    </ul>
                    
                    <h4>Key Highlights for Investors in 2026</h4>
                    <p>The Government of Nepal has introduced streamlined rules to boost international confidence. The newly established single-window service has automated registration, taxation, and customs processes under one platform. However, the minimum threshold regulations require companies to bring in the approved capital within specified timelines.</p>
                    
                    <h4>Repatriation Rules</h4>
                    <p>Foreign investors are legally entitled to repatriate dividends, equity sale proceeds, and interest payments on foreign loans. However, all repatriations require prior clearance from the Department of Industries and approval from Nepal Rastra Bank (the central bank) to ensure compliance with foreign exchange regulations.</p>
                `
            },
            {
                title: "Amendments to the Companies Act: Key Compliance Takeaways",
                date: "May 24, 2026",
                category: "Corporate Regulation",
                image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&h=500&q=80",
                content: `
                    <p>The legislative updates to the Companies Act introduce significant steps toward complete corporate digitization and governance oversight. The revisions aim to enhance business transparency while reducing administrative overheads.</p>
                    
                    <h4>1. Mandatory Electronic Filings</h4>
                    <p>All registered companies are now required to submit their annual corporate filings, audit reports, and shareholder registers online through the OCR portal. Manual filings will be phased out, and delays will trigger automated penalty structures.</p>
                    
                    <h4>2. Legal Recognition of Virtual AGMs</h4>
                    <p>Following temporary practices, the amended act permanently recognizes virtual and hybrid Annual General Meetings. Companies must follow strict protocols regarding shareholder verification, secure digital voting, and accurate proxy registration.</p>
                    
                    <h4>3. Enhanced Board Accountability</h4>
                    <p>Board directors face higher scrutiny. Conflicts of interest must be disclosed immediately, failing which directors can face personal liability for transactions that harm shareholder interests. Stricter records of accounts must be accessible for corporate auditors at all times.</p>
                `
            },
            {
                title: "Understanding Arbitration and Dispute Clauses in Nepalese Joint Ventures",
                date: "April 12, 2026",
                category: "Dispute Resolution",
                image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&h=500&q=80",
                content: `
                    <p>Drafting a clear dispute resolution clause is critical when entering joint ventures with foreign parties in Nepal. The local Arbitration Act governs domestic and international arbitrations, but careful drafting is required to avoid jurisdictional logjams.</p>
                    
                    <h4>Choosing the Right Seat and Venue</h4>
                    <p>Parties often confuse the seat of arbitration (the legal jurisdiction governing the arbitration) with the physical venue. Selecting a foreign seat like Singapore or London is common for cross-border deals, but the contract must explicitly detail the governing procedural law.</p>
                    
                    <h4>Enforcement of Foreign Arbitral Awards</h4>
                    <p>Nepal is a party to the New York Convention on the Recognition and Enforcement of Foreign Arbitral Awards. Despite this, enforcing a foreign award requires an application to the High Court of Nepal, which will check for reciprocity and ensure that the award does not violate the public policy of Nepal.</p>
                    
                    <h4>Recommendations for JV Partners</h4>
                    <p>Always specify the number of arbitrators (typically three), the appointing authority in case of default, the language of the proceedings, and explicitly outline interim relief mechanisms to preserve assets while the dispute is pending.</p>
                `
            },
            {
                title: "Legal Framework of Project Financing and Infrastructure Lending in Nepal",
                date: "March 05, 2026",
                category: "Banking & Project Finance",
                image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&h=500&q=80",
                content: `
                    <p>Large-scale infrastructure projects, especially in the run-of-the-river hydropower sector, are capital-intensive and depend heavily on project finance structures. The legal framework protects lenders while facilitating the developer's execution capability.</p>
                    
                    <h4>Security Creation Package</h4>
                    <p>Lenders protect their capital by creating a comprehensive security package. This includes registering mortgages over project land, hypothecation of plant machinery, assignment of project agreements (like Power Purchase Agreements - PPAs), and corporate/personal guarantees.</p>
                    
                    <h4>Escrow Accounts and Waterfalls</h4>
                    <p>Under central bank guidelines, infrastructure developers must route all revenues through designated Escrow Accounts. The account operates on a strict payment waterfall mechanism: prioritizing operating expenses, debt service, reserve funds, and lastly, dividend distributions.</p>
                    
                    <h4>Direct Agreements</h4>
                    <p>Direct Agreements between the government, developer, and lenders are increasingly used to specify step-in rights. In case of developer default, lenders have the legal right to step in, take control of the project, and appoint a substitute developer to complete the project.</p>
                `
            },
            {
                title: "Corporate Income Tax and Double Taxation Avoidance Agreements in Nepal",
                date: "Feb 18, 2026",
                category: "Taxation",
                image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&h=500&q=80",
                content: `
                    <p>Foreign entities operating in Nepal must design their corporate structures with tax efficiency in mind. The Income Tax Act of Nepal governs corporate taxes, capital gains, and withholding obligations.</p>
                    
                    <h4>Double Taxation Avoidance Agreements (DTAA)</h4>
                    <p>Nepal has signed DTAAs with several nations, including India, China, Mauritius, and Norway. These agreements allow foreign companies to avoid paying tax on the same income in both jurisdictions or qualify for reduced withholding tax rates on dividends, interest, and royalties.</p>
                    
                    <h4>Transfer Pricing Regulations</h4>
                    <p>The Inland Revenue Department (IRD) is intensifying its focus on transfer pricing. Under local laws, transactions between associated enterprises (parent and subsidiary) must be conducted at arm's length. Detailed documentation must be maintained to justify price settings for inter-company service charges.</p>
                    
                    <h4>Withholding Tax (WHT) Compliance</h4>
                    <p>Non-residents providing services to a Nepalese business are subject to withholding tax at source, typically ranging from 1.5% to 15% depending on the service type. It is crucial to determine who bears the WHT burden in contractual negotiations to avoid unexpected operational expenses.</p>
                `
            },
            {
                title: "A Guide to the Labour Act and Employment Contracts in Nepal",
                date: "Jan 15, 2026",
                category: "Employment Law",
                image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&h=500&q=80",
                content: `
                    <p>The Labour Act provides the core legal guidelines regulating employment relations, benefits, and safety standards in Nepal. Clear, compliant employment contracts are essential for preventing workplace disputes.</p>
                    
                    <h4>Classification of Employees</h4>
                    <p>The law outlines five classifications of employment contracts:</p>
                    <ul>
                        <li>Regular Employment: Standard permanent hiring.</li>
                        <li>Time-Bound Employment: Fixed-term contract.</li>
                        <li>Work-Based Employment: Hired for a specific task.</li>
                        <li>Casual Employment: Part-time or occasional work.</li>
                        <li>Part-Time Employment: Fixed hours less than normal working days.</li>
                    </ul>
                    
                    <h4>Mandatory Social Security Fund (SSF)</h4>
                    <p>The Social Security Act mandates registration with the Social Security Fund. Employers must contribute 20% and employees contribute 11% of the basic salary, which covers medical insurance, accident insurance, maternity benefits, and pension funds.</p>
                    
                    <h4>Termination and Grievance Redressal</h4>
                    <p>Termination must follow strict legal procedures. Employees cannot be terminated without a valid performance review process or disciplinary inquiry. Collective redundancy (retrenchment) requires notifying the Ministry of Labour and paying statutory severance fees.</p>
                `
            }
        ];

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

        // Open Modal Function
        function openArticle(index) {
            const data = articlesData[index];
            if (!data) return;

            modalTitle.textContent = data.title;
            modalDate.textContent = data.date;
            modalCategory.textContent = data.category;
            modalImg.src = data.image;
            modalImg.alt = data.title;
            modalBody.innerHTML = data.content;

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

        // Attach listeners to news cards
        newsCards.forEach((card, index) => {
            const readMoreLink = card.querySelector('.news-readmore');
            const titleLink = card.querySelector('h3 a');

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
});
