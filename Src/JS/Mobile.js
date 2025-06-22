document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Toggle mobile menu
    function toggleMobileMenu() {
        const isActive = navLinks.classList.toggle('active');
        body.classList.toggle('menu-open', isActive);

        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.toggle('fa-bars', !isActive);
        icon.classList.toggle('fa-times', isActive);

        mobileMenuToggle.setAttribute('aria-expanded', isActive);
    }

    function closeMobileMenu() {
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');

        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');

        mobileMenuToggle.setAttribute('aria-expanded', 'false');

        // Close all dropdowns
        document.querySelectorAll('.dropdown-parent.open').forEach(parent => {
            parent.classList.remove('open');
        });
    }

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);

        // Close on nav link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Close menu on outside click
        document.addEventListener('click', function (event) {
            if (
                !navLinks.contains(event.target) &&
                !mobileMenuToggle.contains(event.target)
            ) {
                closeMobileMenu();
            }
        });
    }

    // Dropdown toggle (mobile only)
    const dropdownParents = document.querySelectorAll('.dropdown-parent');
    dropdownParents.forEach(parent => {
        const trigger = parent.querySelector('.dropdown-trigger');

        if (trigger) {
            trigger.addEventListener('click', function (e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    parent.classList.toggle('open');
                }
            });
        }
    });

    // Close dropdowns on outside click
    document.addEventListener('click', function (event) {
        dropdownParents.forEach(parent => {
            if (!parent.contains(event.target)) {
                parent.classList.remove('open');
            }
        });
    });

    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        }, 150);
    });

    // Inject scroll lock and dropdown CSS
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

            .dropdown-parent .mega-dropdown {
                display: none;
            }

            .dropdown-parent.open .mega-dropdown {
                display: block;
            }
        }
    `;
    document.head.appendChild(style);
});
