import express from 'express';
    import sqlite3 from 'sqlite3';
    import bcrypt from 'bcryptjs';
    import cors from 'cors';

    const app = express();
    const db = new sqlite3.Database(':memory:');
    const PORT = 3001;

    app.use(express.json());
    app.use(cors());

    db.serialize(() => {
      db.run(`
        CREATE TABLE users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE,
          password TEXT,
          reset_token TEXT
        )
      `);
    });

    app.post('/api/register', async (req, res) => {
      const { email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      
      db.run(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        [email, hashedPassword],
        function(err) {
          if (err) return res.status(400).json({ error: 'Email already exists' });
          res.json({ id: this.lastID });
        }
      );
    });

    app.post('/api/login', (req, res) => {
      const { email, password } = req.body;
      
      db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
        if (err || !user) return res.status(401).json({ error: 'Invalid credentials' });
        
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });
        
        res.json({ id: user.id, email: user.email });
      });
    });

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
