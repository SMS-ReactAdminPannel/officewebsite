        let isPlaying = true;
        let isMuted = true;
        const video = document.getElementById('mainVideo');

        function togglePlay() {
            const icon = document.getElementById('playIcon');
            if (isPlaying) {
                video.pause();
                icon.className = 'fas fa-play';
                isPlaying = false;
            } else {
                video.play();
                icon.className = 'fas fa-pause';
                isPlaying = true;
            }
        }

        function toggleSound() {
            const icon = document.getElementById('soundIcon');
            if (isMuted) {
                video.muted = false;
                icon.className = 'fas fa-volume-up';
                isMuted = false;
            } else {
                video.muted = true;
                icon.className = 'fas fa-volume-mute';
                isMuted = true;
            }
        }

        document.addEventListener('DOMContentLoaded', function() {
  const statsHeading = document.querySelector('.stats-heading');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statsHeading.classList.add('animate-underline');
        observer.unobserve(entry.target); // Stop observing after animation
      }
    });
  }, { threshold: 0.5 }); // Trigger when 50% of element is visible

  observer.observe(statsHeading);
});

        // Add smooth scrolling and interactive effects
        document.addEventListener('DOMContentLoaded', function() {
            // Add hover effects to buttons
            const buttons = document.querySelectorAll('.play-pause-btn, .sound-btn, .cta-button');
            buttons.forEach(button => {
                button.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.05)';
                });
                button.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1)';
                });
            });
        });

        
 // number count animation
document.addEventListener('DOMContentLoaded', function() {
  
        // Function to animate numbers
  function animateNumbers() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
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
  
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    observer.observe(statsSection);
  }
});        