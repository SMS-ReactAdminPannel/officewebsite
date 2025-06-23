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
    // Background video setup
    const bgVideo = document.getElementById('bg-video');
    
    if (bgVideo) {
        // Ensure the video is muted to allow autoplay
        bgVideo.muted = true;
        
        // Set video attributes explicitly
        bgVideo.setAttribute('playsinline', '');
        bgVideo.setAttribute('autoplay', '');
        bgVideo.setAttribute('loop', '');
        
        // Force play on page load
        document.addEventListener('DOMContentLoaded', () => {
            bgVideo.play().catch(error => {
                console.log('Video autoplay was prevented:', error);
                
                // Add a click event to the banner to start video on user interaction
                document.querySelector('.video-banner').addEventListener('click', () => {
                    bgVideo.play();
                }, { once: true });
            });
        });
        
        // If window is resized, make sure video still fills the screen
        window.addEventListener('resize', () => {
            const videoAspect = bgVideo.videoWidth / bgVideo.videoHeight;
            const windowAspect = window.innerWidth / window.innerHeight;
            
            if (windowAspect > videoAspect) {
                // Window is wider than video
                bgVideo.style.width = '100%';
                bgVideo.style.height = 'auto';
            } else {
                // Window is taller than video
                bgVideo.style.width = 'auto';
                bgVideo.style.height = '100%';
            }
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

  document.addEventListener('DOMContentLoaded', function() {
  
        // Function to animate numbers
  function animateNumbers() {
  const statNumbers = document.querySelectorAll('.text-orange');
  
  statNumbers.forEach(stat => {
    const rawText = stat.textContent.trim();
    const hasPlus = rawText.endsWith('+');
    const target = parseInt(rawText.replace('+', ''));
    const duration = 2000; 
    const increment = target / (duration / 16); // ~60fps
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(timer);
        stat.textContent = target + (hasPlus ? '+' : '');
      } else {
        stat.textContent = Math.floor(current); 
      }
    }, 16);
  });
}

  
  // Intersection Observer to trigger animation when scrolled to
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateNumbers();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  const statsSection = document.querySelector('.value-section');
  if (statsSection) {
    observer.observe(statsSection);
  }
});