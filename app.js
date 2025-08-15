import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { sequelize } from './models/index.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

app.use(helmet(), compression(), morgan('combined'), express.json());

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');
    await sequelize.sync();
    app.listen(3000, () => console.log('🚀 Server running at http://localhost:3000'));
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
  }
})();
