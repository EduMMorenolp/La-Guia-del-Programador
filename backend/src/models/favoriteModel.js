export const addFavorite = async ({ id_usuario, id_recurso }) => {
  try {
    await global.dbConnection.beginTransaction();
    const [result] = await global.dbConnection.execute(
      `
				INSERT INTO favorito (id_usuario, id_recurso)
				VALUES (?, ?)
			`,
      [id_usuario, id_recurso]
    );

    if (result.affectedRows === 0) {
      throw {
        statusCode: 404,
        message: `Usuario con ID ${id_usuario} no encontrado`,
      };
    }

    await global.dbConnection.commit();
    return result.affectedRows;
  } catch (error) {
    await global.dbConnection.rollback();
    throw error;
  }
};

export const deleteFavorite = async ({ id_usuario, favoriteId }) => {
  try {
    await global.dbConnection.beginTransaction();

    const [rows] = await global.dbConnection.execute(
      `
				  SELECT f.id_usuario
				  FROM favorito f
				  WHERE f.id_favorito = ?
			  `,
      [favoriteId]
    );

    if (!rows[0]) {
      throw {
        statusCode: 404,
        message: `Favorito con ID ${favoriteId} no encontrado`,
      };
    }

    if (rows[0] !== id_usuario) {
      throw {
        statusCode: 403,
        message: `No tienes permiso para eliminar un favorito de otro usuario`,
      };
    }

    const [result] = await global.dbConnection.execute(
      `
				DELETE FROM favorito
				WHERE favoriteId = ?
			`,
      [id_usuario]
    );

    if (result.affectedRows === 0) {
      throw {
        statusCode: 404,
        message: `Usuario con ID ${id_usuario} no encontrado`,
      };
    }

    await global.dbConnection.commit();
    return result.affectedRows;
  } catch (error) {
    await global.dbConnection.rollback();
    throw error;
  }
};
