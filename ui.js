// UI Components
export class UI {
    static displayProducts(products, container) {
        const allProducts = Object.values(products).flat();
        container.innerHTML = allProducts.map(product => this.createProductCard(product)).join('');
    }

    static filterProducts(products, category, container) {
        if (category === 'all') {
            this.displayProducts(products, container);
        } else {
            const filtered = products[category] || [];
            container.innerHTML = filtered.map(product => this.createProductCard(product)).join('');
        }
    }

    static createProductCard(product) {
        return `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">₹${product.price} per ${product.unit}</p>
                        <div class="quantity-control">
                            <button onclick="window.decreaseQuantity(${product.id})">-</button>
                            <span id="quantity-${product.id}">1</span>
                            <button onclick="window.increaseQuantity(${product.id})">+</button>
                        </div>
                        <button class="btn btn-success mt-2" onclick="window.addToCart(${product.id})">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    static displayRecipes(recipes, container) {
        container.innerHTML = recipes.map(recipe => this.createRecipeCard(recipe)).join('');
    }

    static createRecipeCard(recipe) {
        return `
            <div class="col-md-4 mb-4">
                <div class="card recipe-card h-100" onclick="window.showRecipeDetails(${recipe.id})">
                    <img src="${recipe.image}" class="card-img-top" alt="${recipe.name}">
                    <div class="card-body">
                        <h5 class="card-title">${recipe.name}</h5>
                        <p class="card-text">${recipe.instructions}</p>
                    </div>
                </div>
            </div>
        `;
    }

    static updateCartModal(cart) {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');

        if (cart.items.length === 0) {
            cartItems.innerHTML = '<p>Your cart is empty</p>';
            cartTotal.textContent = '0';
            return;
        }

        cartItems.innerHTML = cart.items.map(item => `
            <div class="cart-item">
                <div>
                    <h6>${item.name}</h6>
                    <small>₹${item.price} × ${item.quantity}</small>
                </div>
                <div class="quantity-control">
                    <button onclick="window.updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="window.updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
        `).join('');

        cartTotal.textContent = cart.getTotal();
    }
}