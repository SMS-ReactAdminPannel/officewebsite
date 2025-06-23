// // Navbar functionality - Click-only dropdown system with hover for "What We Do"
// (function initNavbar() {
//     console.log('Initializing Navbar...');
    
//     // Wait for elements to be available
//     const waitForElements = () => {
//         const navbar = document.getElementById('navbar');
//         const colorBar = document.querySelector('.color-bar');
//         const dropdownParents = document.querySelectorAll('.dropdown-parent');
        
//         if (!navbar || !colorBar || dropdownParents.length === 0) {
//             console.log('Waiting for navbar elements...');
//             setTimeout(waitForElements, 50);
//             return;
//         }
        
//         console.log('Navbar elements found, initializing...');
//         initializeNavbarFunctionality();
//     };
    
//     waitForElements();
// })();

// function initializeNavbarFunctionality() {
//     const navbar = document.getElementById('navbar');
//     const colorBar = document.querySelector('.color-bar');
//     const searchToggle = document.getElementById('search-toggle');
//     const searchDropdown = document.getElementById('search-dropdown');
//     const searchInput = document.getElementById('search-input');
//     const searchClose = document.getElementById('search-close');
    
//     // Dropdown functionality
//     const dropdownParents = document.querySelectorAll('.dropdown-parent');
//     const categoryItems = document.querySelectorAll('.category-item');
//     const dropdownServices = document.querySelectorAll('.dropdown-services');
    
//     // Mobile menu elements
//     const mobileMenuBtn = document.getElementById("mobile-menu-btn");
//     const mobileMenu = document.getElementById("mobile-menu");
//     const menuIcon = document.getElementById("menu-icon");
    
//     console.log('Found dropdown parents:', dropdownParents.length);
    
//     let scrollTimeout;
//     let isSearchOpen = false;
//     let ticking = false;
//     let lastScrollY = 0;
//     let openDropdowns = new Set();
//     let dropdownStates = new Map(); // Track dropdown states more reliably

//     // Enhanced scroll functionality with requestAnimationFrame and smooth logo transitions
//     function handleScroll() {
//         lastScrollY = window.scrollY;
        
//         if (!ticking) {
//             requestAnimationFrame(updateNavbar);
//             ticking = true;
//         }
//     }

//     function updateNavbar() {
//         const scrolled = lastScrollY > 50;
//         const regularLogo = document.getElementById('navbar-logo');
//         const whiteLogo = document.getElementById('navbar-logo-white');
        
//         if (scrolled) {
//             if (!navbar.classList.contains('scrolled')) {
//                 navbar.classList.add('scrolled');
//                 // Keep color-bar always visible
//                 colorBar.classList.remove('hidden');
                
//                 // Smooth logo transition
//                 if (regularLogo && whiteLogo) {
//                     regularLogo.style.opacity = "0";
//                     setTimeout(() => {
//                         whiteLogo.style.opacity = "1";
//                     }, 50);
//                 }
//             }
//         } else {
//             if (navbar.classList.contains('scrolled') && !navbar.classList.contains('scrolled-temp') && openDropdowns.size === 0) {
//                 navbar.classList.remove('scrolled');
//                 // Keep color-bar always visible
//                 colorBar.classList.remove('hidden');
                
//                 // Reverse logo transition
//                 if (regularLogo && whiteLogo) {
//                     whiteLogo.style.opacity = "0";
//                     setTimeout(() => {
//                         regularLogo.style.opacity = "1";
//                     }, 50);
//                 }
//             }
//         }
        
//         ticking = false;
//     }

//     // Search functionality
//     function toggleSearch() {
//         isSearchOpen = !isSearchOpen;
        
//         if (isSearchOpen) {
//             searchDropdown.classList.add('active');
//             setTimeout(() => {
//                 searchInput.focus();
//             }, 100);
//         } else {
//             searchDropdown.classList.remove('active');
//             searchInput.value = '';
//         }
//     }

//     function closeSearch() {
//         isSearchOpen = false;
//         searchDropdown.classList.remove('active');
//         searchInput.value = '';
//     }

