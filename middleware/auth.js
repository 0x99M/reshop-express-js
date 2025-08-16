import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

const ADMIN_PASSWORD = '$2b$10$2vPddS34Opgsjr3g3drOCuBQ1rkXNI9kKvjuftM1fNlQGIDqYHG16';
const CUSTOMER_PASSWORD = '$2b$10$cijeGS667jkit0.tQe0xjuG9dhohGXsx9G77/6eHOeFvaMkw2coYO';
const SUPPLIER_PASSWORD = '$2b$10$0OhmEBAxrxvc16FqNEl09O0HYKzqncHrHdJdwCWQFZ1im5Na2W7rW';

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

export const findUserByUsername = (username) => {
  return mockUsers.find(user => user.username === username);
};