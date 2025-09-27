# WebRTC Pong Backend

Node.js signaling server for the WebRTC Pong game.

## Features

- Express.js server with MySQL database
- Compatible with the original PHP signaling server
- Environment variable configuration
- Automatic cleanup of old entries
- Health check endpoint

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
# Database configuration
export DB_HOST=localhost
export DB_USER=root
export DB_PASSWORD=your_password
export DB_NAME=rtcPong
export DB_PORT=3306

# Server configuration
export PORT=3000
```

3. Create the database and table (see `rtcPong.sql` in the root directory)

4. Start the server:
```bash
npm start
```

## Deployment Options

### Heroku
1. Create a Heroku app
2. Add MySQL addon (ClearDB or JawsDB)
3. Set environment variables in Heroku dashboard
4. Deploy with Git

### Railway
1. Connect your GitHub repository
2. Add MySQL service
3. Set environment variables
4. Deploy automatically

### Render
1. Create a new Web Service
2. Connect your repository
3. Add PostgreSQL database (modify code for PostgreSQL if needed)
4. Set environment variables

### Vercel
1. Install Vercel CLI
2. Configure `vercel.json` for serverless functions
3. Deploy with `vercel --prod`

## Environment Variables

- `DB_HOST`: Database host (default: localhost)
- `DB_USER`: Database username (default: root)
- `DB_PASSWORD`: Database password (default: empty)
- `DB_NAME`: Database name (default: rtcPong)
- `DB_PORT`: Database port (default: 3306)
- `PORT`: Server port (default: 3000)

## API Endpoints

- `POST /signal.php`: Main signaling endpoint (compatible with original PHP)
- `GET /health`: Health check endpoint
