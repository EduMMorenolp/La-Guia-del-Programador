import * as favoriteService from '../services/favoriteService.js';

import {
  validateFavoriteId,
  validateResourceId,
  validateUserId,
} from '../utils/favoriteValidator.js';

export const addFavorite = [
  ...validateResourceId,
  ...validateUserId,
  async (req, res) => {
    try {
      validateRequest(req);
      const { id_usuario, id_recurso } = req.body;
      const { userFromJwt } = req.user;

      // Verificar si el usuario tiene permiso para agregar
      if (String(id_usuario) !== String(userFromJwt)) {
        throw {
          statusCode: 403,
          message: 'No tienes permiso para agregarle favoritos a este usuario',
        };
      }

      await favoriteService.addFavorite({
        id_usuario,
        id_recurso,
      });
      res.status(200).json({ message: 'Recurso agregado a favoritos' });
    } catch (error) {
      next(error);
    }
  },
];

export const deleteFavorite = [
  validateFavoriteId,
  async (req, res) => {
    try {
      validateRequest(req);

      const { favoriteId } = req.params;
      const { id_usuario } = req.user;

      await favoriteService.deleteFavorite(id_usuario, favoriteId);
      res.status(200).json({ message: 'Favorito eliminado exitosamente' });
    } catch (error) {
      next(error);
    }
  },
];
