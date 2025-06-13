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
        
        // Add active class to dropdown parent for styling
        if (dropdownParent) {
          dropdownParent.classList.add("active");
        }
        
        // Style the dropdown - set transition to be fast when showing
        if (megaDropdown) {
          // Use the same background color as the scrolled navbar for consistency
          const dropdownColor = "rgba(0, 24, 51, 0.95)";
          megaDropdown.style.background = dropdownColor;
          megaDropdown.style.transition = "opacity 0.2s ease, transform 0.2s ease, visibility 0s";
          megaDropdown.style.opacity = "1";
          megaDropdown.style.visibility = "visible";
          megaDropdown.style.transform = "translateY(0)";
          
          // Force the navbar to have the scrolled appearance when dropdown is visible
          if (navbar && !navbar.classList.contains('scrolled')) {
            navbar.classList.add('scrolled-temp');
            navbar.style.background = dropdownColor;
            navbar.style.backdropFilter = "blur(10px)";
          }
          
          // Activate the first category by default
          const firstCategory = document.querySelector('.category-item');
          if (firstCategory && !document.querySelector('.category-item.active')) {
            firstCategory.classList.add('active');
            const categoryId = firstCategory.getAttribute('data-category');
            const serviceSection = document.getElementById(categoryId);
            
            if (serviceSection) {
              // Hide all sections first
              document.querySelectorAll('.dropdown-services').forEach(section => {
                section.classList.remove('active');
                section.style.opacity = '0';
                section.style.display = 'none';
              });
              
              // Show the first section
              serviceSection.style.display = 'block';
              serviceSection.classList.add('active');
              
              setTimeout(() => {
                serviceSection.style.opacity = '1';
              }, 10);
            }
          }
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
        
        // Remove active class from dropdown parent
        if (dropdownParent) {
          dropdownParent.classList.remove("active");
        }
        
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
        
        // Reset navbar styles if we added the temporary class
        if (navbar && navbar.classList.contains('scrolled-temp')) {
          navbar.classList.remove('scrolled-temp');
          // Only remove styles if we're not actually scrolled
          if (!navbar.classList.contains('scrolled')) {
            navbar.style.background = "";
            navbar.style.backdropFilter = "";
            navbar.style.boxShadow = "";
          }
        }
        
        if (megaDropdown) {
          // Keep the background color consistent until fully hidden
          // megaDropdown.style.background = "";
        }
      }
      
      // Toggle dropdown when clicking the "What We Do" menu item
      const dropdownTrigger = dropdownParent.querySelector(".dropdown-trigger");
      if (dropdownTrigger) {
        // Remove any existing click event listeners to avoid duplicates
        dropdownTrigger.removeEventListener("click", toggleDropdown);
        
        // Define toggle function
        function toggleDropdown(e) {
          e.preventDefault();
          e.stopPropagation();
          
          // Toggle dropdown visibility
          if (isDropdownVisible) {
            hideDropdown();
          } else {
            showDropdown();
          }
        }
        
        // Add click event listener
        dropdownTrigger.addEventListener("click", toggleDropdown);
      }
      
      // Close dropdown when clicking on any other navigation items
      allNavItems.forEach(navItem => {
        if (navItem !== dropdownParent) {
          navItem.addEventListener("click", function() {
            if (isDropdownVisible) {
              hideDropdown();
            }
          });
        }
      });
      
      // Close dropdown when clicking anywhere outside of the dropdown
      document.addEventListener("click", function(event) {
        // Don't process if dropdown isn't visible
        if (!isDropdownVisible) return;
        
        // Check if click was outside dropdown and trigger
        const isClickInsideDropdown = megaDropdown.contains(event.target);
        const isClickOnTrigger = dropdownTrigger.contains(event.target);
        
        // Only hide if clicking outside both elements
        if (!isClickInsideDropdown && !isClickOnTrigger) {
          hideDropdown();
        }
      });
      
      // Category hover functionality (changed from click)
      categoryItems.forEach(item => {
        // Use mouseenter event instead of click
        item.addEventListener("mouseenter", function(e) {
          e.preventDefault();
          e.stopPropagation();
          
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
      
      // Add event listeners to ensure dropdown remains open while hovering categories
      const dropdownContainer = document.querySelector('.mega-dropdown-container');
      if (dropdownContainer) {
        dropdownContainer.addEventListener("mouseenter", function() {
          if (!isDropdownVisible) {
            showDropdown();
          }
        });
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
          
          // Don't navigate for category items or dropdown triggers
          if (link.classList.contains("category-item") || 
              link.classList.contains("has-submenu")) {
            return; // Don't navigate for these dropdown items
          }
          
          // If it's a service item, close the dropdown after click
          if (link.classList.contains("service-item")) {
            if (typeof hideDropdown === 'function') {
              setTimeout(hideDropdown, 100); // Small delay to allow the click to register
            }
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
  // Handle navbar and color bar scroll effect
  const handleScroll = function() {
    const navbar = document.getElementById('navbar');
    const colorBar = document.querySelector('.color-bar');
    const regularLogo = document.getElementById('navbar-logo');
    const whiteLogo = document.getElementById('navbar-logo-white');
    const currentScroll = window.scrollY;
    
    // Navbar background effect
    if (navbar) {
      if (currentScroll > 50) {
        navbar.classList.add('scrolled');
        
        // For smoother transition, directly manage the opacity with JavaScript
        if (regularLogo && whiteLogo) {
          // Adding a slight delay between hiding one logo and showing another
          // helps create a smoother crossfade effect
          regularLogo.style.opacity = "0";
          setTimeout(() => {
            whiteLogo.style.opacity = "1";
          }, 50);
        }
      } else {
        navbar.classList.remove('scrolled');
        
        // When scrolling back to top, reverse the transition
        if (regularLogo && whiteLogo) {
          whiteLogo.style.opacity = "0";
          setTimeout(() => {
            regularLogo.style.opacity = "1";
          }, 50);
        }
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

