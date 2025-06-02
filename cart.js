 // Get cart data from localStorage
 let cart = JSON.parse(localStorage.getItem('cart')) || [];

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
   const cartItemsHTML = cart.map((item, index) => `
     <div class="cart-item">
       <img src="${item.img}" alt="${item.name}" class="cart-item-image">
       <div class="cart-item-details">
         <div class="cart-item-title">${item.name}</div>
         <div class="cart-item-price">${item.price.toFixed(2)}</div>
         <div class="cart-item-quantity">
           <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
           <input type="number" class="quantity-input" value="${item.quantity}" 
                  min="1" onchange="updateQuantity(${index}, this.value - item.quantity)">
           <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
         </div>
       </div>
       <button class="remove-item" onclick="removeItem(${index})">
         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
           <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
         </svg>
       </button>
     </div>
   `).join('');

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
     status: 'processing',
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

   // Redirect to orders page
   window.location.href = 'orders.html';
 }

 // Initialize cart display
 updateCartDisplay();