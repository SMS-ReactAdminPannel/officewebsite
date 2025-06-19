// Careers Page JavaScript
class CareersManager {
    constructor() {
        this.jobs = [];
        this.filteredJobs = [];
        this.currentPage = 1;
        this.jobsPerPage = 6;
        this.savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
        this.init();
    }

    init() {
        this.loadJobs();
        this.bindEvents();
        this.updateSavedJobsUI();
        this.animateOnScroll();
    }

    loadJobs() {
        // Sample job data - in a real application, this would come from an API
        this.jobs = [
            {
                id: 1,
                title: "Senior Full Stack Developer",
                department: "software-engineering",
                location: "chennai",
                experience: "senior",
                type: "Full-time",
                badge: "Featured",
                description: "Lead the development of scalable web applications using modern technologies. Work with cross-functional teams to deliver high-quality software solutions that impact millions of users.",
                skills: ["React", "Node.js", "MongoDB", "AWS"],
                posted: "2 days ago"
            },
            {
                id: 2,
                title: "Senior UX Designer",
                department: "design-ux",
                location: "bangalore",
                experience: "mid",
                type: "Full-time",
                badge: "Urgent",
                description: "Design exceptional user experiences for our digital products. Collaborate with product managers and developers to create intuitive interfaces that delight our users.",
                skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
                posted: "1 day ago"
            },
            {
                id: 3,
                title: "Data Scientist",
                department: "data-analytics",
                location: "mumbai",
                experience: "mid",
                type: "Full-time",
                badge: "New",
                description: "Extract insights from complex datasets to drive business decisions. Build predictive models and work with stakeholders to implement data-driven solutions.",
                skills: ["Python", "Machine Learning", "SQL", "Tableau"],
                posted: "3 days ago"
            },
            {
                id: 4,
                title: "Cloud Solutions Architect",
                department: "cloud",
                location: "hyderabad",
                experience: "senior",
                type: "Full-time",
                badge: "Remote",
                description: "Design and implement cloud infrastructure solutions for enterprise clients. Lead cloud migration projects and ensure scalability, security, and cost optimization.",
                skills: ["AWS", "Azure", "Kubernetes", "Terraform"],
                posted: "1 week ago"
            },
            {
                id: 5,
                title: "Cybersecurity Analyst",
                department: "security",
                location: "pune",
                experience: "mid",
                type: "Full-time",
                badge: "Featured",
                description: "Monitor and analyze security threats, implement security measures, and respond to incidents. Help protect our clients' digital assets and maintain their trust.",
                skills: ["SIEM", "Incident Response", "Penetration Testing", "Risk Assessment"],
                posted: "4 days ago"
            },
            {
                id: 6,
                title: "Digital Transformation Consultant",
                department: "consulting",
                location: "delhi",
                experience: "senior",
                type: "Full-time",
                badge: "Hot",
                description: "Guide organizations through their digital transformation journey. Analyze business processes, recommend technology solutions, and lead implementation projects.",
                skills: ["Strategy", "Process Optimization", "Change Management", "Stakeholder Management"],
                posted: "5 days ago"
            },
            {
                id: 7,
                title: "Frontend Developer",
                department: "software-engineering",
                location: "chennai",
                experience: "mid",
                type: "Full-time",
                badge: "New",
                description: "Create beautiful and responsive user interfaces using modern frontend technologies. Collaborate with designers and backend developers to deliver seamless user experiences.",
                skills: ["React", "TypeScript", "CSS3", "Webpack"],
                posted: "2 days ago"
            },
            {
                id: 8,
                title: "Product Manager",
                department: "project-management",
                location: "bangalore",
                experience: "senior",
                type: "Full-time",
                badge: "Featured",
                description: "Drive product strategy and roadmap for our flagship products. Work closely with engineering, design, and business teams to deliver products that customers love.",
                skills: ["Product Strategy", "Agile", "Analytics", "User Research"],
                posted: "1 week ago"
            },
            {
                id: 9,
                title: "AI/ML Engineer",
                department: "ai-ml",
                location: "hyderabad",
                experience: "mid",
                type: "Full-time",
                badge: "Hot",
                description: "Develop and deploy machine learning models to solve complex business problems. Work with large datasets and cutting-edge AI technologies.",
                skills: ["Python", "TensorFlow", "PyTorch", "MLOps"],
                posted: "3 days ago"
            },
            {
                id: 10,
                title: "DevOps Engineer",
                department: "software-engineering",
                location: "remote",
                experience: "mid",
                type: "Full-time",
                badge: "Remote",
                description: "Build and maintain CI/CD pipelines, manage cloud infrastructure, and ensure high availability of our applications. Work with development teams to streamline deployment processes.",
                skills: ["Docker", "Kubernetes", "Jenkins", "AWS"],
                posted: "6 days ago"
            }
        ];

        this.filteredJobs = [...this.jobs];
        this.renderJobs();
    }

