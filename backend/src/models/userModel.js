export const createUser = async ({
  nombre,
  email,
  contrasena,
  rol = 'usuario',
}) => {
  try {
    console.log('Modelo recibe:', { nombre, email, contrasena, rol });
    const [result] = await global.dbConnection.execute(
      `
            INSERT INTO usuario (nombre_usuario, email, contrasena, rol)
            VALUES (?, ?, ?, ?)
        `,
      [nombre, email, contrasena, rol]
    );

    return { id_usuario: result.insertId };
  } catch (error) {
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const user = await global.dbConnection.execute(
      'SELECT * FROM usuario WHERE email = ?',
      [email]
    );
    return user;
  } catch (error) {
    throw { statusCode: 500, message: 'Error al buscar el usuario por email' };
  }
};

export const updateUser = async (
  idUsuario,
  { nombre_usuario, email, contrasena }
) => {
  try {
    const [result] = await global.dbConnection.execute(
      `
            UPDATE usuario
            SET nombre_usuario = ?, email = ?, contrasena = ?
            WHERE id_usuario = ?
        `,
      [nombre_usuario, email, contrasena, idUsuario]
    );

    if (result.affectedRows === 0) {
      throw {
        statusCode: 404,
        message: `Usuario con ID ${idUsuario} no encontrado`,
      };
    }

    return true;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (idUsuario) => {
  try {
    const [result] = await global.dbConnection.execute(
      `
            UPDATE usuario SET eliminado = TRUE WHERE id_usuario = ?
        `,
      [idUsuario]
    );

    if (result.affectedRows === 0) {
      throw {
        statusCode: 404,
        message: `Usuario con ID ${idUsuario} no encontrado`,
      };
    }

    return true;
  } catch (error) {
    throw error;
  }
};

export const getUserFavorites = async (idUsuario) => {
  try {
    const [rows] = await global.dbConnection.execute(
      `
            SELECT f.id_favorito, r.id_recurso, r.titulo, r.descripcion, r.tipo_recurso, c.nombre AS categoria
            FROM favorito f
            JOIN recurso r ON f.id_recurso = r.id_recurso
            LEFT JOIN categoria c ON r.id_categoria = c.id_categoria
            WHERE f.id_usuario = ?;
        `,
      [idUsuario]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};
