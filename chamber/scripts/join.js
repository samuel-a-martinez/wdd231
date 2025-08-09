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

    // ===================================================
    //  THANK YOU PAGE
    // ===================================================

    // Function to parse URL parameters and display them
    function displayThankYouData() {
        const urlParams = new URLSearchParams(window.location.search);
        const dataDisplay = document.getElementById('form-data-display');

        if (dataDisplay && urlParams.has('firstName')) {
            const firstName = urlParams.get('firstName');
            const lastName = urlParams.get('lastName');
            const email = urlParams.get('email');
            const phone = urlParams.get('phone');
            const orgName = urlParams.get('orgName');
            const timestamp = urlParams.get('timestamp');

            dataDisplay.innerHTML = `
                <p><strong>First Name:</strong> ${firstName}</p>
                <p><strong>Last Name:</strong> ${lastName}</p>
                <p><strong>Business Name:</strong> ${orgName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Application Submitted On:</strong> ${new Date(timestamp).toLocaleString()}</p>
            `;
        }
    }
    displayThankYouData();
});