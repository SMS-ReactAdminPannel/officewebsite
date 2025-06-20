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


let currentIndex = 0;
  const track = document.getElementById("carousel-track");
  const items = track.children;
  const visibleCount = 5;

  function updateActive() {
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove("active");
    }
    const center = currentIndex + Math.floor(visibleCount / 2);
    if (items[center]) items[center].classList.add("active");
  }

  function moveSlide(direction) {
    const totalItems = items.length;
    if (currentIndex + direction >= 0 && currentIndex + visibleCount + direction <= totalItems) {
      currentIndex += direction;
      const offset = (100 / visibleCount) * currentIndex;
      track.style.transform = `translateX(-${offset}%)`;
      updateActive();

      
    }
  }

    updateActive(); // set initial
