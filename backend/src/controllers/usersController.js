import * as userService from '../services/userService.js';

export const createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedUser = await userService.updateUser(userId, req.body);
    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: 'Usuario no encontrado' });
    }
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
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
    res.status(500).json({ success: false, message: error.message });
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
