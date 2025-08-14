document.addEventListener('DOMContentLoaded', () => {

    // --- Responsive Navigation ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    // --- Contact Page Functionality ---
    if (window.location.pathname.includes('contact.html')) {
        const timestampField = document.getElementById('timestamp');
        if (timestampField) {
            const now = new Date();
            timestampField.value = now.toISOString();
        }
    }

    // --- Thank You Page Functionality ---
    if (window.location.pathname.includes('thankyou.html')) {
        const formDataDisplay = document.getElementById('form-data-display');
        const urlParams = new URLSearchParams(window.location.search);

        if (formDataDisplay) {
            let dataHtml = '<h3>Your Submitted Information:</h3>';
            
            // Loop through each key-value pair from the URL
            urlParams.forEach((value, key) => {
                // You can format or skip certain keys here
                if (key !== 'timestamp') {
                    dataHtml += `<p><strong>${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> ${value}</p>`;
                } else {
                    dataHtml += `<p><strong>Submission Time:</strong> ${new Date(value).toLocaleString()}</p>`;
                }
            });
            
            formDataDisplay.innerHTML = dataHtml;
        }
    }
});