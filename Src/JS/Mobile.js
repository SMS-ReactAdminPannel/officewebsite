// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const body = document.body;

    // Toggle mobile menu
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            body.classList.toggle('menu-open');
            
            // Change hamburger to X
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking on a link
        const navLinkItems = navLinks.querySelectorAll('a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navLinks.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Handle dropdown menus on mobile
    const dropdownParents = document.querySelectorAll('.dropdown-parent');
    dropdownParents.forEach(parent => {
        const trigger = parent.querySelector('.dropdown-trigger');
        const dropdown = parent.querySelector('.mega-dropdown');
        
        if (trigger && dropdown) {
            trigger.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                }
            });
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
            const icon = mobileMenuToggle?.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            // Reset dropdown displays
            const dropdowns = document.querySelectorAll('.mega-dropdown');
            dropdowns.forEach(dropdown => {
                dropdown.style.display = '';
            });
        }
    });
});

// Prevent body scroll when mobile menu is open
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        body.menu-open {
            overflow: hidden;
        }
        
        @media (max-width: 768px) {
            .nav-links.active {
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
            }
        }
    `;
    document.head.appendChild(style);
});