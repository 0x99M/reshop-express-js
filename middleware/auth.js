import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

const ADMIN_PASSWORD = '7fcf4ba391c48784edde599889d6e3f1e47a27db36ecc050cc92f259bfac38afad2c68a1ae804d77075e8fb722503f3eca2b2c1006ee6f6c7b7628cb45fffd1d';
const CUSTOMER_PASSWORD = '3736eb288acf05fb7327513ff5d09ccf71abb648d9d473dada0c41a5266121293c57e7ae4b45b3566a0d60991aff970d0a2fa39e1c5d5948b17425d2494a7191';
const SUPPLIER_PASSWORD = '1e6a160f718eb748480a68da929a10b8418841a41f33d9c18de9f57892ce49cdf408cf4f279202f95612015698a095000329bfe5d96c83c48a49ac1a40051172';

const mockUsers = [
  { id: 1, username: 'admin', password: ADMIN_PASSWORD, role: 'admin' },
  { id: 2, username: 'customer', password: CUSTOMER_PASSWORD, role: 'customer' },
  { id: 3, username: 'supplier', password: SUPPLIER_PASSWORD, role: 'supplier' }
];

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

export const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
};

export const findUser = (username, password) => {
  return mockUsers.find(user => user.username === username && user.password === password);
};