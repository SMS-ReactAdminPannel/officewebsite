// Navbar functionality - Comprehensive navigation system with improved dropdown toggle
(function initNavbar() {
    console.log('Initializing Navbar...');
    
    // Wait for elements to be available
    const waitForElements = () => {
        const navbar = document.getElementById('navbar');
        const colorBar = document.querySelector('.color-bar');
        const dropdownParents = document.querySelectorAll('.dropdown-parent');
        
        if (!navbar || !colorBar || dropdownParents.length === 0) {
            console.log('Waiting for navbar elements...');
            setTimeout(waitForElements, 50);
            return;
        }
        
        console.log('Navbar elements found, initializing...');
        initializeNavbarFunctionality();
    };
    
    waitForElements();
})();

function initializeNavbarFunctionality() {
    const navbar = document.getElementById('navbar');
    const colorBar = document.querySelector('.color-bar');
    const searchToggle = document.getElementById('search-toggle');
    const searchDropdown = document.getElementById('search-dropdown');
    const searchInput = document.getElementById('search-input');
    const searchClose = document.getElementById('search-close');
    
    // Dropdown functionality
    const dropdownParents = document.querySelectorAll('.dropdown-parent');
    const categoryItems = document.querySelectorAll('.category-item');
    const dropdownServices = document.querySelectorAll('.dropdown-services');
    
    // Mobile menu elements
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const menuIcon = document.getElementById("menu-icon");
    
    console.log('Found dropdown parents:', dropdownParents.length);
    
    let scrollTimeout;
    let isSearchOpen = false;
    let ticking = false;
    let lastScrollY = 0;
    let openDropdowns = new Set(); // Track multiple open dropdowns
    let dropdownTransitions = new Map(); // Track transition states

    // Enhanced scroll functionality with requestAnimationFrame and smooth logo transitions
    function handleScroll() {
        lastScrollY = window.scrollY;
        
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }

    function updateNavbar() {
        const scrolled = lastScrollY > 50;
        const regularLogo = document.getElementById('navbar-logo');
        const whiteLogo = document.getElementById('navbar-logo-white');
        
        if (scrolled) {
            if (!navbar.classList.contains('scrolled')) {
                navbar.classList.add('scrolled');
                colorBar.classList.add('hidden');
                
                // Smooth logo transition
                if (regularLogo && whiteLogo) {
                    regularLogo.style.opacity = "0";
                    setTimeout(() => {
                        whiteLogo.style.opacity = "1";
                    }, 50);
                }
            }
        } else {
            if (navbar.classList.contains('scrolled') && !navbar.classList.contains('scrolled-temp') && openDropdowns.size === 0) {
                navbar.classList.remove('scrolled');
                colorBar.classList.remove('hidden');
                
                // Reverse logo transition
                if (regularLogo && whiteLogo) {
                    whiteLogo.style.opacity = "0";
                    setTimeout(() => {
                        regularLogo.style.opacity = "1";
                    }, 50);
                }
            }
        }
        
        ticking = false;
    }

    // Search functionality
    function toggleSearch() {
        isSearchOpen = !isSearchOpen;
        
        if (isSearchOpen) {
            searchDropdown.classList.add('active');
            setTimeout(() => {
                searchInput.focus();
            }, 100);
        } else {
            searchDropdown.classList.remove('active');
            searchInput.value = '';
        }
    }

    function closeSearch() {
        isSearchOpen = false;
        searchDropdown.classList.remove('active');
        searchInput.value = '';
    }

    // Enhanced dropdown show functionality with smooth transitions
    function showDropdown(parent) {
        const trigger = parent.querySelector('.dropdown-trigger');
        const triggerText = trigger ? trigger.textContent.trim() : 'Unknown dropdown';
        
        console.log(`🔼 Opening dropdown: ${triggerText}`);
        
        const dropdown = parent.querySelector('.mega-dropdown');
        const backdrop = parent.querySelector('.dropdown-backdrop');
        
        if (!dropdown) {
            console.error(`❌ No mega-dropdown found for: ${triggerText}`);
            return false;
        }
        
        // Check if already opening
        if (dropdownTransitions.get(parent) === 'opening') {
            console.log(`⏳ ${triggerText} is already opening`);
            return false;
        }
        
        // Clear any previous transition states
        dropdownTransitions.set(parent, 'opening');
        
        // Update global state immediately
        openDropdowns.add(parent);
        
        // Add active class to parent immediately for visual feedback
        parent.classList.add('active');
        trigger?.classList.add('active');
        
        // Show backdrop with fade-in
        if (backdrop) {
            backdrop.style.display = 'block';
            backdrop.style.opacity = '0';
            setTimeout(() => {
                backdrop.style.opacity = '1';
            }, 10);
        }
        
        // Force reflow to ensure initial state
        dropdown.offsetHeight;
        
        // Apply visible styles with smooth transition
        dropdown.style.visibility = 'visible';
        dropdown.style.opacity = '1';
        dropdown.style.transform = 'translateY(0) scale(1)';
        dropdown.style.pointerEvents = 'auto';
        
        // Handle logo transition for dropdown state
        if (!navbar.classList.contains('scrolled')) {
            navbar.classList.add('scrolled-temp');
            const regularLogo = document.getElementById('navbar-logo');
            const whiteLogo = document.getElementById('navbar-logo-white');
            
            if (regularLogo && whiteLogo) {
                regularLogo.style.transition = 'opacity 0.2s ease';
                whiteLogo.style.transition = 'opacity 0.2s ease';
                regularLogo.style.opacity = "0";
                setTimeout(() => {
                    whiteLogo.style.opacity = "1";
                }, 50);
            }
        }
        
        // Clear transition state after animation and mark as fully open
        setTimeout(() => {
            dropdownTransitions.set(parent, 'open');
            console.log(`✅ Dropdown opened successfully: ${triggerText}`);
        }, 300);
        
        return true;
    }

    function hideDropdown(parent) {
        const trigger = parent.querySelector('.dropdown-trigger');
        const triggerText = trigger ? trigger.textContent.trim() : 'Unknown dropdown';
        
        console.log(`🔽 Closing dropdown: ${triggerText}`);
        
        const dropdown = parent.querySelector('.mega-dropdown');
        const backdrop = parent.querySelector('.dropdown-backdrop');
        
        if (!dropdown) {
            console.error(`❌ No mega-dropdown found for: ${triggerText}`);
            return false;
        }
        
        // Check if already closing
        if (dropdownTransitions.get(parent) === 'closing') {
            console.log(`⏳ ${triggerText} is already closing`);
            return false;
        }
        
        // Set transition state immediately
        dropdownTransitions.set(parent, 'closing');
        
        // Update global state immediately
        openDropdowns.delete(parent);
        
        // Remove active classes immediately for visual feedback
        parent.classList.remove('active');
        trigger?.classList.remove('active');
        
        // Hide with smooth transition
        dropdown.style.opacity = '0';
        dropdown.style.transform = 'translateY(-20px) scale(0.98)';
        dropdown.style.pointerEvents = 'none';
        
        // Hide backdrop with fade-out
        if (backdrop) {
            backdrop.style.opacity = '0';
            setTimeout(() => {
                backdrop.style.display = 'none';
            }, 200);
        }
        
        // Hide visibility after transition completes and reset state
        setTimeout(() => {
            dropdown.style.visibility = 'hidden';
            dropdownTransitions.set(parent, 'closed');
            console.log(`✅ Dropdown closed successfully: ${triggerText}`);
        }, 300); // Match CSS transition duration
        
        // Handle logo transition back to normal state if no dropdowns are open
        setTimeout(() => {
            if (lastScrollY <= 50 && openDropdowns.size === 0 && navbar.classList.contains('scrolled-temp')) {
                navbar.classList.remove('scrolled-temp');
                const regularLogo = document.getElementById('navbar-logo');
                const whiteLogo = document.getElementById('navbar-logo-white');
                
                if (regularLogo && whiteLogo) {
                    regularLogo.style.transition = 'opacity 0.2s ease';
                    whiteLogo.style.transition = 'opacity 0.2s ease';
                    whiteLogo.style.opacity = "0";
                    setTimeout(() => {
                        regularLogo.style.opacity = "1";
                    }, 50);
                }
            }
        }, 50); // Check logo state sooner
        
        return true;
    }

    function switchCategory(categoryId) {
        // Hide all service sections
        dropdownServices.forEach(service => {
            service.classList.remove('active');
        });
        
        // Show selected service section
        const targetService = document.getElementById(categoryId);
        if (targetService) {
            targetService.classList.add('active');
        }
        
        // Update active category
        categoryItems.forEach(item => {
            item.classList.remove('active');
        });
        
        const activeCategory = document.querySelector(`[data-category="${categoryId}"]`);
        if (activeCategory) {
            activeCategory.classList.add('active');
        }
    }

    // Mobile menu functionality
    function setupMobileMenu() {
        if (mobileMenuBtn && mobileMenu && menuIcon) {
            mobileMenuBtn.addEventListener("click", function() {
                mobileMenu.classList.toggle("active");
                menuIcon.textContent = mobileMenu.classList.contains("active") ? "✕" : "☰";
            });
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
    }

    // Enhanced Universal Dropdown Click Functionality
    function setupUniversalDropdownClick() {
        console.log('🔧 Setting up Universal Dropdown Click functionality...');
        
        // Setup click handlers for all dropdown triggers
        dropdownParents.forEach((parent, index) => {
            const trigger = parent.querySelector('.dropdown-trigger');
            const dropdown = parent.querySelector('.mega-dropdown');
            const triggerText = trigger ? trigger.textContent.trim() : `Dropdown ${index + 1}`;
            
            if (!trigger || !dropdown) {
                console.warn(`❌ Missing elements for ${triggerText}:`, { trigger: !!trigger, dropdown: !!dropdown });
                return;
            }
            
            console.log(`✅ Setting up click handler for: ${triggerText}`);
            
            // Remove any existing click listeners to prevent duplicates
            trigger.removeEventListener('click', handleDropdownClick);
            
            // Clear any existing transition states
            dropdownTransitions.set(parent, 'closed');
            
            // Add unified dropdown click handler
            trigger.addEventListener('click', handleDropdownClick);
        });
        
        console.log('✅ Universal dropdown click setup complete');
    }
    
    // Improved unified dropdown click handler for all dropdowns
    function handleDropdownClick(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const trigger = e.currentTarget;
        const parent = trigger.closest('.dropdown-parent');
        const dropdown = parent ? parent.querySelector('.mega-dropdown') : null;
        const triggerText = trigger.textContent.trim();
        
        console.log(`🖱️ === ${triggerText} Clicked ===`);
        
        // Validate required elements
        if (!parent || !dropdown) {
            console.error(`❌ Required elements not found for ${triggerText}:`, {
                trigger: !!trigger,
                parent: !!parent,
                dropdown: !!dropdown
            });
            return;
        }
        
        // Check current state - use both class and transition state
        const isCurrentlyActive = parent.classList.contains('active');
        const transitionState = dropdownTransitions.get(parent);
        
        console.log(`📊 ${triggerText} current state:`, {
            active: isCurrentlyActive ? 'OPEN' : 'CLOSED',
            transition: transitionState || 'none'
        });
        
        // Prevent clicks during active transitions only
        if (transitionState === 'opening') {
            console.log(`⏳ ${triggerText} is opening, ignoring click`);
            return;
        }
        
        // Allow clicks during closing to immediately reopen
        if (transitionState === 'closing') {
            console.log(`⚡ ${triggerText} is closing, allowing immediate reopen`);
            // Clear the closing state and reset
            dropdownTransitions.set(parent, 'closed');
            openDropdowns.delete(parent);
        }
        
        // Close all other dropdowns first (but don't wait for them)
        console.log('🔒 Closing other dropdowns...');
        dropdownParents.forEach(otherParent => {
            if (otherParent !== parent && otherParent.classList.contains('active')) {
                const otherTrigger = otherParent.querySelector('.dropdown-trigger');
                const otherText = otherTrigger ? otherTrigger.textContent.trim() : 'Other dropdown';
                console.log(`🔽 Closing ${otherText}`);
                hideDropdown(otherParent);
            }
        });
        
        // Toggle current dropdown based on visual state (active class)
        if (isCurrentlyActive && transitionState !== 'closing') {
            console.log(`🔽 CLOSING ${triggerText} dropdown`);
            const success = hideDropdown(parent);
            if (success) {
                console.log(`✅ ${triggerText} close initiated`);
            }
        } else {
            console.log(`🔼 OPENING ${triggerText} dropdown`);
            const success = showDropdown(parent);
            if (success) {
                console.log(`✅ ${triggerText} open initiated`);
                
                // Initialize first category for dropdowns with categories
                setTimeout(() => {
                    const firstCategory = dropdown.querySelector('.category-item.active') || 
                                       dropdown.querySelector('.category-item:first-child');
                    
                    if (firstCategory) {
                        const categoryId = firstCategory.getAttribute('data-category');
                        if (categoryId) {
                            switchCategory(categoryId);
                            console.log(`✅ Activated category for ${triggerText}:`, categoryId);
                        }
                    }
                }, 100);
            }
        }
        
        console.log(`✅ === ${triggerText} Click Complete ===`);
    }

    // Page navigation functionality
    function setupPageNavigation() {
        // Get the loadPage function from index.js if available
        const loadPage = window.loadPage;
        
        const navLinks = document.querySelectorAll('[data-page]');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Skip if it's the Services dropdown trigger (handled separately)
                if (link.classList.contains('dropdown-trigger') && link.getAttribute('data-page') === 'Services') {
                    return; // Let the dropdown click handler manage this
                }
                
                // Don't navigate for category items or service items within dropdowns  
                if (link.classList.contains('category-item') || 
                    link.classList.contains('service-item') ||
                    link.classList.contains('has-submenu')) {
                    return;
                }
                
                e.preventDefault();
                const page = this.getAttribute('data-page');
                
                // Update active state in navigation
                navLinks.forEach(l => l.classList.remove('active'));
                document.querySelectorAll(`[data-page="${page}"]`).forEach(l => l.classList.add('active'));
                
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains("active")) {
                    mobileMenu.classList.remove("active");
                    if (menuIcon) menuIcon.textContent = "☰";
                }
                
                // Close any open dropdowns
                closeAllDropdowns();
                
                // Load the page if loadPage function is available
                if (loadPage && typeof loadPage === 'function') {
                    loadPage(page);
                    console.log('Navigating to page:', page);
                } else {
                    console.log('Page navigation requested:', page, 'but loadPage function not available');
                }
            });
        });
    }

    // Improved function to close all dropdowns
    function closeAllDropdowns() {
        console.log('🔒 Closing all dropdowns...');
        dropdownParents.forEach(parent => {
            if (parent.classList.contains('active')) {
                hideDropdown(parent);
            }
        });
    }

    // Event listeners - using passive for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Search event listeners
    if (searchToggle) {
        searchToggle.addEventListener('click', toggleSearch);
    }

    if (searchClose) {
        searchClose.addEventListener('click', closeSearch);
    }

    // Close search when clicking outside
    document.addEventListener('click', function(e) {
        if (isSearchOpen && !searchDropdown.contains(e.target) && !searchToggle.contains(e.target)) {
            closeSearch();
        }
    });

    // Improved: Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        // Only close if we have open dropdowns and the click is outside any dropdown
        if (openDropdowns.size > 0 && !e.target.closest('.dropdown-parent')) {
            console.log('🖱️ Click outside detected, closing dropdowns');
            closeAllDropdowns();
        }
    });

    // Close search and dropdowns on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (isSearchOpen) {
                closeSearch();
            }
            if (openDropdowns.size > 0) {
                closeAllDropdowns();
            }
        }
    });

    // Search input functionality
    if (searchInput) {
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = searchInput.value.trim();
                if (query) {
                    // Implement search functionality here
                    console.log('Searching for:', query);
                    // You can add your search logic here
                    closeSearch();
                }
            }
        });
    }

    // Click-only Dropdown functionality (Hover disabled)
    function setupDropdownClickOnly() {
        console.log('🖱️ Setting up Click-Only dropdown functionality...');
        
        dropdownParents.forEach((parent, index) => {
            const trigger = parent.querySelector('.dropdown-trigger');
            const dropdown = parent.querySelector('.mega-dropdown');
            const triggerText = trigger ? trigger.textContent.trim() : `Dropdown ${index + 1}`;
            
            if (!trigger || !dropdown) {
                console.log(`⚠️ Skipping click setup for ${triggerText} - missing elements`);
                return;
            }

            // Prevent dropdown from closing when clicking inside
            dropdown.addEventListener('click', (e) => {
                e.stopPropagation();
            });
            
            console.log(`✅ Click-only functionality ready for: ${triggerText}`);
        });
    }


    // Category switching - Click only (hover removed)
    categoryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const categoryId = item.getAttribute('data-category');
            if (categoryId) {
                switchCategory(categoryId);
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Logo loading verification and fallback
    function setupLogos() {
        const greenLogo = document.getElementById('navbar-logo');
        const whiteLogo = document.getElementById('navbar-logo-white');
        
        if (greenLogo) {
            greenLogo.onerror = function() {
                console.warn('Green logo failed to load, trying fallback');
                this.src = "Src/Assets/yohologo.png";
                this.onerror = function() {
                    console.warn('Fallback logo also failed to load');
                    this.style.display = 'none';
                };
            };
        }
        
        if (whiteLogo) {
            whiteLogo.onerror = function() {
                console.warn('White logo failed to load, trying fallback');
                this.src = "Src/Assets/yohologo.png";
                this.onerror = function() {
                    console.warn('Fallback logo also failed to load');
                    this.style.display = 'none';
                };
            };
        }
    }

    // Comprehensive test function to verify dropdown functionality
    function testDropdownClick() {
        console.log('🧪 === TESTING DROPDOWN FUNCTIONALITY ===');
        
        const results = {
            total: dropdownParents.length,
            success: 0,
            failed: []
        };
        
        console.log(`📊 Found ${dropdownParents.length} dropdown parent(s)`);
        
        dropdownParents.forEach((parent, index) => {
            const trigger = parent.querySelector('.dropdown-trigger');
            const dropdown = parent.querySelector('.mega-dropdown');
            const triggerText = trigger ? trigger.textContent.trim() : `Dropdown ${index + 1}`;
            
            console.log(`\n🔍 Testing: ${triggerText}`);
            console.log(`  - Trigger found: ${!!trigger ? '✅' : '❌'}`);
            console.log(`  - Dropdown found: ${!!dropdown ? '✅' : '❌'}`);
            console.log(`  - Data-page attribute: ${trigger?.getAttribute('data-page') || 'None'}`);
            
            if (trigger && dropdown) {
                console.log(`  - Status: ✅ READY`);
                results.success++;
            } else {
                console.log(`  - Status: ❌ MISSING ELEMENTS`);
                results.failed.push(triggerText);
            }
        });
        
        console.log(`\n📈 === TEST SUMMARY ===`);
        console.log(`✅ Working dropdowns: ${results.success}/${results.total}`);
        
        if (results.failed.length > 0) {
            console.log(`❌ Failed dropdowns: ${results.failed.join(', ')}`);
        }
        
        // Specific checks for main dropdowns
        const whatWeDoTrigger = document.querySelector('[data-page="Services"].dropdown-trigger');
        const industriesTrigger = document.querySelector('[data-page="Industries"].dropdown-trigger');
        
        console.log(`\n🎯 Key Dropdowns Status:`);
        console.log(`  - What We Do (Services): ${whatWeDoTrigger ? '✅ READY' : '❌ NOT FOUND'}`);
        console.log(`  - Industries: ${industriesTrigger ? '✅ READY' : '❌ NOT FOUND'}`);
        
        console.log('🧪 === TESTING COMPLETE ===\n');
        
        return results;
    }

    // Initialize all functionality
    function initialize() {
        updateNavbar();
        setupMobileMenu();
        setupUniversalDropdownClick();
        setupDropdownClickOnly();
        setupPageNavigation();
        setupLogos();
        testDropdownClick();
        
        console.log('🎉 Navbar initialization complete!');
        console.log('Features enabled: Universal dropdown CLICK-ONLY, Mobile menu, Search, Smooth scroll, Logo transitions');
        console.log(`📊 Tracking ${openDropdowns.size} open dropdowns`);
    }

    // Run initialization
    initialize();
}

