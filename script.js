// Light Mode Toggle
// This section handles toggling between light mode and dark mode on the website
// by adding or removing the 'light-mode' class to the <body> element.
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Toggle theme and save preference
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
});

// Load the saved theme from localStorage (if any)
if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
}

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


// YouTube API Configuration
const apiKey = 'AIzaSyDXd2Q113ujshXqIcbhOgRPCk7xs3KcVrU'; // Replace with your API key
const channelId = 'UC9hPxk8S_01h19WmUAQgtZA';   // Replace with your Channel ID
const maxResults = 2;                  // Number of videos to display
const videoContainer = document.getElementById('youtube-videos');

// Function to Fetch and Display Latest YouTube Videos
// Fetch the latest video IDs
async function fetchLatestVideoIds() {
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=id&order=date&maxResults=${maxResults}`;
    const response = await fetch(searchUrl);
    const data = await response.json();
    return data.items
        .filter(item => item.id.kind === 'youtube#video')
        .map(item => item.id.videoId);
}

// Fetch detailed info about the videos
async function fetchVideoDetails(videoIds) {
    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds.join(',')}&part=snippet,contentDetails`;
    const response = await fetch(detailsUrl);
    return await response.json();
}

// Render the videos on the page
async function renderYouTubeVideos() {
    try {
        const videoIds = await fetchLatestVideoIds();
        
        if (videoIds.length === 0) {
            videoContainer.innerHTML = `<p>No recent videos found.</p>`;
            return;
        }

        const videoDetails = await fetchVideoDetails(videoIds);
        videoDetails.items.forEach(item => {
            const videoElement = document.createElement('div');
            videoElement.classList.add('video-card');
            videoElement.innerHTML = `
                <div class="video-wrapper">
                    <iframe src="https://www.youtube.com/embed/${item.id}" 
                        title="${item.snippet.title}" frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
                <h3>${item.snippet.title}</h3>
                <p>${item.snippet.description.substring(0, 100)}...</p>
            `;
            videoContainer.appendChild(videoElement);
        });
    } catch (error) {
        console.error('Failed to fetch YouTube videos:', error);
        videoContainer.innerHTML = `<p>Error loading videos. Please try again later.</p>`;
    }
}

document.addEventListener('DOMContentLoaded', renderYouTubeVideos);
