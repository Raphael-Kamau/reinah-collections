// reinah_script.js

document.addEventListener('DOMContentLoaded', () => {
    // Navigation Menu Elements
    const menuIcon = document.getElementById('menu-icon');
    const closeBtn = document.querySelector('.closebtn');
    const overlay = document.getElementById('myNav');

    // Cart Modal Elements
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.querySelector('.modal .close');
    const checkoutButton = document.getElementById('checkout-button');
    const cartItemsContainer = document.getElementById('cart-items');

    // Search Elements
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const productGrid = document.querySelectorAll('.product_grid .product');

    // Initialize Cart
    let cart = [];

    // Function to Open Navigation Menu
    const openNav = () => {
        overlay.style.width = "100%";
    };

    // Function to Close Navigation Menu
    const closeNav = () => {
        overlay.style.width = "0%";
    };

    // Function to Open Cart Modal
    const openCart = () => {
        cartModal.style.display = "block";
        cartModal.setAttribute('aria-hidden', 'false');
        updateCart();
    };

    // Function to Close Cart Modal
    const closeCartModal = () => {
        cartModal.style.display = "none";
        cartModal.setAttribute('aria-hidden', 'true');
    };

    // Function to Add Items to Cart
    const addToCart = (productName, productPrice) => {
        const existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1 });
        }
        updateCart();
        notifyUser(`${productName} has been added to your cart.`);
    };

    // Function to Notify User (Replace alert with a better UX if desired)
    const notifyUser = (message) => {
        // Simple alert for demonstration; consider using a custom notification
        alert(message);
    };

    // Function to Update Cart Display
    const updateCart = () => {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            checkoutButton.style.display = 'none';
            return;
        }
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <span>${item.name}</span>
                <span>${item.price} x ${item.quantity}</span>
                <button class="remove-item" data-name="${item.name}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        checkoutButton.style.display = 'block';
        attachRemoveEvent();
    };

    // Function to Remove Items from Cart
    const attachRemoveEvent = () => {
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const productName = e.target.getAttribute('data-name');
                cart = cart.filter(item => item.name !== productName);
                updateCart();
                notifyUser(`${productName} has been removed from your cart.`);
            });
        });
    };

    // Function to Handle Search
    const handleSearch = () => {
        const query = searchInput.value.toLowerCase();
        productGrid.forEach(product => {
            const productName = product.querySelector('h3').textContent.toLowerCase();
            if (productName.includes(query)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    };

    // Event Listeners

    // Navigation Menu Toggle
    menuIcon.addEventListener('click', openNav);
    closeBtn.addEventListener('click', closeNav);

    // Cart Modal Toggle
    cartIcon.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartModal);

    // Close Cart Modal When Clicking Outside
    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            closeCartModal();
        }
    });

    // Search Functionality
    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    });

    // Checkout Button Functionality
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            notifyUser('Your cart is empty.');
            return;
        }
        // Implement checkout process here
        notifyUser('Proceeding to checkout...');
        // Clear cart
        cart = [];
        updateCart();
        closeCartModal();
    });

    // Add to Cart Buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-name');
            const productPrice = parseFloat(button.getAttribute('data-price'));
            addToCart(productName, productPrice);
        });
    });

    // Optional: Persist Cart in Local Storage (Retain cart items on page reload)
    // Load cart from localStorage if exists
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        updateCart();
    }

    // Save cart to localStorage whenever it updates
    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    // Modify updateCart to save cart after updating
    const originalUpdateCart = updateCart;
    updateCart = () => {
        originalUpdateCart();
        saveCart();
    };
});

// Image Gallery Functionality
document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumbnail-images .thumbnail');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const newSrc = thumbnail.src;
            const newAlt = thumbnail.alt;
            mainImage.src = newSrc;
            mainImage.alt = newAlt;
        });
    });

    // Optional: Add active class to selected thumbnail
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            thumbnails.forEach(img => img.classList.remove('active'));
            thumbnail.classList.add('active');
        });
    });
});

// reinah_script.js

document.addEventListener('DOMContentLoaded', () => {
    // Existing functionalities...

    // Fetch products from JSON and populate the grid
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const productGrid = document.querySelector('.product_grid');
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');

                productDiv.innerHTML = `
                    <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
                    <h3><a href="product-${product.name.toLowerCase().replace(/ /g, '-').replace(/'/g, '')}.html">${product.name}</a></h3>
                    <p class="price">KES ${product.price.toFixed(2)}</p>
                    <button class="add-to-cart-btn" data-name="${product.name}" data-price="${product.price}" aria-label="Add ${product.name} to cart">Add to Cart</button>
                `;

                productGrid.appendChild(productDiv);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
});

// reinah_script.js

document.addEventListener('DOMContentLoaded', () => {
    // Existing functionalities...

    // Handle Review Form Submission
    const reviewForm = document.getElementById('review-form');

    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('reviewer-name').value.trim();
        const rating = document.getElementById('review-rating').value;
        const message = document.getElementById('review-message').value.trim();

        if (name === '' || rating === '' || message === '') {
            alert('Please fill in all fields.');
            return;
        }

        // Create review element
        const reviewDiv = document.createElement('div');
        reviewDiv.classList.add('review');

        let stars = '&#9733;'.repeat(rating) + '&#9734;'.repeat(5 - rating);

        reviewDiv.innerHTML = `
            <p><strong>${name}</strong> <span class="rating">${stars}</span></p>
            <p>${message}</p>
        `;

        // Append to reviews
        const reviewsContainer = document.querySelector('.customer-reviews');
        reviewsContainer.insertBefore(reviewDiv, reviewForm.parentElement);

        // Reset form
        reviewForm.reset();

        alert('Thank you for your review!');
    });
});