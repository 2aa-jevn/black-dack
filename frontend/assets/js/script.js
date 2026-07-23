// BLACK DACK - Main JavaScript

// Sample products data (will be replaced with API calls)
const productsData = {
    'black-denim': [
        {
            id: 1,
            name: 'BD SIGNATURE JEANS - Edition 001',
            category: 'black-denim',
            price: 15000,
            image: 'assets/images/placeholder-denim.jpg',
            description: 'Denim noir premium avec détails dorés. Numéro d\'édition limité.',
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
            description: 'Denim noir premium avec détails dorés. Numéro d\'édition limité.',
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
            description: 'Design moderne avec finitions artisanales.',
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
            <button class="btn btn-primary" onclick="viewProduct(${product.id})">Voir le détail</button>
        </div>
    `;
    return card;
}

// View product detail
function viewProduct(productId) {
    // Find product in all categories
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
                ${product.edition ? `<div style="color: #666; margin: 0.5rem 0;">Edition: ${product.edition}</div>` : ''}
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

                <button class="btn btn-primary" style="width: 100%; padding: 15px;" onclick="addToCart(${product.id})">Ajouter au panier</button>
                <button class="btn btn-secondary" style="width: 100%; padding: 15px; margin-top: 1rem;" onclick="window.history.back()">Retour</button>
            </div>
        `;
    }
}

// Add to cart
function addToCart(productId) {
    alert('Fonctionnalité de panier à implémenter. Produit: ' + productId);
}

// Contact form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Message envoyé! Nous vous répondrons bientôt.');
            contactForm.reset();
        });
    }

    // Load collections if on collection page
    if (window.location.pathname.includes('collection.html')) {
        loadCollections();
    }

    // Load product detail if on product page
    if (window.location.pathname.includes('produit.html')) {
        loadProductDetail();
    }
});
