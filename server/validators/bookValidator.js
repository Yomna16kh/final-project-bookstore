import Joi from 'joi';

export const bookSchema = Joi.object({
  title: Joi.string().min(1).max(200).required().messages({
    'string.min': 'כותרת הספר חייבת להכיל לפחות תו אחד',
    'string.max': 'כותרת הספר לא יכולה להכיל יותר מ-200 תווים',
    'any.required': 'כותרת הספר היא שדה חובה',
  }),
  author: Joi.string().min(2).max(100).required().messages({
    'string.min': 'שם המחבר חייב להכיל לפחות 2 תווים',
    'string.max': 'שם המחבר לא יכול להכיל יותר מ-100 תווים',
    'any.required': 'שם המחבר הוא שדה חובה',
  }),
  description: Joi.string().min(10).max(2000).required().messages({
    'string.min': 'תיאור הספר חייב להכיל לפחות 10 תווים',
    'string.max': 'תיאור הספר לא יכול להכיל יותר מ-2000 תווים',
    'any.required': 'תיאור הספר הוא שדה חובה',
  }),
  price: Joi.number().min(0).max(10000).required().messages({
    'number.min': 'המחיר לא יכול להיות שלילי',
    'number.max': 'המחיר גבוה מדי',
    'any.required': 'מחיר הספר הוא שדה חובה',
  }),
  category: Joi.string()
    .valid('ספרות', 'מדע', 'היסטוריה', 'ילדים', 'פנטזיה', 'ביוגרפיה', 'עסקים', 'אחר')
    .required()
    .messages({
      'any.only': 'קטגוריה לא תקינה',
      'any.required': 'קטגוריה היא שדה חובה',
    }),
  image: Joi.string().uri().allow('').messages({
    'string.uri': 'כתובת התמונה לא תקינה',
  }),
  stock: Joi.number().integer().min(0).required().messages({
    'number.min': 'כמות במלאי לא יכולה להיות שלילית',
    'any.required': 'כמות במלאי היא שדה חובה',
  }),
  isbn: Joi.string().allow(''),
  publishYear: Joi.number().integer().min(1000).max(new Date().getFullYear() + 1).allow(null),
  language: Joi.string().max(50).allow(''),
  pages: Joi.number().integer().min(1).allow(null),
});
