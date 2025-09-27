const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'rtcPong',
  port: process.env.DB_PORT || 3306
};

let db;

// Initialize database connection
async function initDB() {
  try {
    db = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database');
    
    // Create table if it doesn't exist
    await db.execute(`
      CREATE TABLE IF NOT EXISTS rtcPong (
        id int(4) NOT NULL DEFAULT '0',
        \`to\` enum('alice','bob') NOT NULL,
        msg_id int(4) NOT NULL AUTO_INCREMENT,
        timestamp datetime NOT NULL,
        msg text NOT NULL,
        PRIMARY KEY (id,\`to\`,msg_id)
      ) ENGINE=MyISAM DEFAULT CHARSET=utf8
    `);
    console.log('Database table ready');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}

// Clean up old entries
async function cleanupOldEntries() {
  try {
    await db.execute("DELETE FROM rtcPong WHERE timestamp < (NOW() - INTERVAL 3 MINUTE)");
  } catch (error) {
    console.error('Cleanup failed:', error);
  }
}

// Main signaling endpoint
app.post('/signal.php', async (req, res) => {
  try {
    const { id, to, msg } = req.body;
    
    // Set headers to match original PHP behavior
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    res.setHeader('Pragma', 'no-cache');

    // Clean up old entries periodically
    if (Math.random() < 0.1) { // 10% chance
      cleanupOldEntries();
    }

    // Handle different request types
    if (to === 'alice' || to === 'bob') {
      // Store message
      if (msg) {
        await db.execute(
          'INSERT INTO rtcPong (id, `to`, timestamp, msg) VALUES (?, ?, NOW(), ?)',
          [id, to, msg]
        );
      }

      // Retrieve messages for the recipient
      const [rows] = await db.execute(
        'SELECT * FROM rtcPong WHERE id = ? AND `to` = ?',
        [id, to === 'alice' ? 'bob' : 'alice']
      );

      const msgs = rows.map(row => row.msg);
      
      // Delete retrieved messages
      if (rows.length > 0) {
        const msgIds = rows.map(row => row.msg_id);
        await db.execute(
          `DELETE FROM rtcPong WHERE id = ? AND \`to\` = ? AND msg_id IN (${msgIds.map(() => '?').join(',')})`,
          [id, to === 'alice' ? 'bob' : 'alice', ...msgIds]
        );
      }

      res.json({ msgs });
    } else {
      // Generate new ID or validate existing ID
      if (id) {
        // Check if ID is valid and not in use
        const [rows] = await db.execute('SELECT * FROM rtcPong WHERE id = ?', [id]);
        if (rows.length > 0) {
          res.send('0'); // ID in use
          return;
        }
        res.send('0'); // ID valid and available
      } else {
        // Generate new ID
        let newId;
        let attempts = 0;
        do {
          newId = Math.floor(Math.random() * 9000) + 1000; // 4-digit number
          const [rows] = await db.execute('SELECT * FROM rtcPong WHERE id = ?', [newId]);
          if (rows.length === 0) break;
          attempts++;
        } while (attempts < 100);
        
        res.send(newId.toString());
      }
    }
  } catch (error) {
    console.error('Error in signaling:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
async function startServer() {
  await initDB();
  
  app.listen(port, () => {
    console.log(`WebRTC Pong signaling server running on port ${port}`);
    console.log(`Health check: http://localhost:${port}/health`);
  });
}

startServer().catch(console.error);
