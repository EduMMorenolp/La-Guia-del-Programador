import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Acceso denegado: no se proporcionó un token',
    });
  }

  // Verificar el token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, message: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};
