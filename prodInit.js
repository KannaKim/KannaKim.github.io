const searchInput = document.querySelector('.navbar-center input');
const productCards = document.querySelectorAll('.product-card');

searchInput.addEventListener('input', function() {
  const query = this.value.trim().toLowerCase();
  productData.forEach(product => {
    const title = product.name.toLowerCase();
    const show = title.includes(query);
    if (show) {
      $(product.element).show();
    } else {
      $(product.element).hide();
    }
  });
});

const sidebar = document.getElementById('sidebarMenu');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const filterBtn = document.getElementById('filterBtn');
const filterForm = document.getElementById('filterForm');
const clearFiltersBtn = document.getElementById('clearFiltersBtn');

filterBtn.addEventListener('click', () => {
  sidebar.classList.add('open');
  sidebarOverlay.classList.add('open');
});
sidebarOverlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  sidebarOverlay.classList.remove('open');
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('open');
  }
});

let productData = [
  {
    id: 0,
    seller_name: 'Nicole',
    name: 'Rugged Armor iPhone 13 Case',
    category: 'Phone Case',
    price: 12.99,
    stars: 4,
    condition: 'New',
    element: null,
    description: 'Shock-absorbing, slim-fit case with carbon fiber design for iPhone 13. Raised edges for screen and camera protection.',
    reviews: 2,
    reviewList: [
      { reviewer: 'Alice', stars: 4, text: 'Great fit and protection for my phone!', date:  "2024-01-01" },
      { reviewer: 'Bob', stars: 5, text: 'Stylish and sturdy. Highly recommend.', date:  "2024-01-02" }
    ],
    img: 'phonecase.png',
  },
  {
    id: 1,
    seller_name: 'Jecka',
    name: 'Anker PowerCore 10000mAh Portable Charger',
    category: 'Power Bank',
    price: 29.99,
    stars: 5,
    condition: 'New',
    element: null,
    description: 'Ultra-compact portable charger with high-speed charging technology. Perfect for travel and emergencies.',
    reviews: 2,
    reviewList: [
      { reviewer: 'Chris', stars: 5, text: 'Charges my phone multiple times!', date:  "2024-01-01" },
      { reviewer: 'Dana', stars: 5, text: 'Compact and powerful.', date:  "2024-01-02" }
    ],
    img: 'powerbank.png',
  },
  {
    id: 2,
    seller_name: 'Jeffery',
    name: 'Samsung Adaptive Fast Charger (Used)',
    category: 'Charger',
    price: 19.99,
    stars: 3,
    condition: 'Used',
    element: null,
    description: 'Original Samsung fast charger. Used but fully functional. Compatible with most Samsung devices.',
    reviews: 2,
    reviewList: [
      { reviewer: 'Eve', stars: 3, text: 'Still works like new.', date:  "2024-01-04" },
      { reviewer: 'Frank', stars: 4, text: 'Good value for a used charger.', date:  "2024-01-05" }
    ],
    img: 'charger.png',
  },
  {
    id: 3,
    seller_name: 'Ari',
    name: 'Extendable Bluetooth Selfie Stick Tripod',
    category: 'Selfie Sticks',
    price: 9.99,
    stars: 4,
    condition: 'New',
    element: null,
    description: 'Lightweight, extendable selfie stick with Bluetooth remote and tripod mode. Great for group photos.',
    reviews: 2,
    reviewList: [
      { reviewer: 'Grace', stars: 4, text: 'Perfect for travel photos!', date:  "2024-01-05" },
      { reviewer: 'Henry', stars: 5, text: 'Easy to use and lightweight.', date:  "2024-01-06" }
    ],
    img: 'selfiestick.png',
  },
  {
    id: 4,
    seller_name: 'Emily',
    name: 'Sony SRS-XB12 Extra Bass Speaker',
    category: 'Bluetooth Speaker',
    price: 39.99,
    stars: 4,
    condition: 'Used',
    element: null,
    description: 'Portable wireless speaker with extra bass and long battery life. Water-resistant and durable.',
    reviews: 2,
    reviewList: [
      { reviewer: 'Ivy', stars: 5, text: 'Amazing sound quality!', date:  "2024-01-06" },
      { reviewer: 'Jack', stars: 4, text: 'Battery lasts all day.', date:  "2024-01-07" }
    ],
    img: 'bspeaker.png',
  },
  {
    id: 5,
    seller_name: 'Krispin',
    name: 'Spigen Tempered Glass Screen Protector',
    category: 'Screen Protector',
    price: 7.99,
    stars: 5,
    condition: 'New',
    element: null,
    description: 'Premium tempered glass with 9H hardness. Easy installation and high touch sensitivity for your device.',
    reviews: 2,
    reviewList: [
      { reviewer: 'Kim', stars: 5, text: 'Crystal clear and easy to apply.' },
      { reviewer: 'Leo', stars: 5, text: 'Saved my screen more than once.' }
    ],
    img: 'screenprotector.png'
  }
];
if (!localStorage.getItem('item-counter')) {
  localStorage.setItem('item-counter', 6);
}
if (!localStorage.getItem('products')) {  // then probably first time launching the app, probably..
  localStorage.setItem('products', JSON.stringify(productData));
}
else{
  productData = JSON.parse(localStorage.getItem('products'));
}

