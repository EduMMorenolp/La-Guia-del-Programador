import express from 'express';
import * as usersController from '../controllers/usersController.js';

import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = express.Router();

// Rutas para usuarios
router.post('/', usersController.createUser);
router.put('/:userId', authenticateToken, usersController.updateUser);
router.delete('/:userId', authenticateToken, usersController.deleteUser);
router.get(
  '/:userId/favorites',
  authenticateToken,
  usersController.getUserFavorites
);

export default router;