//     // Optimized dropdown show functionality
//     function showDropdown(parent) {
//         const trigger = parent.querySelector('.dropdown-trigger');
//         const triggerText = trigger ? trigger.textContent.trim() : 'Unknown dropdown';
        
//         console.log(`🔼 Opening dropdown: ${triggerText}`);
        
//         const dropdown = parent.querySelector('.mega-dropdown');
//         const backdrop = parent.querySelector('.dropdown-backdrop');
        
//         if (!dropdown) {
//             console.error(`❌ No mega-dropdown found for: ${triggerText}`);
//             return false;
//         }
        
//         // Prevent multiple rapid clicks
//         if (dropdownStates.get(parent) === 'opening') {
//             console.log(`⏳ ${triggerText} is already opening`);
//             return false;
//         }
        
//         // Set state immediately
//         dropdownStates.set(parent, 'opening');
//         openDropdowns.add(parent);
        
//         // Add active class immediately
//         parent.classList.add('active');
//         trigger?.classList.add('active');
        
//         // Show backdrop
//         if (backdrop) {
//             backdrop.style.display = 'block';
//             backdrop.style.opacity = '0';
//             setTimeout(() => backdrop.style.opacity = '1', 10);
//         }
        
//         // Show dropdown with smooth animation
//         dropdown.style.visibility = 'visible';
//         dropdown.style.opacity = '1';
//         dropdown.style.transform = 'translateY(0) scale(1)';
//         dropdown.style.pointerEvents = 'auto';
        
//         // Handle navbar styling for dropdown state
//         if (!navbar.classList.contains('scrolled')) {
//             navbar.classList.add('scrolled-temp');
//             const regularLogo = document.getElementById('navbar-logo');
//             const whiteLogo = document.getElementById('navbar-logo-white');
            
//             if (regularLogo && whiteLogo) {
//                 regularLogo.style.transition = 'opacity 0.2s ease';
//                 whiteLogo.style.transition = 'opacity 0.2s ease';
//                 regularLogo.style.opacity = "0";
//                 setTimeout(() => whiteLogo.style.opacity = "1", 50);
//             }
//         }
        
//         // Mark as fully open after animation
//         setTimeout(() => {
//             dropdownStates.set(parent, 'open');
//             console.log(`✅ Dropdown opened: ${triggerText}`);
//         }, 300);
        
//         return true;
//     }

//     function hideDropdown(parent) {
//         const trigger = parent.querySelector('.dropdown-trigger');
//         const triggerText = trigger ? trigger.textContent.trim() : 'Unknown dropdown';
        
//         console.log(`🔽 Closing dropdown: ${triggerText}`);
        
//         const dropdown = parent.querySelector('.mega-dropdown');
//         const backdrop = parent.querySelector('.dropdown-backdrop');
        
//         if (!dropdown) {
//             console.error(`❌ No mega-dropdown found for: ${triggerText}`);
//             return false;
//         }
        
//         // Prevent multiple rapid clicks
//         if (dropdownStates.get(parent) === 'closing') {
//             console.log(`⏳ ${triggerText} is already closing`);
//             return false;
//         }
        
//         // Set state immediately
//         dropdownStates.set(parent, 'closing');
//         openDropdowns.delete(parent);
        
//         // Remove active classes immediately
//         parent.classList.remove('active');
//         trigger?.classList.remove('active');
        
//         // Hide dropdown with animation
//         dropdown.style.opacity = '0';
//         dropdown.style.transform = 'translateY(-20px) scale(0.98)';
//         dropdown.style.pointerEvents = 'none';
        
//         // Hide backdrop
//         if (backdrop) {
//             backdrop.style.opacity = '0';
//             setTimeout(() => backdrop.style.display = 'none', 200);
//         }
        
//         // Complete hiding after animation
//         setTimeout(() => {
//             dropdown.style.visibility = 'hidden';
//             dropdownStates.set(parent, 'closed');
//             console.log(`✅ Dropdown closed: ${triggerText}`);
//         }, 300);
        
//         // Handle logo transition back to normal
//         setTimeout(() => {
//             if (lastScrollY <= 50 && openDropdowns.size === 0 && navbar.classList.contains('scrolled-temp')) {
//                 navbar.classList.remove('scrolled-temp');
//                 const regularLogo = document.getElementById('navbar-logo');
//                 const whiteLogo = document.getElementById('navbar-logo-white');
                
