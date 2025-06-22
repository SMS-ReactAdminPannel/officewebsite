document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileClose = document.getElementById('mobile-close');
    const searchToggle = document.getElementById('search-toggle');
    const searchDropdown = document.getElementById('search-dropdown');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.getElementById('search-input');
    const dropdownParent = document.querySelector('.dropdown-parent');
    const dropdownTrigger = document.querySelector('.dropdown-trigger');
    const categoryItems = document.querySelectorAll('.category-item');
    const dropdownServices = document.querySelectorAll('.dropdown-services');
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
    const navbar = document.getElementById('navbar');

    const subhead_1 = document.querySelector('.mobile-nav-subhead-1')
    const submenu_1 = document.querySelector('.mobile-nav-submenu-1')

    const subhead_2 = document.querySelector('.mobile-nav-subhead-2')
    const submenu_2 = document.querySelector('.mobile-nav-submenu-2')

    const subhead_3 = document.querySelector('.mobile-nav-subhead-3')
    const submenu_3 = document.querySelector('.mobile-nav-submenu-3')

    const subhead_4 = document.querySelector('.mobile-nav-subhead-4')
    const submenu_4 = document.querySelector('.mobile-nav-submenu-4')

    // Mobile Menu Functions
    function openMobileMenu() {
        mobileNav.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        mobileMenuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    }


    function closeMobileMenu() {
        mobileNav.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }

    subhead_1.addEventListener('click',()=>{
      const isopen = subhead_1.classList.toggle('icons-1')
      submenu_1.style.display = isopen ? 'block' : 'none'
    })

    subhead_2.addEventListener('click',()=>{
        const isopen = subhead_2.classList.toggle('icons-2')
        submenu_2.style.display = isopen ? 'block' : 'none'
    })

    subhead_3.addEventListener('click',()=>{
        const isopen = subhead_3.classList.toggle('icons-3')
        submenu_3.style.display = isopen ? 'block' : 'none'
    })

    subhead_4.addEventListener('click',()=>{
        const isopen = subhead_4.classList.toggle('icons-4')
        submenu_4.style.display = isopen ? 'block' : 'none'
    })

    // Mobile Menu Event Listeners
    mobileMenuToggle.addEventListener('click', function() {
        if (mobileNav.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    mobileClose.addEventListener('click', closeMobileMenu);
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);

    // Close mobile menu when clicking on mobile nav links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Mobile Dropdown Functionality
    mobileDropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.mobile-dropdown-trigger');
        trigger.addEventListener('click', function() {
            dropdown.classList.toggle('active');
        });
    });

   

    // Desktop Search Functionality
    if (searchToggle && searchDropdown && searchClose && searchInput) {
        searchToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            searchDropdown.classList.add('active');
            searchInput.focus();
        });

        searchClose.addEventListener('click', function() {
            searchDropdown.classList.remove('active');
            searchInput.value = '';
        });

        // Close search when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchDropdown.contains(e.target) && !searchToggle.contains(e.target)) {
                searchDropdown.classList.remove('active');
            }
        });

        // Close search on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && searchDropdown.classList.contains('active')) {
                searchDropdown.classList.remove('active');
            }
        });
    }

    // Desktop Dropdown Functionality
    if (dropdownParent && dropdownTrigger) {
        let dropdownTimeout;

        function showDropdown() {
            clearTimeout(dropdownTimeout);
            dropdownParent.classList.add('active');
        }

        function hideDropdown() {
            dropdownTimeout = setTimeout(() => {
                dropdownParent.classList.remove('active');
                // Reset to overview when closing
                categoryItems.forEach(cat => cat.classList.remove('active'));
                dropdownServices.forEach(service => service.classList.remove('active'));
                document.querySelector('[data-category="overview"]').classList.add('active');
                document.getElementById('overview').classList.add('active');
            }, 100);
        }

        dropdownParent.addEventListener('mouseenter', showDropdown);
        dropdownParent.addEventListener('mouseleave', hideDropdown);

        // Category switching
        categoryItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                // Remove active class from all categories and services
                categoryItems.forEach(cat => cat.classList.remove('active'));
                dropdownServices.forEach(service => service.classList.remove('active'));
                
                // Add active class to hovered category
                this.classList.add('active');
                
                // Show corresponding service section
                const category = this.getAttribute('data-category');
                const targetService = document.getElementById(category);
                if (targetService) {
                    targetService.classList.add('active');
                }
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdownParent.contains(e.target)) {
                dropdownParent.classList.remove('active');
            }
        });

        // Close dropdown on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && dropdownParent.classList.contains('active')) {
                dropdownParent.classList.remove('active');
            }
        });
    }

    // Navbar Scroll Effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });

    // Prevent body scroll when mobile menu is open
    function preventBodyScroll(e) {
        if (mobileNav.classList.contains('active')) {
            e.preventDefault();
        }
    }

    // Touch events for mobile
    let touchStartY = 0;
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchmove', function(e) {
        if (mobileNav.classList.contains('active') && !mobileNav.contains(e.target)) {
            e.preventDefault();
        }
    });

    // Initialize
    function init() {
        // Set initial states
        if (window.innerWidth <= 768) {
            closeMobileMenu();
        }
        
        // Set initial dropdown state
        if (categoryItems.length > 0 && dropdownServices.length > 0) {
            categoryItems.forEach(cat => cat.classList.remove('active'));
            dropdownServices.forEach(service => service.classList.remove('active'));
            document.querySelector('[data-category="overview"]')?.classList.add('active');
            document.getElementById('overview')?.classList.add('active');
        }
    }

    init();
});