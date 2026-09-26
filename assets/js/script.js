document.addEventListener('DOMContentLoaded', () => {
  // Dark mode toggle
  const darkModeToggle = document.querySelector('button.dark');
  const lightModeToggle = document.querySelector('button.light');

  const isDarkMode = localStorage.getItem('darkMode');
  if (isDarkMode === 'true') {
    toggleDarkMode();
  }

  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.classList.toggle('active');
    lightModeToggle.classList.toggle('active');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'true' : 'false');
  }

  darkModeToggle.addEventListener('click', toggleDarkMode);
  lightModeToggle.addEventListener('click', toggleDarkMode);

  // Menu toggle

  const menuBtn = document.querySelector('.menu-button');
  const menu = document.querySelector('header nav');

  menuBtn.addEventListener('click', () => {
    const isActive = menu.classList.toggle('active');
    menuBtn.setAttribute('aria-expanded', isActive);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      menu.classList.remove('active');
    }
  });

  const menuItems = menu.querySelectorAll('a');
  menuItems.forEach((item) => {
    item.addEventListener('click', () => {
      menu.classList.remove('active');
    });
  });

})
