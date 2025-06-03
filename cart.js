// Get cart data from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add variables for confirmation dialog
let itemToDelete = null;

function showDeleteConfirmation(index) {
    itemToDelete = index;
    document.querySelector('.delete-confirmation').classList.add('active');
    document.querySelector('.overlay').classList.add('active');
}

function hideDeleteConfirmation() {
    document.querySelector('.delete-confirmation').classList.remove('active');
    document.querySelector('.overlay').classList.remove('active');
    itemToDelete = null;
}

function confirmDelete() {
    if (itemToDelete !== null) {
        removeItem(itemToDelete);
        hideDeleteConfirmation();
    }
}

function updateCartDisplay() {
    const cartContent = document.getElementById('cartContent');
    const cartCounter = document.getElementById('cartCounter');
    
    // Update cart counter
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCounter.textContent = totalItems;

    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="cart-empty">
                <p>Your cart is empty</p>
                <a href="index.html" class="continue-shopping">Continue Shopping</a>
            </div>
        `;
        return;
    }

    // Calculate total price
    const totalPrice = cart.reduce((sum, item) => {
        return sum + (parseFloat(item.price) * item.quantity);
    }, 0);

    // Generate cart items HTML
    const cartItemsHTML = cart.map((item, index) => {
        const itemTotal = item.price * item.quantity;
        return `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${index}, ${item.quantity - 1})" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" 
                               min="1" onchange="updateQuantity(${index}, this.value - item.quantity)">
                        <button class="quantity-btn" onclick="updateQuantity(${index}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <div class="cart-item-total">
                    <p>$${itemTotal.toFixed(2)}</p>
                    <button class="remove-item" onclick="showDeleteConfirmation(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');

    // Generate summary HTML
    const summaryHTML = `
        <div class="cart-summary">
            <div class="summary-row">
                <span>Subtotal</span>
                <span>$${totalPrice.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Shipping</span>
                <span>Free</span>
            </div>
            <div class="summary-row total">
                <span>Total</span>
                <span>$${totalPrice.toFixed(2)}</span>
            </div>
            <button class="checkout-btn" onclick="checkout()" ${totalItems === 0 ? 'disabled' : ''}>
                Proceed to Checkout
            </button>
        </div>
    `;

    cartContent.innerHTML = `
        <div class="cart-items">
            ${cartItemsHTML}
        </div>
        ${summaryHTML}
    `;

    // Add event listeners for confirmation dialog buttons
    document.querySelector('.confirm-btn').onclick = confirmDelete;
    document.querySelector('.cancel-btn').onclick = hideDeleteConfirmation;
}

function updateQuantity(index, change) {
    const newQuantity = cart[index].quantity + change;
    if (newQuantity > 0) {
        cart[index].quantity = newQuantity;
        saveCart();
        updateCartDisplay();
    }
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartDisplay();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function checkout() {
    // Create a new order from the current cart
    const order = {
        orderNumber: `ORD-${Date.now()}`,
        date: new Date().toISOString(),
        status: 'Completed',
        items: cart.map(item => ({
            name: item.name,
            price: parseFloat(item.price),
            quantity: item.quantity,
            image: item.img
        })),
        total: cart.reduce((sum, item) => {
            const price = parseFloat(item.price);
            return sum + (price * item.quantity);
        }, 0)
    };

    // Get existing orders or initialize empty array
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear the cart
    cart = [];
    saveCart();

    // Show alert and redirect
    alert('Payment successful! Thank you for your purchase.');
    window.location.href = 'index.html';
}

// Initialize cart display
updateCartDisplay();

function renderCart() {
    const cartContent = document.getElementById('cartContent');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="cart-empty">
                <p>Your cart is empty</p>
                <a href="index.html" class="continue-shopping">Continue Shopping</a>
            </div>
        `;
        return;
    }

    let cartHTML = '<div class="cart-items">';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartHTML += `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease" data-index="${index}">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn increase" data-index="${index}">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="showDeleteConfirmation(${index})" data-index="${index}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
    });

    cartHTML += '</div>';

    cartHTML += `
        <div class="cart-summary">
            <div class="summary-row">
                <span>Subtotal</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Shipping</span>
                <span>Free</span>
            </div>
            <div class="summary-row total">
                <span>Total</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <button class="checkout-btn" onclick="checkout()">Proceed to Checkout</button>
        </div>
    `;

    cartContent.innerHTML = cartHTML;

    // Add event listeners for quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            if (this.classList.contains('increase')) {
                cart[index].quantity = Math.min(cart[index].quantity + 1, 30);
            } else if (this.classList.contains('decrease')) {
                cart[index].quantity = Math.max(cart[index].quantity - 1, 1);
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
            updateCartCounter();
        });
    });

    
}

// Initialize cart counter
function updateCartCounter() {
    const cartCounter = document.getElementById('cartCounter');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCounter.textContent = totalItems;
}

// Render cart when page loads
document.addEventListener('DOMContentLoaded', function() {
    renderCart();
    updateCartCounter();
});

// Update the checkout button event listener
const checkoutBtn = document.querySelector('.checkout-btn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) return;

        // Create new order
        const order = {
            orderNumber: 'ORD' + Date.now(),
            date: new Date().toISOString(),
            status: 'Completed',
            items: cart,
            totalPrice: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        };

        // Save order to localStorage
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        // Clear cart
        localStorage.setItem('cart', JSON.stringify([]));

        // Show alert and redirect
        alert('Payment successful! Thank you for your purchase.');
        window.location.href = 'index.html';
    });
}