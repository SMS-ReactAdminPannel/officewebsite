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

    // Set up mobile menu toggle
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const menuIcon = document.getElementById("menu-icon");
    
    if (mobileMenuBtn && mobileMenu && menuIcon) {
      mobileMenuBtn.addEventListener("click", function() {
        mobileMenu.classList.toggle("active");
        menuIcon.textContent = mobileMenu.classList.contains("active") ? "✕" : "☰";
      });
    }
    
    // Set up dropdown functionality
    const categoryItems = document.querySelectorAll(".category-item");
    const servicesMenu = document.querySelector('[data-page="Services"]');
    const megaDropdown = document.querySelector(".mega-dropdown");
    const dropdownBackdrop = document.querySelector(".dropdown-backdrop");
    const dropdownParent = document.querySelector(".dropdown-parent");
    const navbar = document.getElementById("navbar");
    const allNavItems = document.querySelectorAll(".nav-links > li");
    
    if (dropdownParent && megaDropdown) {
      // Tracking variable for dropdown state
      let isDropdownVisible = false;
      
      // Function to show the dropdown
      function showDropdown() {
        if (!navbar) return;
        
        isDropdownVisible = true;
        
        // Only apply styles to the dropdown, not the entire navbar
        // Removed: navbar.style.background = dropdownColor;
        // Removed: navbar.style.backdropFilter = "blur(10px)";
        // Removed: navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.2)";
        // Removed: navbar.classList.add("dropdown-hovered");
        
        // Style the dropdown - set transition to be fast when showing
        if (megaDropdown) {
          const dropdownColor = "rgba(0, 24, 51, 0.98)";
          megaDropdown.style.background = dropdownColor;
          megaDropdown.style.transition = "opacity 0.2s ease, transform 0.2s ease, visibility 0s";
          megaDropdown.style.opacity = "1";
          megaDropdown.style.visibility = "visible";
          megaDropdown.style.transform = "translateY(0)";
        }
        
        // Show backdrop
        if (dropdownBackdrop) {
          dropdownBackdrop.style.display = "block";
        }
      }
      
      // Function to hide the dropdown
      function hideDropdown() {
        if (!navbar) return;
        
        isDropdownVisible = false;
        
        // Hide the dropdown immediately with faster transition
        if (megaDropdown) {
          megaDropdown.style.opacity = "0";
          megaDropdown.style.visibility = "hidden";
          megaDropdown.style.transform = "translateY(-10px)";
          megaDropdown.style.transition = "opacity 0.15s ease, transform 0.15s ease, visibility 0s linear 0.15s";
        }
        
        // Hide backdrop
        if (dropdownBackdrop) {
          dropdownBackdrop.style.display = "none";
        }
        
        // No need to reset navbar styles since we no longer change them
        // Removed: navbar.classList.remove("dropdown-hovered");
        // Removed: if (!navbar.classList.contains("scrolled")) {
        //   navbar.style.background = "";
        //   navbar.style.backdropFilter = "";
        //   navbar.style.boxShadow = "";
        // }
        
        if (megaDropdown) {
          megaDropdown.style.background = "";
        }
      }
      
      // Show dropdown only when hovering the "What We Do" menu item
      dropdownParent.addEventListener("mouseenter", function() {
        showDropdown();
      });
      
      // Handle hovering other navigation items - immediately hide dropdown
      allNavItems.forEach(navItem => {
        if (navItem !== dropdownParent) {
          navItem.addEventListener("mouseenter", function() {
            // Immediately hide dropdown when hovering other nav items
            if (isDropdownVisible) {
              hideDropdown();
            }
          });
        }
      });
      
      // Keep dropdown visible when hovering the dropdown itself
      if (megaDropdown) {
        megaDropdown.addEventListener("mouseenter", function() {
          showDropdown();
        });
        
        megaDropdown.addEventListener("mouseleave", function() {
          hideDropdown();
        });
      }
      
      // Hide dropdown when mouse leaves the dropdown parent
      dropdownParent.addEventListener("mouseleave", function(e) {
        // Check if the mouse is moving to the dropdown
        const toElement = e.relatedTarget;
        // If not moving to the dropdown or moving to another nav item, hide dropdown
        if (!megaDropdown.contains(toElement)) {
          hideDropdown();
        }
      });
      
      // Close dropdown when clicking anywhere on the document
      document.addEventListener("click", function(event) {
        if (!dropdownParent.contains(event.target) && !megaDropdown.contains(event.target)) {
          hideDropdown();
        }
      });
      
      // Category hover functionality
      categoryItems.forEach(item => {
        item.addEventListener("mouseenter", function() {
          const categoryId = this.getAttribute("data-category");
          
          // Update active category
          categoryItems.forEach(cat => cat.classList.remove("active"));
          this.classList.add("active");
          
          // Hide all service sections
          document.querySelectorAll(".dropdown-services").forEach(section => {
            section.classList.remove("active");
            section.style.opacity = "0";
            section.style.display = "none";
          });
          
          // Show selected section
          const activeSection = document.getElementById(categoryId);
          if (activeSection) {
            activeSection.style.display = "block";
            activeSection.classList.add("active");
            
            setTimeout(() => {
              activeSection.style.opacity = "1";
            }, 10);
          }
          
          // Make sure dropdown stays visible
          if (isDropdownVisible) {
            showDropdown();
          }
        });
        
        item.addEventListener("click", function(e) {
          e.preventDefault();
        });
      });
      
      // Initialize first category as active
      const websiteDesign = document.getElementById("website-design");
      if (websiteDesign) {
        websiteDesign.classList.add("active");
        websiteDesign.style.display = "block";
        websiteDesign.style.opacity = "1";
      }
      
      const firstCategory = document.querySelector('[data-category="website-design"]');
      if (firstCategory) {
        firstCategory.classList.add("active");
      }
    }
    
    // Set up mobile submenu toggles
    const hasSubmenuLinks = document.querySelectorAll(".has-submenu");
    hasSubmenuLinks.forEach(link => {
      link.addEventListener("click", function(e) {
        e.preventDefault();
        this.classList.toggle("active");
        const submenu = this.nextElementSibling;
        if (submenu && submenu.classList.contains("mobile-submenu")) {
          submenu.classList.toggle("active");
        }
      });
    });
    
    // Set up nav link click handlers for page navigation
    setTimeout(() => {
      document.querySelectorAll("[data-page]").forEach(link => {
        link.addEventListener("click", (e) => {
          // Skip if it's the Services menu or has submenu
          if (link.getAttribute("data-page") === "Services" && !link.classList.contains("mobile-category")) {
            if (!link.classList.contains("has-submenu")) {
              return; // Don't navigate when clicking the main Services dropdown
            }
          }
          
          if (link.classList.contains("category-item") || 
              link.classList.contains("service-item") || 
              link.classList.contains("has-submenu")) {
            return; // Don't navigate for dropdown items
          }
          
          e.preventDefault();
          const page = link.getAttribute("data-page");
          
          // Update active state in navigation
          document.querySelectorAll("[data-page]").forEach(l => l.classList.remove("active"));
          document.querySelectorAll(`[data-page="${page}"]`).forEach(l => l.classList.add("active"));
          
          // Close mobile menu if open
          if (mobileMenu && mobileMenu.classList.contains("active")) {
            mobileMenu.classList.remove("active");
            if (menuIcon) menuIcon.textContent = "☰";
          }
          
          // Always close dropdown menu immediately when navigating
          if (typeof hideDropdown === 'function') {
            hideDropdown();
          }
          
          loadPage(page);
        });
      });
    }, 100);
    
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
  const handleScroll = function() {
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
    
    // Color bar hide/show based on scroll position
    if (colorBar) {
      if (currentScroll > 100) {
        // Hide color bar when scrolling down
        colorBar.classList.add('hidden');
      } else {
        // Show color bar when near top
        colorBar.classList.remove('hidden');
      }
    }
  };
  
  // Remove any existing scroll listeners to prevent duplicates
  window.removeEventListener('scroll', handleScroll);
  
  // Add the scroll listener
  window.addEventListener('scroll', handleScroll);
  
  // Trigger the scroll handler immediately to set initial state
  handleScroll();
  
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
