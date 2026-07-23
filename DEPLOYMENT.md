# BLACK DACK - Deployment Guide

## 🌍 Deployment Options

### Option 1: Heroku (Recommended for beginners)

#### Prerequisites
- Heroku Account (free)
- Heroku CLI installed

#### Steps

```bash
# Login to Heroku
heroku login

# Create app
heroku create black-dack-mali

# Set environment variables
heroku config:set JWT_SECRET=your_very_secure_key_here
heroku config:set NODE_ENV=production

# Add Heroku PostgreSQL (for production)
heroku addons:create heroku-postgresql:hobby-dev

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Option 2: DigitalOcean App Platform

#### Prerequisites
- DigitalOcean Account

#### Steps

1. Connect GitHub repository
2. Select backend folder
3. Set environment variables
4. Deploy

### Option 3: AWS Elastic Beanstalk

```bash
eb init -p node.js-14 black-dack
eb create black-dack-env
eb setenv JWT_SECRET=your_key
eb deploy
```

### Option 4: Self-hosted (VPS)

#### Prerequisites
- VPS (DigitalOcean, Linode, AWS EC2)
- SSH access
- Node.js installed

#### Steps

```bash
# SSH into VPS
ssh root@your_vps_ip

# Install Node.js
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Git
sudo apt-get install git

# Clone repository
git clone https://github.com/yourusername/black-dack.git
cd black-dack/backend

# Install dependencies
npm install

# Create .env
nano .env

# Install PM2 for process management
npm install -g pm2

# Start with PM2
pm2 start server.js --name "black-dack"
pm2 save
pm2 startup

# Install Nginx as reverse proxy
sudo apt-get install nginx

# Configure Nginx
sudo nano /etc/nginx/sites-available/black-dack
```

#### Nginx Configuration

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/black-dack /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Install SSL (Let's Encrypt)
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## 🔐 Security Checklist

- [ ] Change JWT_SECRET to strong random string
- [ ] Change default admin credentials
- [ ] Enable HTTPS/SSL
- [ ] Set NODE_ENV=production
- [ ] Enable rate limiting
- [ ] Setup firewall rules
- [ ] Enable database backups
- [ ] Monitor error logs
- [ ] Setup email notifications

## 📊 Monitoring

### Using PM2

```bash
pm2 monit              # Monitor CPU/Memory
pm2 logs               # View logs
pm2 restart black-dack # Restart
pm2 stop black-dack    # Stop
```

### Using New Relic

```bash
npm install newrelic

# Add to server.js
require('newrelic');
```

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        run: |
          git push https://heroku:${{ secrets.HEROKU_API_KEY }}@git.heroku.com/${{ secrets.HEROKU_APP_NAME }}.git main
```

## 🌐 Domain Setup

### For Heroku
```bash
heroku domains:add www.yourdomain.com
```

### For Custom Domain

1. Point DNS to your server IP
2. Install SSL certificate
3. Update frontend API URLs

## 📱 Frontend Deployment

### Option 1: Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=frontend
```

### Option 2: Vercel

```bash
npm install -g vercel
vercel
```

### Option 3: GitHub Pages

Push frontend to gh-pages branch

## ⚙️ Configuration for Production

Update `frontend/assets/js/script.js`:

```javascript
const APP = {
    API_URL: 'https://api.yourdomain.com/api', // Production URL
    // ...
};
```

## 🔄 Backup & Recovery

### Backup Database

```bash
cp database/black-dack.db backups/black-dack-$(date +%Y%m%d).db
```

### Restore Database

```bash
cp backups/black-dack-YYYYMMDD.db database/black-dack.db
restart_server
```

## 📞 Support

For deployment issues, contact the BLACK DACK team.

---

**BLACK DACK** - Créé pour être unique. 🖤
