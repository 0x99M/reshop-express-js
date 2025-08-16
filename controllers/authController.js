import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { findUserByUsername } from '../middleware/auth.js';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const user = findUserByUsername(username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const tokenPromise = new Promise((resolve, reject) => {
    jwt.sign(
      { 
        id: user.id, 
        username: user.username, 
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });

  return tokenPromise
    .then(token => {
      const { password: _, ...userWithoutPassword } = user;
      
      res.json({
        message: 'Login successful',
        token,
        user: userWithoutPassword
      });
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

export const getProfile = (req, res) => {
  const { id, username, role } = req.user;
  
  res.json({
    id,
    username,
    role
  });
};