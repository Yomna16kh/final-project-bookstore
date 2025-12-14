import express from 'express';
import User from '../models/User.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ users, count: users.length });
  } catch (error) {
    console.error('שגיאה בטעינת המשתמשים:', error);
    res.status(500).json({ message: 'שגיאה בטעינת המשתמשים' });
  }
});

router.get('/:id', protect, async (req, res) => {
  try {
    if (req.user.id !== req.params.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'אין לך הרשאה לצפות במשתמש זה' });
    }

    const user = await User.findById(req.params.id).select('-password').populate('favorites');
    if (!user) {
      return res.status(404).json({ message: 'המשתמש לא נמצא' });
    }

    res.json(user);
  } catch (error) {
    console.error('שגיאה בטעינת המשתמש:', error);
    res.status(500).json({ message: 'שגיאה בטעינת המשתמש' });
  }
});

router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const { isAdmin } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isAdmin },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'המשתמש לא נמצא' });
    }

    res.json({ message: 'הרשאות המשתמש עודכנו בהצלחה!', user });
  } catch (error) {
    console.error('שגיאה בעדכון המשתמש:', error);
    res.status(500).json({ message: 'שגיאה בעדכון המשתמש' });
  }
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'המשתמש לא נמצא' });
    }

    res.json({ message: 'המשתמש נמחק בהצלחה!' });
  } catch (error) {
    console.error('שגיאה במחיקת המשתמש:', error);
    res.status(500).json({ message: 'שגיאה במחיקת המשתמש' });
  }
});

export default router;