//                 if (regularLogo && whiteLogo) {
//                     regularLogo.style.transition = 'opacity 0.2s ease';
//                     whiteLogo.style.transition = 'opacity 0.2s ease';
//                     whiteLogo.style.opacity = "0";
//                     setTimeout(() => regularLogo.style.opacity = "1", 50);
//                 }
//             }
//         }, 50);
        
//         return true;
//     }

//     // Category switching functionality
//     function switchCategory(categoryId) {
//         // Hide all service sections
//         dropdownServices.forEach(service => {
//             service.classList.remove('active');
//         });
        
//         // Show selected service section
//         const targetService = document.getElementById(categoryId);
//         if (targetService) {
//             targetService.classList.add('active');
//         }
        
//         // Update active category
//         categoryItems.forEach(item => {
//             item.classList.remove('active');
//         });
        
//         const activeCategory = document.querySelector(`[data-category="${categoryId}"]`);
//         if (activeCategory) {
//             activeCategory.classList.add('active');
//         }
//     }

//     // Mobile menu functionality
//     function setupMobileMenu() {
//         if (mobileMenuBtn && mobileMenu && menuIcon) {
//             mobileMenuBtn.addEventListener("click", function() {
//                 mobileMenu.classList.toggle("active");
//                 menuIcon.textContent = mobileMenu.classList.contains("active") ? "✕" : "☰";
//             });
//         }
        
//         // Set up mobile submenu toggles
//         const hasSubmenuLinks = document.querySelectorAll(".has-submenu");
//         hasSubmenuLinks.forEach(link => {
//             link.addEventListener("click", function(e) {
//                 e.preventDefault();
//                 this.classList.toggle("active");
//                 const submenu = this.nextElementSibling;
//                 if (submenu && submenu.classList.contains("mobile-submenu")) {
//                     submenu.classList.toggle("active");
//                 }
//             });
//         });
//     }

//     // Main dropdown click handler - onclick open/close
//     function handleDropdownClick(e) {
//         e.preventDefault();
//         e.stopPropagation();
        
//         const trigger = e.currentTarget;
//         const parent = trigger.closest('.dropdown-parent');
//         const dropdown = parent ? parent.querySelector('.mega-dropdown') : null;
//         const triggerText = trigger.textContent.trim();
        
//         console.log(`🖱️ Dropdown clicked: ${triggerText}`);
        
//         // Validate elements
//         if (!parent || !dropdown) {
//             console.error(`❌ Missing elements for ${triggerText}`);
//             return;
//         }
        
//         const currentState = dropdownStates.get(parent);
//         const isVisuallyOpen = parent.classList.contains('active');
        
//         console.log(`📊 ${triggerText} state: ${currentState}, visually: ${isVisuallyOpen ? 'OPEN' : 'CLOSED'}`);
        
//         // Ignore clicks during transitions
//         if (currentState === 'opening' || currentState === 'closing') {
//             console.log(`⏳ ${triggerText} is transitioning, ignoring click`);
//             return;
//         }
        
//         // Close all other dropdowns first
//         dropdownParents.forEach(otherParent => {
//             if (otherParent !== parent && otherParent.classList.contains('active')) {
//                 hideDropdown(otherParent);
//             }
//         });
        
//         // Toggle current dropdown based on visual state
//         if (isVisuallyOpen) {
//             console.log(`🔽 CLOSING ${triggerText}`);
//             hideDropdown(parent);
//         } else {
//             console.log(`🔼 OPENING ${triggerText}`);
//             const success = showDropdown(parent);
            
//             if (success) {
//                 // Initialize first category after opening
//                 setTimeout(() => {
//                     const firstCategory = dropdown.querySelector('.category-item.active') || 
//                                        dropdown.querySelector('.category-item:first-child');
                    
//                     if (firstCategory) {
//                         const categoryId = firstCategory.getAttribute('data-category');
//                         if (categoryId) {
//                             switchCategory(categoryId);
//                             console.log(`✅ Initialized category: ${categoryId}`);
//                         }
//                     }
//                 }, 100);
//             }
//         }
//     }

