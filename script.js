// Product Database
const products = {
    fruits: [
        { id: 1, name: 'Apple', price: 180, category: 'fruits', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6', unit: 'kg' },
        { id: 2, name: 'Banana', price: 60, category: 'fruits', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e', unit: 'dozen' },
        { id: 3, name: 'Orange', price: 120, category: 'fruits', image: 'https://images.unsplash.com/photo-1580052614034-c55d20bfee3b', unit: 'kg' },
    ],
    vegetables: [
        { id: 4, name: 'Tomato', price: 40, category: 'vegetables', image: 'https://images.unsplash.com/photo-1546470427-f5b6c2f9c9ab', unit: 'kg' },
        { id: 5, name: 'Potato', price: 30, category: 'vegetables', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655', unit: 'kg' },
        { id: 6, name: 'Onion', price: 35, category: 'vegetables', image: 'https://images.unsplash.com/photo-1618512496248-a01f54a0559b', unit: 'kg' },
    ],
    meat: [
        { id: 7, name: 'Chicken Breast', price: 280, category: 'meat', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791', unit: 'kg' },
        { id: 8, name: 'Chicken Thigh', price: 260, category: 'meat', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791', unit: 'kg' },
        { id: 9, name: 'Chicken Wings', price: 220, category: 'meat', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791', unit: 'kg' },
    ]
};

// Recipe Database
const recipes = [
    {
        id: 1,
        name: 'Chicken Curry',
        image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398',
        ingredients: [
            { id: 7, quantity: 0.5 },
            { id: 5, quantity: 0.25 },
            { id: 6, quantity: 0.2 },
            { id: 4, quantity: 0.3 }
        ],
        instructions: 'Cook chicken with spices and vegetables for a delicious curry.'
    },
    {
        id: 2,
        name: 'Fruit Salad',
        image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea',
        ingredients: [
            { id: 1, quantity: 0.25 },
            { id: 2, quantity: 0.5 },
            { id: 3, quantity: 0.25 }
        ],
        instructions: 'Mix fresh fruits together for a healthy dessert.'
    }
];

// Shopping Cart
let cart = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('recipes.html')) {
        displayRecipes();
    } else {
        displayProducts('all');
    }
    
    // Setup cart button
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', showCart);
    }
});

// Display all products or filter by category
function displayProducts(category) {
    const container = document.getElementById('productsContainer');
    if (!container) return;

    container.innerHTML = '';
    let displayProducts = [];

    if (category === 'all') {
        Object.values(products).forEach(categoryProducts => {
            displayProducts = [...displayProducts, ...categoryProducts];
        });
    } else {
        displayProducts = products[category] || [];
    }

    displayProducts.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

// Create product card
function createProductCard(product) {
    const div = document.createElement('div');
    div.className = 'col-md-4 mb-4';
    div.innerHTML = `
        <div class="card h-100">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">₹${product.price} per ${product.unit}</p>
                <div class="quantity-control">
                    <button onclick="updateQuantity(${product.id}, -1)">-</button>
                    <span id="quantity-${product.id}">0</span>
                    <button onclick="updateQuantity(${product.id}, 1)">+</button>
                </div>
                <button class="btn btn-success mt-2" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `;
    return div;
}

// Display recipes
function displayRecipes() {
    const container = document.getElementById('recipesContainer');
    if (!container) return;

    recipes.forEach(recipe => {
        const div = document.createElement('div');
        div.className = 'col-md-6 mb-4';
        div.innerHTML = `
            <div class="card recipe-card" onclick="showRecipeDetails(${recipe.id})">
                <img src="${recipe.image}" class="card-img-top" alt="${recipe.name}">
                <div class="card-body">
                    <h5 class="card-title">${recipe.name}</h5>
                    <p class="card-text">Click to view recipe details</p>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

// Show recipe details
function showRecipeDetails(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;

    const modal = new bootstrap.Modal(document.getElementById('recipeModal'));
    document.getElementById('recipeTitle').textContent = recipe.name;
    
    const detailsContainer = document.getElementById('recipeDetails');
    const ingredientsContainer = document.getElementById('recipeIngredients');
    
    detailsContainer.innerHTML = `
        <p>${recipe.instructions}</p>
        <h6>Ingredients needed:</h6>
    `;

    ingredientsContainer.innerHTML = `
        <ul class="ingredient-list">
            ${recipe.ingredients.map(ing => {
                const product = findProductById(ing.id);
                return `<li>${ing.quantity} ${product.unit} ${product.name}</li>`;
            }).join('')}
        </ul>
    `;

    modal.show();
}

// Add recipe ingredients to cart
function addIngredientsToCart() {
    const recipeTitle = document.getElementById('recipeTitle').textContent;
    const recipe = recipes.find(r => r.name === recipeTitle);
    
    recipe.ingredients.forEach(ing => {
        const product = findProductById(ing.id);
        addToCart(ing.id, ing.quantity);
    });

    const modal = bootstrap.Modal.getInstance(document.getElementById('recipeModal'));
    modal.hide();
    showCart();
}

// Find product by ID
function findProductById(id) {
    return Object.values(products)
        .flat()
        .find(product => product.id === id);
}

// Update quantity
function updateQuantity(productId, change) {
    const quantityElement = document.getElementById(`quantity-${productId}`);
    let quantity = parseInt(quantityElement.textContent) + change;
    quantity = Math.max(0, quantity);
    quantityElement.textContent = quantity;
}

// Add to cart
function addToCart(productId, quantity = 1) {
    const product = findProductById(productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }

    updateCartCount();
}

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

// Show cart
function showCart() {
    const modal = new bootstrap.Modal(document.getElementById('cartModal'));
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.textContent = '0';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <h6>${item.name}</h6>
                    <small>₹${item.price} × ${item.quantity} ${item.unit}</small>
                </div>
                <div>
                    ₹${item.price * item.quantity}
                    <button class="btn btn-sm btn-danger ms-2" onclick="removeFromCart(${item.id})">×</button>
                </div>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total;
    }

    modal.show();
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    showCart();
}

// Checkout
function checkout() {
    alert('Thank you for your purchase! Total amount: ₹' + document.getElementById('cartTotal').textContent);
    cart = [];
    updateCartCount();
    const modal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
    modal.hide();
}

// Filter products
function filterProducts(category) {
    displayProducts(category);
}