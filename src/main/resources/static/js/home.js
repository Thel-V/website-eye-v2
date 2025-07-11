document.addEventListener('DOMContentLoaded', function () {
  setupHeader();
  setupCarousels();
  setupAudioPlayer();
});

function setupHeader() {
  const header = document.querySelector('header');
  let lastScroll = 0;

  function updateHeader() {
    const currentScroll = window.scrollY;
    if (Math.abs(currentScroll - lastScroll) > -10) {
      header.classList.toggle('scrolled', currentScroll > 40);
      lastScroll = currentScroll;
    }
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
}



function setupCarousels() {
  document.querySelectorAll('.category-fields').forEach(carousel => {
    const wrapper = carousel.querySelector('.carousel-wrapper');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    const songItems = carousel.querySelectorAll('.song-item');

    // Scroll buttons
    [prevBtn, nextBtn].forEach(btn => {
      btn?.addEventListener('click', () => {
        const direction = btn.classList.contains('prev') ? -220 : 220;
        wrapper.scrollBy({ left: direction, behavior: 'smooth' });
      });
    });

    let isInteracting = false;
    let scrollEndTimer;

    wrapper.addEventListener('mousedown', () => {
      isInteracting = true;
      wrapper.style.scrollSnapType = 'none';
    });

    document.addEventListener('mouseup', () => {
      if (isInteracting) {
        isInteracting = false;
        wrapper.style.scrollSnapType = 'x mandatory';

        clearTimeout(scrollEndTimer);
        scrollEndTimer = setTimeout(() => {
          const scrollCenter = wrapper.scrollLeft + (wrapper.offsetWidth / 2);
          const closestItem = Array.from(songItems).reduce((closest, item) => {
            const itemCenter = item.offsetLeft + item.offsetWidth / 2;
            return Math.abs(itemCenter - scrollCenter) < Math.abs(closest - scrollCenter)
              ? itemCenter : closest;
          }, Infinity);

          wrapper.scrollTo({
            left: closestItem - (wrapper.offsetWidth / 2),
            behavior: 'smooth'
          });
        }, 50);
      }
    });
  });
}



function setupAudioPlayer() {
  const audio = document.getElementById("audio");
  const playBtn = document.getElementById("play-btn");
  const skipFront = document.getElementById("skipf-btn");
  const skipBack = document.getElementById("skipb-btn");
  const progressBar = document.querySelector(".ap-progress-bar");
  const progressFill = document.querySelector(".ap-progress-fill");
  const volumeSlider = document.getElementById("volume-slider");
  const volumeIcon = document.getElementById("volume-icon");
  const progressTooltip = document.getElementById("progress-tooltip");

  let previousVolume = audio.volume || 0.3;

  function updateVolumeIcon(volume) {
    if (volume === 0) {
      volumeIcon.className = "fa-solid fa-volume-xmark";
    } else if (volume <= 0.3) {
      volumeIcon.className = "fa-solid fa-volume-off";
    } else if (volume <= 0.7) {
      volumeIcon.className = "fa-solid fa-volume-low";
    } else {
      volumeIcon.className = "fa-solid fa-volume-high";
    }
  }

  volumeIcon.addEventListener("click", () => {
    if (audio.volume > 0) {
      previousVolume = audio.volume;
      audio.volume = 0;
      volumeSlider.value = 0;
    } else {
      audio.volume = previousVolume;
      volumeSlider.value = previousVolume;
    }
    updateVolumeIcon(audio.volume);
  });

  volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
    if (audio.volume > 0) previousVolume = audio.volume;
    updateVolumeIcon(audio.volume);
  });

  updateVolumeIcon(audio.volume);

  // Buttons
  playBtn.addEventListener("click", () => {
    audio.paused ? audio.play() : audio.pause();
  });

  skipFront.addEventListener("click", () => {
    audio.currentTime = Math.min(audio.currentTime + 5, audio.duration);
  });

  skipBack.addEventListener("click", () => {
    audio.currentTime = Math.max(audio.currentTime - 5, 0);
  });

  audio.addEventListener("play", () => playBtn.textContent = "❚❚");
  audio.addEventListener("pause", () => playBtn.textContent = "▶");

  // Time-Slider
  audio.addEventListener("timeupdate", () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressFill.style.width = `${progressPercent}%`;
  });

  progressBar.addEventListener("click", (e) => {
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;
    audio.currentTime = percent * audio.duration;
  });

  // Tooltip
  progressBar.addEventListener("mousemove", (e) => {
    const rect = progressBar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percent = offsetX / rect.width;
    const time = percent * audio.duration;
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");

    progressTooltip.style.left = `${offsetX}px`;
    progressTooltip.style.display = "block";
    progressTooltip.textContent = `${minutes}:${seconds}`;
  });

  progressBar.addEventListener("mouseleave", () => {
    progressTooltip.style.display = "none";
  });

  // Play Function / Footer info
  window.play = function (audioUrl, title, imageUrl, author) {
    const titleElem = document.getElementById("ap-l-i-title");
    const imageElem = document.getElementById("ap-l-image");
    const authorElem = document.getElementById("ap-l-i-author");

    titleElem.innerText = title;
    titleElem.parentElement.setAttribute("data-tooltip", title);

    authorElem.innerText = author;
    authorElem.parentElement.setAttribute("data-tooltip", author);

    imageElem.src = "/pictures/" + (imageUrl || "placeholder.png");

    if (audio.src !== audioUrl) {
      audio.src = audioUrl;
      audio.load();

      audio.oncanplay = () => {
        audio.play().catch(console.error);
        fetch('/count-play', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}`
        }).catch(console.error);
      };
    } else {
      audio.paused ? audio.play() : audio.pause();
    }

    // Live adjustment of Slider and Icon to Volume Value
    audio.volume = volumeSlider.value;
    updateVolumeIcon(audio.volume);
    volumeSlider.addEventListener("input", () => {
      audio.volume = volumeSlider.value;
      updateVolumeIcon(audio.volume);
    });

    document.querySelector('.volume-control').classList.remove('hidden');
  };
}