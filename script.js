document.addEventListener('DOMContentLoaded', () => {
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
})
