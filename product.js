let products = JSON.parse(localStorage.getItem('products')) || [];
let averageRating = 0;
    document.addEventListener('DOMContentLoaded', function() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('product'));
        const productIndex = products.findIndex(product => product.id === productId);
        let product = products[productIndex];

        const productDetailContainer = document.getElementById('productDetail');
        if (product.reviewList && product.reviewList.length > 0) {
            const totalStars = product.reviewList.reduce((sum, review) => sum + review.stars, 0);
            const rawAverage = totalStars / product.reviewList.length;
            // Round to nearest 0.5
            averageRating = Math.round(rawAverage);
        }


      if (product) {
        const productHtml = `
          <a href="index.html" class="back-link">&larr; Back to Products</a>
          <div class="product-detail-header">
            <img src="${product.img}" alt="${product.name}">
            <div class="product-detail-info">
              <div class="product-detail-title">${product.name}</div>
              <div class="product-detail-meta">${product.category}</div>
              <div class="product-detail-price">$${product.price.toFixed(2)}</div>
              <div class="product-detail-rating">
                <span class="stars">${'★'.repeat(averageRating)}${'☆'.repeat(5 - averageRating)}</span>
                <span>(${product.reviews} reviews)</span>
              </div>
              <div class="product-detail-desc">${product.description}</div>
              <div class="product-meta" style="margin-top: 10px; text-align: left;">
                 Condition: <span class="condition-badge ${product.condition.toLowerCase()}">${product.condition}</span>
              </div>
            </div>
          </div>
          <div class="add-to-cart-controls">
            <input type="number" class="quantity-input" value="1" min="1">
            <div class="error-message">Please enter a positive number</div>
            <button class="add-to-cart-btn">Add to Cart</button>
            <button class="chat-button" id="openChatBtn">
              <svg viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
              </svg>
              Chat with Seller
            </button>
          </div>
          <div class="chat-overlay" id="chatOverlay">
            <section class="chat-section" id="chatSection">
              <div class="chat-header">
                <h3>Chat with Seller</h3>
                <button class="close-chat-btn" id="closeChatBtn">&times;</button>
              </div>
              <div class="chat-messages" id="chatMessages">
                <div class="message seller">
                  Hello! I'm the seller. How can I help you with this product?
                </div>
              </div>
              <div class="message-input-container">
                <input type="text" class="message-input" id="messageInput" placeholder="Type your message...">
                <button class="send-message-btn" id="sendMessageBtn">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                </button>
              </div>
            </section>
          </div>
          <section class="add-review-section">
            <h3>Leave a review</h3>
            <form id="reviewForm">
              <div class="form-group">
                <label for="review-rating">Star Rating:</label>
                <div class="star-rating-input">
                  <input type="radio" id="star5" name="rating" value="5"><label for="star5"></label>
                  <input type="radio" id="star4" name="rating" value="4"><label for="star4"></label>
                  <input type="radio" id="star3" name="rating" value="3"><label for="star3"></label>
                  <input type="radio" id="star2" name="rating" value="2"><label for="star2"></label>
                  <input type="radio" id="star1" name="rating" value="1"><label for="star1"></label>
                </div>
                <div class="rating-error">Please select a star rating</div>
              </div>
              <div class="form-group">
                <label for="review-text">Your Review:</label>
                <textarea id="review-text" name="reviewText" rows="4" required></textarea>
              </div>
              <button type="submit">Submit Review</button>
            </form>
          </section>
          <section class="reviews-section">
            <h3>User Reviews</h3>
            <div id="userReviews">
              
            </div>
          </section>
        `;
        productDetailContainer.innerHTML = productHtml;

        // Handle 'Add to Cart' button click
        const addToCartButton = productDetailContainer.querySelector('.add-to-cart-btn');
        if (addToCartButton) {
          addToCartButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default button behavior
            
            const quantityInput = productDetailContainer.querySelector('.quantity-input');
            const errorMessage = productDetailContainer.querySelector('.error-message');
            const quantity = parseInt(quantityInput.value, 10);

            if (isNaN(quantity) || quantity <= 0) {
              errorMessage.classList.add('show');
              return;
            }

            errorMessage.classList.remove('show');
            
            // Get existing cart from localStorage
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            // Check if item already exists in cart
            const existingItemIndex = cart.findIndex(item => item.name === product.name);
            
            if (existingItemIndex !== -1) {
              // Update quantity if item exists
              cart[existingItemIndex].quantity += quantity;
            } else {
              // Add new item if it doesn't exist
              cart.push({
                name: product.name,
                price: product.price,
                img: product.img,
                quantity: quantity
              });
            }
            
            // Save updated cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update cart counter
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            const cartCounter = document.getElementById('cartCounter');
            if (cartCounter) {
              cartCounter.textContent = totalItems;
            }
          });
        }

        // Add input validation for quantity
        const quantityInput = productDetailContainer.querySelector('.quantity-input');
        const errorMessage = productDetailContainer.querySelector('.error-message');
        
        quantityInput.addEventListener('input', function() {
          const value = parseInt(this.value, 10);
          if (isNaN(value) || value <= 0) {
            errorMessage.classList.add('show');
          } else {
            errorMessage.classList.remove('show');
          }
        });

        // Initialize cart counter on page load
        const cartCounter = document.getElementById('cartCounter');
        if (cartCounter) {
          const cart = JSON.parse(localStorage.getItem('cart')) || [];
          const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
          cartCounter.textContent = totalItems;
        }

        // Display existing reviews
        const reviewsContainer = document.getElementById('userReviews');
        if (product.reviewList && product.reviewList.length > 0) {
          product.reviewList.forEach((review, index) => {
            const reviewElement = `
              <div class="review">
                ${review.reviewer === 'John' ? `
                <button class="delete-review-btn" data-review-index="${index}" title="Delete review">
                  ✕
                </button>
                ` : ''}
                <div class="reviewer">${review.reviewer}</div>
                <div class="review-stars">${'★'.repeat(review.stars)}${'☆'.repeat(5-review.stars)}</div>
                <div class="review-text">${review.text}</div>
                <div class="review-date">${new Date(review.date).toLocaleDateString()}</div>
              </div>
            `;
            reviewsContainer.innerHTML += reviewElement;
          });
          attachDeleteButtonListeners();
        } else {
          reviewsContainer.innerHTML = '<p>No reviews yet.</p>';
        }

        // Handle review submission
        const reviewForm = document.getElementById('reviewForm');
        const ratingError = document.querySelector('.rating-error');
        
        // Add event listeners to star rating inputs
        const starInputs = document.querySelectorAll('.star-rating-input input[type="radio"]');
        starInputs.forEach(input => {
          input.addEventListener('change', () => {
            if (input.checked) {
              ratingError.classList.remove('show');
            }
          });
        });

        reviewForm.addEventListener('submit', function(event) {
          event.preventDefault();
          const rating = reviewForm.rating.value;
          const reviewText = reviewForm.reviewText.value;
          
          // Validate star rating
          if (!rating) {
            ratingError.classList.add('show');
            return;
          }
          
          ratingError.classList.remove('show');
          
          // Add new review
          const newReview = {
            reviewer: 'John', 
            stars: parseInt(rating),
            text: reviewText,
            date: new Date().toISOString()
          };
          
          // Update product in localStorage
          let products = JSON.parse(localStorage.getItem('products')) || [];
          const urlParams = new URLSearchParams(window.location.search);
          const productId = parseInt(urlParams.get('product'));
          const productIndex = products.findIndex(product => product.id === productId);
          if (productId !== -1) {
            // Initialize reviews array if it doesn't exist
            products.map(
              (product,index) => {
                if (product.id === productId) {
                  if (!product.reviewList) {
                    product.reviewList = [];
                  }
                  products[index].reviewList.push(newReview);
                  products[index].reviews = (products[index].reviews || 0) + 1;
                }
              }
            )
            
            // Update review count
            // Save back to localStorage
            localStorage.setItem('products', JSON.stringify(products));
          }

          // Reset form
          reviewForm.reset();
          
          // Update reviews display
          reviewsContainer.innerHTML = ''; // Clear existing reviews
          console.log("productIndex",productIndex)
          products[productIndex].reviewList.forEach((review, reviewIndex) => {
            const reviewElement = `
              <div class="review">
                ${review.reviewer === 'John' ? `
                <button class="delete-review-btn" data-review-index="${reviewIndex}" title="Delete review">
                  ✕
                </button>
                ` : ''}
                <div class="reviewer">${review.reviewer}</div>
                <div class="review-stars">${'★'.repeat(review.stars)}${'☆'.repeat(5 - review.stars)}</div>
                <div class="review-text">${review.text}</div>
                <div class="review-date">${new Date(review.date).toLocaleDateString()}</div>
              </div>
            `;
            reviewsContainer.innerHTML += reviewElement;
          });

          // Update the product rating display
          products = JSON.parse(localStorage.getItem('products')) || [];
          product = products[productIndex];
          if (product.reviewList && product.reviewList.length > 0) {
            const totalStars = product.reviewList.reduce((sum, review) => sum + review.stars, 0)+parseInt(rating);
            const rawAverage = totalStars / (product.reviewList.length+1);
            averageRating = Math.round(rawAverage);
        }
          const ratingDisplay = document.querySelector('.product-detail-rating');
          if (ratingDisplay) {
            ratingDisplay.innerHTML = `
              <span class="stars">${'★'.repeat(averageRating)}${'☆'.repeat(5-averageRating)}</span>
              <span>(${products[productId].reviewList.length} reviews)</span>
            `;
          }

          // Add delete button event listeners
          attachDeleteButtonListeners();
        });

        // Chat functionality
        const chatOverlay = document.getElementById('chatOverlay');
        const chatSection = document.getElementById('chatSection');
        const openChatBtn = document.getElementById('openChatBtn');
        const closeChatBtn = document.getElementById('closeChatBtn');
        const chatMessages = document.getElementById('chatMessages');
        const messageInput = document.getElementById('messageInput');
        const sendMessageBtn = document.getElementById('sendMessageBtn');

        // Show chat when button is clicked
        openChatBtn.addEventListener('click', () => {
          chatOverlay.classList.add('active');
          document.body.style.overflow = 'hidden'; // Prevent background scrolling
          messageInput.focus();
        });

        // Hide chat when close button is clicked
        closeChatBtn.addEventListener('click', () => {
          chatOverlay.classList.remove('active');
          document.body.style.overflow = ''; // Restore scrolling
        });

        // Close chat when clicking outside
        chatOverlay.addEventListener('click', (e) => {
          if (e.target === chatOverlay) {
            chatOverlay.classList.remove('active');
            document.body.style.overflow = '';
          }
        });

        // Close chat when pressing Escape key
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && chatOverlay.classList.contains('active')) {
            chatOverlay.classList.remove('active');
            document.body.style.overflow = '';
          }
        });

        function addMessage(text, isUser = false) {
          const messageDiv = document.createElement('div');
          messageDiv.className = `message ${isUser ? 'user' : 'seller'}`;
          messageDiv.textContent = text;
          chatMessages.appendChild(messageDiv);
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function handleSendMessage() {
          const message = messageInput.value.trim();
          if (message) {
            addMessage(message, true);
            messageInput.value = '';
            
            // Simulate seller response after 1 second
            setTimeout(() => {
              const responses = [
                "Thanks for your message! I'll get back to you shortly.",
                "I'm here to help! What would you like to know?",
                "That's a great question! Let me check the details for you.",
                "I'm available to answer any questions about this product."
              ];
              const randomResponse = responses[Math.floor(Math.random() * responses.length)];
              addMessage(randomResponse);
            }, 1000);
          }
        }

        sendMessageBtn.addEventListener('click', handleSendMessage);
        messageInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            handleSendMessage();
          }
        });

        // Function to attach delete button listeners
        function attachDeleteButtonListeners() {
          document.querySelectorAll('.delete-review-btn').forEach(btn => {
            btn.addEventListener('click', function() {
              const reviewIndex = parseInt(this.dataset.reviewIndex);
              if (confirm('Are you sure you want to delete this review?')) {
                // Remove review from localStorage
                const products = JSON.parse(localStorage.getItem('products')) || [];
                const urlParams = new URLSearchParams(window.location.search);
                const productId = parseInt(urlParams.get('product'));
                
                products[productId].reviewList.splice(reviewIndex, 1);
                products[productId].reviews = products[productId].reviewList.length;
                localStorage.setItem('products', JSON.stringify(products));

                // Update reviews display
                const reviewsContainer = document.getElementById('userReviews');
                reviewsContainer.innerHTML = ''; // Clear existing reviews
                products[productId].reviewList.forEach((review, reviewIndex) => {
                  const reviewElement = `
                    <div class="review">
                      ${review.reviewer === 'John' ? `
                      <button class="delete-review-btn" data-review-index="${reviewIndex}" title="Delete review">
                        ✕
                      </button>
                      ` : ''}
                      <div class="reviewer">${review.reviewer}</div>
                      <div class="review-stars">${'★'.repeat(review.stars)}${'☆'.repeat(5 - review.stars)}</div>
                      <div class="review-text">${review.text}</div>
                      <div class="review-date">${new Date(review.date).toLocaleDateString()}</div>
                    </div>
                  `;
                  reviewsContainer.innerHTML += reviewElement;
                });

                // Update the product rating display
                if (product.reviewList && product.reviewList.length > 0) {
                    const totalStars = product.reviewList.reduce((sum, review) => sum + review.stars, 0);
                    const rawAverage = totalStars / product.reviewList.length;
                    // Round to nearest 0.5
                    averageRating = Math.round(rawAverage);
                }
        
                
                const ratingDisplay = document.querySelector('.product-detail-rating');
                if (ratingDisplay) {
                  ratingDisplay.innerHTML = `
                    <span class="stars">${'★'.repeat(averageRating)}${'☆'.repeat(5-averageRating)}</span>
                    <span>(${products[productId].reviewList.length} reviews)</span>
                  `;
                }

                // Reattach event listeners to new delete buttons
                attachDeleteButtonListeners();
              }
            });
          });
        }

      } else {
        productDetailContainer.innerHTML = '<p>Product not found.</p>';
      }
    });