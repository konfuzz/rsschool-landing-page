document.addEventListener('DOMContentLoaded', () => {

  const loadButton = document.querySelector('.load-button');
  const tabs = document.querySelector('.tabs');
  const tabsContent = tabs.querySelector('.tabs__content');
  const radioButtons = document.querySelectorAll('input[name="tab"]');
  const dialog = document.querySelector('.dialog');
  const form = dialog.querySelector('form');

  const products = [];

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
      const card = templateContent.querySelector('article');
      card.dataset.category = item.category;
      const img = templateContent.querySelector('img')
      img.src = item.photo;
      img.alt = item.name;
      templateContent.querySelector('h2').textContent = item.name;
      templateContent.querySelector('.card__description').textContent = item.description;
      templateContent.querySelector('.card__price').textContent = `$${item.price}`;
      const id = crypto.randomUUID();
      card.dataset.id = id;
      const clone = templateContent.cloneNode(true);
      products.push({ id, ...item });
      tabsContent.appendChild(clone);
    });

  }

  populateTabs();

  function populateDialog(productId) {
    const product = products.find((p) => p.id === productId);
    if (product) {
      dialog.querySelector('.dialog__image img').src = product.photo;
      dialog.querySelector('.dialog__image img').alt = product.name;
      dialog.querySelector('h3').textContent = product.name;
      dialog.querySelector('.dialog__description').textContent = product.description;

      dialog.querySelector('.dialog__size').innerHTML = '';
      createOptions(product, 'sizes', 'size', '.dialog__size', 'radio');

      dialog.querySelector('.dialog__additives').innerHTML = '';
      createOptions(product, 'additives', 'name', '.dialog__additives', 'checkbox');

      dialog.querySelector('.dialog__price').textContent = `$${product.price}`;
      form.dataset.id = productId;
    }
  }

  function createOptions(product, type, field, selector, inputType) {
    Object.entries(product[type]).forEach(([key, option], index) => {
      const label = document.createElement('label');
      const input = document.createElement('input');

      label.appendChild(input);
      input.type = inputType;
      input.name = field;
      input.value = option['add-price'];

      const spanSmall = document.createElement('span');
      spanSmall.textContent = inputType === 'radio' ? key : index + 1;
      label.appendChild(spanSmall);

      const spanLarge = document.createElement('span');
      spanLarge.textContent = option[field];
      label.appendChild(spanLarge);

      dialog.querySelector(selector).appendChild(label);
    });
  }

  function getTotal(productId) {
    const selectedOptions = form.querySelectorAll('input:checked');
    let total = +products.find((product) => product.id === productId).price;
    selectedOptions.forEach((input) => {
      total += +(input.value);
    });
    console.log(total);
    dialog.querySelector('.dialog__price').textContent = `$${total}`;
  }

  tabsContent.addEventListener('click', (e) => {
    if (e.target.closest('.card')) {
      const productId = e.target.closest('.card').dataset.id;
      populateDialog(productId);
      dialog.querySelector('input[name="size"]').checked = true;
      getTotal(productId);
      dialog.showModal();
    }
  });

  form.addEventListener('change', (event) => {
    getTotal(form.dataset.id);
  })

  radioButtons.forEach((radio) => {
    radio.addEventListener('change', () => {
      tabs.dataset.collapsed = "true";
    });
  });

  loadButton.addEventListener('click', () => {
    tabs.dataset.collapsed = "false";
  });
})
