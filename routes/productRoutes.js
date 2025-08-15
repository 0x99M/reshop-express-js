import { Router } from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);

router.post('/', authenticateToken, authorizeRole('admin', 'supplier'), createProduct);
router.put('/:id', authenticateToken, authorizeRole('admin', 'supplier'), updateProduct);
router.delete('/:id', authenticateToken, authorizeRole('admin'), deleteProduct);

export default router;
