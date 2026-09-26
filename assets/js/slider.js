document.addEventListener('DOMContentLoaded', () => {
  const SWIPE_THRESHOLD = 50;
  const CLONE_VISIBLE_INDEX_OFFSET = 1;

  const slider = document.querySelector('.slider__list');
  const slides = Array.from(document.querySelectorAll('.slider__slide'));
  const prevBtn = document.querySelector('.slider__arrow.left');
  const nextBtn = document.querySelector('.slider__arrow.right');
  const pages = document.querySelectorAll('.slider__page');

  const totalSlides = slides.length;

  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[totalSlides - 1].cloneNode(true);
  slider.appendChild(firstClone);
  slider.insertBefore(lastClone, slides[0]);

  let position = CLONE_VISIBLE_INDEX_OFFSET;
  let isAnimating = false;

  const toRealSlideIndex = (index) =>
    (((index - CLONE_VISIBLE_INDEX_OFFSET) % totalSlides) + totalSlides) % totalSlides;

  function setPosition(animated = true) {
    slider.style.transition = animated ? '' : 'none';
    slider.style.transform = `translateX(-${position * 100}%)`;
  }

  function updatePagination() {
    const activeIndex = toRealSlideIndex(position);
    pages.forEach((page, index) => {
      page.classList.toggle('active', index === activeIndex);
    });
  }

  function moveTo(targetPosition) {
    if (isAnimating || targetPosition === position) return;
    isAnimating = true;
    position = targetPosition;
    updatePagination();
    setPosition(true);
  }

  function moveBy(step) {
    moveTo(position + step);
  }

  slider.addEventListener('transitionend', (e) => {
    if (e.target !== slider || e.propertyName !== 'transform') return;
    const realPosition = toRealSlideIndex(position) + CLONE_VISIBLE_INDEX_OFFSET;
    if (realPosition !== position) {
      position = realPosition;
      setPosition(false);
    }
    isAnimating = false;
  });

  let touchStartX = 0;

  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  slider.addEventListener('touchend', (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      moveBy(deltaX < 0 ? 1 : -1);
    }
  }, { passive: true });

  prevBtn.addEventListener('click', () => moveBy(-1));
  nextBtn.addEventListener('click', () => moveBy(1));

  pages.forEach((page, index) => {
    page.addEventListener('click', () => moveTo(index + CLONE_VISIBLE_INDEX_OFFSET));
  });

  setPosition(false);
});
