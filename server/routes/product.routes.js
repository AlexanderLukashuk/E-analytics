import express from 'express';
import ProductController from '../controllers/product.controller.js';

const router = express.Router();

router.post('/', ProductController.createProduct);

router.get('/:id', ProductController.getProduct);

router.put('/:id', ProductController.updateProduct);

router.delete('/:id', ProductController.deleteProduct);

export default router;
