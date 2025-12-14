import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'אינך מורשה. נא להתחבר.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const fourHoursAgo = new Date(Date.now() - 4 * 60 * 60 * 1000);
    if (decoded.iat && new Date(decoded.iat * 1000) < fourHoursAgo) {
      return res.status(401).json({ message: 'הזמן עבר. נא להתחבר שוב.' });
    }

    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'משתמש לא נמצא' });
    }

    next();
  } catch (error) {
    console.error('שגיאת אימות:', error);
    return res.status(401).json({ message: 'אסימון לא תקין' });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'גישה נדחתה. נדרשות הרשאות מנהל.' });
  }
};
