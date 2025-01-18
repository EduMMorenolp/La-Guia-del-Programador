import express from 'express';
import * as favoritesController from '../controllers/favoritesController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = express.Router();

// Rutas para favoritos
router.post('/', authenticateToken, favoritesController.addFavorite);
router.delete(
  '/:favoriteId',
  authenticateToken,
  favoritesController.deleteFavorite
);

export default router;
