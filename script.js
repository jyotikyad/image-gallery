// ========== FILTER ==========
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.getAttribute('data-filter');

    galleryItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.classList.remove('hide');
      } else {
        item.classList.add('hide');
      }
    });
  });
});

// ========== LIGHTBOX ==========
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
  <span class="lightbox-close">&times;</span>
  <button class="lightbox-btn lightbox-prev">‹</button>
  <div class="lightbox-content">
    <img src="" alt="Full image">
  </div>
  <button class="lightbox-btn lightbox-next">›</button>
`;
document.body.appendChild(lightbox);

const lightboxImg   = lightbox.querySelector('img');
const closeBtn      = lightbox.querySelector('.lightbox-close');
const prevBtn       = lightbox.querySelector('.lightbox-prev');
const nextBtn       = lightbox.querySelector('.lightbox-next');

let currentIndex = 0;
let visibleItems = [];

// Get currently visible gallery items
function getVisibleItems() {
  return Array.from(galleryItems).filter(item => !item.classList.contains('hide'));
}

// Open lightbox
galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    visibleItems = getVisibleItems();
    currentIndex = visibleItems.indexOf(item);
    
    if (currentIndex === -1) return;

    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

// Update image
function updateLightboxImage() {
  const img = visibleItems[currentIndex].querySelector('img');
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
}

// Next
function showNext() {
  if (visibleItems.length === 0) return;
  currentIndex = (currentIndex + 1) % visibleItems.length;
  updateLightboxImage();
}

// Previous
function showPrev() {
  if (visibleItems.length === 0) return;
  currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
  updateLightboxImage();
}

// Button clicks
nextBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  showNext();
});

prevBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  showPrev();
});

// Close
function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = 'auto';
}

closeBtn.addEventListener('click', closeLightbox);

// Click outside to close
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;

  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'ArrowLeft') showPrev();
});