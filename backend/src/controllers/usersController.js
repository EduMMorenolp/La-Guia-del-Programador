import * as userService from '../services/userService.js';

export const createUser = async (req, res) => {
  try {
    const { nombre, email, contrasena } = req.body;
    if (!nombre || !email || !contrasena) {
      return res
        .status(400)
        .json({ success: false, message: 'Faltan datos requeridos' });
    }

    const newUser = await userService.createUserService({
      nombre,
      email,
      contrasena,
    });
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { id_usuario } = req.user;

    // Verificar si el usuario tiene permiso para actualizar
    if (String(userId) !== String(id_usuario)) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permiso para actualizar este usuario',
      });
    }

    const updatedUser = await userService.updateUserService(userId, req.body);
    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: 'Usuario no encontrado' });
    }
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { id_usuario } = req.user;

    // Verificar si el usuario tiene permiso para actualizar
    if (String(userId) !== String(id_usuario)) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permiso para actualizar este usuario',
      });
    }
    const result = await userService.deleteUser(userId);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: 'Usuario no encontrado' });
    }
    res
      .status(200)
      .json({ success: true, message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    next(error);
  }
};

export const getUserFavorites = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { userIdFromJwt } = req.user;
    if (userId !== userIdFromJwt) {
      throw {
        statusCode: 403,
        message: `No puedes ver los favoritos de otro usuario`,
      };
    }
    const favorites = await userService.fetchUserFavorites(userId);
    res.status(200).json(favorites);
  } catch (error) {
    next(error);
  }
};
