// Fixed navbar with black background and smooth transitions
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const colorBar = document.querySelector('.color-bar');
    const regularLogo = document.getElementById('navbar-logo');
    const whiteLogo = document.getElementById('navbar-logo-white');
    
    // Navbar scroll effects with enhanced transitions
    let ticking = false;
    
    function updateNavbar() {
        const scrolled = window.scrollY > 30;
        
        if (scrolled) {
            navbar.classList.add('scrolled');
            if (colorBar) colorBar.classList.add('hidden');
            
            // Smooth logo transition
            if (regularLogo && whiteLogo) {
                regularLogo.style.transition = 'opacity 0.3s ease';
                whiteLogo.style.transition = 'opacity 0.3s ease';
                regularLogo.style.opacity = '0';
                whiteLogo.style.opacity = '1';
            }
        } else {
            navbar.classList.remove('scrolled');
            if (colorBar) colorBar.classList.remove('hidden');
            
            // Smooth logo transition back
            if (regularLogo && whiteLogo) {
                regularLogo.style.transition = 'opacity 0.3s ease';
                whiteLogo.style.transition = 'opacity 0.3s ease';
                regularLogo.style.opacity = '1';
                whiteLogo.style.opacity = '0';
            }
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });

    // Search functionality
    const searchToggle = document.getElementById('search-toggle');
    const searchDropdown = document.getElementById('search-dropdown');
    const searchInput = document.getElementById('search-input');
    const searchClose = document.getElementById('search-close');
    let isSearchOpen = false;

    if (searchToggle) {
        searchToggle.addEventListener('click', function() {
            isSearchOpen = !isSearchOpen;
            if (isSearchOpen) {
                searchDropdown.classList.add('active');
                setTimeout(() => searchInput.focus(), 100);
            } else {
                searchDropdown.classList.remove('active');
                searchInput.value = '';
            }
        });
    }

    if (searchClose) {
        searchClose.addEventListener('click', function() {
            isSearchOpen = false;
            searchDropdown.classList.remove('active');
            searchInput.value = '';
        });
    }

    // Dropdown functionality
    const dropdownParents = document.querySelectorAll('.dropdown-parent');
    const categoryItems = document.querySelectorAll('.category-item');
    const dropdownServices = document.querySelectorAll('.dropdown-services');

    dropdownParents.forEach(parent => {
        const trigger = parent.querySelector('.dropdown-trigger');
        const dropdown = parent.querySelector('.mega-dropdown');
        
        if (trigger && dropdown) {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close other dropdowns
                dropdownParents.forEach(otherParent => {
                    if (otherParent !== parent && otherParent.classList.contains('active')) {
                        otherParent.classList.remove('active');
                        // Remove temp scrolled class
                        if (navbar.classList.contains('scrolled-temp') && window.scrollY <= 30) {
                            navbar.classList.remove('scrolled-temp');
                            if (regularLogo && whiteLogo) {
                                regularLogo.style.transition = 'opacity 0.3s ease';
                                whiteLogo.style.transition = 'opacity 0.3s ease';
                                regularLogo.style.opacity = '1';
                                whiteLogo.style.opacity = '0';
                            }
                        }
                    }
                });
                
                // Toggle current dropdown
                if (parent.classList.contains('active')) {
                    parent.classList.remove('active');
                    // Remove temp scrolled class when closing
                    if (navbar.classList.contains('scrolled-temp') && window.scrollY <= 30) {
                        navbar.classList.remove('scrolled-temp');
                        if (regularLogo && whiteLogo) {
                            regularLogo.style.transition = 'opacity 0.3s ease';
                            whiteLogo.style.transition = 'opacity 0.3s ease';
                            regularLogo.style.opacity = '1';
                            whiteLogo.style.opacity = '0';
                        }
                    }
                } else {
                    parent.classList.add('active');
                    // Enhance navbar when dropdown is open
                    if (!navbar.classList.contains('scrolled')) {
                        navbar.classList.add('scrolled-temp');
                        if (regularLogo && whiteLogo) {
                            regularLogo.style.transition = 'opacity 0.3s ease';
                            whiteLogo.style.transition = 'opacity 0.3s ease';
                            regularLogo.style.opacity = '0';
                            whiteLogo.style.opacity = '1';
                        }
                    }
                    
                    // Initialize first category
                    setTimeout(() => {
                        const firstCategory = dropdown.querySelector('.category-item.active') || 
                                           dropdown.querySelector('.category-item:first-child');
                        if (firstCategory) {
                            const categoryId = firstCategory.getAttribute('data-category');
                            if (categoryId) switchCategory(categoryId);
                        }
                    }, 100);
                }
            });
            
            // Prevent dropdown from closing when clicking inside
            dropdown.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    });

    // Category switching functionality
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

    // Category hover functionality
    categoryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const categoryId = item.getAttribute('data-category');
            if (categoryId) switchCategory(categoryId);
        });
        
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const categoryId = item.getAttribute('data-category');
            if (categoryId) switchCategory(categoryId);
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar')) {
            dropdownParents.forEach(parent => {
                if (parent.classList.contains('active')) {
                    parent.classList.remove('active');
                    // Remove temp scrolled class with smooth transition
                    if (navbar.classList.contains('scrolled-temp') && window.scrollY <= 30) {
                        navbar.classList.remove('scrolled-temp');
                        if (regularLogo && whiteLogo) {
                            regularLogo.style.transition = 'opacity 0.3s ease';
                            whiteLogo.style.transition = 'opacity 0.3s ease';
                            regularLogo.style.opacity = '1';
                            whiteLogo.style.opacity = '0';
                        }
                    }
                }
            });
        }
        
        if (isSearchOpen && !searchDropdown.contains(e.target) && !searchToggle.contains(e.target)) {
            isSearchOpen = false;
            searchDropdown.classList.remove('active');
            searchInput.value = '';
        }
    });

    // Escape key handling
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (isSearchOpen) {
                isSearchOpen = false;
                searchDropdown.classList.remove('active');
                searchInput.value = '';
            }
            dropdownParents.forEach(parent => {
                if (parent.classList.contains('active')) {
                    parent.classList.remove('active');
                }
            });
        }
    });
});