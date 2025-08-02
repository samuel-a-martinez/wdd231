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

    // --- Weather API ---
    const weatherAPIKey = '9a92cffebcc52d30702cd3f3bd1ed513';
    const chamberLatitude = 20.53;  // Poza Rica, Veracruz
    const chamberLongitude = -97.46; // Poza Rica, Veracruz
    const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${chamberLatitude}&lon=${chamberLongitude}&units=imperial&appid=${weatherAPIKey}`;

    async function fetchWeather() {
        try {
            const response = await fetch(weatherURL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const weatherData = await response.json();
            
            // Display Current Weather
            const currentTemp = weatherData.list[0].main.temp;
            const weatherDesc = weatherData.list[0].weather[0].description;
            const weatherIcon = weatherData.list[0].weather[0].icon;

            const currentWeatherSection = document.getElementById('current-weather');
            currentWeatherSection.innerHTML = `
                <img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherDesc}">
                <p><strong>Temperature:</strong> ${Math.round(currentTemp)} &deg;F</p>
                <p><strong>Description:</strong> ${weatherDesc.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
            `;

            // Display 3-Day Forecast (by finding data for the next 3 days at midday)
            const forecastSection = document.getElementById('weather-forecast');
            forecastSection.innerHTML = '<h4>3-Day Forecast:</h4>';
            
            const forecastList = weatherData.list.filter(item => item.dt_txt.includes("12:00:00"));
            
            for (let i = 0; i < 3; i++) {
                if (forecastList[i]) {
                    const date = new Date(forecastList[i].dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
                    const temp = forecastList[i].main.temp;
                    forecastSection.innerHTML += `
                        <p><strong>${date}:</strong> ${Math.round(temp)} &deg;F</p>
                    `;
                }
            }

        } catch (error) {
            console.error('Error fetching weather data:', error);
            document.getElementById('current-weather').innerHTML = '<p>Weather data not available.</p>';
            document.getElementById('weather-forecast').innerHTML = '';
        }
    }

    // --- Member Spotlights ---
    async function displaySpotlights() {
        try {
            const response = await fetch('data/members.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const membersData = await response.json();
            
            // Filter for Gold (3) and Silver (2) members
            const spotlightMembers = membersData.filter(member => member.membershipLevel > 1);

            // Shuffle the array and select the first 2 or 3
            const shuffledMembers = spotlightMembers.sort(() => 0.5 - Math.random());
            const selectedMembers = shuffledMembers.slice(0, 3); // Display up to 3

            const spotlightContainer = document.getElementById('spotlight-container');

            selectedMembers.forEach(member => {
                const spotlightCard = document.createElement('div');
                spotlightCard.classList.add('spotlight-card');
                
                spotlightCard.innerHTML = `
                    <img src="images/${member.image}" alt="${member.name} Logo">
                    <h4>${member.name}</h4>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                    <p class="membership-level">Membership: ${getMembershipLevelText(member.membershipLevel)}</p>
                `;
                spotlightContainer.appendChild(spotlightCard);
            });

        } catch (error) {
            console.error('Error fetching member data for spotlights:', error);
            document.getElementById('spotlight-container').innerHTML = '<p>Spotlights not available.</p>';
        }
    }

    // Helper function for membership level (reused from directory page)
    function getMembershipLevelText(level) {
        switch (level) {
            case 1: return 'Non-Profit';
            case 2: return 'Silver';
            case 3: return 'Gold';
            default: return 'Standard';
        }
    }

    // Call the new functions
    fetchWeather();
    displaySpotlights();
});