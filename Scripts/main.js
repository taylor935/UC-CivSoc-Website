// ===== Carousel =====
const buttons = document.querySelectorAll("[data-carousel-button]");
const slidesContainer = document.querySelector("[data-slides]");
let currentIndex = 0;
let autoScrollInterval; // store interval so we can reset it

// Move slides left/right
function moveSlide(offset) {
  const slides = slidesContainer.children;
  currentIndex = (currentIndex + offset + slides.length) % slides.length;
  slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Manual navigation
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    moveSlide(offset);
    resetAutoScroll(); // restart timer after manual click
  });
});

// Auto-scroll every 4 seconds
function startAutoScroll() {
  autoScrollInterval = setInterval(() => moveSlide(1), 4000);
}

// Restart the interval (useful after clicks)
function resetAutoScroll() {
  clearInterval(autoScrollInterval);
  startAutoScroll();
}

// Start it when page loads
startAutoScroll();



// ===== Mobile Nav Drawer with Hamburger Rotation =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Function to hide nav
function hideNav() {
    navLinks.classList.remove('showing');
    navLinks.classList.add('hiding');
    navLinks.addEventListener('animationend', () => {
        navLinks.classList.remove('hiding');
        navLinks.style.display = 'none';
    }, { once: true });

    // Rotate hamburger back
    menuToggle.classList.remove('active');
}

// Toggle menu
menuToggle.addEventListener('click', () => {
    if (navLinks.classList.contains('showing')) {
        hideNav();
    } else {
        navLinks.style.display = 'flex';
        navLinks.classList.remove('hiding');
        navLinks.classList.add('showing');

        // Rotate hamburger 90°
        menuToggle.classList.add('active');
    }
});

// Close menu when clicking any link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('showing')) {
            hideNav();
        }
    });
});

// Restore desktop nav on resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
        navLinks.style.display = ''; // remove inline style
        navLinks.classList.remove('showing', 'hiding');

        // Reset hamburger rotation
        menuToggle.classList.remove('active');
    }
});