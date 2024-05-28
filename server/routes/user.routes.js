import express from 'express';
import UserController from '../controllers/user.controller.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post('/register', UserController.register);

router.get('/:id', authenticate, UserController.getUser);

router.put('/:id', authenticate, UserController.updateUser);

router.delete('/:id', authenticate, UserController.deleteUser);

export default router;