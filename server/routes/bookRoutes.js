import express from 'express';
import Book from '../models/Book.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { bookSchema } from '../validators/bookValidator.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { search, category, sort, minPrice, maxPrice } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (category && category !== 'הכל') {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortOption = {};
    if (sort === 'price-asc') sortOption.price = 1;
    else if (sort === 'price-desc') sortOption.price = -1;
    else if (sort === 'title') sortOption.title = 1;
    else if (sort === 'newest') sortOption.createdAt = -1;
    else sortOption.createdAt = -1;

    const books = await Book.find(query).sort(sortOption);

    res.json({ books, count: books.length });
  } catch (error) {
    console.error('שגיאה בטעינת הספרים:', error);
    res.status(500).json({ message: 'שגיאה בטעינת הספרים' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'הספר לא נמצא' });
    }

    res.json(book);
  } catch (error) {
    console.error('שגיאה בטעינת הספר:', error);
    res.status(500).json({ message: 'שגיאה בטעינת הספר' });
  }
});

router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { error } = bookSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const book = await Book.create(req.body);

    res.status(201).json({ message: 'הספר נוסף בהצלחה!', book });
  } catch (error) {
    console.error('שגיאה ביצירת הספר:', error);
    res.status(500).json({ message: 'שגיאה ביצירת הספר' });
  }
});

router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const { error } = bookSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!book) {
      return res.status(404).json({ message: 'הספר לא נמצא' });
    }

    res.json({ message: 'הספר עודכן בהצלחה!', book });
  } catch (error) {
    console.error('שגיאה בעדכון הספר:', error);
    res.status(500).json({ message: 'שגיאה בעדכון הספר' });
  }
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'הספר לא נמצא' });
    }

    res.json({ message: 'הספר נמחק בהצלחה!' });
  } catch (error) {
    console.error('שגיאה במחיקת הספר:', error);
    res.status(500).json({ message: 'שגיאה במחיקת הספר' });
  }
});

export default router;
