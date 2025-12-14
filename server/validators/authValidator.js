import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    'string.min': 'השם חייב להכיל לפחות 2 תווים',
    'string.max': 'השם לא יכול להכיל יותר מ-50 תווים',
    'any.required': 'שם הוא שדה חובה',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'כתובת אימייל לא תקינה',
    'any.required': 'אימייל הוא שדה חובה',
  }),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*\-_])[A-Za-z\d!@#$%^&*\-_]{8,}$/)
    .required()
    .messages({
      'string.min': 'הסיסמה חייבת להכיל לפחות 8 תווים',
      'string.pattern.base': 'הסיסמה חייבת להכיל אות גדולה, אות קטנה, 4 מספרים לפחות וסימן מיוחד (!@#$%^&*-_)',
      'any.required': 'סיסמה היא שדה חובה',
    }),
  phone: Joi.string().pattern(/^0\d{1,2}-?\d{7}$/).allow('').messages({
    'string.pattern.base': 'מספר טלפון לא תקין',
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'כתובת אימייל לא תקינה',
    'any.required': 'אימייל הוא שדה חובה',
  }),
  password: Joi.string().required().messages({
    'any.required': 'סיסמה היא שדה חובה',
  }),
});
