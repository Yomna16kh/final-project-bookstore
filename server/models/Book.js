import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'כותרת הספר היא שדה חובה'],
    trim: true,
  },
  author: {
    type: String,
    required: [true, 'שם המחבר הוא שדה חובה'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'תיאור הספר הוא שדה חובה'],
  },
  price: {
    type: Number,
    required: [true, 'מחיר הספר הוא שדה חובה'],
    min: 0,
  },
  category: {
    type: String,
    required: [true, 'קטגוריה היא שדה חובה'],
    enum: ['ספרות', 'מדע', 'היסטוריה', 'ילדים', 'פנטזיה', 'ביוגרפיה', 'עסקים', 'אחר'],
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400',
  },
  stock: {
    type: Number,
    required: [true, 'כמות במלאי היא שדה חובה'],
    min: 0,
    default: 0,
  },
  isbn: {
    type: String,
    unique: true,
    sparse: true,
  },
  publishYear: {
    type: Number,
    min: 1000,
    max: new Date().getFullYear() + 1,
  },
  language: {
    type: String,
    default: 'עברית',
  },
  pages: {
    type: Number,
    min: 1,
  },
  favoriteCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

bookSchema.index({ title: 'text', author: 'text', description: 'text' });

export default mongoose.model('Book', bookSchema);