function updateActiveFilters() {
  const activeFilters = document.getElementById('activeFilters');
  activeFilters.innerHTML = '';

  const category = filterForm.category.value;
  const condition = filterForm.condition.value;
  const minPrice = filterForm.minPrice.value;
  const maxPrice = filterForm.maxPrice.value;
  const checkedStars = Array.from(filterForm.querySelectorAll('input[name="star"]:checked')).map(cb => parseInt(cb.value, 10));

  if (category) {
    addFilterTag('Category: ' + category, () => {
      filterForm.category.value = '';
      filterForm.dispatchEvent(new Event('input'));
    });
  }

  if (condition) {
    addFilterTag('Condition: ' + condition, () => {
      filterForm.condition.value = '';
      filterForm.dispatchEvent(new Event('input'));
    });
  }

  if (minPrice || maxPrice) {
    const priceText = [minPrice, maxPrice].filter(Boolean).join(' - ');
    addFilterTag('Price: $' + priceText, () => {
      filterForm.minPrice.value = '';
      filterForm.maxPrice.value = '';
      filterForm.dispatchEvent(new Event('input'));
    });
  }

  if (checkedStars.length) {
    const starText = checkedStars.map(stars => stars + '★').join(' & ');
    addFilterTag('Rating: ' + starText, () => {
      filterForm.querySelectorAll('input[name="star"]:checked').forEach(cb => cb.checked = false);
      filterForm.dispatchEvent(new Event('input'));
    });
  }
}

function addFilterTag(text, onRemove) {
  const tag = document.createElement('div');
  tag.className = 'filter-tag';
  tag.innerHTML = `
    ${text}
    <span class="remove-filter">&times;</span>
  `;
  const removeButton = tag.querySelector('.remove-filter');
  removeButton.addEventListener('click', () => {
    tag.remove();
    onRemove();
  });
  document.getElementById('activeFilters').appendChild(tag);
}

function filterProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const category = filterForm.category.value;
  const condition = filterForm.condition.value;
  
  // Get price values and validate them
  const minPriceInput = filterForm.minPrice;
  const maxPriceInput = filterForm.maxPrice;
  let minPrice = parseFloat(minPriceInput.value) || 0;
  let maxPrice = parseFloat(maxPriceInput.value) || Infinity;

  // Validate price range
  if (minPriceInput.value && maxPriceInput.value) {
    if (minPrice > maxPrice) {
      // If min is greater than max, swap them
      [minPrice, maxPrice] = [maxPrice, minPrice];
      minPriceInput.value = minPrice;
      maxPriceInput.value = maxPrice;
    }
  }

  // Ensure non-negative values
  if (minPrice < 0) {
    minPrice = 0;
    minPriceInput.value = 0;
  }
  if (maxPrice < 0) {
    maxPrice = 0;
    maxPriceInput.value = 0;
  }

  const checkedStars = Array.from(filterForm.querySelectorAll('input[name="star"]:checked')).map(cb => parseInt(cb.value, 10));

  productData.forEach(product => {
    let show = true;
    if (query && !product.name.toLowerCase().includes(query)) show = false;
    if (category && product.category !== category) show = false;
    if (condition && product.condition !== condition) show = false;
    if (product.price < minPrice || product.price > maxPrice) show = false;
    if (checkedStars.length) {
      const minStar = Math.min(...checkedStars);
      if (product.stars < minStar) show = false;
    }
    if (show) {
      // product.element.style.display = 'block';
    } else {
      // product.element.style.display = 'none';
    }
  });

  updateActiveFilters();
}