// Export functions for external use and testing
window.NavbarUtils = {
    // Function to programmatically open/close dropdowns with proper state management
    toggleDropdown: function(dropdownName) {
        const dropdown = document.querySelector(`[data-page="${dropdownName}"]`);
        if (dropdown) {
            const parent = dropdown.closest('.dropdown-parent');
            if (parent) {
          // Simulate a click to use the proper toggle logic
                dropdown.click();
                return true;
            }
              }
        console.warn(`Dropdown "${dropdownName}" not found`);
        return false;
    },
    
    // Function to close all dropdowns
    closeAllDropdowns: function() {
        const dropdownParents = document.querySelectorAll('.dropdown-parent.active');
        console.log(`Closing ${dropdownParents.length} open dropdowns`);
        
          dropdownParents.forEach(parent => {
          const trigger = parent.querySelector('.dropdown-trigger');
            if (trigger) {
                trigger.click(); // Use the proper toggle mechanism
            }
        });
        
        return dropdownParents.length;
    },
    
    // Function to open a specific dropdown
    openDropdown: function(dropdownName) {
        const trigger = document.querySelector(`[data-page="${dropdownName}"].dropdown-trigger`);
        const parent = trigger?.closest('.dropdown-parent');
        
        if (trigger && parent && !parent.classList.contains('active')) {
            trigger.click();
            return true;
        }
        return false;
    },
    
    // Function to close a specific dropdown
    closeDropdown: function(dropdownName) {
        const trigger = document.querySelector(`[data-page="${dropdownName}"].dropdown-trigger`);
        const parent = trigger?.closest('.dropdown-parent');
        
        if (trigger && parent && parent.classList.contains('active')) {
            trigger.click();
            return true;
        }
        return false;
    },
    
    // Test function to manually trigger "What We Do" dropdown
    testWhatWeDo: function() {
        console.log('🧪 === TESTING WHAT WE DO DROPDOWN ===');
        const whatWeDoTrigger = document.querySelector('[data-page="Services"].dropdown-trigger');
        const whatWeDoParent = whatWeDoTrigger ? whatWeDoTrigger.closest('.dropdown-parent') : null;
        const whatWeDoDropdown = whatWeDoParent ? whatWeDoParent.querySelector('.mega-dropdown') : null;
        
        console.log('Element Check:');
        console.log(`  - Trigger: ${whatWeDoTrigger ? '✅ Found' : '❌ Not Found'}`);
        console.log(`  - Parent: ${whatWeDoParent ? '✅ Found' : '❌ Not Found'}`);
        console.log(`  - Dropdown: ${whatWeDoDropdown ? '✅ Found' : '❌ Not Found'}`);
        
        if (whatWeDoTrigger && whatWeDoParent && whatWeDoDropdown) {
            console.log('🖱️ Simulating click on "What We Do"...');
            const currentState = whatWeDoParent.classList.contains('active') ? 'OPEN' : 'CLOSED';
            console.log(`  - Current state: ${currentState}`);
            
            whatWeDoTrigger.click();
            
            setTimeout(() => {
                const newState = whatWeDoParent.classList.contains('active') ? 'OPEN' : 'CLOSED';
                console.log(`  - New state: ${newState}`);
                console.log(`✅ Test completed - State changed: ${currentState !== newState ? 'YES' : 'NO'}`);
            }, 100);
            
            return true;
        } else {
            console.error('❌ Cannot test - missing required elements!');
            return false;
        }
    },
    
    // Check dropdown status
    checkDropdownStatus: function() {
        const statuses = {};
        const dropdownParents = document.querySelectorAll('.dropdown-parent');
        
        dropdownParents.forEach(parent => {
            const trigger = parent.querySelector('.dropdown-trigger');
            const dataPage = trigger?.getAttribute('data-page');
            if (dataPage) {
                statuses[dataPage] = parent.classList.contains('active');
            }
        });
        
        console.log('📊 Current Dropdown Status:');
        Object.entries(statuses).forEach(([name, isOpen]) => {
            console.log(`  - ${name}: ${isOpen ? 'OPEN' : 'CLOSED'}`);
        });
        
        return statuses;
    },
    
    // Get count of open dropdowns
    getOpenDropdownCount: function() {
        const openCount = document.querySelectorAll('.dropdown-parent.active').length;
        console.log(`📊 Currently ${openCount} dropdown(s) open`);
        return openCount;
    }
};