// Cart management
document.addEventListener('DOMContentLoaded', function() {
    const cartData = localStorage.getItem('cart');
    const cartContent = document.getElementById('cart-content');
    
    if (!cartData || JSON.parse(cartData).length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <p>Votre panier est vide</p>
                <a href="collection.html" class="btn btn-primary" style="margin-top: 1rem;">Continuer les achats</a>
            </div>
        `;
        return;
    }

    const cart = JSON.parse(cartData);
    let total = 0;
    let cartHTML = '';

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div>
                    <strong>${item.name}</strong>
                    <p style="font-size: 0.9rem; color: #666;">Taille: ${item.size}</p>
                </div>
                <div style="text-align: center;">
                    <input type="number" value="${item.quantity}" min="1" onchange="updateCartItem(${index}, this.value)">
                </div>
                <div>${formatPrice(itemTotal)}</div>
                <button class="btn btn-secondary btn-small" onclick="removeCartItem(${index})">Supprimer</button>
            </div>
        `;
    });

    cartHTML += `
        <div class="cart-summary">
            <h2>Résumé</h2>
            <div class="cart-line">
                <span>Sous-total:</span>
                <span>${formatPrice(total)}</span>
            </div>
            <div class="cart-line">
                <span>Livraison:</span>
                <span>À déterminer</span>
            </div>
            <div class="cart-total">
                <span>Total:</span>
                <span>${formatPrice(total)}</span>
            </div>
            <button class="btn btn-primary btn-block" style="margin-top: 1.5rem; padding: 15px;" onclick="checkout()">Procéder au paiement</button>
            <a href="collection.html" class="btn btn-secondary btn-block" style="margin-top: 1rem; padding: 15px; text-align: center;">Continuer les achats</a>
        </div>
    `;

    cartContent.innerHTML = cartHTML;
});

function formatPrice(price) {
    return price.toLocaleString('fr-FR') + ' FCFA';
}

function updateCartItem(index, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    cart[index].quantity = parseInt(quantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}

function removeCartItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}

function checkout() {
    alert('Fonctionnalité de paiement en développement. Prochainement: Orange Money, Moov Money, Paiement à la livraison');
}
