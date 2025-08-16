import { Router } from 'express';
import { placeOrder, getAllOrders, getOrderById, getOrderProducts, updateOrder, deleteOrder } from '../controllers/orderController.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticateToken, authorizeRole('admin'), getAllOrders);
router.get('/:id', authenticateToken, authorizeRole('admin', 'customer'), getOrderById);
router.get('/:orderId/products', authenticateToken, authorizeRole('admin'), getOrderProducts);

router.post('/', authenticateToken, authorizeRole('admin', 'customer'), placeOrder);
router.put('/:id', authenticateToken, authorizeRole('admin'), updateOrder);
router.delete('/:id', authenticateToken, authorizeRole('admin'), deleteOrder);

export default router;
