document.addEventListener('DOMContentLoaded', () => {
    // Current Year for Footer
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;

    // Last Modified Date for Footer
    const lastModified = document.lastModified;
    document.getElementById('last-modified').textContent = lastModified;

    // Mobile Navigation Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('open');
    });

    // Directory Page Specifics
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    const memberDisplay = document.getElementById('member-display');

    let membersData = []; // To store fetched data

    async function fetchMembers() {
        try {
            const response = await fetch('data/members.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            membersData = await response.json();
            displayMembers(memberDisplay.classList.contains('grid-view') ? 'grid' : 'list'); // Initial display
        } catch (error) {
            console.error('Error fetching member data:', error);
            memberDisplay.innerHTML = '<p>Failed to load member directory. Please try again later.</p>';
        }
    }

    function createMemberCard(member) {
        const card = document.createElement('div');
        card.classList.add('member-card');

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} Logo">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p class="membership-level">Membership: ${getMembershipLevelText(member.membershipLevel)}</p>
            <p>${member.description}</p>
        `;
        return card;
    }

    function createMemberListItem(member) {
        const listItem = document.createElement('div');
        listItem.classList.add('member-list-item');

        listItem.innerHTML = `
            <div class="details">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p><a href="${member.website}" target="_blank">${member.website.replace(/(^\w+:|^)\/\//, '')}</a></p>
                <p><strong>Membership:</strong> ${getMembershipLevelText(member.membershipLevel)}</p>
                </div>
        `;
        return listItem;
    }

    function getMembershipLevelText(level) {
        switch (level) {
            case 1: return 'Non-Profit';
            case 2: return 'Silver';
            case 3: return 'Gold';
            default: return 'Standard';
        }
    }
    
    function displayMembers(viewType) {
        memberDisplay.innerHTML = ''; 
        memberDisplay.classList.remove('grid-view', 'list-view');
        memberDisplay.classList.add(`${viewType}-view`);

        membersData.forEach(member => {
            if (viewType === 'grid') {
                memberDisplay.appendChild(createMemberCard(member));
            } else {
                memberDisplay.appendChild(createMemberListItem(member));
            }
        });
    }

    // Event Listeners for View Toggle
    gridViewBtn.addEventListener('click', () => {
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
        displayMembers('grid');
    });

    listViewBtn.addEventListener('click', () => {
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        displayMembers('list');
    });

    // Initial fetch and display
    fetchMembers();
});