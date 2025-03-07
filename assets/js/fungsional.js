// Initialize Lucide icons
lucide.createIcons();

// Set current year
document.getElementById('current-year').textContent = new Date().getFullYear();


// Toggle mobile menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    if (mobileMenu.classList.contains('translate-x-full')) {
    // Open menu
    mobileMenu.classList.remove('translate-x-full');
    mobileMenu.classList.add('translate-x-0');
    menuIcon.classList.add('hidden');
    closeIcon.classList.remove('hidden');
    } else {
    // Close menu
    mobileMenu.classList.remove('translate-x-0');
    mobileMenu.classList.add('translate-x-full');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
    }
}

// Add event listener to mobile menu button
document.getElementById('mobile-menu-button').addEventListener('click', toggleMobileMenu);

// Function to scroll to section
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
    const offset = 100;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
    }
}

// Apply scroll animations
const observer = new IntersectionObserver(
    (entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        }
    });
    },
    { threshold: 0.1 }
);

const scrollRevealSections = document.querySelectorAll('.scroll-reveal-section');
scrollRevealSections.forEach((section) => {
    observer.observe(section);
});

// Ripple effect for buttons
document.querySelectorAll('.button-ripple').forEach(button => {
    button.addEventListener('click', function(e) {
    const circle = document.createElement('span');
    const diameter = Math.max(this.clientWidth, this.clientHeight);
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - this.offsetLeft - diameter / 2}px`;
    circle.style.top = `${e.clientY - this.offsetTop - diameter / 2}px`;
    
    this.appendChild(circle);
    
    setTimeout(() => {
        circle.remove();
    }, 600);
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 30) {
    navbar.classList.remove('bg-transparent', 'py-5');
    navbar.classList.add('bg-white/80', 'backdrop-blur-md', 'py-3', 'shadow-sm');
    } else {
    navbar.classList.remove('bg-white/80', 'backdrop-blur-md', 'py-3', 'shadow-sm');
    navbar.classList.add('bg-transparent', 'py-5');
    }
});