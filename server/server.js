import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import userRoutes from './routes/userRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';

dotenv.config();

const app = express();

const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 1000,
  message: 'מספר הבקשות חרג מהמגבלה היומית. נסה שוב מחר.',
});

app.use(limiter);
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB מחובר בהצלחה'))
  .catch((err) => console.error('❌ שגיאת חיבור ל-MongoDB:', err));

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/favorites', favoriteRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'השרת פועל תקין' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'שגיאת שרת פנימית' });
});

const PORT = parseInt(process.env.PORT || '5000', 10);

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 השרת רץ על פורט ${PORT}`);
});

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
