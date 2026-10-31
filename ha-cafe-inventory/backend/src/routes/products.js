import { Router } from 'express';
import { listProducts, createProduct, deleteProduct } from '../controllers/productController.js';

const router = Router();

router.get('/', listProducts);
router.post('/', createProduct);
router.delete('/:id', deleteProduct);

export default router;