    bindEvents() {
        // Search form
        const searchForm = document.getElementById('careers-search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSearch();
            });
        }

        // Department cards
        const departmentCards = document.querySelectorAll('.department-card');
        departmentCards.forEach(card => {
            card.addEventListener('click', () => {
                const department = card.dataset.department;
                this.filterByDepartment(department);
            });
        });

        // Load more button
        const loadMoreBtn = document.getElementById('load-more-jobs');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreJobs();
            });
        }

        // Talent network form
        const talentForm = document.getElementById('talent-network-form');
        if (talentForm) {
            talentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleTalentNetworkSubmission();
            });
        }

        // Hero buttons
        const exploreRolesBtn = document.getElementById('explore-roles-btn');
        if (exploreRolesBtn) {
            exploreRolesBtn.addEventListener('click', () => {
                document.querySelector('.featured-jobs-section').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }

        const joinTalentBtn = document.getElementById('join-talent-network-btn');
        if (joinTalentBtn) {
            joinTalentBtn.addEventListener('click', () => {
                document.querySelector('.talent-network-section').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }
    }

    handleSearch() {
        const formData = new FormData(document.getElementById('careers-search-form'));
        const filters = {
            keyword: formData.get('job-keyword')?.toLowerCase() || '',
            location: formData.get('job-location') || '',
            department: formData.get('job-department') || '',
            experience: formData.get('experience-level') || ''
        };

        this.filteredJobs = this.jobs.filter(job => {
            const matchesKeyword = !filters.keyword || 
                job.title.toLowerCase().includes(filters.keyword) ||
                job.description.toLowerCase().includes(filters.keyword) ||
                job.skills.some(skill => skill.toLowerCase().includes(filters.keyword));

            const matchesLocation = !filters.location || job.location === filters.location;
            const matchesDepartment = !filters.department || job.department === filters.department;
            const matchesExperience = !filters.experience || job.experience === filters.experience;

            return matchesKeyword && matchesLocation && matchesDepartment && matchesExperience;
        });

        this.currentPage = 1;
        this.renderJobs();
        this.showSearchResults();
    }

    filterByDepartment(department) {
        // Update the search form
        const departmentSelect = document.querySelector('select[name="job-department"]');
        if (departmentSelect) {
            departmentSelect.value = department;
        }

        // Trigger search
        this.handleSearch();

        // Scroll to results
        document.querySelector('.featured-jobs-section').scrollIntoView({
            behavior: 'smooth'
        });
    }

    renderJobs() {
        const jobListings = document.getElementById('job-listings');
        if (!jobListings) return;

        const startIndex = 0;
        const endIndex = this.currentPage * this.jobsPerPage;
        const jobsToShow = this.filteredJobs.slice(startIndex, endIndex);

        if (jobsToShow.length === 0) {
            jobListings.innerHTML = `
                <div class="no-jobs-message">
                    <i class="fas fa-search"></i>
                    <h3>No jobs found</h3>
                    <p>Try adjusting your search criteria or browse all available positions.</p>
                    <button class="btn-primary" onclick="careersManager.clearFilters()">View All Jobs</button>
                </div>
            `;
            return;
        }

        jobListings.innerHTML = jobsToShow.map(job => this.createJobCard(job)).join('');
        this.bindJobCardEvents();
        this.updateLoadMoreButton();
    }

    createJobCard(job) {
        const isSaved = this.savedJobs.includes(job.id);
        const badgeClass = job.badge.toLowerCase().replace(' ', '-');
        
        return `
            <div class="job-card fade-in-up" data-department="${job.department}" data-location="${job.location}" data-experience="${job.experience}">
                <div class="job-header">
                    <h3>${job.title}</h3>
                    <span class="job-badge ${badgeClass}">${job.badge}</span>
                </div>
                <div class="job-details">
                    <span class="job-location"><i class="fas fa-map-marker-alt"></i> ${this.formatLocation(job.location)}</span>
                    <span class="job-type"><i class="fas fa-briefcase"></i> ${job.type}</span>
                    <span class="job-experience"><i class="fas fa-user-tie"></i> ${this.formatExperience(job.experience)}</span>
                </div>
                <p>${job.description}</p>
                <div class="job-skills">
                    ${job.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
                <div class="job-meta">
                    <span class="job-posted"><i class="fas fa-clock"></i> Posted ${job.posted}</span>
                </div>
                <div class="job-actions">
                    <button class="apply-btn" data-job-id="${job.id}">Apply Now</button>
                    <button class="save-btn ${isSaved ? 'saved' : ''}" data-job-id="${job.id}">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        `;
    }

    bindJobCardEvents() {
        // Apply buttons
        const applyBtns = document.querySelectorAll('.apply-btn');
        applyBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const jobId = parseInt(e.target.dataset.jobId);
                this.handleJobApplication(jobId);
            });
        });

        // Save buttons
        const saveBtns = document.querySelectorAll('.save-btn');
        saveBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const jobId = parseInt(e.target.dataset.jobId);
                this.toggleSaveJob(jobId, e.target);
            });
        });
    }

    handleJobApplication(jobId) {
        const job = this.jobs.find(j => j.id === jobId);
        if (job) {
            // In a real application, this would redirect to an application form
            this.showNotification(`Application started for ${job.title}`, 'success');
            
            // Simulate opening application form
            setTimeout(() => {
                alert(`Thank you for your interest in the ${job.title} position! In a real application, this would redirect you to our application portal.`);
            }, 500);
        }
    }

    toggleSaveJob(jobId, button) {
        const index = this.savedJobs.indexOf(jobId);
        
        if (index > -1) {
            // Remove from saved jobs
            this.savedJobs.splice(index, 1);
            button.classList.remove('saved');
            this.showNotification('Job removed from saved list', 'info');
        } else {
            // Add to saved jobs
            this.savedJobs.push(jobId);
            button.classList.add('saved');
            this.showNotification('Job saved successfully!', 'success');
        }

        // Update localStorage
        localStorage.setItem('savedJobs', JSON.stringify(this.savedJobs));
    }

    updateSavedJobsUI() {
        const savedBtns = document.querySelectorAll('.save-btn');
        savedBtns.forEach(btn => {
            const jobId = parseInt(btn.dataset.jobId);
            if (this.savedJobs.includes(jobId)) {
                btn.classList.add('saved');
            }
        });
    }

    loadMoreJobs() {
        this.currentPage++;
        this.renderJobs();
    }

    updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('load-more-jobs');
        if (!loadMoreBtn) return;

        const totalShown = this.currentPage * this.jobsPerPage;
        const hasMore = totalShown < this.filteredJobs.length;

        if (hasMore) {
            loadMoreBtn.style.display = 'block';
            loadMoreBtn.textContent = `Load More Jobs (${this.filteredJobs.length - totalShown} remaining)`;
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }

    clearFilters() {
        // Reset form
        const searchForm = document.getElementById('careers-search-form');
        if (searchForm) {
            searchForm.reset();
        }

        // Reset filtered jobs
        this.filteredJobs = [...this.jobs];
        this.currentPage = 1;
        this.renderJobs();
    }

    showSearchResults() {
        const resultsCount = this.filteredJobs.length;
        this.showNotification(`Found ${resultsCount} job${resultsCount !== 1 ? 's' : ''} matching your criteria`, 'info');
    }

    handleTalentNetworkSubmission() {
        // Initialize talent network manager if not already done
        if (!window.talentNetworkManager) {
            window.talentNetworkManager = new TalentNetworkManager();
        }
        
        // The enhanced form submission is handled by TalentNetworkManager
        // This is kept for backward compatibility
        const formData = new FormData(document.getElementById('talent-network-form'));
        
        // Simulate API call
        this.showNotification('Thank you for joining our talent network! We\'ll keep you updated on relevant opportunities.', 'success');
        
        // Reset form
        document.getElementById('talent-network-form').reset();
    }

    formatLocation(location) {
        const locationMap = {
            'chennai': 'Chennai',
            'bangalore': 'Bangalore',
            'mumbai': 'Mumbai',
            'delhi': 'Delhi',
            'hyderabad': 'Hyderabad',
            'pune': 'Pune',
            'remote': 'Remote'
        };
        return locationMap[location] || location;
    }

    formatExperience(experience) {
        const experienceMap = {
            'entry': '0-2 years',
            'mid': '3-5 years',
            'senior': '6-10 years',
            'lead': '10+ years'
        };
        return experienceMap[experience] || experience;
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">&times;</button>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Add close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);

        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
    }

    animateOnScroll() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe elements that should animate
        const animateElements = document.querySelectorAll('.department-card, .job-card, .culture-card, .benefit-item');
        animateElements.forEach(el => observer.observe(el));
    }
}

