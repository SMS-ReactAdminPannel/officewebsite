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

})



  const track = document.getElementById("logoTrack");
  const slides = document.querySelectorAll(".logo-slide");
  let current = 0;

  function updateSlider() {
    const slideWidth = slides[0].offsetWidth + 64; // 64px = gap-4rem
    track.style.transform = `translateX(${-slideWidth * current}px)`;

    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === current);
    });
  }

  function slideNext() {
    if (current < slides.length - 1) {
      current++;
      updateSlider();
    }
  }

  function slidePrev() {
    if (current > 0) {
      current--;
      updateSlider();
    }
  }

  window.addEventListener("load", updateSlider);

