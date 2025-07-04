document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');
  let lastScroll = 0;
  
  function updateHeader() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Only update if scroll direction changed significantly
    if (Math.abs(currentScroll - lastScroll) > 5) {
      header.classList.toggle('scrolled', currentScroll > 40);
      lastScroll = currentScroll;
    }
  }
  
  // Use passive scroll for performance
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
});




const carousels = document.querySelectorAll('.category-fields');

carousels.forEach(carousel => {
  const wrapper = carousel.querySelector('.carousel-wrapper');
  const prevBtn = carousel.querySelector('.carousel-btn.prev');
  const nextBtn = carousel.querySelector('.carousel-btn.next');
  const songItems = carousel.querySelectorAll('.song-item');

  // Button functionality
  prevBtn?.addEventListener('click', () => {
    wrapper.scrollBy({ left: -220, behavior: 'smooth' });
  });

  nextBtn?.addEventListener('click', () => {
    wrapper.scrollBy({ left: 220, behavior: 'smooth' });
  });

  // Touchpad state
  let isInteracting = false;
  let scrollEndTimer;

  // Touchpad interaction start
  wrapper.addEventListener('mousedown', () => {
    isInteracting = true;
    wrapper.style.scrollSnapType = 'none';
  });

  // Touchpad interaction end
  document.addEventListener('mouseup', () => {
    if (isInteracting) {
      isInteracting = false;
      wrapper.style.scrollSnapType = 'x mandatory';

      clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(() => {
        const scrollCenter = wrapper.scrollLeft + (wrapper.offsetWidth / 2);
        const closest = Array.from(songItems).reduce((closest, item) => {
          const itemCenter = item.offsetLeft + (item.offsetWidth / 2);
          return Math.abs(itemCenter - scrollCenter) < Math.abs(closest - scrollCenter)
            ? itemCenter : closest;
        }, Infinity);

        wrapper.scrollTo({
          left: closest - (wrapper.offsetWidth / 2),
          behavior: 'smooth'
        });
      }, 50);
    }
  });
});


const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");
const skipFront = document.getElementById("skipf-btn");
const skipBack = document.getElementById("skipb-btn");
const progressBar = document.querySelector(".ap-progress-bar");
const progressFill = document.querySelector(".ap-progress-fill");
const volumeSlider = document.getElementById('volume-slider');
const progressTooltip = document.getElementById("progress-tooltip");

const volumeIcon = document.getElementById('volume-icon');
let previousVolume = audio.volume || 0.5;

// Mute / Unmute toggle
volumeIcon.addEventListener('click', () => {
    if (audio.volume > 0) {
        previousVolume = audio.volume;
        audio.volume = 0;
        volumeSlider.value = 0;
    } else {
        audio.volume = previousVolume || 0.5;
        volumeSlider.value = previousVolume || 0.5;
    }
    updateVolumeIcon(audio.volume);
});

// Slider control
volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
    if (audio.volume > 0) {
        previousVolume = audio.volume;
    }
    updateVolumeIcon(audio.volume);
});


function updateVolumeIcon(volume) {
    if (volume == 0) {
        volumeIcon.className = "fa-solid fa-volume-xmark";
    } else if (volume > 0 && volume <= 0.3) {
        volumeIcon.className = "fa-solid fa-volume-off";
    } else if (volume > 0.3 && volume <= 0.7) {
        volumeIcon.className = "fa-solid fa-volume-low";
    } else {
        volumeIcon.className = "fa-solid fa-volume-high";
    }
}



  playBtn.addEventListener("click", () => {
  if (audio.paused) {
      audio.play();
  } else {
      audio.pause();
  }
  });

  skipFront.addEventListener("click", () => {
  audio.currentTime = Math.min(audio.currentTime + 5, audio.duration);
  });

  skipBack.addEventListener("click", () => {
  audio.currentTime = Math.max(audio.currentTime - 5, 0);
  });

  audio.addEventListener("play", () => {
  playBtn.textContent = "❚❚";
  });

  audio.addEventListener("pause", () => {
  playBtn.textContent = "▶";
  });

  audio.addEventListener("timeupdate", () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progressFill.style.width = `${progressPercent}%`;
  });

  progressBar.addEventListener("click", (e) => {
  const rect = progressBar.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const width = rect.width;
  const clickRatio = clickX / width;
  audio.currentTime = clickRatio * audio.duration;
  });

  // New: show tooltip on hover over progress bar
  progressBar.addEventListener("mousemove", (e) => {
  const rect = progressBar.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const width = rect.width;
  const percent = Math.min(Math.max(offsetX / width, 0), 1);

  if (!audio.duration) return;

  const time = percent * audio.duration;
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  const timeString = `${minutes}:${seconds}`;

  progressTooltip.style.left = `${offsetX}px`;
  progressTooltip.style.display = "block";
  progressTooltip.textContent = timeString;
  });

  progressBar.addEventListener("mouseleave", () => {
  progressTooltip.style.display = "none";
  });

  function play(audioUrl, title, imageUrl, author) {
  const titleElem = document.getElementById("ap-l-i-title");
  const imageElem = document.getElementById("ap-l-image");
  const authorElem = document.getElementById("ap-l-i-author");

  titleElem.innerText = title;
  titleElem.parentElement.setAttribute('data-tooltip', title);

  authorElem.innerText = author;
  authorElem.parentElement.setAttribute('data-tooltip', author);

  imageElem.src = "/pictures/" + (imageUrl || "placeholder.png");

  if (audio.src !== audioUrl) {
      audio.src = audioUrl;
      audio.load();

      audio.oncanplay = () => {
          audio.play().then(() => {
              fetch('/count-play', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                  body: `title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}`
              }).catch(console.error);
          }).catch(console.error);
      };
  } else {
      audio.paused ? audio.play() : audio.pause();
  }

  if (volumeSlider) {
    audio.volume = volumeSlider.value;
    volumeSlider.addEventListener('input', () => {
        audio.volume = volumeSlider.value;
    });
  }

  const volumeIcon = document.getElementById('volume-icon');

  function updateVolumeIcon(volume) {
    if (volume == 0) {
        volumeIcon.className = "fa-solid fa-volume-xmark";
    } else if (volume > 0 && volume <= 0.3) {
        volumeIcon.className = "fa-solid fa-volume-off";
    } else if (volume > 0.3 && volume <= 0.7) {
        volumeIcon.className = "fa-solid fa-volume-low";
    } else {
        volumeIcon.className = "fa-solid fa-volume-high";
    }
  }

  // Run on slider input
  volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
    updateVolumeIcon(audio.volume);
  });

  // Run once at start
  updateVolumeIcon(audio.volume);

  document.querySelector('.volume-control').classList.remove('hidden');

}