'use strict';

/** @type {import('sequelize-cli').Migration} */

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('OrderProducts', {
    orderId: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      references: { model: 'Orders', key: 'id' },
      onDelete: 'CASCADE'
    },
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: 'Products', key: 'id' },
      onDelete: 'CASCADE'
    },
    quantity: {
      type: Sequelize.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });

  await queryInterface.addIndex('OrderProducts', ['orderId']);
}

export async function down(queryInterface) {
  await queryInterface.dropTable('OrderProducts');
}
