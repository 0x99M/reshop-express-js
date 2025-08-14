'use strict';

export default (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define('OrderProduct', {
    orderId: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    quantity: DataTypes.INTEGER
  }, {});

  OrderProduct.associate = function(models) {
    OrderProduct.belongsTo(models.Order, { foreignKey: 'orderId' });
    OrderProduct.belongsTo(models.Product, { foreignKey: 'productId' });
  };

  return OrderProduct;
};