filterForm.addEventListener('input', filterProducts);
searchInput.addEventListener('input', filterProducts);

clearFiltersBtn.addEventListener('click', () => {
  filterForm.reset();
  filterProducts();
});

filterProducts();

let productCardTemplate = '';

document.addEventListener('DOMContentLoaded', function() {
  const productsGrid = document.querySelector('.products-grid');
  const productCards = productsGrid.querySelectorAll('.product-card');

  if (productCards.length > 0) {
    const firstCardClone = productCards[0].cloneNode(true);
    const imgElement = firstCardClone.querySelector('img');
    if (imgElement) {
      imgElement.setAttribute('src', '__PRODUCT_IMAGE_SRC__');
      imgElement.setAttribute('alt', '__PRODUCT_IMAGE_ALT__');
    }
    const tempDiv = document.createElement('div');
    tempDiv.appendChild(firstCardClone);
    tempDiv.querySelector('.product-card').innerHTML += `
      <button class="add-to-cart-btn">Add to Cart</button>
    `;
    productCardTemplate = tempDiv.innerHTML;
    tempDiv.remove();
  } else {
    console.error('No product cards found to create a template.');
  }

  if (typeof productData !== 'undefined' && productData.length === productCards.length) {
    productCards.forEach((card, index) => {
      productData[index].element = card; 
    });
  } else {
     console.warn('Product data mismatch or cards not found for element linking.');
  }

  filterForm.addEventListener('input', renderProducts);
  searchInput.addEventListener('input', renderProducts);

  clearFiltersBtn.addEventListener('click', () => {
    filterForm.reset();
    renderProducts();
  });

  renderProducts();
});

