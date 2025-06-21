// Loading screen handler
document.addEventListener('DOMContentLoaded', function() {
  // Show loading screen
  const loadingScreen = document.getElementById('loading-screen');
  
  // Hide loading screen when all content is loaded
  window.addEventListener('load', function() {
    setTimeout(function() {
      loadingScreen.classList.add('hidden');
      // Remove loading screen from DOM after transition completes
      setTimeout(function() {
        loadingScreen.style.display = 'none';
      }, 500);
    }, 800); // Show loading screen for at least 800ms for better UX
  });
});

// Load navbar
fetch("Src/Component/Navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar-placeholder").innerHTML = data;

    // Fix logo paths after loading
    const navbarLogo = document.getElementById("navbar-logo");
    if (navbarLogo) {
      navbarLogo.onerror = function() {
        this.src = "Src/Assets/yohologo.png";
      };
    }

    // Mobile menu is now handled by Navbar.js
    
    // Load and initialize Navbar.js after the navbar HTML is loaded
    const script = document.createElement('script');
    script.src = 'Src/JS/Navbar.js';
    script.onload = function() {
      console.log('Navbar.js loaded successfully');
    };
    document.head.appendChild(script);
    
    // Navigation functionality is now handled by Navbar.js
    
    // Initialize page scripts after loading navbar
    initPageScripts();
  });

// Load footer
fetch("Src/Component/Footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer-placeholder").innerHTML = data;
    
    // Fix logo paths after loading
    const footerLogo = document.getElementById("footer-logo");
    if (footerLogo) {
      footerLogo.onerror = function() {
        this.src = "Src/Assets/yohologo.png";
      };
    }
  });

// Legacy function for backward compatibility - now uses router
window.loadPage = function loadPage(pageName) {
  console.log('📄 Legacy loadPage called, redirecting to router');
  
  if (window.router) {
    const path = pageName.toLowerCase() === 'home' ? '/' : `/${pageName.toLowerCase()}`;
    window.router.navigate(path);
  } else {
    console.warn('⚠️ Router not available, loading page directly');
    loadPageDirect(pageName);
  }
};

// Direct page loading function (fallback)
function loadPageDirect(pageName) {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.style.display = 'flex';
    loadingScreen.classList.remove('hidden');
  }
  
  fetch(`Src/HTML/${pageName}.html`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Page ${pageName} not found!`);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById("main-content").innerHTML = data;
      
      if (loadingScreen) {
        setTimeout(function() {
          loadingScreen.classList.add('hidden');
          setTimeout(function() {
            loadingScreen.style.display = 'none';
          }, 500);
        }, 300);
      }
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
      initPageScripts();
    })
    .catch(error => {
      console.error('Error loading page:', error);
      document.getElementById("main-content").innerHTML = `
        <div class="error-container" style="text-align: center; padding: 50px; background: #000; color: #fff;">
          <h2>Page Not Found</h2>
          <p>Sorry, the requested page could not be loaded.</p>
          <button onclick="window.router ? window.router.navigate('/') : loadPageDirect('Home')" 
                  style="padding: 10px 20px; background: #15de79; color: white; border: none; border-radius: 5px; cursor: pointer;">
            Return to Home
          </button>
        </div>
      `;
      
      if (loadingScreen) {
        setTimeout(function() {
          loadingScreen.classList.add('hidden');
          setTimeout(function() {
            loadingScreen.style.display = 'none';
          }, 500);
        }, 300);
      }
    });
}

// Initialize any scripts needed for the current page
function initPageScripts() {
  // Navbar scroll effects are now handled by Navbar.js
  
  // Reinitialize any components that need it
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    // Initialize video toggle functionality
    const videoToggleBtn = document.getElementById('video-toggle-btn');
    const returnToVideoBtn = document.getElementById('return-to-video-btn');
    const videoContent = document.getElementById('video-content');
    const heroVideo = document.getElementById('hero-video');
    
    if (videoToggleBtn && returnToVideoBtn && videoContent && heroVideo) {
      // Show video content when toggle button is clicked
      videoToggleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        videoContent.classList.add('active');
        heroVideo.style.opacity = '0';
        heroVideo.pause();
      });
      
      // Hide video content when return button is clicked
      returnToVideoBtn.addEventListener('click', function(e) {
        e.preventDefault();
        videoContent.classList.remove('active');
        heroVideo.style.opacity = '1';
        
        // Add a small delay before playing the video for smoother transition
        setTimeout(() => {
          heroVideo.play();
        }, 300);
      });
    }
  }
}

// Initialize router on DOM load - router will handle initial page load
window.addEventListener("DOMContentLoaded", () => {
  console.log('🚀 DOM loaded, router will handle initial navigation');
  // Router initialization is handled in Router.js
});