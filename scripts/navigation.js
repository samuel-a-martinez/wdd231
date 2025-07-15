const navbutton = document.querySelector("#ham-btn");
const navlinks = document.querySelector("#nav-bar");


navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navlinks.classList.toggle('show');
})
// --- Dynamic Footer Content ---
// Copyright Year
const yearSpan = document.getElementById('currentyear');
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;

// Last Modified Date
const lastModifiedParagraph = document.getElementById('lastModified');
lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;
// --- Course List Array ---
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

// --- Dynamic Course Display & Filtering ---
const courseCardsContainer = document.getElementById('course-cards-container');
const totalCreditsValue = document.getElementById('total-credits-value');
const filterAllBtn = document.getElementById('filter-all');
const filterCseBtn = document.getElementById('filter-cse');
const filterWddBtn = document.getElementById('filter-wdd');

function createCourseCard(course) {
    const card = document.createElement('div');
    card.classList.add('course-card');
    if (course.completed) {
        card.classList.add('completed');
    } else {
        card.classList.add('uncompleted');
    }

    card.innerHTML = `
        <h3>${course.subject} ${course.number}: ${course.title}</h3>
        <p>Credits: <span class="credits">${course.credits}</span></p>
    `;
    return card;
}

function displayCourses(courseArray) {
    courseCardsContainer.innerHTML = ''; // Clear previous cards
    courseArray.forEach(course => {
        const card = createCourseCard(course);
        courseCardsContainer.appendChild(card);
    });
    calculateTotalCredits(courseArray); // Update total credits for displayed courses
}

function calculateTotalCredits(courseArray) {
    const total = courseArray.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsValue.textContent = total;
}

// Event Listeners for filter buttons
filterAllBtn.addEventListener('click', () => {
    displayCourses(courses);
    setActiveButton(filterAllBtn);
});

filterCseBtn.addEventListener('click', () => {
    const cseCourses = courses.filter(course => course.subject === 'CSE');
    displayCourses(cseCourses);
    setActiveButton(filterCseBtn);
});

filterWddBtn.addEventListener('click', () => {
    const wddCourses = courses.filter(course => course.subject === 'WDD');
    displayCourses(wddCourses);
    setActiveButton(filterWddBtn);
});

function setActiveButton(activeButton) {
    // Remove 'active' class from all buttons
    filterAllBtn.classList.remove('active');
    filterCseBtn.classList.remove('active');
    filterWddBtn.classList.remove('active');

    // Add 'active' class to the clicked button
    activeButton.classList.add('active');
}

// Initial display of all courses when the page loads
document.addEventListener('DOMContentLoaded', () => {
    displayCourses(courses);
});