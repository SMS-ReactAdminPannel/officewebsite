  // document.querySelector('.search-button').addEventListener('click', () => {
  //   alert("Search clicked!");
  // });

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing animations...');
    
    const featuresSection = document.getElementById('features-section');
    const featureCards = document.querySelectorAll('.feature-card');
    
    console.log('Found', featureCards.length, 'feature cards');
    
    featureCards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(50px)';
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            console.log('Section intersection:', entry.isIntersecting);
            if (entry.isIntersecting) {
                console.log('Triggering animations...');
                animateCards();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, 
        rootMargin: '0px 0px -100px 0px' 
    });
    
    if (featuresSection) {
        observer.observe(featuresSection);
        console.log('Started observing features section');
    } else {
        console.log('Features section not found!');
        setTimeout(animateCards, 1000);
    }
    
    function animateCards() {
        console.log('Animating cards...');
        featureCards.forEach((card, index) => {
            setTimeout(() => {
                console.log('Animating card', index);
                card.classList.add('animate');
                card.classList.add('visible');
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150); 
        });
    }
    
    let animationTriggered = false;
    window.addEventListener('scroll', function() {
        if (!animationTriggered && featuresSection) {
            const rect = featuresSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight && rect.bottom > 0) {
                console.log('Scroll fallback triggered');
                animationTriggered = true;
                animateCards();
            }
        }
    });
    
    const seeMoreButtons = document.querySelectorAll('.see-more');
    seeMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('See more clicked for:', this.parentElement.querySelector('h3').textContent);
        });
    });
    
    const learnMoreLink = document.querySelector('.learn-more');
    if (learnMoreLink) {
        learnMoreLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Learn more clicked');
        });
    }
});