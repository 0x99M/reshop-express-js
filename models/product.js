'use strict';

export default (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL
  }, {});

  Product.associate = function(models) {
    Product.belongsToMany(models.Order, {
      through: models.OrderProduct,
      foreignKey: 'productId',
      otherKey: 'orderId'
    });
  };

  return Product;
};
