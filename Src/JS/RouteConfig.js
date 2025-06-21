// Route Configuration for Yoho Technologies Website
const RouteConfig = {
    // Main routes mapping
    routes: {
        // Home routes
        '/': 'Home',
        '/home': 'Home',
        '/index': 'Home',
        
        // About routes
        '/about': 'About',
        '/about-us': 'About',
        '/who-we-are': 'About',
        
        // Services routes
        '/services': 'Overview',
        '/overview': 'Overview',
        '/what-we-do': 'Overview',
        
        // Career routes
        '/careers': 'Careers',
        '/jobs': 'Careers',
        '/join-us': 'Careers',
        
        // Contact routes
        '/contact': 'Contact',
        '/contact-us': 'Contact',
        '/get-in-touch': 'Contact',
        
        // Industry routes (redirect to overview for now)
        '/industries': 'Overview',
        '/fintech': 'Overview',
        '/healthcare': 'Overview',
        '/ecommerce': 'Overview',
        '/education': 'Overview'
    },
    
    // Page metadata
    pageMetadata: {
        'Home': {
            title: 'Yoho Technologies - Best Web Design and Development Company in Chennai',
            description: 'Leading web design and development company in Chennai. We create innovative digital solutions for businesses worldwide.',
            keywords: 'web design, web development, Chennai, digital solutions, mobile apps',
            canonical: '/'
        },
        'About': {
            title: 'About Us - Yoho Technologies',
            description: 'Learn about Yoho Technologies - our story, mission, and the team behind innovative digital solutions.',
            keywords: 'about yoho technologies, company story, team, mission',
            canonical: '/about'
        },
        'Overview': {
            title: 'Our Services - Yoho Technologies',
            description: 'Comprehensive digital services including web development, mobile apps, UI/UX design, and digital marketing.',
            keywords: 'web services, mobile development, UI UX design, digital marketing',
            canonical: '/services'
        },
        'Careers': {
            title: 'Careers - Join Yoho Technologies',
            description: 'Join our team of innovative professionals. Explore career opportunities at Yoho Technologies.',
            keywords: 'careers, jobs, yoho technologies jobs, software developer jobs',
            canonical: '/careers'
        },
        'Contact': {
            title: 'Contact Us - Yoho Technologies',
            description: 'Get in touch with Yoho Technologies. Contact us for your digital solution needs.',
            keywords: 'contact yoho technologies, get quote, digital solutions contact',
            canonical: '/contact'
        }
    },
    
    // Navigation structure
    navigation: {
        primary: [
            { name: 'Home', path: '/', page: 'Home' },
            { name: 'Who We Are', path: '/about', page: 'About' },
            { name: 'What We Do', path: '/services', page: 'Overview', hasDropdown: true },
            { name: 'Industries', path: '/industries', page: 'Overview', hasDropdown: true },
            { name: 'Careers', path: '/careers', page: 'Careers' },
            { name: 'Contact Us', path: '/contact', page: 'Contact' }
        ],
        
        services: {
            'overview': {
                title: 'Our Services Overview',
                items: [
                    'Website Design & Development',
                    'Mobile App Development',
                    'Digital Marketing Solutions',
                    'E-Commerce Solutions',
                    'Custom Software Development',
                    'UI/UX Design Services',
                    'Cloud Solutions',
                    'SEO & Analytics',
                    'Consulting Services'
                ]
            },
            'website-design': {
                title: 'Website Design',
                items: [
                    'Static Website Designing',
                    'Dynamic Website Designing',
                    'Corporate Website Designing',
                    'Professional Website Designing',
                    'Customized Website Designing',
                    'Website Re-Designing',
                    'Responsive Website Designing',
                    'Angular JS Website Designing',
                    'Landing Page Designing'
                ]
            },
            'website-development': {
                title: 'Website Development',
                items: [
                    'Web Application Development',
                    'PHP Website Development',
                    'Web Portal Development',
                    'E-Commerce Website Development',
                    'React JS Development',
                    'WordPress Development',
                    'PHP Application Development',
                    'OpenSource Framework'
                ]
            },
            'mobile-solutions': {
                title: 'Mobile App Development',
                items: [
                    'Hybrid Apps Development',
                    'Android Apps Development',
                    'iPhone Apps Development',
                    'Cross Platform Apps Development',
                    'Mobile Apps Upgradation',
                    'Mobile Apps Re-Design'
                ]
            },
            'digital-marketing': {
                title: 'Digital Marketing',
                items: [
                    'Market Research and Analysis',
                    'Content Writing Services',
                    'Search Engine Optimization',
                    'Search Engine Marketing',
                    'Social Media Optimization',
                    'Social Media Marketing',
                    'E-Mail Marketing',
                    'SMS Marketing',
                    'Lead Generation',
                    'Google PPC'
                ]
            }
        },
        
        industries: {
            'fintech': {
                title: 'FinTech Solutions',
                items: [
                    'Banking Solutions',
                    'Payment Gateways',
                    'Digital Wallets',
                    'Investment Platforms',
                    'Insurance Tech',
                    'Blockchain Solutions'
                ]
            },
            'healthcare': {
                title: 'HealthTech Solutions',
                items: [
                    'Telemedicine Platforms',
                    'Health Management Systems',
                    'Medical Records',
                    'Fitness Apps',
                    'Healthcare Analytics',
                    'Medical IoT'
                ]
            },
            'ecommerce': {
                title: 'E-Commerce Solutions',
                items: [
                    'Online Marketplaces',
                    'B2B Platforms',
                    'Inventory Management',
                    'Order Management',
                    'Customer Analytics',
                    'Multi-vendor Systems'
                ]
            },
            'education': {
                title: 'EdTech Solutions',
                items: [
                    'Learning Management Systems',
                    'Online Course Platforms',
                    'Student Information Systems',
                    'Virtual Classrooms',
                    'Assessment Tools',
                    'Educational Apps'
                ]
            }
        }
    },
    
    // Redirect rules
    redirects: {
        '/index.html': '/',
        '/home.html': '/',
        '/about.html': '/about',
        '/services.html': '/services',
        '/careers.html': '/careers',
        '/contact.html': '/contact'
    },
    
    // 404 handling
    notFound: {
        page: 'Home',
        redirect: '/',
        message: 'Page not found. Redirecting to home page...'
    },
    
    // SEO settings
    seo: {
        defaultTitle: 'Yoho Technologies',
        titleSeparator: ' - ',
        defaultDescription: 'Innovative digital solutions for modern businesses',
        defaultKeywords: 'web development, mobile apps, digital marketing, Chennai',
        ogImage: '/Src/Assets/yoho-og-image.jpg',
        twitterCard: 'summary_large_image'
    }
};

