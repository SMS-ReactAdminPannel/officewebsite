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

    // Dropdown functionality
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
    const dropdownParents = document.querySelectorAll('.dropdown-parent');
    const categoryItems = document.querySelectorAll('.category-item');
    const dropdownServices = document.querySelectorAll('.dropdown-services');

    // Click to open/close dropdowns
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.closest('.dropdown-parent');
            const isActive = parent.classList.contains('active');
            
            // Close all dropdowns first
            dropdownParents.forEach(p => p.classList.remove('active'));
            
            // Toggle current dropdown
            if (!isActive) {
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
                    const firstCategory = parent.querySelector('.category-item.active') || 
                                       parent.querySelector('.category-item:first-child');
                    if (firstCategory) {
                        const categoryId = firstCategory.getAttribute('data-category');
                        if (categoryId) switchCategory(categoryId);
                    }
                }, 50);
            } else {
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
            }
        });
    });

    // Category switching function
    function switchCategory(categoryId) {
        // Hide all service sections
        dropdownServices.forEach(service => service.classList.remove('active'));
        
        // Show selected service section
        const targetService = document.getElementById(categoryId);
        if (targetService) targetService.classList.add('active');
        
        // Update active category
        categoryItems.forEach(item => item.classList.remove('active'));
        const activeCategory = document.querySelector(`[data-category="${categoryId}"]`);
        if (activeCategory) activeCategory.classList.add('active');
    }

    // Category hover functionality
    categoryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const categoryId = this.getAttribute('data-category');
            if (categoryId) switchCategory(categoryId);
        });
        
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const categoryId = this.getAttribute('data-category');
            if (categoryId) switchCategory(categoryId);
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown-parent')) {
            dropdownParents.forEach(p => p.classList.remove('active'));
            
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

    // Search functionality
    const searchToggle = document.getElementById('search-toggle');
    const searchDropdown = document.getElementById('search-dropdown');
    const searchClose = document.getElementById('search-close');
    
    if (searchToggle) {
        searchToggle.addEventListener('click', () => {
            searchDropdown.classList.toggle('active');
        });
    }
    
    if (searchClose) {
        searchClose.addEventListener('click', () => {
            searchDropdown.classList.remove('active');
        });
    }
});