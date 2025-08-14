import express from 'express';
import { json } from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { sequelize } from './models';

import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';

require('dotenv').config();

const app = express();

app.use(helmet(), compression(), morgan('combined'), json());

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');
    await sequelize.sync({ force: true });
    app.listen(3000, () => console.log('🚀 Server running at http://localhost:3000'));
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
  }
})();
