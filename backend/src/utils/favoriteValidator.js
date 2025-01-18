import { body, param, validationResult } from 'express-validator';

export const validateResourceId = [
  body('id_recurso')
    .notEmpty()
    .withMessage('El identificador del recurso es obligatorio')
    .isInt({ min: 1 })
    .withMessage(
      'El identificador del recurso debe ser un numero entero positivo'
    )
    .toInt(),
];

export const validateUserId = [
  body('id_usuario')
    .notEmpty()
    .withMessage('El identificador del usuario es obligatorio')
    .isInt({ min: 1 })
    .withMessage(
      'El identificador del usuario debe ser un numero entero positivo'
    )
    .toInt(),
];

export const validateFavoriteId = [
  param('favoriteId')
    .notEmpty()
    .withMessage('El identificador del favorito es obligatorio')
    .isInt({ min: 1 })
    .withMessage(
      'El identificador del favorito debe ser un numero entero positivo'
    )
    .toInt(),
];

export const validateRequest = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.statusCode = 400;
    throw error;
  }
};
