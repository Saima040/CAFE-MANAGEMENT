function showMenu(category) {
    // Hide all menus first
    const menus = document.querySelectorAll('.menu-list');
    menus.forEach(menu => menu.classList.add('hidden'));
  
    // Show the selected menu
    const selectedMenu = document.getElementById(category);
    selectedMenu.classList.remove('hidden');
  }
  
  const cart = {};
  const cartItemsEl = document.getElementById("cart-items");
  const cartPlaceholder = document.querySelector(".cart-placeholder");
  const totalEl = document.getElementById("total");

    function showMenu(category) {
    const menus = document.querySelectorAll('.menu-list');
    menus.forEach(menu => menu.classList.add('hidden'));

    const selectedMenu = document.getElementById(category);
    if (selectedMenu) {
      selectedMenu.classList.remove('hidden');
    }
  }
  function updateCart() {
    cartItemsEl.innerHTML = "";
    let total = 0;
    let isEmpty = true;

    for (const item in cart) {
      isEmpty = false;
      const { quantity, price } = cart[item];
      const li = document.createElement("li");
      li.textContent = `${item} (x${quantity}) - ${price * quantity} BDT`;
      cartItemsEl.appendChild(li);
      total += price * quantity;
    }

    totalEl.textContent = `Total: ${total} BDT`;
    cartPlaceholder.style.display = isEmpty ? "block" : "none";
  }

  function parseItemInfo(card) {
    const name = card.querySelector("h3").textContent.trim();
    const priceText = card.querySelector("p").textContent.trim();
    const price = parseInt(priceText.replace(/[^\d]/g, ""));
    return { name, price };
  }

  function addToCart(event) {
    const card = event.target.closest(".card");
    const { name, price } = parseItemInfo(card);

    if (cart[name]) {
      cart[name].quantity += 1;
    } else {
      cart[name] = { quantity: 1, price };
    }

    updateCart();
  }

  document.querySelectorAll(".add-btn").forEach(btn => {
    btn.addEventListener("click", addToCart);
  });

  // Optional: show/hide menu sections
  function showMenu(menuId) {
    document.querySelectorAll(".menu-list").forEach(menu => {
      menu.classList.add("hidden");
    });
    document.getElementById(menuId).classList.remove("hidden");
  }

  const variantMenu = document.createElement('div');
  variantMenu.className = 'variant-menu';
  document.body.appendChild(variantMenu);

  document.querySelectorAll('.add-btn').forEach(btn => {
    const variants = btn.dataset.variants;
    const itemName = btn.dataset.item;
    const price = parseInt(btn.dataset.price);

    if (variants) {
      const variantList = variants.split(',');

      btn.addEventListener('mouseenter', e => {
        variantMenu.innerHTML = '';
        variantList.forEach(variant => {
          const optionBtn = document.createElement('button');
          optionBtn.textContent = variant;
          optionBtn.addEventListener('click', () => {
            const fullName = `${itemName} (${variant.trim()})`;
            if (cart[fullName]) {
              cart[fullName].quantity += 1;
            } else {
              cart[fullName] = { quantity: 1, price };
            }
            updateCart();
            variantMenu.style.display = 'none';
          });
          variantMenu.appendChild(optionBtn);
        });

        const rect = btn.getBoundingClientRect();
        variantMenu.style.top = `${rect.bottom + window.scrollY}px`;
        variantMenu.style.left = `${rect.left + window.scrollX}px`;
        variantMenu.style.display = 'flex';
      });

      btn.addEventListener('mouseleave', () => {
        setTimeout(() => {
          variantMenu.style.display = 'none';
        }, 300);
      });

      variantMenu.addEventListener('mouseenter', () => {
        clearTimeout(); // prevent hide if hovering over menu
      });
    } else {
      btn.addEventListener('click', addToCart);
    }
  });

  document.addEventListener('click', e => {
    if (!variantMenu.contains(e.target)) {
      variantMenu.style.display = 'none';
    }
  });


