# WebRTC Pong Deployment Guide

This guide covers different ways to host your WebRTC Pong game.

## 🚀 Quick Start (GitHub Pages + Railway)

**Easiest option for beginners:**

1. **Enable GitHub Pages**:
   - Go to your repository → Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Your game will be at: `https://yourusername.github.io/webrtc-pong`

2. **Deploy Backend on Railway**:
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub account
   - Create new project from GitHub repo
   - Add MySQL database service
   - Deploy the backend folder
   - Copy the backend URL

3. **Configure Frontend**:
   - Edit `index.html` line 75: `const SIGNALING_SERVER = 'https://your-railway-app.railway.app/signal.php';`
   - Commit and push

## 📋 Detailed Deployment Options

### Option 1: GitHub Pages + External Backend

**Frontend**: GitHub Pages (Free)
**Backend**: Choose one of the platforms below

#### Backend Platform Options:

##### A. Railway (Recommended)
```bash
# 1. Go to railway.app and connect GitHub
# 2. Create new project from your repo
# 3. Add MySQL database
# 4. Set environment variables:
DB_HOST=your-mysql-host
DB_USER=your-mysql-user
DB_PASSWORD=your-mysql-password
DB_NAME=your-mysql-database
PORT=3000
```

##### B. Heroku
```bash
# 1. Install Heroku CLI
npm install -g heroku

# 2. Login and create app
heroku login
heroku create your-app-name

# 3. Add MySQL addon
heroku addons:create cleardb:ignite

# 4. Set environment variables
heroku config:set DB_HOST=your-host
heroku config:set DB_USER=your-user
heroku config:set DB_PASSWORD=your-password
heroku config:set DB_NAME=your-database

# 5. Deploy
git subtree push --prefix=backend heroku main
```

##### C. Render
```bash
# 1. Go to render.com
# 2. Connect GitHub account
# 3. Create new Web Service
# 4. Add PostgreSQL database (modify code for PostgreSQL)
# 5. Set environment variables
# 6. Deploy
```

##### D. Vercel (Serverless)
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Create vercel.json in backend folder
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}

# 3. Deploy
cd backend
vercel --prod
```

### Option 2: Full Stack Hosting

#### A. Vercel (Full Stack)
```bash
# 1. Create vercel.json in root
{
  "version": 2,
  "builds": [
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    },
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/signal.php",
      "dest": "backend/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "index.html"
    }
  ]
}

# 2. Deploy
vercel --prod
```

#### B. Netlify (Full Stack)
```bash
# 1. Create netlify.toml
[build]
  command = "echo 'No build needed'"
  publish = "."

[[redirects]]
  from = "/signal.php"
  to = "/.netlify/functions/signal"
  status = 200

# 2. Create netlify/functions/signal.js
# (Copy backend/server.js content and adapt for Netlify Functions)

# 3. Deploy via Netlify dashboard
```

#### C. Railway (Full Stack)
```bash
# 1. Create railway.json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "cd backend && npm start",
    "healthcheckPath": "/health"
  }
}

# 2. Deploy via Railway dashboard
```

### Option 3: Traditional Web Hosting

#### Shared Hosting (cPanel, etc.)
1. Upload all files via FTP/cPanel File Manager
2. Create MySQL database via cPanel
3. Run the SQL commands from `rtcPong.sql`
4. Update database credentials in `signal.php`
5. Access via your domain

#### VPS/Dedicated Server
```bash
# 1. Install LAMP stack
sudo apt update
sudo apt install apache2 mysql-server php php-mysql

# 2. Clone repository
git clone https://github.com/yourusername/webrtc-pong.git
sudo cp -r webrtc-pong/* /var/www/html/

# 3. Set up database
mysql -u root -p
CREATE DATABASE rtcPong;
USE rtcPong;
SOURCE rtcPong.sql;

# 4. Configure Apache
sudo a2enmod rewrite
sudo systemctl restart apache2
```

## 🔧 Configuration

### Frontend Configuration
Edit `index.html` and update the signaling server URL:

```javascript
const SIGNALING_SERVER = 'https://your-backend-url.com/signal.php';
```

### Backend Environment Variables
```bash
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=rtcPong
DB_PORT=3306

# Server
PORT=3000
NODE_ENV=production
```

### Database Setup
Run the SQL commands from `rtcPong.sql`:

```sql
CREATE TABLE `rtcPong` (
  `id` int(4) NOT NULL DEFAULT '0',
  `to` enum('alice','bob') NOT NULL,
  `msg_id` int(4) NOT NULL AUTO_INCREMENT,
  `timestamp` datetime NOT NULL,
  `msg` text NOT NULL,
  PRIMARY KEY (`id`,`to`,`msg_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
```

## 🧪 Testing

1. **Test Backend**:
   ```bash
   curl -X POST https://your-backend-url.com/signal.php \
        -H "Content-Type: application/x-www-form-urlencoded" \
        -d "id=1234&to=alice&msg=test"
   ```

2. **Test Frontend**:
   - Open your GitHub Pages URL
   - Try creating a game
   - Check browser console for errors

## 🐛 Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Ensure backend has CORS enabled
   - Check that frontend URL is allowed

2. **Database Connection**:
   - Verify environment variables
   - Check database credentials
   - Ensure database exists

3. **WebRTC Connection**:
   - Check STUN servers in `DC.js`
   - Verify signaling server is accessible
   - Check browser console for errors

4. **GitHub Pages Not Updating**:
   - Wait 5-10 minutes for deployment
   - Check repository settings
   - Verify branch is correct

### Debug Mode:
Add this to your frontend for debugging:
```javascript
// In index.html, add before the closing </script> tag
console.log('Signaling server:', SIGNALING_SERVER);
console.log('WebRTC config:', DC);
```

## 📊 Performance Tips

1. **Database Optimization**:
   - Add indexes on frequently queried columns
   - Implement connection pooling
   - Use prepared statements

2. **Frontend Optimization**:
   - Enable gzip compression
   - Use CDN for static assets
   - Implement service worker for caching

3. **Backend Optimization**:
   - Use PM2 for Node.js process management
   - Implement rate limiting
   - Add monitoring and logging

## 🔒 Security Considerations

1. **Input Validation**:
   - Sanitize all user inputs
   - Validate message formats
   - Implement rate limiting

2. **Database Security**:
   - Use prepared statements
   - Limit database user permissions
   - Enable SSL connections

3. **CORS Configuration**:
   - Restrict allowed origins
   - Use specific headers
   - Implement preflight handling

## 📈 Monitoring

### Health Checks:
```bash
# Backend health
curl https://your-backend-url.com/health

# Database connectivity
curl -X POST https://your-backend-url.com/signal.php \
     -d "id=9999"
```

### Logging:
- Monitor application logs
- Set up error tracking (Sentry, etc.)
- Track performance metrics

## 🚀 Scaling

For high traffic:
1. **Database**: Use connection pooling, read replicas
2. **Backend**: Load balancing, horizontal scaling
3. **CDN**: Use CloudFlare or similar for static assets
4. **Monitoring**: Implement comprehensive monitoring

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section
2. Review platform-specific documentation
3. Check GitHub issues for similar problems
4. Create a new issue with detailed information
