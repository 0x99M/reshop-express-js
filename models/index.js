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
  sequelize = new Sequelize(_env[config.use_env_variable], {
    ...config,
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    ...config,
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
}

const Product = ProductModel(sequelize, DataTypes);
const Order = OrderModel(sequelize, DataTypes);
const OrderProduct = OrderProductModel(sequelize, DataTypes);

Product.associate?.({ Order, OrderProduct });
Order.associate?.({ Product, OrderProduct });

export { Product, Order, OrderProduct, sequelize };