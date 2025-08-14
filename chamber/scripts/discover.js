document.addEventListener('DOMContentLoaded', () => {
    // Current Year and Last Modified Date 
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
    const lastModified = document.lastModified;
    document.getElementById('last-modified').textContent = lastModified;

    // Mobile Navigation Toggle 
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('open');
    });

    // Function to set the hidden timestamp field
    function setTimestamp() {
        const timestampField = document.getElementById('timestamp');
        if (timestampField) {
            timestampField.value = new Date().toISOString();
        }
    }
    setTimestamp();

    // Function to handle modal open/close
    function setupModals() {
        const modalLinks = document.querySelectorAll('.membership-cards a');
        const modals = document.querySelectorAll('.modal');
        const closeButtons = document.querySelectorAll('.modal .close-button');

        modalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = e.target.dataset.modal;
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.classList.add('is-visible');
                }
            });
        });

        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                button.closest('.modal').classList.remove('is-visible');
            });
        });

        modals.forEach(modal => {
            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('is-visible');
                }
            });
        });
    }
    setupModals();

    const discoverGrid = document.querySelector('.discover-grid');
    const visitMessage = document.getElementById('visit-message');
    
    // --- Display Visitor Message using localStorage ---
    function displayVisitMessage() {
        const lastVisit = Number(localStorage.getItem('lastVisit'));
        const now = Date.now();
        const oneDay = 1000 * 60 * 60 * 24;

        if (!lastVisit) {
            visitMessage.textContent = "Welcome! Let us know if you have any questions.";
        } else {
            const daysBetween = Math.round((now - lastVisit) / oneDay);
            
            if (daysBetween < 1) {
                visitMessage.textContent = "Back so soon! Awesome!";
            } else if (daysBetween === 1) {
                visitMessage.textContent = "You last visited 1 day ago.";
            } else {
                visitMessage.textContent = `You last visited ${daysBetween} days ago.`;
            }
        }
        localStorage.setItem('lastVisit', now);
    }

    // --- Fetch and Display Discover Cards ---
    async function fetchDiscoverData() {
        try {
            const response = await fetch('data/discover.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            displayCards(data);
        } catch (error) {
            console.error("Could not fetch discover data:", error);
            discoverGrid.innerHTML = '<p>Failed to load discover items. Please try again later.</p>';
        }
    }

    function displayCards(cards) {
        discoverGrid.innerHTML = ''; // Clear existing content
        cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('discover-card');
            cardElement.id = `discover-card-${index + 1}`; // Add a unique ID
            
            cardElement.innerHTML = `
                <h2>${card.name}</h2>
                <figure>
                    <img src="images/${card.image}" alt="${card.name}">
                </figure>
                <address>${card.address}</address>
                <p>${card.description}</p>
                <button>Learn More</button>
            `;
            discoverGrid.appendChild(cardElement);
        });
    }

    // Call the new functions for the Discover page
    if (window.location.pathname.includes('discover.html')) {
        displayVisitMessage();
        fetchDiscoverData();
    }
});