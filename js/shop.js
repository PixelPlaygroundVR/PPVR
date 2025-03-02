/**
 * Pixel Playgrounds AR Visualizer - Shop Functionality
 * Handles shop, cart, and checkout functionality
 */

// Initialize cart from localStorage
let cart = [];

// Initialize shop
function initShop() {
    loadCart();
    displayProducts();
    updateCartCount();
    
    // Initialize tier cards for each category
    initTierCards('streamers');
    initTierCards('gamers');
    initTierCards('podcasters');
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('pixelPlaygroundsCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('pixelPlaygroundsCart', JSON.stringify(cart));
    updateCartCount();
}

// Update cart count in UI
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.length;
}

// Display products in shop
function displayProducts(category = 'all') {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';
    
    // Get products for selected category
    const products = getEquipmentByCategory(category);
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image">
                <div class="product-placeholder" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
                    <div style="
                        width: ${product.placeholder.width ? product.placeholder.width * 200 : 100}px;
                        height: ${product.placeholder.height ? product.placeholder.height * 200 : 100}px;
                        background-color: ${product.placeholder.color};
                        border-radius: ${product.placeholder.primitive === 'sphere' || product.placeholder.primitive === 'circle' ? '50%' : '0'};
                    "></div>
                </div>
            </div>
            <div class="product-category">${product.category}</div>
            <div class="product-title">${product.name}</div>
            <p>${product.description}</p>
            <div class="product-price">${formatPrice(product.price)}</div>
            <button class="neon-button" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        
        productsContainer.appendChild(productCard);
    });
}

// Filter products by category and search term
function filterProducts() {
    const category = document.getElementById('shop-category').value;
    const searchTerm = document.getElementById('search-products').value.toLowerCase();
    
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';
    
    // Get products for selected category
    let products = getEquipmentByCategory(category);
    
    // Filter by search term if provided
    if (searchTerm) {
        products = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.description.toLowerCase().includes(searchTerm)
        );
    }
    
    if (products.length === 0) {
        productsContainer.innerHTML = '<p>No products found matching your criteria.</p>';
        return;
    }
    
    // Display filtered products
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image">
                <div class="product-placeholder" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
                    <div style="
                        width: ${product.placeholder.width ? product.placeholder.width * 200 : 100}px;
                        height: ${product.placeholder.height ? product.placeholder.height * 200 : 100}px;
                        background-color: ${product.placeholder.color};
                        border-radius: ${product.placeholder.primitive === 'sphere' || product.placeholder.primitive === 'circle' ? '50%' : '0'};
                    "></div>
                </div>
            </div>
            <div class="product-category">${product.category}</div>
            <div class="product-title">${product.name}</div>
            <p>${product.description}</p>
            <div class="product-price">${formatPrice(product.price)}</div>
            <button class="neon-button" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        
        productsContainer.appendChild(productCard);
    });
}

// Add product to cart
function addToCart(productId) {
    const product = getEquipmentById(productId);
    
    if (product) {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            placeholder: product.placeholder
        });
        
        saveCart();
        playSound('click-sound');
        showAssistantMessage(`Added ${product.name} to your cart!`);
    }
}

// Remove item from cart
function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
        const removedItem = cart[index];
        cart.splice(index, 1);
        saveCart();
        displayCart();
        playSound('click-sound');
        showAssistantMessage(`Removed ${removedItem.name} from your cart.`);
    }
}

// Clear cart
function clearCart() {
    cart = [];
    saveCart();
    displayCart();
    playSound('click-sound');
    showAssistantMessage("Your cart has been cleared.");
}