function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const category = filterForm.category.value;
  const condition = filterForm.condition.value;
  const minPrice = parseFloat(filterForm.minPrice.value) || 0;
  const maxPrice = parseFloat(filterForm.maxPrice.value) || Infinity;
  const checkedStars = Array.from(filterForm.querySelectorAll('input[name="star"]:checked')).map(cb => parseInt(cb.value, 10));

  const productsGrid = document.querySelector('.products-grid');
  let filteredProductsHtml = '';

  productData.forEach((product, index) => {
    let show = true;
    if (query && !product.name.toLowerCase().includes(query)) show = false;
    if (category && product.category !== category) show = false;
    if (condition && product.condition !== condition) show = false;
    if (product.price < minPrice || product.price > maxPrice) show = false;

    // Calculate average rating from reviewList with 0.5 rounding
    let averageRating = 0;
    if (product.reviewList && product.reviewList.length > 0) {
      const totalStars = product.reviewList.reduce((sum, review) => sum + review.stars, 0);
      const rawAverage = totalStars / product.reviewList.length;
      // Round to nearest 0.5
      averageRating = Math.round(rawAverage );
    }

    if (checkedStars.length) {
      const minStar = Math.min(...checkedStars);
      if (averageRating < minStar) show = false;
    }

    if (show) {
      // Reconstruct the product card HTML with the button
      filteredProductsHtml += `
        <div class="product-card">
          <a href="./product.html?product=${product.id}" class="product-link">
            <img src="${product.img}" alt="${product.name}">
            <div class="product-title" id=${product.id} data-category=${product.category.replace(" ","")}>${product.name}</div>
            <div class="product-meta">
              <span class="condition-badge ${product.condition.toLowerCase()}">${product.condition}</span>
            </div>
            <div class="product-rating">
              <span class="stars">${'★'.repeat(Math.floor(averageRating))}${averageRating % 1 === 0.5 ? '½' : ''}${'☆'.repeat(5 - Math.ceil(averageRating))}</span>
              <span class="review-count">(${product.reviewList ? product.reviewList.length : 0})</span>
            </div>
          </a>
          <div class="product-price">$${product.price.toFixed(2)}</div>
          <div class="product-actions">
            <select class="quantity-select">
              ${Array.from({length: 30}, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('')}
            </select>
            <button class="add-to-cart-btn">Add to Cart</button>
          </div>
        </div>
      `;
    }
  });

  productsGrid.innerHTML = filteredProductsHtml;

  // Add event listeners to the new buttons after rendering
  productsGrid.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      const productCard = this.closest('.product-card');
      if (productCard) {
        const productTitle = productCard.querySelector('.product-title').textContent;
        const productPrice = parseFloat(productCard.querySelector('.product-price').textContent.replace('$', ''));
        const productImg = productCard.querySelector('img').src;
        const quantitySelect = this.parentElement.querySelector('.quantity-select');
        const quantity = parseInt(quantitySelect.value, 10);
        
        // Get existing cart from localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if item already exists in cart
        const existingItemIndex = cart.findIndex(item => item.name === productTitle);
        
        if (existingItemIndex !== -1) {
          // Update quantity if item exists
          cart[existingItemIndex].quantity += quantity;
        } else {
          // Add new item if it doesn't exist
          cart.push({
            name: productTitle,
            price: productPrice,
            img: productImg,
            quantity: quantity
          });
        }
        
        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart counter
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        itemCount = totalItems;
        updateCartCounter();

        // Show toast notification
        const toast = document.getElementById('toast');
        toast.textContent = `${quantity} ${productTitle} added to cart!`;
        toast.style.display = 'block';
        
        // Hide toast after 3 seconds
        setTimeout(() => {
          toast.style.animation = 'fadeOut 0.3s ease-out';
          setTimeout(() => {
            toast.style.display = 'none';
            toast.style.animation = 'slideIn 0.3s ease-out';
          }, 300);
        }, 3000);

        // Reset quantity to 1
        quantitySelect.value = "1";
      }
    });
  });
}

// Get the cart counter element
const cartCounter = document.getElementById('cartCounter');
let itemCount = 0;

// Update the cart counter display
function updateCartCounter() {
  if (cartCounter) {
    cartCounter.textContent = itemCount.toString();
  }
}

// Initialize cart counter from localStorage
function initializeCartCounter() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  updateCartCounter();
}

// Call initializeCartCounter when the page loads
initializeCartCounter();

// Add event listeners to the 'Add to Cart' buttons using event delegation
document.addEventListener('click', function(event) {
  const addToCartButton = event.target.closest('.add-to-cart-btn');
  if (addToCartButton) {
    event.preventDefault();
    event.stopPropagation();

    const productCard = addToCartButton.closest('.product-card');
    if (productCard) {
      const productTitle = productCard.querySelector('.product-title').textContent;
      const productPrice = parseFloat(productCard.querySelector('.product-price').textContent.replace('$', ''));
      const productImg = productCard.querySelector('img').src;
      const quantitySelect = addToCartButton.parentElement.querySelector('.quantity-select');
      const quantity = parseInt(quantitySelect.value, 10);
      
      // Get existing cart from localStorage
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      
      // Check if item already exists in cart
      const existingItemIndex = cart.findIndex(item => item.name === productTitle);
      
      if (existingItemIndex !== -1) {
        // Update quantity if item exists
        cart[existingItemIndex].quantity += quantity;
      } else {
        // Add new item if it doesn't exist
        cart.push({
          name: productTitle,
          price: productPrice,
          img: productImg,
          quantity: quantity
        });
      }
      
      // Save updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Update cart counter
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      itemCount = totalItems;
      updateCartCounter();

      // Show toast notification
      const toast = document.getElementById('toast');
      toast.textContent = `${quantity} ${productTitle} added to cart!`;
      toast.style.display = 'block';
      // Hide toast after 3 seconds
      setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
          toast.style.display = 'none';
          toast.style.animation = 'slideIn 0.3s ease-out';
        }, 300);
      }, 3000);

      // Reset quantity to 1
      quantitySelect.value = "1";
    }
  }
});