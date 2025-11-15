document.addEventListener('DOMContentLoaded', () => {

    // === CLIENT'S MENU MANAGEMENT AREA ===
    const menuData = {
        starters: [
            { name: 'Golden Bruschetta', price: '$18', description: 'Toasted artisan bread with heirloom tomatoes, fresh basil, garlic, and a drizzle of extra virgin olive oil.' },
            { name: 'Seared Scallops', price: '$26', description: 'Delicate sea scallops seared to perfection, on a bed of saffron risotto with a citrus glaze.' },
            { name: 'Mushroom Vol-au-Vent', price: '$22', description: 'Puff pastry filled with a creamy wild mushroom ragout, topped with fresh chives.' }
        ],
        mainCourses: [
            { name: 'Filet Mignon', price: '$58', description: '8oz center-cut filet, grilled to your preference, served with potato gratin and a red wine reduction.' },
            { name: 'Pan-Seared Salmon', price: '$42', description: 'Crispy skin salmon served with asparagus, lemon-butter sauce, and dill-infused new potatoes.' },
            { name: 'Duck Confit', price: '$48', description: 'Classic French duck confit with a crispy skin, served alongside a cherry sauce and root vegetable puree.' },
            { name: 'Truffle & Parmesan Gnocchi', price: '$36', description: 'Handmade potato gnocchi in a luxurious black truffle cream sauce with shaved parmesan.' }
        ],
        desserts: [
            { name: 'Chocolate Lava Cake', price: '$16', description: 'Warm, molten chocolate cake served with vanilla bean ice cream and raspberry coulis.' },
            { name: 'Classic Crème Brûlée', price: '$14', description: 'A rich custard base topped with a contrasting layer of hard caramel.' },
            { name: 'Lemon Tart', price: '$15', description: 'Zesty lemon curd in a buttery shortcrust pastry, topped with torched meringue.' }
        ]
    };

    // --- RENDER THE MENU DYNAMICALLY (only on menu page) ---
    if (document.body.id === 'menu-page') {
        const menuContainer = document.getElementById('menu-container');
        if (menuContainer) {
            let fullMenuHTML = '';
            for (const category in menuData) {
                const categoryTitle = category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                let itemsHTML = menuData[category].map((item, index) => `
                    <div class="menu-item animate-on-scroll" style="--stagger-index: ${index + 1};">
                        <div class="menu-item-header">
                            <h3 class="menu-item-name">${item.name}</h3>
                            <span class="menu-item-line"></span>
                            <span class="menu-item-price">${item.price}</span>
                        </div>
                        <p class="menu-item-desc">${item.description}</p>
                    </div>
                `).join('');

                fullMenuHTML += `
                    <div class="menu-category animate-on-scroll">
                        <h2 class="menu-category-title">${categoryTitle}</h2>
                        <div class="menu-items-list">${itemsHTML}</div>
                    </div>
                `;
            }
            menuContainer.innerHTML = fullMenuHTML;
        }
    }

    // --- GLOBAL SITE FEATURES ---
    
    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('hidden');
        });
    }

    // Sticky Header
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // Dynamic Footer Injection
    const footer = document.querySelector('footer.footer');
    if (footer) {
        const currentYear = new Date().getFullYear();
        footer.innerHTML = `
            <div class="container">
                <div class="footer-content">
                    <h3>The Gilded Spoon</h3>
                    <p>Taste the art of fine dining.</p>
                </div>
                <div class="footer-bottom">
                    <p>&copy; ${currentYear} The Gilded Spoon. Design by Sher Bahadur. All Rights Reserved.</p>
                </div>
            </div>`;
    }

    // Contact Form Logic (only on contact page)
    if (document.body.id === 'contact-page') {
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                // Prevent actual submission for this demo
                e.preventDefault();
                // Redirect to success page
                window.location.href = form.getAttribute('action');
            });
        }
    }

    // Scroll-triggered Animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Optional: unobserve after first animation
                    // observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        animatedElements.forEach(el => observer.observe(el));
    }
});