// Notification styles (add to CSS)
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        padding: 15px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 500px;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        border-left: 4px solid #15de79;
    }

    .notification.show {
        transform: translateX(0);
    }

    .notification-success {
        border-left-color: #15de79;
    }

    .notification-error {
        border-left-color: #ff4757;
    }

    .notification-info {
        border-left-color: #2785dd;
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .notification-content i {
        font-size: 18px;
    }

    .notification-success i {
        color: #15de79;
    }

    .notification-error i {
        color: #ff4757;
    }

    .notification-info i {
        color: #2785dd;
    }

    .notification-close {
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: #666;
        padding: 0;
        margin-left: 15px;
    }

    .notification-close:hover {
        color: #333;
    }

    .no-jobs-message {
        grid-column: 1 / -1;
        text-align: center;
        padding: 60px 20px;
        color: #666;
    }

    .no-jobs-message i {
        font-size: 48px;
        color: #ccc;
        margin-bottom: 20px;
    }

    .no-jobs-message h3 {
        font-size: 24px;
        margin-bottom: 10px;
        color: #333;
    }

    .no-jobs-message p {
        font-size: 16px;
        margin-bottom: 20px;
    }

    .job-meta {
        margin-bottom: 20px;
        font-size: 14px;
        color: #666;
    }

    .job-meta i {
        margin-right: 5px;
        color: #15de79;
    }
`;

// Add notification styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Enhanced Talent Network Manager
class TalentNetworkManager {
    constructor() {
        this.uploadedFiles = {
            resume: [],
            portfolio: []
        };
        this.skills = [];
        this.init();
    }

    init() {
        this.bindFileUploadEvents();
        this.bindSkillsInput();
        this.bindFormSubmission();
    }

    bindFileUploadEvents() {
        // Resume upload only (simplified version)
        this.setupFileUpload('resumeUpload', 'resumeFile', 'resumeFiles', 'resume', false);
    }

    setupFileUpload(uploadAreaId, fileInputId, filesContainerId, type, multiple) {
        const uploadArea = document.getElementById(uploadAreaId);
        const fileInput = document.getElementById(fileInputId);
        const filesContainer = document.getElementById(filesContainerId);

        if (!uploadArea || !fileInput || !filesContainer) return;

        // Click to upload
        uploadArea.addEventListener('click', () => fileInput.click());

        // Drag and drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const files = Array.from(e.dataTransfer.files);
            this.handleFiles(files, type, multiple, filesContainer);
        });

        // File input change
        fileInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            this.handleFiles(files, type, multiple, filesContainer);
        });
    }

    handleFiles(files, type, multiple, container) {
        const maxSize = type === 'resume' ? 5 * 1024 * 1024 : 10 * 1024 * 1024; // 5MB for resume, 10MB for portfolio
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        
        if (type === 'portfolio') {
            allowedTypes.push('application/zip');
        }

        files.forEach(file => {
            // Validate file size
            if (file.size > maxSize) {
                this.showNotification(`File ${file.name} is too large. Maximum size is ${maxSize / (1024 * 1024)}MB.`, 'error');
                return;
            }

            // Validate file type
            if (!allowedTypes.includes(file.type)) {
                this.showNotification(`File ${file.name} has an unsupported format.`, 'error');
                return;
            }

            // Check if it's resume and already has one
            if (type === 'resume' && this.uploadedFiles.resume.length > 0) {
                this.uploadedFiles.resume = []; // Replace existing resume
                container.innerHTML = '';
            }

            // Add file to uploaded files
            this.uploadedFiles[type].push(file);
            this.displayFile(file, type, container);
        });
    }

    displayFile(file, type, container) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <div class="file-info">
                <i class="fas fa-file-${this.getFileIcon(file.type)} file-icon"></i>
                <div class="file-details">
                    <div class="file-name">${file.name}</div>
                    <div class="file-size">${this.formatFileSize(file.size)}</div>
                </div>
            </div>
            <button type="button" class="file-remove" onclick="talentNetworkManager.removeFile('${file.name}', '${type}', this.parentElement)">
                <i class="fas fa-times"></i>
            </button>
        `;
        container.appendChild(fileItem);
    }

    removeFile(fileName, type, element) {
        this.uploadedFiles[type] = this.uploadedFiles[type].filter(file => file.name !== fileName);
        element.remove();
    }

    getFileIcon(mimeType) {
        if (mimeType.includes('pdf')) return 'pdf';
        if (mimeType.includes('word')) return 'word';
        if (mimeType.includes('zip')) return 'archive';
        return 'alt';
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    bindSkillsInput() {
        // Simplified skills input - just a regular text input
        const skillsInput = document.getElementById('skills');
        if (skillsInput) {
            // No special handling needed for simplified version
            // Skills are entered as comma-separated text
        }
    }

    addSkill(skill, container) {
        // Not used in simplified version
    }

    removeSkill(skill, element) {
        // Not used in simplified version
    }

    bindFormSubmission() {
        const form = document.getElementById('talent-network-form');
        const submitBtn = document.getElementById('submitBtn');

        if (!form || !submitBtn) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Validate required files
            if (this.uploadedFiles.resume.length === 0) {
                this.showNotification('Please upload your resume to continue.', 'error');
                return;
            }

            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            try {
                await this.submitForm(form);
                this.showNotification('Thank you for joining our talent network! We\'ll review your profile and get back to you soon.', 'success');
                form.reset();
                this.resetForm();
            } catch (error) {
                this.showNotification('There was an error submitting your application. Please try again.', 'error');
            } finally {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        });
    }

    async submitForm(form) {
        const formData = new FormData(form);
        
        // Add uploaded files
        this.uploadedFiles.resume.forEach(file => {
            formData.append('resume', file);
        });

        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form submitted with data:', Object.fromEntries(formData));
                resolve();
            }, 2000);
        });
    }

    resetForm() {
        this.uploadedFiles = { resume: [] };
        const resumeFiles = document.getElementById('resumeFiles');
        
        if (resumeFiles) resumeFiles.innerHTML = '';
    }

    showNotification(message, type) {
        // Use the existing notification system from careers manager
        if (window.careersManager) {
            window.careersManager.showNotification(message, type);
        } else {
            alert(message);
        }
    }
}

// Initialize careers manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.careersManager = new CareersManager();
    window.talentNetworkManager = new TalentNetworkManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CareersManager, TalentNetworkManager };
}