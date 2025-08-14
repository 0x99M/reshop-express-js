import { Product } from '../models';

export function createProduct(req, res) {
  Product.create(req.body)
    .then(product => res.json(product))
    .catch(err => res.status(400).json({ error: err.message }));
}

export function getAllProducts(req, res) {
  Product.findAll()
    .then(products => res.json(products))
    .catch(err => res.status(500).json({ error: err.message }));
}

export function getProductById(req, res) {
  Product.findByPk(req.params.id)
    .then(product => {
      if (!product) {
        return res.status(404).json({ error: 'Not found' });
      }
      res.json(product);
    })
    .catch(err => res.status(500).json({ error: err.message }));
}

export function updateProduct(req, res) {
  Product.findByPk(req.params.id)
    .then(product => {
      if (!product) {
        return res.status(404).json({ error: 'Not found' });
      }
      return product.update(req.body);
    })
    .then(product => res.json(product))
    .catch(err => res.status(400).json({ error: err.message }));
}

export function deleteProduct(req, res) {
  Product.findByPk(req.params.id)
    .then(product => {
      if (!product) {
        return res.status(404).json({ error: 'Not found' });
      }
      return product.destroy();
    })
    .then(() => res.json({ message: 'Deleted' }))
    .catch(err => res.status(500).json({ error: err.message }));
}
