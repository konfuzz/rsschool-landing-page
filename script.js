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

  // Products tabs

  const loadButton = document.querySelector('.load-button');
  const tabs = document.querySelector('.tabs');
  const tabsContent = tabs.querySelector('.tabs__content');
  const radioButtons = document.querySelectorAll('input[name="tab"]');

  async function getContent() {
    const data = await fetch('products.json');
    const json = await data.json();
    return json;
  }

  async function populateTabs() {
    const json = await getContent();
    const template = document.querySelector("template");
    const templateContent = template.content.cloneNode(true);

    json.forEach((item) => {
      templateContent.querySelector('article').dataset.category = item.category;
      const img = templateContent.querySelector('img')
      img.src = item.photo;
      img.alt = item.name;
      templateContent.querySelector('h2').textContent = item.name;
      templateContent.querySelector('.card__description').textContent = item.description;
      templateContent.querySelector('.card__price').textContent = `$${item.price}`;
      const clone = templateContent.cloneNode(true);
      tabsContent.appendChild(clone);
    });

  }

  populateTabs();

  radioButtons.forEach((radio) => {
    radio.addEventListener('change', () => {
      tabs.dataset.collapsed = "true";
    });
  });

  loadButton.addEventListener('click', () => {
    tabs.dataset.collapsed = "false";
  });
})
