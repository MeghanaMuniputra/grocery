import { products, recipes } from './data.js';
import { Cart } from './cart.js';
import { UI } from './ui.js';

// Initialize cart
const cart = new Cart();

// Initialize UI
document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('productsContainer');
    const recipesContainer = document.getElementById('recipesContainer');
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));

    if (productsContainer) {
        UI.displayProducts(products, productsContainer);
    }

    if (recipesContainer) {
        UI.displayRecipes(recipes, recipesContainer);
    }

    cartBtn.addEventListener('click', () => {
        UI.updateCartModal(cart);
        cartModal.show();
    });
});

// Global functions for event handlers
window.filterProducts = (category) => {
    const container = document.getElementById('productsContainer');
    UI.filterProducts(products, category, container);
};

window.addToCart = (productId) => {
    const product = Object.values(products).flat().find(p => p.id === productId);
    const quantity = parseInt(document.getElementById(`quantity-${productId}`).textContent);
    cart.addItem(product, quantity);
};

window.increaseQuantity = (productId) => {
    const quantityElement = document.getElementById(`quantity-${productId}`);
    quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
};

window.decreaseQuantity = (productId) => {
    const quantityElement = document.getElementById(`quantity-${productId}`);
    const currentQuantity = parseInt(quantityElement.textContent);
    if (currentQuantity > 1) {
        quantityElement.textContent = currentQuantity - 1;
    }
};

window.updateCartQuantity = (productId, quantity) => {
    cart.updateQuantity(productId, quantity);
    UI.updateCartModal(cart);
};

window.showRecipeDetails = (recipeId) => {
    const recipe = recipes.find(r => r.id === recipeId);
    const recipeIngredients = recipe.ingredients.map(ing => {
        const product = Object.values(products).flat().find(p => p.id === ing.id);
        return `${product.name} - ${ing.quantity} ${product.unit}`;
    }).join('<br>');

    document.getElementById('recipeTitle').textContent = recipe.name;
    document.getElementById('recipeDetails').innerHTML = `
        <img src="${recipe.image}" class="img-fluid mb-3" alt="${recipe.name}">
        <p>${recipe.instructions}</p>
        <h6>Ingredients:</h6>
        <p>${recipeIngredients}</p>
    `;

    const recipeModal = new bootstrap.Modal(document.getElementById('recipeModal'));
    recipeModal.show();
};

window.addIngredientsToCart = () => {
    const recipeTitle = document.getElementById('recipeTitle').textContent;
    const recipe = recipes.find(r => r.name === recipeTitle);
    
    recipe.ingredients.forEach(ing => {
        const product = Object.values(products).flat().find(p => p.id === ing.id);
        cart.addItem(product, ing.quantity);
    });

    const recipeModal = bootstrap.Modal.getInstance(document.getElementById('recipeModal'));
    recipeModal.hide();

    UI.updateCartModal(cart);
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
};

window.checkout = () => {
    alert('Thank you for your purchase!');
    cart.clear();
    UI.updateCartModal(cart);
};