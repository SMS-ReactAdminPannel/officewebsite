// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const body = document.body;
    
    if (mobileToggle && navLinks) {
        // Toggle mobile menu
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            navLinks.classList.toggle('active');
            
            // Toggle hamburger icon
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                body.style.overflow = 'hidden'; // Prevent background scrolling
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                body.style.overflow = ''; // Restore scrolling
            }
        });
        
        // Handle dropdown menus in mobile
        const dropdownParents = document.querySelectorAll('.dropdown-parent');
        dropdownParents.forEach(parent => {
            const trigger = parent.querySelector('.dropdown-trigger');
            const dropdown = parent.querySelector('.mega-dropdown');
            
            if (trigger && dropdown) {
                trigger.addEventListener('click', function(e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // Close other dropdowns
                        dropdownParents.forEach(otherParent => {
                            if (otherParent !== parent) {
                                otherParent.classList.remove('active');
                            }
                        });
                        
                        // Toggle current dropdown
                        parent.classList.toggle('active');
                    }
                });
            }
        });
        
        // Close mobile menu when clicking on regular links (not dropdown triggers)
        const navLinkItems = navLinks.querySelectorAll('a:not(.dropdown-trigger)');
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    const icon = mobileToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    body.style.overflow = '';
                    
                    // Close all dropdowns
                    dropdownParents.forEach(parent => {
                        parent.classList.remove('active');
                    });
                }
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navLinks.contains(event.target) && !mobileToggle.contains(event.target)) {
                navLinks.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                body.style.overflow = '';
                
                // Close all dropdowns
                dropdownParents.forEach(parent => {
                    parent.classList.remove('active');
                });
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                body.style.overflow = '';
                
                // Close all dropdowns
                dropdownParents.forEach(parent => {
                    parent.classList.remove('active');
                });
            }
        });
        
        // Prevent scrolling issues on mobile
        navLinks.addEventListener('touchmove', function(e) {
            e.stopPropagation();
        });
        
        // Handle escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                body.style.overflow = '';
                
                // Close all dropdowns
                dropdownParents.forEach(parent => {
                    parent.classList.remove('active');
                });
            }
        });
    }
});