// Display cart
function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        cartTotalPrice.textContent = formatPrice(0);
        return;
    }
    
    let total = 0;
    
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <div class="product-placeholder" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
                    <div style="
                        width: ${item.placeholder.width ? item.placeholder.width * 80 : 40}px;
                        height: ${item.placeholder.height ? item.placeholder.height * 80 : 40}px;
                        background-color: ${item.placeholder.color};
                        border-radius: ${item.placeholder.primitive === 'sphere' || item.placeholder.primitive === 'circle' ? '50%' : '0'};
                    "></div>
                </div>
            </div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
            </div>
            <div class="cart-item-remove" onclick="removeFromCart(${index})">×</div>
        `;
        
        cartItemsContainer.appendChild(cartItem);
        total += item.price;
    });
    
    cartTotalPrice.textContent = formatPrice(total);
    
    // Update order summary in checkout
    updateOrderSummary();
}

// View cart
function viewCart() {
    activateSection('cart');
    displayCart();
    playSound('click-sound');
}

// Show checkout
function showCheckout() {
    if (cart.length === 0) {
        showAssistantMessage("Your cart is empty. Add some items before checkout.");
        return;
    }
    
    activateSection('checkout');
    updateOrderSummary();
    playSound('click-sound');
}

// Update order summary in checkout
function updateOrderSummary() {
    const orderItemsContainer = document.getElementById('order-items');
    const orderSubtotal = document.getElementById('order-subtotal');
    const orderTotal = document.getElementById('order-total');
    
    orderItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        orderItemsContainer.innerHTML = '<p>No items in your order.</p>';
        orderSubtotal.textContent = formatPrice(0);
        orderTotal.textContent = formatPrice(0);
        return;
    }
    
    let subtotal = 0;
    
    cart.forEach(item => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        
        orderItem.innerHTML = `
            <div class="order-item-name">${item.name}</div>
            <div class="order-item-price">${formatPrice(item.price)}</div>
        `;
        
        orderItemsContainer.appendChild(orderItem);
        subtotal += item.price;
    });
    
    orderSubtotal.textContent = formatPrice(subtotal);
    
    // Check if installation is selected
    const installationCost = document.getElementById('installation').checked ? 100 : 0;
    const total = subtotal + installationCost;
    
    orderTotal.textContent = formatPrice(total);
}

// Toggle installation date field
function toggleInstallationDate() {
    const installationDateGroup = document.getElementById('installation-date-group');
    const installationCost = document.getElementById('installation-cost');
    
    if (document.getElementById('installation').checked) {
        installationDateGroup.style.display = 'block';
        installationCost.style.display = 'flex';
    } else {
        installationDateGroup.style.display = 'none';
        installationCost.style.display = 'none';
    }
    
    updateOrderSummary();
}

// Toggle package installation date field
function togglePackageInstallationDate() {
    const installationDateGroup = document.getElementById('package-installation-date-group');
    const installationCost = document.getElementById('package-installation-cost');
    
    if (document.getElementById('package-installation').checked) {
        installationDateGroup.style.display = 'block';
        installationCost.style.display = 'flex';
    } else {
        installationDateGroup.style.display = 'none';
        installationCost.style.display = 'none';
    }
    
    updatePackageTotal();
}

// Update package total price
function updatePackageTotal() {
    const packagePrice = parseFloat(document.getElementById('package-price').textContent.replace('$', ''));
    const installationCost = document.getElementById('package-installation').checked ? 100 : 0;
    const total = packagePrice + installationCost;
    
    document.getElementById('package-total').textContent = formatPrice(total);
}

// Process order
function processOrder(event) {
    event.preventDefault();
    
    if (cart.length === 0) {
        showAssistantMessage("Your cart is empty. Add some items before checkout.");
        return;
    }
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const installation = document.getElementById('installation').checked;
    const installationDate = installation ? document.getElementById('installation-date').value : '';
    
    // Calculate total
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price;
    });
    
    const installationCost = installation ? 100 : 0;
    const total = subtotal + installationCost;
    
    // Prepare order details for email
    const orderDetails = {
        name,
        email,
        phone,
        address,
        items: cart,
        subtotal,
        installation,
        installationDate,
        installationCost,
        total
    };
    
    // Send email
    sendOrderEmail(orderDetails);
    
    // Show confirmation
    displayConfirmation(orderDetails);
    
    // Clear cart
    cart = [];
    saveCart();
    
    // Play success sound
    playSound('success-sound');
}

// Process package order
function processPackageOrder(event) {
    event.preventDefault();
    
    // Get form data
    const name = document.getElementById('package-name').value;
    const email = document.getElementById('package-email').value;
    const phone = document.getElementById('package-phone').value;
    const address = document.getElementById('package-address').value;
    const installation = document.getElementById('package-installation').checked;
    const installationDate = installation ? document.getElementById('package-installation-date').value : '';
    
    // Get package details
    const packageTitle = document.getElementById('package-title').textContent;
    const packageDetails = document.getElementById('package-details').innerHTML;
    const packagePrice = parseFloat(document.getElementById('package-price').textContent.replace('$', ''));
    
    const installationCost = installation ? 100 : 0;
    const total = packagePrice + installationCost;
    
    // Prepare order details for email
    const orderDetails = {
        name,
        email,
        phone,
        address,
        packageTitle,
        packageEquipment: currentEquipment,
        packagePrice,
        installation,
        installationDate,
        installationCost,
        total,
        isPackage: true
    };
    
    // Send email
    sendOrderEmail(orderDetails);
    
    // Show confirmation
    displayConfirmation(orderDetails);
    
    // Play success sound
    playSound('success-sound');
}

// Send order email using EmailJS
function sendOrderEmail(orderDetails) {
    // In a real app, you would use EmailJS to send the email
    // For this demo, we'll just log the order details
    console.log('Sending order email:', orderDetails);
    
    // Example EmailJS implementation (commented out for demo)
    /*
    emailjs.send('service_id', 'template_id', {
        to_email: 'PixelPlaygroundsNash@Gmail.com',
        from_name: orderDetails.name,
        from_email: orderDetails.email,
        subject: orderDetails.isPackage ? `Package Order: ${orderDetails.packageTitle}` : 'New Equipment Order',
        message: JSON.stringify(orderDetails, null, 2)
    })
    .then(function(response) {
        console.log('Email sent successfully:', response);
    }, function(error) {
        console.error('Email failed to send:', error);
        showAssistantMessage("There was an error processing your order. Please try again.");
    });
    */
}

// Display order confirmation
function displayConfirmation(orderDetails) {
    activateSection('confirmation');
    
    const confirmationDetails = document.getElementById('confirmation-details');
    confirmationDetails.innerHTML = '';
    
    // Customer info
    const customerInfo = document.createElement('div');
    customerInfo.innerHTML = `
        <h3>Customer Information</h3>
        <p><strong>Name:</strong> ${orderDetails.name}</p>
        <p><strong>Email:</strong> ${orderDetails.email}</p>
        <p><strong>Phone:</strong> ${orderDetails.phone}</p>
        <p><strong>Address:</strong> ${orderDetails.address}</p>
    `;
    confirmationDetails.appendChild(customerInfo);
    
    // Order details
    const orderInfo = document.createElement('div');
    orderInfo.innerHTML = `<h3>Order Details</h3>`;
    
    if (orderDetails.isPackage) {
        // Package order
        orderInfo.innerHTML += `
            <p><strong>Package:</strong> ${orderDetails.packageTitle}</p>
            <div><strong>Equipment:</strong></div>
            <ul>
                ${orderDetails.packageEquipment.map(item => `<li>${item.name} - ${formatPrice(item.price)}</li>`).join('')}
            </ul>
            <p><strong>Package Price:</strong> ${formatPrice(orderDetails.packagePrice)}</p>
        `;
    } else {
        // Regular order
        orderInfo.innerHTML += `
            <div><strong>Items:</strong></div>
            <ul>
                ${orderDetails.items.map(item => `<li>${item.name} - ${formatPrice(item.price)}</li>`).join('')}
            </ul>
            <p><strong>Subtotal:</strong> ${formatPrice(orderDetails.subtotal)}</p>
        `;
    }
    
    // Installation
    if (orderDetails.installation) {
        orderInfo.innerHTML += `
            <p><strong>Installation:</strong> Yes (${formatPrice(orderDetails.installationCost)})</p>
            <p><strong>Installation Date:</strong> ${orderDetails.installationDate}</p>
        `;
    }
    
    // Total
    orderInfo.innerHTML += `<p><strong>Total:</strong> ${formatPrice(orderDetails.total)}</p>`;
    
    confirmationDetails.appendChild(orderInfo);
    
    // Show assistant message
    showAssistantMessage("Thank you for your order! A confirmation email has been sent to your email address.");
}

// Initialize tier cards for category pages
function initTierCards(category) {
    const tierCardsContainer = document.getElementById(`${category}-tiers`);
    if (!tierCardsContainer) return;
    
    tierCardsContainer.innerHTML = '';
    
    packages[category].forEach(pkg => {
        const tierCard = document.createElement('div');
        tierCard.className = 'tier-card';
        
        tierCard.innerHTML = `
            <div class="tier-number">Tier ${pkg.tier}</div>
            <div class="tier-name">${pkg.name}</div>
            <p>${pkg.description}</p>
            <div class="tier-price">${formatPrice(pkg.price)}</div>
            <button class="neon-button" onclick="selectTierAndGoHome('${category}', ${pkg.tier})">Visualize</button>
        `;
        
        tierCardsContainer.appendChild(tierCard);
    });
}

// Select tier and go to home
function selectTierAndGoHome(category, tier) {
    // Set the category and tier in the dropdowns
    document.getElementById('category').value = category;
    document.getElementById('tier').value = tier;
    
    // Activate home section
    activateSection('home');
    
    // Update equipment
    updateEquipment();
    
    // Play sound effect
    playSound('click-sound');
}

// Show order form for package
function showOrderForm() {
    const category = document.getElementById('category').value;
    const tier = document.getElementById('tier').value;
    
    if (!category || !tier) {
        showAssistantMessage("Please select a category and tier first.");
        return;
    }
    
    // Update package info
    updatePackageInfo(category, tier);
    
    // Activate order package section
    activateSection('order-package');
    
    // Play sound effect
    playSound('click-sound');
}

// Initialize shop when the page loads
document.addEventListener('DOMContentLoaded', initShop); 