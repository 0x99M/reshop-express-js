'use strict';

export default (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    totalPrice: DataTypes.DECIMAL
  }, {});

  Order.associate = function(models) {
    Order.belongsToMany(models.Product, {
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId'
    });
  };

  return Order;
};
