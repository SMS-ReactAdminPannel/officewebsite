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

// Function to load a page into the main content area - Made global for Navbar.js access
window.loadPage = function loadPage(pageName) {
  // Show loading screen during navigation
  const loadingScreen = document.getElementById('loading-screen');
  loadingScreen.style.display = 'flex';
  loadingScreen.classList.remove('hidden');
  
  fetch(`Src/HTML/${pageName}.html`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Page ${pageName} not found!`);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById("main-content").innerHTML = data;
      
      // Hide loading screen
      setTimeout(function() {
        loadingScreen.classList.add('hidden');
        setTimeout(function() {
          loadingScreen.style.display = 'none';
        }, 500);
      }, 300);
      
      // Scroll to top when loading a new page
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Initialize any page-specific scripts
      initPageScripts();
    })
    .catch(error => {
      console.error('Error loading page:', error);
      document.getElementById("main-content").innerHTML = `
        <div class="error-container">
          <h2>Page Not Found</h2>
          <p>Sorry, the requested page could not be loaded.</p>
          <button onclick="loadPage('Home')">Return to Home</button>
        </div>
      `;
      
      // Hide loading screen on error
      setTimeout(function() {
        loadingScreen.classList.add('hidden');
        setTimeout(function() {
          loadingScreen.style.display = 'none';
        }, 500);
      }, 300);
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

// Load home page on initial load
window.addEventListener("DOMContentLoaded", () => {
  loadPage("Home");
});