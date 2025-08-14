import Sequelize, { DataTypes } from 'sequelize';
import { env as _env } from 'process';
import configjs from '../config/config.js';
import ProductModel from './product.js';
import OrderModel from './order.js';
import OrderProductModel from './orderproduct.js';

const env = _env.NODE_ENV || 'development';
const config = configjs[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(_env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const Product = ProductModel(sequelize, DataTypes);
const Order = OrderModel(sequelize, DataTypes);
const OrderProduct = OrderProductModel(sequelize, DataTypes);

export { Product, Order, OrderProduct, sequelize };