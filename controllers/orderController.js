import { Order, Product } from '../models';

export function createOrder(req, res) {
  const { products } = req.body;

  if (!products || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ error: 'At least one product is required' });
  }

  let calculatedTotalPrice = 0;
  let orderProducts = [];

  sequelize.transaction(t => {
    const productIds = products.map(p => p.id);
    return Product.findAll({ where: { id: productIds }, transaction: t })
      .then(foundProducts => {
        if (foundProducts.length !== products.length) {
          const foundProductIds = foundProducts.map(p => p.id);
          const missingProductIds = productIds.filter(id => !foundProductIds.includes(id));
          throw new Error(`Products with IDs ${missingProductIds.join(', ')} not found`);
        }

        const productMap = new Map(foundProducts.map(p => [p.id, p]));

        orderProducts = products.map(p => {
          const product = productMap.get(p.id);
          const quantity = p.quantity || 1;
          calculatedTotalPrice += product.price * quantity;
          return {
            id: p.id,
            quantity,
          };
        });

        return Order.create({ totalPrice: calculatedTotalPrice }, { transaction: t });
      })
      .then(order => {
        const orderProductAssociations = orderProducts.map(p => ({
          productId: p.id,
          quantity: p.quantity,
          orderId: order.id
        }));

        return order.addProducts(
          orderProductAssociations.map(assoc => assoc.productId),
          { through: orderProductAssociations, transaction: t }
        )
        .then(() => order);
      });
  })
  .then(order => res.status(201).json(order))
  .catch(err => {
    res.status(400).json({ error: err.message });
  });
}

export function getAllOrders(req, res) {
  Order.findAll({ include: Product })
    .then(orders => res.json(orders))
    .catch(err => res.status(500).json({ error: err.message }));
}

export function getOrderById(req, res) {
  Order.findByPk(req.params.id, { include: Product })
    .then(order => {
      if (!order) {
        return res.status(404).json({ error: 'Not found' });
      }
      res.json(order);
    })
    .catch(err => res.status(500).json({ error: err.message }));
}

export function updateOrder(req, res) {
  Order.findByPk(req.params.id)
    .then(order => {
      if (!order) {
        return res.status(404).json({ error: 'Not found' });
      }
      return order.update(req.body);
    })
    .then(order => res.json(order))
    .catch(err => res.status(400).json({ error: err.message }));
}

export function deleteOrder(req, res) {
  Order.findByPk(req.params.id)
    .then(order => {
      if (!order) {
        return res.status(404).json({ error: 'Not found' });
      }
      return order.destroy();
    })
    .then(() => res.json({ message: 'Deleted' }))
    .catch(err => res.status(500).json({ error: err.message }));
}
