// --- 1. THEME TOGGLE LOGIC ---
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Check if the user already chose a theme before
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'light') {
    body.classList.add('light-mode');
    themeToggleBtn.innerText = '[ DARK_SYS ]';
}

// Listen for a click on the toggle button
themeToggleBtn.addEventListener('click', () => {
    // Toggle the class on the body
    body.classList.toggle('light-mode');
    
    // Check what mode we are in now
    if (body.classList.contains('light-mode')) {
        themeToggleBtn.innerText = '[ DARK_SYS ]';
        localStorage.setItem('theme', 'light'); // Save preference
    } else {
        themeToggleBtn.innerText = '[ LIGHT_SYS ]';
        localStorage.setItem('theme', 'dark'); // Save preference
    }
});

// --- 2. TERMINAL BLINKING CURSOR FIX ---
// This ensures the cursor in your about section blinks like a real terminal waiting for input
const cursor = document.querySelector('.typing-cursor');
setInterval(() => {
    cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
}, 500); // Blinks every half second

// --- 3. AUDIO SYSTEM LOGIC ---
const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');
let isMusicPlaying = false;

musicBtn.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicBtn.innerText = '[ 🔇 SYS_AUDIO: OFF ]';
        musicBtn.classList.remove('audio-active');
    } else {
        bgMusic.play();
        musicBtn.innerText = '[ 🔊 SYS_AUDIO: ON ]';
        musicBtn.classList.add('audio-active');
    }
    isMusicPlaying = !isMusicPlaying;
});

// --- 4. CERTIFICATE HOLOGRAPHIC SCANNER (BULLETPROOF) ---
const certCards = document.querySelectorAll('.cert-card');
const modal = document.getElementById('cert-modal');
const modalImg = document.getElementById('modal-img');
const closeModal = document.querySelector('.close-modal');

// Loop through each card and make the ENTIRE card clickable
certCards.forEach(card => {
    card.addEventListener('click', () => {
        // 1. Get the image link
        const imgSrc = card.getAttribute('data-img');
        
        // 2. Remove active class to reset animation
        modal.classList.remove('modal-active');
        
        // 3. Set the image source
        modalImg.src = imgSrc;
        
        // 4. Show the modal container
        modal.style.display = 'flex';
        
        // 5. Trigger the laser animation
        setTimeout(() => {
            modal.classList.add('modal-active');
        }, 50);
    });
});

// Function to safely close the modal
const closeCertModal = () => {
    modal.classList.remove('modal-active');
    modal.style.display = 'none';
    setTimeout(() => {
        modalImg.src = '';
    }, 300);
};

// Close when clicking [X] TERMINATE
closeModal.addEventListener('click', closeCertModal);

// Close when clicking the dark background outside the image
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeCertModal();
    }
});

// --- 5. RESPONSIVE MOBILE SIDE MENU SYSTEM ---
const openMenuBtn = document.getElementById('mobile-menu-open');
const closeMenuBtn = document.getElementById('mobile-menu-close');
const navLinksContainer = document.getElementById('nav-links-container');
const bodyOverlay = document.getElementById('body-overlay');
const allNavLinks = document.querySelectorAll('.nav-links a'); // Get all links inside the menu

// Function to OPEN the menu
const openMobileMenu = () => {
    navLinksContainer.classList.add('nav-active'); // Slides sidebar in
    bodyOverlay.classList.add('overlay-active'); // Shows dark background
    document.body.style.overflow = 'hidden'; // Prevents scrolling the background site
};

// Function to CLOSE the menu
const closeMobileMenu = () => {
    navLinksContainer.classList.remove('nav-active'); // Slides sidebar out
    bodyOverlay.classList.remove('overlay-active'); // Hides dark background
    document.body.style.overflow = 'auto'; // Re-enables scrolling
};

// Event Listeners
openMenuBtn.addEventListener('click', openMobileMenu);
closeMenuBtn.addEventListener('click', closeMobileMenu);
bodyOverlay.addEventListener('click', closeMobileMenu); // Close if you click the dark overlay

// VERY IMPORTANT: Close the menu when *any* link is clicked
allNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});