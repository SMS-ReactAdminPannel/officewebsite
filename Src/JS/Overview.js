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
        

    // Loading screen
    // document.addEventListener('DOMContentLoaded', function () {
    //   const loadingScreen = document.getElementById('loading-screen');
    //   setTimeout(() => {
    //     loadingScreen.classList.add('hidden');
    //     setTimeout(() => {
    //       loadingScreen.style.display = 'none';
    //     }, 500);
    //   }, 800);

    //                 // Dynamic copyright year
    //                 document.getElementById('copyright-year').textContent = new Date().getFullYear();
    //             });
    //             const observer = new IntersectionObserver(
    //                 (entries) => {
    //                     entries.forEach(entry => {
    //                         if (entry.isIntersecting) {
    //                             entry.target.classList.add('visible');   // fade / slide in
    //                         } else {
    //                             entry.target.classList.remove('visible'); // reset when it leaves
    //                         }
    //                     });
    //                 },
    //                 { threshold: 0.1 }  // fire when 10 % of the section is visible
    //             );

    //             document.querySelectorAll('.slide-section')
    //                 .forEach(el => observer.observe(el));