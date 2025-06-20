        let isPlaying = true;
        let isMuted = true;
        const video = document.getElementById('mainVideo');

        function togglePlay() {
            const icon = document.getElementById('playIcon');
            if (isPlaying) {
                video.pause();
                icon.className = 'fas fa-play';
                isPlaying = false;
            } else {
                video.play();
                icon.className = 'fas fa-pause';
                isPlaying = true;
            }
        }

        function toggleSound() {
            const icon = document.getElementById('soundIcon');
            if (isMuted) {
                video.muted = false;
                icon.className = 'fas fa-volume-up';
                isMuted = false;
            } else {
                video.muted = true;
                icon.className = 'fas fa-volume-mute';
                isMuted = true;
            }
        }

        // Add smooth scrolling and interactive effects
        document.addEventListener('DOMContentLoaded', function() {
            // Add hover effects to buttons
            const buttons = document.querySelectorAll('.play-pause-btn, .sound-btn, .cta-button');
            buttons.forEach(button => {
                button.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.05)';
                });
                button.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1)';
                });
            });
        });