import express from 'express';
import User from '../models/User.js';
import Book from '../models/Book.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites');
    res.json({ favorites: user.favorites });
  } catch (error) {
    console.error('שגיאה בטעינת המועדפים:', error);
    res.status(500).json({ message: 'שגיאה בטעינת המועדפים' });
  }
});

router.post('/:bookId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const book = await Book.findById(req.params.bookId);

    if (!book) {
      return res.status(404).json({ message: 'הספר לא נמצא' });
    }

    if (user.favorites.includes(req.params.bookId)) {
      user.favorites = user.favorites.filter(id => id.toString() !== req.params.bookId);
      book.favoriteCount = Math.max(0, book.favoriteCount - 1);
      await user.save();
      await book.save();
      return res.json({ message: 'הספר הוסר מהמועדפים', isFavorite: false });
    }

    user.favorites.push(req.params.bookId);
    book.favoriteCount += 1;
    await user.save();
    await book.save();

    res.json({ message: 'הספר נוסף למועדפים!', isFavorite: true });
  } catch (error) {
    console.error('שגיאה בעדכון המועדפים:', error);
    res.status(500).json({ message: 'שגיאה בעדכון המועדפים' });
  }
});

export default router;