//     // Setup dropdown click functionality
//     function setupDropdownClick() {
//         console.log('🔧 Setting up dropdown click handlers...');
        
//         dropdownParents.forEach((parent, index) => {
//             const trigger = parent.querySelector('.dropdown-trigger');
//             const dropdown = parent.querySelector('.mega-dropdown');
//             const triggerText = trigger ? trigger.textContent.trim() : `Dropdown ${index + 1}`;
            
//             if (!trigger || !dropdown) {
//                 console.warn(`❌ Missing elements for ${triggerText}`);
//                 return;
//             }
            
//             // Initialize state
//             dropdownStates.set(parent, 'closed');
            
//             // Remove existing listeners to prevent duplicates
//             trigger.removeEventListener('click', handleDropdownClick);
            
//             // Add click handler
//             trigger.addEventListener('click', handleDropdownClick);
            
//             // Modified: Only prevent dropdown from closing when clicking inside "What We Do"
//             dropdown.addEventListener('click', (e) => {
//                 if (triggerText === 'What We Do') {
//                     e.stopPropagation();
//                 }
//             });
            
//             console.log(`✅ Click handler ready for: ${triggerText}`);
//         });
        
//         console.log('✅ Dropdown click setup complete');
//     }

//     // Setup hover functionality for category items
//     function setupCategoryHover() {
//         console.log('🔧 Setting up category hover handlers...');
        
//         categoryItems.forEach(item => {
//             // Add hover listeners
//             item.addEventListener('mouseenter', (e) => {
//                 const categoryId = item.getAttribute('data-category');
//                 if (categoryId) {
//                     console.log(`🖱️ Hovering over category: ${categoryId}`);
//                     switchCategory(categoryId);
//                 }
//             });
            
//             // Keep existing click handler for mobile/accessibility
//             item.addEventListener('click', (e) => {
//                 e.preventDefault();
//                 const categoryId = item.getAttribute('data-category');
//                 if (categoryId) {
//                     switchCategory(categoryId);
//                 }
//             });
//         });
        
//         console.log('✅ Category hover setup complete');
//     }

//     // Page navigation functionality with router integration
//     function setupPageNavigation() {
//         const navLinks = document.querySelectorAll('[data-page]');
        
//         navLinks.forEach(link => {
//             link.addEventListener('click', function(e) {
//                 // Skip dropdown triggers
//                 if (link.classList.contains('dropdown-trigger') && link.getAttribute('data-page') === 'Services') {
//                     return;
//                 }
                
//                 // Skip category and service items
//                 if (link.classList.contains('category-item') || 
//                     link.classList.contains('service-item') ||
//                     link.classList.contains('has-submenu')) {
//                     return;
//                 }
                
//                 e.preventDefault();
//                 const page = this.getAttribute('data-page');
                
//                 // Close mobile menu
//                 if (mobileMenu && mobileMenu.classList.contains("active")) {
//                     mobileMenu.classList.remove("active");
//                     if (menuIcon) menuIcon.textContent = "☰";
//                 }
                
//                 // Close dropdowns
//                 closeAllDropdowns();
                
//                 // Navigate using router
//                 const path = page.toLowerCase() === 'home' ? '/' : `/${page.toLowerCase()}`;
                
//                 if (window.router) {
//                     window.router.navigate(path);
//                     console.log('🧭 Router navigation to:', path);
//                 } else if (window.navigateTo) {
//                     window.navigateTo(path);
//                     console.log('🧭 Direct navigation to:', path);
//                 } else {
//                     // Fallback to old method
//                     console.warn('⚠️ Router not available, using fallback');
//                     if (window.loadPage && typeof window.loadPage === 'function') {
//                         window.loadPage(page);
//                     }
//                 }
//             });
//         });
//     }

//     // Close all dropdowns
//     function closeAllDropdowns() {
//         console.log('🔒 Closing all dropdowns...');
//         dropdownParents.forEach(parent => {
//             if (parent.classList.contains('active')) {
//                 hideDropdown(parent);
//             }
//         });
//     }

//     // Logo setup with error handling
//     function setupLogos() {
//         const greenLogo = document.getElementById('navbar-logo');
//         const whiteLogo = document.getElementById('navbar-logo-white');
        
