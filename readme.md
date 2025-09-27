# WebRTC Pong
A toy browser game that implements peer-to-peer rollback netcode.

Play it here: https://mitxela.com/pong

Writeup about the development of it: https://mitxela.com/projects/webrtc-pong

## Hosting on GitHub

This repository includes multiple hosting options for the WebRTC Pong game:

### Option 1: GitHub Pages + External Backend (Recommended)

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch" and choose `main` branch
   - Your game will be available at `https://yourusername.github.io/webrtc-pong`

2. **Deploy Backend** (choose one):
   - **Heroku**: See `backend/README.md` for instructions
   - **Railway**: Connect repository and add MySQL service
   - **Render**: Create web service with database
   - **Vercel**: Use serverless functions

3. **Configure Frontend**:
   - Edit `index.html` and update the `SIGNALING_SERVER` constant with your backend URL
   - Commit and push changes

### Option 2: Full Stack Hosting

Deploy both frontend and backend together on platforms like:
- **Vercel** (with serverless functions)
- **Netlify** (with serverless functions)
- **Railway** (full stack deployment)

### Option 3: Traditional Web Hosting

Upload files to any web hosting service that supports:
- PHP (for `signal.php`)
- MySQL database
- Static file serving

## Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/webrtc-pong.git
   cd webrtc-pong
   ```

2. **Set up database**:
   ```sql
   -- Run the SQL commands from rtcPong.sql
   CREATE TABLE `rtcPong` (
     `id` int(4) NOT NULL DEFAULT '0',
     `to` enum('alice','bob') NOT NULL,
     `msg_id` int(4) NOT NULL AUTO_INCREMENT,
     `timestamp` datetime NOT NULL,
     `msg` text NOT NULL,
     PRIMARY KEY (`id`,`to`,`msg_id`)
   ) ENGINE=MyISAM DEFAULT CHARSET=utf8;
   ```

3. **Configure backend** (if using Node.js):
   ```bash
   cd backend
   npm install
   # Set environment variables
   npm start
   ```

4. **Update frontend configuration**:
   - Edit `index.html` and set the correct `SIGNALING_SERVER` URL

## Files Structure

- `index.html` - Main game file (GitHub Pages compatible)
- `pong.htm` - Original game file
- `DC.js` - WebRTC signaling client
- `signal.php` - Original PHP signaling server
- `rtcPong.sql` - Database schema
- `backend/` - Node.js alternative backend
  - `server.js` - Express.js signaling server
  - `package.json` - Node.js dependencies
  - `README.md` - Backend deployment guide

## Environment Variables (Backend)

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=rtcPong
DB_PORT=3306
PORT=3000
```

## Possible further features to add
- Option to horizontally mirror screen when on mobile, in case your finger is in the way
- Sound, bleeps and bloops as it bounces
- End game or score target
- Option to change field size or paddle size
- Powerups