// Utility functions for route configuration
const RouteUtils = {
    // Get page name from path
    getPageFromPath(path) {
        const normalizedPath = path.toLowerCase().replace(/\/$/, '') || '/';
        return RouteConfig.routes[normalizedPath] || null;
    },
    
    // Get metadata for a page
    getPageMetadata(pageName) {
        return RouteConfig.pageMetadata[pageName] || RouteConfig.pageMetadata['Home'];
    },
    
    // Check if path needs redirect
    getRedirect(path) {
        return RouteConfig.redirects[path] || null;
    },
    
    // Get navigation items
    getNavigation() {
        return RouteConfig.navigation;
    },
    
    // Validate route
    isValidRoute(path) {
        const normalizedPath = path.toLowerCase().replace(/\/$/, '') || '/';
        return RouteConfig.routes.hasOwnProperty(normalizedPath);
    },
    
    // Get all available routes
    getAllRoutes() {
        return Object.keys(RouteConfig.routes);
    },
    
    // Generate sitemap data
    generateSitemap() {
        return Object.entries(RouteConfig.routes).map(([path, page]) => ({
            path,
            page,
            metadata: RouteConfig.pageMetadata[page] || {}
        }));
    }
};

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.RouteConfig = RouteConfig;
    window.RouteUtils = RouteUtils;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RouteConfig, RouteUtils };
}