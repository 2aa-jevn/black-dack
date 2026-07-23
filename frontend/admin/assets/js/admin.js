// Admin Dashboard

const API_URL = 'http://localhost:5000/api';

// Check authentication
window.addEventListener('load', () => {
    const token = localStorage.getItem('admin_token');
    const email = localStorage.getItem('admin_email');
    
    if (!token) {
        window.location.href = 'index.html';
        return;
    }
    
    document.getElementById('admin-email').textContent = email;
    loadDashboard();
});

// Load dashboard data
async function loadDashboard() {
    const token = localStorage.getItem('admin_token');
    
    try {
        const response = await fetch(`${API_URL}/admin/dashboard`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        
        document.getElementById('total-products').textContent = data.totalProducts;
        document.getElementById('total-sales').textContent = formatPrice(data.totalSales);
        document.getElementById('pending-orders').textContent = data.pendingOrders;
        document.getElementById('active-promotions').textContent = data.activePromotions;
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

function formatPrice(price) {
    return price.toLocaleString('fr-FR') + ' FCFA';
}

function navigateTo(page) {
    // Future: Navigate to different admin pages
    alert(`Page ${page} - À développer`);
}

function logout() {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_email');
    window.location.href = 'index.html';
}
