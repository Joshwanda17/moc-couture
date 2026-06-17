const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dotenv = require('dotenv');
const multer = require('multer');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'moc_couture_secret_123';

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
});
const upload = multer({ storage: storage });

// Initialize SQLite database
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    
    // Create initial tables if they don't exist
    db.run(`CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      category TEXT,
      main_image TEXT,
      featured BOOLEAN DEFAULT 0,
      status TEXT,
      collection_id TEXT
    )`);
    
    db.run(`CREATE TABLE IF NOT EXISTS collections (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      cover_image TEXT,
      season TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS media (
      id TEXT PRIMARY KEY,
      url TEXT NOT NULL,
      caption TEXT,
      collection_id TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'admin'
    )`);
  }
});

// Basic Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'MoC Couture API is running' });
});

// --- AUTH ROUTES ---

// Register
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    db.get(`SELECT id FROM users WHERE email = ?`, [email], async (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (row) return res.status(400).json({ error: 'User already exists' });

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      const id = crypto.randomUUID();

      db.run(`INSERT INTO users (id, email, password_hash) VALUES (?, ?, ?)`, 
        [id, email, passwordHash], 
        function(err) {
          if (err) return res.status(500).json({ error: err.message });
          
          const token = jwt.sign({ id, email, role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
          res.status(201).json({ token, user: { id, email, role: 'admin' } });
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ token, user: { id: user.id, email: user.email, role: user.role } });
  });
});

// --- UPLOAD ROUTE ---
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image provided' });
  }
  const imageUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({ url: imageUrl });
});

// --- PRODUCT ROUTES ---
app.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/products', (req, res) => {
  const { name, description, price, category, main_image, featured, status, collection_id } = req.body;
  const id = crypto.randomUUID();
  db.run(
    `INSERT INTO products (id, name, description, price, category, main_image, featured, status, collection_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, name, description, price, category, main_image, featured ? 1 : 0, status || 'draft', collection_id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id, name, description, price, category, main_image, featured, status, collection_id });
    }
  );
});

app.put('/api/products/:id', (req, res) => {
  const { name, description, price, category, main_image, featured, status, collection_id } = req.body;
  const id = req.params.id;
  db.run(
    `UPDATE products SET name = ?, description = ?, price = ?, category = ?, main_image = ?, featured = ?, status = ?, collection_id = ? WHERE id = ?`,
    [name, description, price, category, main_image, featured ? 1 : 0, status, collection_id, id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ id, name, description, price, category, main_image, featured, status, collection_id });
    }
  );
});

app.delete('/api/products/:id', (req, res) => {
  db.run('DELETE FROM products WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Deleted successfully' });
  });
});

// --- COLLECTION ROUTES ---
app.get('/api/collections', (req, res) => {
  db.all('SELECT * FROM collections', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/collections', (req, res) => {
  const { title, description, cover_image, season } = req.body;
  const id = crypto.randomUUID();
  db.run(
    `INSERT INTO collections (id, title, description, cover_image, season) VALUES (?, ?, ?, ?, ?)`,
    [id, title, description, cover_image, season],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id, title, description, cover_image, season });
    }
  );
});

app.delete('/api/collections/:id', (req, res) => {
  db.run('DELETE FROM collections WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Deleted successfully' });
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
