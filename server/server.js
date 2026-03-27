import dotenv from 'dotenv';
dotenv.config({ path: './server/.env' });

console.log("URI:", process.env.MONGODB_URI);

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import userRoutes from './routes/userRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';

const app = express();

// הגבלת בקשות
const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 1000,
  message: 'מספר הבקשות חרג מהמגבלה היומית. נסה שוב מחר.',
});

// Middlewares
app.use(limiter);
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// חיבור ל־MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB מחובר בהצלחה'))
  .catch((err) => console.error('❌ שגיאת חיבור ל-MongoDB:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/favorites', favoriteRoutes);

// בדיקת שרת
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'השרת פועל תקין' });
});

// טיפול בשגיאות
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'שגיאת שרת פנימית' });
});

// הרצת השרת
const PORT = parseInt(process.env.PORT || '5000', 10);

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 השרת רץ על פורט ${PORT}`);
});

// טיפול בשגיאות פורט
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ שגיאה: פורט ${PORT} כבר בשימוש`);
    console.log('💡 פתרונות אפשריים:');
    console.log('1. שנה את הפורט בקובץ .env');
    console.log('2. עצור תהליכים אחרים שרצים על פורט זה');
    process.exit(1);
  } else {
    throw error;
  }
});