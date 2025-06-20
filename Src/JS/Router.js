// Enhanced SPA Router for Yoho Technologies
class YohoRouter {
    constructor() {
        this.routes = {
            '/': 'Home',
            '/home': 'Home',
            '/about': 'About',
            '/careers': 'Careers',
            '/contact': 'Contact',
            '/overview': 'Overview',
            '/services': 'Overview', // Services redirects to Overview
            '/industries': 'Overview' // Industries also redirects to Overview for now
        };
        
        this.currentPage = null;
        this.loadingScreen = null;
        this.mainContent = null;
        this.init();
    }
    
    init() {
        // Cache DOM elements
        this.loadingScreen = document.getElementById('loading-screen');
        this.mainContent = document.getElementById('main-content');
        
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            const path = window.location.pathname;
            this.handleRoute(path, false); // false = don't push to history
        });
        
        // Handle initial page load
        const initialPath = window.location.pathname;
        this.handleRoute(initialPath, false);
        
        // Make router globally available
        window.router = this;
        window.navigateTo = this.navigate.bind(this);
        
        console.log('🚀 Yoho Router initialized');
    }
    
    navigate(path, pushState = true) {
        // Normalize path
        path = this.normalizePath(path);
        
        // Update browser history if needed
        if (pushState && path !== window.location.pathname) {
            history.pushState({ path }, null, path);
        }
        
        this.handleRoute(path, false);
    }
    
    normalizePath(path) {
        // Remove trailing slashes except for root
        if (path !== '/' && path.endsWith('/')) {
            path = path.slice(0, -1);
        }
        
        // Ensure path starts with /
        if (!path.startsWith('/')) {
            path = '/' + path;
        }
        
        return path.toLowerCase();
    }
    
    handleRoute(path, pushState = true) {
        path = this.normalizePath(path);
        
        // Find matching route
        const pageName = this.routes[path] || this.routes['/'];
        
        if (pageName) {
            this.loadPage(pageName, path);
        } else {
            console.warn(`Route not found: ${path}`);
            this.loadPage('Home', '/');
        }
    }
    
    async loadPage(pageName, path = null) {
        // Prevent loading the same page
        if (this.currentPage === pageName) {
            return;
        }
        
        console.log(`📄 Loading page: ${pageName}`);
        
        // Show loading screen
        this.showLoading();
        
        try {
            // Load page content
            const response = await fetch(`Src/HTML/${pageName}.html`);
            
            if (!response.ok) {
                throw new Error(`Failed to load ${pageName}: ${response.status}`);
            }
            
            const html = await response.text();
            
            // Update content
            if (this.mainContent) {
                this.mainContent.innerHTML = html;
            }
            
            // Update page title
            this.updatePageTitle(pageName);
            
            // Update current page
            this.currentPage = pageName;
            
            // Update navigation active states
            this.updateNavigation(path || `/${pageName.toLowerCase()}`);
            
            // Hide loading screen
            setTimeout(() => {
                this.hideLoading();
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                // Initialize page-specific scripts
                this.initPageScripts(pageName);
                
            }, 300);
            
        } catch (error) {
            console.error('Error loading page:', error);
            this.showErrorPage(error.message);
            this.hideLoading();
        }
    }
    
    showLoading() {
        if (this.loadingScreen) {
            this.loadingScreen.style.display = 'flex';
            this.loadingScreen.classList.remove('hidden');
        }
    }
    
    hideLoading() {
        if (this.loadingScreen) {
            this.loadingScreen.classList.add('hidden');
            setTimeout(() => {
                this.loadingScreen.style.display = 'none';
            }, 500);
        }
    }
    
    updatePageTitle(pageName) {
        const titles = {
            'Home': 'Yoho Technologies - Best Web Design and Development Company in Chennai',
            'About': 'About Us - Yoho Technologies',
            'Careers': 'Careers - Yoho Technologies',
            'Contact': 'Contact Us - Yoho Technologies',
            'Overview': 'Our Services - Yoho Technologies'
        };
        
        document.title = titles[pageName] || `${pageName} - Yoho Technologies`;
    }
    
    updateNavigation(currentPath) {
        // Update navbar active states
        const navLinks = document.querySelectorAll('[data-page]');
        navLinks.forEach(link => {
            const page = link.getAttribute('data-page');
            const linkPath = `/${page.toLowerCase()}`;
            
            if (linkPath === currentPath || (currentPath === '/' && page === 'Home')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    initPageScripts(pageName) {
        // Remove existing page script
        const existingScript = document.getElementById('page-script');
        if (existingScript) {
            existingScript.remove();
        }
        
        // Load page-specific script if it exists
        const script = document.createElement('script');
        script.id = 'page-script';
        script.src = `Src/JS/${pageName}.js`;
        script.onerror = () => {
            console.log(`No specific script found for ${pageName} page`);
        };
        script.onload = () => {
            console.log(`✅ Loaded script for ${pageName}`);
        };
        
        document.head.appendChild(script);
        
        // Call global page initialization if available
        if (window.initPageScripts && typeof window.initPageScripts === 'function') {
            window.initPageScripts();
        }
    }
    
    showErrorPage(errorMessage) {
        if (this.mainContent) {
            this.mainContent.innerHTML = `
                <div class="error-container" style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 60vh;
                    text-align: center;
                    padding: 2rem;
                    background: #000;
                    color: #fff;
                ">
                    <div style="
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        border-radius: 12px;
                        padding: 3rem;
                        max-width: 500px;
                        width: 100%;
                    ">
                        <i class="fas fa-exclamation-triangle" style="
                            font-size: 4rem;
                            color: #ff6b6b;
                            margin-bottom: 1.5rem;
                        "></i>
                        <h2 style="margin-bottom: 1rem; font-size: 1.5rem;">Page Not Found</h2>
                        <p style="margin-bottom: 2rem; color: rgba(255, 255, 255, 0.8);">
                            ${errorMessage || 'Sorry, the requested page could not be loaded.'}
                        </p>
                        <button onclick="router.navigate('/')" style="
                            background: linear-gradient(135deg, #3aed6a, #15de79);
                            color: #001833;
                            border: none;
                            padding: 0.75rem 2rem;
                            border-radius: 8px;
                            font-weight: 600;
                            cursor: pointer;
                            transition: all 0.3s ease;
                        " onmouseover="this.style.transform='translateY(-2px)'" 
                           onmouseout="this.style.transform='translateY(0)'">
                            Return to Home
                        </button>
                    </div>
                </div>
            `;
        }
    }
    
    // Utility methods
    getCurrentPage() {
        return this.currentPage;
    }
    
    getCurrentPath() {
        return window.location.pathname;
    }
    
    getAvailableRoutes() {
        return Object.keys(this.routes);
    }
    
    addRoute(path, pageName) {
        this.routes[this.normalizePath(path)] = pageName;
        console.log(`➕ Added route: ${path} -> ${pageName}`);
    }
    
    removeRoute(path) {
        delete this.routes[this.normalizePath(path)];
        console.log(`➖ Removed route: ${path}`);
    }
}

// Initialize router when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for other scripts to load
    setTimeout(() => {
        window.yohoRouter = new YohoRouter();
    }, 100);
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = YohoRouter;
}