import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, 'secret');
      req.userId = decoded.userId;
    } catch (err) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }
  } else {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
  next();
}
