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

    // Set up nav link click handlers after navbar is loaded
    setTimeout(() => {
      document.querySelectorAll("[data-page]").forEach(link => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const page = e.target.closest("[data-page]").getAttribute("data-page");
          
          // Update active state in navigation
          document.querySelectorAll("[data-page]").forEach(l => l.classList.remove("active"));
          document.querySelectorAll(`[data-page="${page}"]`).forEach(l => l.classList.add("active"));
          
          loadPage(page);
        });
      });
    }, 100);
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

// Function to load a page into the main content area
function loadPage(pageName) {
  fetch(`Src/HTML/${pageName}.html`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Page ${pageName} not found!`);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById("main-content").innerHTML = data;
      
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
    });
}

// Initialize any scripts needed for the current page
function initPageScripts() {
  // Handle navbar and color bar scroll effect
  let lastScrollTop = 0;
  window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    const colorBar = document.querySelector('.color-bar');
    const currentScroll = window.scrollY;
    
    // Navbar background effect
    if (navbar) {
      if (currentScroll > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    
    // Color bar hide/show based on scroll direction
    if (colorBar) {
      if (currentScroll > 100) {
        // Hide color bar when scrolling down
        colorBar.classList.add('hidden');
      } else {
        // Show color bar when near top
        colorBar.classList.remove('hidden');
      }
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
  });
  
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
