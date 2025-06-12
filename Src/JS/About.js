// About Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize stat counters
    initStatCounters();
    
    // Set up video players
    setupVideoPlayers();
});

// Function to animate stat counters
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length === 0) return;
    
    // Function to animate counting
    function animateCounter(element, target, duration) {
        let start = 0;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            const currentCount = Math.floor(progress * target);
            element.textContent = currentCount;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Initialize IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target, 2000); // 2000ms duration
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all stat numbers
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// Function to set up video players
function setupVideoPlayers() {
    // Hero video setup
    const heroVideo = document.getElementById('about-hero-video');
    const playHeroBtn = document.getElementById('play-video-btn');
    const heroOverlay = document.querySelector('.video-overlay');
    
    if (heroVideo && playHeroBtn) {
        playHeroBtn.addEventListener('click', function() {
            if (heroVideo.paused) {
                heroVideo.play();
                heroVideo.controls = true;
                heroOverlay.style.opacity = '0';
                heroOverlay.style.pointerEvents = 'none';
            } else {
                heroVideo.pause();
                heroVideo.controls = false;
                heroOverlay.style.opacity = '1';
                heroOverlay.style.pointerEvents = 'auto';
            }
        });
        
        heroVideo.addEventListener('ended', function() {
            heroVideo.controls = false;
            heroOverlay.style.opacity = '1';
            heroOverlay.style.pointerEvents = 'auto';
        });
    }
    
    // Vision video setup
    const visionVideo = document.getElementById('vision-video');
    const visionPlayBtn = document.getElementById('vision-play-btn');
    
    if (visionVideo && visionPlayBtn) {
        visionPlayBtn.addEventListener('click', function() {
            if (visionVideo.paused) {
                visionVideo.play();
                visionVideo.controls = true;
                visionPlayBtn.style.opacity = '0';
                visionPlayBtn.style.pointerEvents = 'none';
            } else {
                visionVideo.pause();
                visionVideo.controls = false;
                visionPlayBtn.style.opacity = '1';
                visionPlayBtn.style.pointerEvents = 'auto';
            }
        });
        
        visionVideo.addEventListener('ended', function() {
            visionVideo.controls = false;
            visionPlayBtn.style.opacity = '1';
            visionPlayBtn.style.pointerEvents = 'auto';
        });
    }
}