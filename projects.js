document.querySelectorAll('[role="tablist"]').forEach((tablist) => {
const tabs = [...tablist.querySelectorAll('[role="tab"]')];

function selectTab(tab) {
  for (const item of tabs) {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
  }
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', (event) => {
    if (tab.tagName === 'A') event.preventDefault();
    selectTab(tab);
  });
  tab.addEventListener('keydown', (event) => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (tablist.getAttribute('aria-orientation') === 'vertical') {
      if (event.key === 'ArrowDown') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
    }
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    selectTab(tabs[next]);
    tabs[next].focus();
  });
});
});

document.querySelectorAll('.project-gallery').forEach((gallery) => {
  const slides = [...gallery.querySelectorAll('.gallery-slide')];
  const counter = gallery.querySelector('.gallery-count');
  let current = 0;

  function showSlide(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.hidden = slideIndex !== current;
    });
    counter.textContent = `Imagem ${current + 1} de ${slides.length}`;
  }

  gallery.querySelector('.gallery-prev').addEventListener('click', () => showSlide(current - 1));
  gallery.querySelector('.gallery-next').addEventListener('click', () => showSlide(current + 1));
  gallery.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    showSlide(current + (event.key === 'ArrowRight' ? 1 : -1));
  });
});