//         if (greenLogo) {
//             greenLogo.onerror = function() {
//                 console.warn('Green logo failed to load, trying fallback');
//                 this.src = "Src/Assets/yohologo.png";
//                 this.onerror = function() {
//                     console.warn('Fallback logo also failed to load');
//                     this.style.display = 'none';
//                 };
//             };
//         }
        
//         if (whiteLogo) {
//             whiteLogo.onerror = function() {
//                 console.warn('White logo failed to load, trying fallback');
//                 this.src = "Src/Assets/yohologo.png";
//                 this.onerror = function() {
//                     console.warn('Fallback logo also failed to load');
//                     this.style.display = 'none';
//                 };
//             };
//         }
//     }

//     // Event listeners setup
//     function setupEventListeners() {
//         // Scroll listener
//         window.addEventListener('scroll', handleScroll, { passive: true });

//         // Search listeners
//         if (searchToggle) {
//             searchToggle.addEventListener('click', toggleSearch);
//         }
//         if (searchClose) {
//             searchClose.addEventListener('click', closeSearch);
//         }

//         // Close search when clicking outside
//         document.addEventListener('click', function(e) {
//             if (isSearchOpen && !searchDropdown.contains(e.target) && !searchToggle.contains(e.target)) {
//                 closeSearch();
//             }
//         });

//         // Modified: Close dropdowns when clicking outside, but only close "What We Do" if clicking completely outside navbar
//         document.addEventListener('click', function(e) {
//             if (openDropdowns.size > 0) {
//                 const clickedDropdownParent = e.target.closest('.dropdown-parent');
                
//                 // If clicking completely outside navbar
//                 if (!e.target.closest('.navbar')) {
//                     console.log('🖱️ Outside navbar click detected, closing all dropdowns');
//                     closeAllDropdowns();
//                 }
//                 // If clicking on a different dropdown trigger
//                 else if (clickedDropdownParent && !clickedDropdownParent.classList.contains('active')) {
//                     console.log('🖱️ Different dropdown clicked, closing others');
//                     dropdownParents.forEach(parent => {
//                         if (parent !== clickedDropdownParent && parent.classList.contains('active')) {
//                             hideDropdown(parent);
//                         }
//                     });
//                 }
//                 // If clicking outside dropdown area but inside navbar (close non-"What We Do" dropdowns)
//                 else if (!clickedDropdownParent) {
//                     dropdownParents.forEach(parent => {
//                         const trigger = parent.querySelector('.dropdown-trigger');
//                         const triggerText = trigger ? trigger.textContent.trim() : '';
                        
//                         // Close all dropdowns except "What We Do"
//                         if (triggerText !== 'What We Do' && parent.classList.contains('active')) {
//                             hideDropdown(parent);
//                         }
//                     });
//                 }
//             }
//         });

//         // Escape key handling
//         document.addEventListener('keydown', function(e) {
//             if (e.key === 'Escape') {
//                 if (isSearchOpen) {
//                     closeSearch();
//                 }
//                 if (openDropdowns.size > 0) {
//                     closeAllDropdowns();
//                 }
//             }
//         });

//         // Search input handling
//         if (searchInput) {
//             searchInput.addEventListener('keydown', function(e) {
//                 if (e.key === 'Enter') {
//                     e.preventDefault();
//                     const query = searchInput.value.trim();
//                     if (query) {
//                         console.log('Searching for:', query);
//                         closeSearch();
//                     }
//                 }
//             });
//         }

//         // Smooth scroll for anchor links
//         document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//             anchor.addEventListener('click', function(e) {
//                 e.preventDefault();
//                 const target = document.querySelector(this.getAttribute('href'));
//                 if (target) {
//                     target.scrollIntoView({
//                         behavior: 'smooth',
//                         block: 'start'
//                     });
//                 }
//             });
//         });
//     }

//     // Test function
//     function testDropdowns() {
//         console.log('🧪 Testing dropdown functionality...');
        
//         const results = {
//             total: dropdownParents.length,
//             ready: 0,
//             failed: []
//         };
        
