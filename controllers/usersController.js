import { pool } from '../db/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  const { username, password, profilePicture } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);
  try {
    await pool.execute('INSERT INTO users (username, password, picture) VALUES (?, ?, ?)', [
      username,
      hashedPassword,
      profilePicture,
    ]);
    res.status(201).send('User registered');
  } catch (err) {
    res.status(500).send('Error registering user' + 'Error: ' + err);
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const [users] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
    const user = users[0];

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.json({ token, userProfilePicture: user.picture });
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (err) {
    res.status(500).send('Error logging in');
  }
};
