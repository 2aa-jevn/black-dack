document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch('http://localhost:5000/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            alert(data.error || 'Erreur de connexion');
            return;
        }
        
        localStorage.setItem('admin_token', data.token);
        localStorage.setItem('admin_email', email);
        window.location.href = 'dashboard.html';
    } catch (error) {
        alert('Erreur de connexion au serveur');
        console.error(error);
    }
});
