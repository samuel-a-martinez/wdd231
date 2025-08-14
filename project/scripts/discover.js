import { fetchData } from './data-handler.js'; 

document.addEventListener('DOMContentLoaded', () => {

    // --- Responsive Navigation ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    // --- Discover Page Functionality ---
    if (window.location.pathname.includes('discover.html')) {
        const visitMessageEl = document.getElementById('visit-message');
        const discoverGrid = document.querySelector('.discover-grid');

        // Function to handle the localStorage visit message
        function displayVisitMessage() {
            const lastVisit = Number(localStorage.getItem('lastVisit'));
            const now = Date.now();
            const oneDay = 1000 * 60 * 60 * 24;
            let message;

            if (!lastVisit) {
                message = "Welcome! Let us know if you have any questions.";
            } else {
                const daysBetween = Math.round((now - lastVisit) / oneDay);
                if (daysBetween < 1) {
                    message = "Back so soon! Awesome!";
                } else if (daysBetween === 1) {
                    message = "You last visited 1 day ago.";
                } else {
                    message = `You last visited ${daysBetween} days ago.`;
                }
            }
            visitMessageEl.textContent = message;
            localStorage.setItem('lastVisit', now);
        }

        // Function to display dynamically generated cards
        function displayDiscoverCards(items) {
            discoverGrid.innerHTML = '';
            items.forEach((item, index) => {
                const card = document.createElement('div');
                card.classList.add('discover-card');
                
                // Assign grid-area names for large screen layout
                if (window.innerWidth >= 1025) {
                    card.style.gridArea = `card${index + 1}`;
                }

                card.innerHTML = `
                    <h3>${item.name}</h3>
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                    <p>${item.description}</p>
                    <a href="${item.link}" class="cta-button">Learn More</a>
                `;
                discoverGrid.appendChild(card);
            });
        }
        
        // Fetch and display data from discover.json
        fetchData('data/discover.json')
            .then(data => displayDiscoverCards(data))
            .catch(error => console.error('Error fetching discover data:', error));

        // Initial call to display the message
        displayVisitMessage();
    }
});