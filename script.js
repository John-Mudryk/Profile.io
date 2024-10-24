// Light Mode Toggle
// This section handles toggling between light mode and dark mode on the website
// by adding or removing the 'light-mode' class to the <body> element.
const themeToggle = document.getElementById('theme-toggle');

// Listen for a click event on the 'theme-toggle' button.
themeToggle.addEventListener('click', () => {
    // Toggle the 'light-mode' class on the <body> element.
    // If 'light-mode' is already applied, it will be removed; otherwise, it will be added.
    document.body.classList.toggle('light-mode');
});

// Smooth Scrolling
// This section adds smooth scrolling behavior when navigation links are clicked.
// It targets anchor links within the <nav> that start with "#".
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    // Attach a click event listener to each anchor link.
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent the default anchor link behavior (jumping to section).
        
        // Use the 'scrollIntoView' method to smoothly scroll to the section linked.
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth' // Enables smooth scrolling animation.
        });
    });
});

// Scroll to Top Button
// This section enables a button to scroll the page back to the top smoothly when clicked.
const scrollToTopBtn = document.getElementById("scrollToTop");

// Listen for a click event on the 'scrollToTop' button.
scrollToTopBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default link behavior, avoiding any unwanted jumps.

    // Scroll the window to the very top of the page.
    window.scrollTo({
        top: 0, // Specifies the top position (0px).
        behavior: "smooth" // Enables smooth scrolling animation to the top.
    });
});
