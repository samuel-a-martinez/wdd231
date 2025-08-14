// main.js - A single file for all shared JavaScript functionality

document.addEventListener('DOMContentLoaded', () => {

    // --- Responsive Navigation ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    // --- Dynamic Itinerary Content ---
    const overviewGrid = document.querySelector('.overview-grid');

    async function fetchItineraryData() {
        try {
            const response = await fetch('data/data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            displayItinerary(data.itinerary);
        } catch (error) {
            console.error('Could not fetch itinerary data:', error);
            overviewGrid.innerHTML = '<p>Failed to load itinerary. Please try again later.</p>';
        }
    }

    function displayItinerary(items) {
        items.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('overview-card');
            
            // Use Template Literals and dynamic data
            card.innerHTML = `
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <h3>${item.title}</h3>
                <p><strong>Day:</strong> ${item.day}</p>
                <p>${item.description}</p>
            `;
            overviewGrid.appendChild(card);
        });
    }

    // Call the function to load data on page load
    fetchItineraryData();
});