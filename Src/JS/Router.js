// Simple SPA Router
class Router {
    constructor() {
        this.routes = {
            '/': 'Home',
            '/home': 'Home',
            '/about': 'About',
            '/careers': 'Careers',
            '/contact': 'Contact',
            '/overview': 'Overview'
        };
        
        this.init();
    }
    
    init() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            this.handleRoute(window.location.pathname);
        });
        
        // Handle initial page load
        this.handleRoute(window.location.pathname);
        
        // Make router globally available
        window.router = this;
    }
    
    navigate(path) {
        // Update browser history
        history.pushState(null, null, path);
        this.handleRoute(path);
    }
    
    handleRoute(path) {
        // Default to home if path not found
        const pageName = this.routes[path] || this.routes['/'];
        
        if (pageName) {
            this.loadPage(pageName);
        } else {
            console.error('Route not found:', path);
            this.loadPage('Home');
        }
    }
    
    loadPage(pageName) {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
            loadingScreen.classList.remove('hidden');
        }
        
        fetch(`Src/HTML/${pageName}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Page ${pageName} not found!`);
                }
                return response.text();
            })
            .then(data => {
                document.getElementById("main-content").innerHTML = data;
                
                // Update page title
                document.title = `${pageName} - Yoho Technologies`;
                
                // Hide loading screen
                if (loadingScreen) {
                    setTimeout(function() {
                        loadingScreen.classList.add('hidden');
                        setTimeout(function() {
                            loadingScreen.style.display = 'none';
                        }, 500);
                    }, 300);
                }
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                // Initialize page scripts
                if (window.initPageScripts) {
                    window.initPageScripts();
                }
                
                // Load page-specific scripts
                this.loadPageScript(pageName);
            })
            .catch(error => {
                console.error('Error loading page:', error);
                document.getElementById("main-content").innerHTML = `
                    <div class="error-container" style="text-align: center; padding: 50px;">
                        <h2>Page Not Found</h2>
                        <p>Sorry, the requested page could not be loaded.</p>
                        <button onclick="router.navigate('/')" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">Return to Home</button>
                    </div>
                `;
                
                if (loadingScreen) {
                    setTimeout(function() {
                        loadingScreen.classList.add('hidden');
                        setTimeout(function() {
                            loadingScreen.style.display = 'none';
                        }, 500);
                    }, 300);
                }
            });
    }
    
    loadPageScript(pageName) {
        // Remove existing page script if any
        const existingScript = document.getElementById('page-script');
        if (existingScript) {
            existingScript.remove();
        }
        
        // Load page-specific script if it exists
        const script = document.createElement('script');
        script.id = 'page-script';
        script.src = `Src/JS/${pageName}.js`;
        script.onerror = function() {
            // Script doesn't exist, that's okay
            console.log(`No specific script found for ${pageName} page`);
        };
        document.head.appendChild(script);
    }
}

// Initialize router when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new Router();
});