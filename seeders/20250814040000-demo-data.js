'use strict';

import { faker } from '@faker-js/faker';

export async function up(queryInterface, Sequelize) {
  try {
    console.log('🌱 Starting seed process...');

    // Check if tables exist
    const tables = await queryInterface.showAllTables();
    console.log('Existing tables:', tables);

    const requiredTables = ['Products', 'Orders', 'OrderProducts'];
    console.log('Required tables:', requiredTables);

    const missingTables = requiredTables.filter(table => !tables.includes(table));
    console.log('Missing tables:', missingTables);

    if (missingTables.length > 0) {
      throw new Error(`Missing tables: ${missingTables.join(', ')}. Please run migrations first.`);
    }

    // 1. Seed Products
    console.log('📦 Seeding products...');
    const products = [];
    for (let i = 0; i < 20; i++) {
      products.push({
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price({ min: 10, max: 1000, dec: 2 })),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('Products', products, {});

    // Get inserted products with their IDs
    const insertedProducts = await queryInterface.sequelize.query(
      'SELECT id, name, price FROM "Products" ORDER BY id',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    console.log(`✅ Created ${insertedProducts.length} products`);

    // 2. Seed Orders
    console.log('🛒 Seeding orders...');
    const orders = [];
    const orderIds = [];

    for (let i = 0; i < 10; i++) {
      const orderId = faker.string.uuid();
      orderIds.push(orderId);

      orders.push({
        id: orderId,
        totalPrice: 0, // We'll calculate this after creating OrderProducts
        createdAt: faker.date.recent({ days: 30 }),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('Orders', orders, {});
    console.log(`✅ Created ${orders.length} orders`);

    // 3. Seed OrderProducts and calculate totals
    console.log('🔗 Seeding order-product relationships...');
    const orderProducts = [];
    const orderTotals = {}; // Track totals for each order

    for (const orderId of orderIds) {
      // Select 1-5 random products for each order
      const selectedProducts = insertedProducts
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 5) + 1);

      let orderTotal = 0;

      for (const product of selectedProducts) {
        const quantity = Math.floor(Math.random() * 3) + 1;
        const productPrice = parseFloat(product.price);
        const subtotal = productPrice * quantity;

        orderProducts.push({
          orderId: orderId,
          productId: product.id,
          quantity: quantity,
          createdAt: new Date(),
          updatedAt: new Date()
        });

        orderTotal += subtotal;
      }

      orderTotals[orderId] = orderTotal.toFixed(2);
    }

    await queryInterface.bulkInsert('OrderProducts', orderProducts, {});
    console.log(`✅ Created ${orderProducts.length} order-product relationships`);

    // 4. Update order totals
    console.log('💰 Updating order totals...');
    for (const orderId of Object.keys(orderTotals)) {
      await queryInterface.sequelize.query(
        'UPDATE "Orders" SET "totalPrice" = :totalPrice, "updatedAt" = :updatedAt WHERE id = :orderId',
        {
          replacements: {
            totalPrice: orderTotals[orderId],
            updatedAt: new Date(),
            orderId: orderId
          }
        }
      );
    }

    console.log('🎉 Seeding completed successfully!');

    // Display summary
    const finalProductCount = await queryInterface.sequelize.query(
      'SELECT COUNT(*) as count FROM "Products"',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const finalOrderCount = await queryInterface.sequelize.query(
      'SELECT COUNT(*) as count FROM "Orders"',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const finalOrderProductCount = await queryInterface.sequelize.query(
      'SELECT COUNT(*) as count FROM "OrderProducts"',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    console.log(`📊 Final summary:`);
    console.log(`   Products: ${finalProductCount[0].count}`);
    console.log(`   Orders: ${finalOrderCount[0].count}`);
    console.log(`   OrderProducts: ${finalOrderProductCount[0].count}`);

  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    throw error;
  }
}

export async function down(queryInterface, Sequelize) {
  try {
    console.log('🧹 Cleaning up seed data...');

    // Delete in reverse order to maintain referential integrity
    await queryInterface.bulkDelete('OrderProducts', null, {});
    console.log('✅ Deleted OrderProducts');

    await queryInterface.bulkDelete('Orders', null, {});
    console.log('✅ Deleted Orders');

    await queryInterface.bulkDelete('Products', null, {});
    console.log('✅ Deleted Products');

    console.log('🎉 Cleanup completed successfully!');

  } catch (error) {
    console.error('❌ Cleanup failed:', error.message);
    throw error;
  }
}