import * as favoriteModel from '../models/favoriteModel.js';

/**
 * Agrega un nuevo favorito a un usuario.
 * @param {Object} data - Datos del favorito (id_usuario, id_recurso).
 * @returns {Object} Resultado de la operación.
 */
export const addFavorite = async (data) => {
  return await favoriteModel.addFavorite({
    ...data,
  });
};

/**
 * Elimina un favorito de un usuario.
 * @param {Object} data - Datos del favorito (id_usuario, favoriteId).
 * @returns {Object} Resultado de la operación.
 */
export const deleteFavorite = async (data) => {
  return await favoriteModel.deleteFavorite({
    ...data,
  });
};
