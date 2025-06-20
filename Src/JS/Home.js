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
