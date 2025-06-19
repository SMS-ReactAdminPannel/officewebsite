  // document.querySelector('.search-button').addEventListener('click', () => {
  //   alert("Search clicked!");
  // });

$(document).ready(function() {
  // Video toggle functionality
  $('#video-toggle-btn').click(function(e) {
    e.preventDefault();
    const videoContent = $('#video-content');
    const heroVideo = $('#hero-video');
    
    if (videoContent.hasClass('active')) {
      videoContent.removeClass('active');
      heroVideo.show();
    } else {
      videoContent.addClass('active');
      heroVideo.hide();
    }
  });

  // Return to video button
  $('#return-to-video-btn').click(function() {
    const videoContent = $('#video-content');
    const heroVideo = $('#hero-video');
    
    videoContent.removeClass('active');
    heroVideo.show();
  });

  // Job search form submission
  $('#job-search-form').submit(function(e) {
    e.preventDefault();
    const keyword = $('#job-keyword').val();
    const region = $('#job-region').val();
    const location = $('#job-location').val();
    
    if (keyword || region || location) {
      alert('Search functionality would be implemented here with: ' + 
            '\nKeyword: ' + keyword + 
            '\nRegion: ' + region + 
            '\nLocation: ' + location);
    } else {
      alert('Please enter at least one search criteria.');
    }
  });

  // Contact form submission
  $('#contact-form').submit(function(e) {
    e.preventDefault();
    const formData = {
      name: $('input[name="name"]').val(),
      email: $('input[name="email"]').val(),
      subject: $('input[name="subject"]').val(),
      message: $('textarea[name="message"]').val()
    };
    
    // Here you would typically send the data to a server
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
  });

  // Smooth scrolling for anchor links
  $('a[href^="#"]').click(function(e) {
    e.preventDefault();
    const target = $(this.getAttribute('href'));
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top - 100
      }, 1000);
    }
  });

  // Feature cards animation on scroll
  function animateOnScroll() {
    $('.feature-card').each(function() {
      const elementTop = $(this).offset().top;
      const elementBottom = elementTop + $(this).outerHeight();
      const viewportTop = $(window).scrollTop();
      const viewportBottom = viewportTop + $(window).height();
      
      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        $(this).addClass('visible');
      }
    });
  }

  // Trigger animation on scroll
  $(window).scroll(animateOnScroll);
  animateOnScroll(); // Initial check

  // Portfolio item hover effects
  $('.portfolio-item').hover(
    function() {
      $(this).find('.portfolio-overlay').fadeIn(300);
    },
    function() {
      $(this).find('.portfolio-overlay').fadeOut(300);
    }
  );

  // Testimonials slider (simple auto-scroll)
  let currentTestimonial = 0;
  const testimonials = $('.testimonial-card');
  const totalTestimonials = testimonials.length;

  function showTestimonial(index) {
    testimonials.removeClass('active');
    testimonials.eq(index).addClass('active');
  }

  function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
  }

  // Auto-rotate testimonials every 5 seconds
  setInterval(nextTestimonial, 5000);
  showTestimonial(0); // Show first testimonial initially

  // Add loading animation to buttons
  $('.hero-cta, .vision-cta, .submit-btn').click(function() {
    const button = $(this);
    const originalText = button.text();
    
    if (!button.hasClass('loading')) {
      button.addClass('loading').text('Loading...');
      
      setTimeout(function() {
        button.removeClass('loading').text(originalText);
      }, 2000);
    }
  });

  // Add glowing animation to video container
  function addGlowPulse() {
    $('.hero-video-container').css({
      'animation': 'glowPulse 4s infinite alternate ease-in-out'
    });
  }

  // Initialize glow animation
  addGlowPulse();

  // Add CSS for glow animation
  const glowAnimation = `
    @keyframes glowPulse {
      0% {
        box-shadow: 0 0 20px rgba(21, 222, 121, 0.3);
      }
      100% {
        box-shadow: 0 0 40px rgba(21, 222, 121, 0.6), 0 0 60px rgba(39, 133, 221, 0.4);
      }
    }
  `;

  // Add the animation to the page
  if (!$('#glow-animation').length) {
    $('<style id="glow-animation">' + glowAnimation + '</style>').appendTo('head');
  }

  // Navbar scroll effect (if you add a navbar later)
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.navbar').addClass('scrolled');
    } else {
      $('.navbar').removeClass('scrolled');
    }
  });

  // Add fade-in animation to sections on scroll
  function fadeInOnScroll() {
    $('.services-section, .products-section, .work-process-section, .why-choose-section, .testimonials-section, .portfolio-section, .contact-section').each(function() {
      const elementTop = $(this).offset().top;
      const elementBottom = elementTop + $(this).outerHeight();
      const viewportTop = $(window).scrollTop();
      const viewportBottom = viewportTop + $(window).height();
      
      if (elementBottom > viewportTop && elementTop < viewportBottom - 100) {
        $(this).addClass('fade-in');
      }
    });
  }

  $(window).scroll(fadeInOnScroll);
  fadeInOnScroll(); // Initial check

  // Scroll progress indicator
  function updateScrollProgress() {
    const scrollTop = $(window).scrollTop();
    const docHeight = $(document).height() - $(window).height();
    const scrollPercent = (scrollTop / docHeight) * 100;
    $('#scroll-progress').css('width', scrollPercent + '%');
  }

  $(window).scroll(updateScrollProgress);

  // Back to top button
  function toggleBackToTop() {
    if ($(window).scrollTop() > 300) {
      $('#back-to-top').addClass('visible');
    } else {
      $('#back-to-top').removeClass('visible');
    }
  }

  $(window).scroll(toggleBackToTop);

  $('#back-to-top').click(function(e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 1000);
  });

  // Initialize scroll-based functions
  updateScrollProgress();
  toggleBackToTop();

  // Add parallax effect to hero section
  $(window).scroll(function() {
    const scrolled = $(this).scrollTop();
    const parallax = $('.hero-section');
    const speed = 0.5;
    
    parallax.css('transform', 'translateY(' + (scrolled * speed) + 'px)');
  });

  // Add typing effect to hero code text
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.html('');
    
    function type() {
      if (i < text.length) {
        element.html(element.html() + text.charAt(i));
        i++;
        setTimeout(type, speed);
      }
    }
    
    type();
  }

  // Initialize typing effect after page load
  setTimeout(function() {
    const heroCodeText = $('.hero-code-text');
    const originalText = heroCodeText.text();
    typeWriter(heroCodeText, originalText, 80);
  }, 1000);

  // Add number counter animation
  function animateCounters() {
    $('.counter').each(function() {
      const $this = $(this);
      const countTo = $this.attr('data-count');
      
      $({ countNum: $this.text() }).animate({
        countNum: countTo
      }, {
        duration: 2000,
        easing: 'linear',
        step: function() {
          $this.text(Math.floor(this.countNum));
        },
        complete: function() {
          $this.text(this.countNum);
        }
      });
    });
  }

  // Trigger counter animation when in view
  $(window).scroll(function() {
    $('.counter').each(function() {
      const elementTop = $(this).offset().top;
      const viewportBottom = $(window).scrollTop() + $(window).height();
      
      if (elementTop < viewportBottom && !$(this).hasClass('animated')) {
        $(this).addClass('animated');
        animateCounters();
      }
    });
  });

  // Add smooth reveal animation for cards
  function revealCards() {
    $('.service-card, .product-card, .choose-card, .portfolio-item').each(function(index) {
      const $this = $(this);
      const elementTop = $this.offset().top;
      const viewportBottom = $(window).scrollTop() + $(window).height();
      
      if (elementTop < viewportBottom - 100 && !$this.hasClass('revealed')) {
        setTimeout(function() {
          $this.addClass('revealed');
        }, index * 100);
      }
    });
  }

  $(window).scroll(revealCards);
  revealCards(); // Initial check

  // Add CSS for reveal animation - make cards visible by default
  const revealAnimation = `
    .service-card,
    .product-card,
    .choose-card,
    .portfolio-item {
      opacity: 1;
      transform: translateY(0);
      transition: all 0.6s ease;
    }
    
    .service-card:hover,
    .product-card:hover,
    .choose-card:hover,
    .portfolio-item:hover {
      transform: translateY(-5px);
    }
  `;

  if (!$('#reveal-animation').length) {
    $('<style id="reveal-animation">' + revealAnimation + '</style>').appendTo('head');
  }

  // Make sure all sections are visible immediately
  $('.services-section, .products-section, .work-process-section, .why-choose-section, .testimonials-section, .portfolio-section, .contact-section').css({
    'opacity': '1',
    'transform': 'translateY(0)'
  });
});