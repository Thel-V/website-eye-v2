document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');
  let lastScroll = 0;
  
  function updateHeader() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Only update if scroll direction changed significantly
    if (Math.abs(currentScroll - lastScroll) > 5) {
      header.classList.toggle('scrolled', currentScroll > 50);
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




function play(audioUrl, title, imageUrl, author) {
    const audio = document.getElementById("audio");
    const titleElem = document.getElementById("ap-l-i-title");
    const imageElem = document.getElementById("ap-l-image");
    const authorElem = document.getElementById("ap-l-i-author");

    titleElem.textContent = title;
    authorElem.textContent = author;
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
}