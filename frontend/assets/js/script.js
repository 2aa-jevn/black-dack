// BLACK DACK - Main JavaScript

// Initialize app
const APP = {
    API_URL: 'http://localhost:5000/api',
    cart: [],
    products: {}
};

// Sample products data
const productsData = {
    'black-denim': [
        {
            id: 1,
            name: 'BD SIGNATURE JEANS - Edition 001',
            category: 'black-denim',
            price: 15000,
            image: 'assets/images/placeholder-denim.jpg',
            description: 'Denim noir premium avec détails dorés. Édition limitée numérotée.',
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            availability: 'En stock',
            edition: '001/100'
        },
        {
            id: 2,
            name: 'BD SIGNATURE JEANS - Edition 002',
            category: 'black-denim',
            price: 15000,
            image: 'assets/images/placeholder-denim.jpg',
            description: 'Denim noir premium avec broderies artisanales.',
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            availability: 'En stock',
            edition: '002/100'
        }
    ],
    'black-woman': [
        {
            id: 3,
            name: 'Robe Élégante - Collection 001',
            category: 'black-woman',
            price: 25000,
            image: 'assets/images/placeholder-woman.jpg',
            description: 'Robe élégante avec inspiration africaine contemporaine.',
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            availability: 'En stock',
            edition: '001/50'
        },
        {
            id: 4,
            name: 'Robe Moderne - Collection 002',
            category: 'black-woman',
            price: 28000,
            image: 'assets/images/placeholder-woman.jpg',
            description: 'Design moderne avec finitions artisanales premium.',
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            availability: 'En stock',
            edition: '002/50'
        }
    ]
};

// Format price
function formatPrice(price) {
    return price.toLocaleString('fr-FR') + ' FCFA';
}

// Load products on collection page
function loadCollections() {
    const blackDenimGrid = document.getElementById('black-denim-grid');
    const blackWomanGrid = document.getElementById('black-woman-grid');

    if (blackDenimGrid) {
        productsData['black-denim'].forEach(product => {
            blackDenimGrid.appendChild(createProductCard(product));
        });
    }

    if (blackWomanGrid) {
        productsData['black-woman'].forEach(product => {
            blackWomanGrid.appendChild(createProductCard(product));
        });
    }
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <div class="product-name">${product.name}</div>
            <div class="product-price">${formatPrice(product.price)}</div>
            <div class="product-description">${product.description}</div>
            <div class="product-availability">${product.availability}</div>
            <button class="btn btn-primary btn-small" onclick="viewProduct(${product.id})">Voir le détail</button>
        </div>
    `;
    return card;
}

// View product detail
function viewProduct(productId) {
    let product = null;
    for (const category in productsData) {
        product = productsData[category].find(p => p.id === productId);
        if (product) break;
    }

    if (product) {
        sessionStorage.setItem('selectedProduct', JSON.stringify(product));
        window.location.href = 'produit.html';
    }
}

// Load product detail
function loadProductDetail() {
    const productData = sessionStorage.getItem('selectedProduct');
    const container = document.getElementById('product-container');

    if (productData && container) {
        const product = JSON.parse(productData);
        const sizesOptions = product.sizes.map(size => `<option value="${size}">${size}</option>`).join('');

        container.innerHTML = `
            <div>
                <img src="${product.image}" alt="${product.name}" class="product-image-large">
            </div>
            <div class="product-details">
                <h1>${product.name}</h1>
                <div class="product-price">${formatPrice(product.price)}</div>
                <div class="product-availability">${product.availability}</div>
                ${product.edition ? `<div class="product-edition">Édition: ${product.edition}</div>` : ''}
                <div class="product-description" style="margin: 1.5rem 0; font-size: 1rem;">${product.description}</div>
                
                <div style="margin: 1.5rem 0;">
                    <label for="size" style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Taille</label>
                    <select id="size" style="padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; width: 100%;">
                        <option value="">Sélectionner une taille</option>
                        ${sizesOptions}
                    </select>
                </div>

                <div style="margin: 1.5rem 0;">
                    <label for="quantity" style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Quantité</label>
                    <input type="number" id="quantity" value="1" min="1" style="padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; width: 100%;">
                </div>

                <button class="btn btn-primary btn-block" style="padding: 15px; margin-bottom: 1rem;" onclick="addToCart(${product.id})">Ajouter au panier</button>
                <button class="btn btn-secondary btn-block" style="padding: 15px;" onclick="window.location.href='collection.html'">Retour</button>
            </div>
        `;
    }
}

// Add to cart
function addToCart(productId) {
    const size = document.getElementById('size').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    
    if (!size) {
        alert('Veuillez sélectionner une taille');
        return;
    }

    let product = null;
    for (const category in productsData) {
        product = productsData[category].find(p => p.id === productId);
        if (product) break;
    }

    if (product) {
        const cartItem = {
            ...product,
            size: size,
            quantity: quantity,
            cartId: Date.now()
        };
        
        APP.cart.push(cartItem);
        localStorage.setItem('cart', JSON.stringify(APP.cart));
        
        alert(`${product.name} ajouté au panier!`);
        updateCartCount();
    }
}

// Load cart
function loadCart() {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
        APP.cart = JSON.parse(cartData);
    }
    updateCartCount();
}

// Update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = APP.cart.length;
    }
}

// Contact form submission
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Message envoyé! Nous vous répondrons bientôt.');
            contactForm.reset();
        });
    }

    if (window.location.pathname.includes('collection.html')) {
        loadCollections();
    }

    if (window.location.pathname.includes('produit.html')) {
        loadProductDetail();
    }
});