//         dropdownParents.forEach((parent, index) => {
//             const trigger = parent.querySelector('.dropdown-trigger');
//             const dropdown = parent.querySelector('.mega-dropdown');
//             const triggerText = trigger ? trigger.textContent.trim() : `Dropdown ${index + 1}`;
            
//             if (trigger && dropdown) {
//                 results.ready++;
//                 console.log(`✅ ${triggerText}: Ready`);
//             } else {
//                 results.failed.push(triggerText);
//                 console.log(`❌ ${triggerText}: Missing elements`);
//             }
//         });
        
//         console.log(`📊 Test Results: ${results.ready}/${results.total} dropdowns ready`);
//         if (results.failed.length > 0) {
//             console.log(`❌ Failed: ${results.failed.join(', ')}`);
//         }
        
//         return results;
//     }

//     // Initialize everything
//     function initialize() {
//         updateNavbar();
//         setupMobileMenu();
//         setupDropdownClick();
//         setupCategoryHover(); // Add hover functionality
//         setupPageNavigation();
//         setupLogos();
//         setupEventListeners();
//         testDropdowns();
        
//         console.log('🎉 Navbar initialization complete!');
//         console.log('✅ Click-only dropdown functionality enabled');
//         console.log('✅ Hover functionality enabled for "What We Do" categories');
//         console.log(`📊 Tracking ${openDropdowns.size} open dropdowns`);
//     }

//     // Run initialization
//     initialize();
// }

// // Export utility functions
// window.NavbarUtils = {
//     toggleDropdown: function(dropdownName) {
//         const trigger = document.querySelector(`[data-page="${dropdownName}"].dropdown-trigger`);
//         if (trigger) {
//             trigger.click();
//             return true;
//         }
//         console.warn(`Dropdown "${dropdownName}" not found`);
//         return false;
//     },
    
//     closeAllDropdowns: function() {
//         const openDropdowns = document.querySelectorAll('.dropdown-parent.active');
//         openDropdowns.forEach(parent => {
//             const trigger = parent.querySelector('.dropdown-trigger');
//             if (trigger) trigger.click();
//         });
//         return openDropdowns.length;
//     },
    
//     openDropdown: function(dropdownName) {
//         const trigger = document.querySelector(`[data-page="${dropdownName}"].dropdown-trigger`);
//         const parent = trigger?.closest('.dropdown-parent');
        
//         if (trigger && parent && !parent.classList.contains('active')) {
//             trigger.click();
//             return true;
//         }
//         return false;
//     },
    
//     closeDropdown: function(dropdownName) {
//         const trigger = document.querySelector(`[data-page="${dropdownName}"].dropdown-trigger`);
//         const parent = trigger?.closest('.dropdown-parent');
        
//         if (trigger && parent && parent.classList.contains('active')) {
//             trigger.click();
//             return true;
//         }
//         return false;
//     },
    
//     getDropdownStatus: function() {
//         const statuses = {};
//         const dropdownParents = document.querySelectorAll('.dropdown-parent');
        
//         dropdownParents.forEach(parent => {
//             const trigger = parent.querySelector('.dropdown-trigger');
//             const dataPage = trigger?.getAttribute('data-page');
//             if (dataPage) {
//                 statuses[dataPage] = parent.classList.contains('active');
//             }
//         });
        
//         console.log('📊 Dropdown Status:', statuses);
//         return statuses;
//     },
    
//     testDropdown: function(dropdownName) {
//         console.log(`🧪 Testing ${dropdownName} dropdown...`);
//         const trigger = document.querySelector(`[data-page="${dropdownName}"].dropdown-trigger`);
//         const parent = trigger?.closest('.dropdown-parent');
        
//         if (trigger && parent) {
//             const currentState = parent.classList.contains('active') ? 'OPEN' : 'CLOSED';
//             console.log(`Current state: ${currentState}`);
            
//             trigger.click();
            
//             setTimeout(() => {
//                 const newState = parent.classList.contains('active') ? 'OPEN' : 'CLOSED';
//                 console.log(`New state: ${newState}`);
//                 console.log(`✅ Test complete - Changed: ${currentState !== newState}`);
//             }, 100);
            
//             return true;
//         }
        
//         console.error(`❌ ${dropdownName} dropdown not found`);
//         return false;
//     }
// };