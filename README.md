# ספריית הנשר - פרויקט גמר בניית אתרים

חנות ספרים מקוונת מלאה עם ממשק ניהול מתקדם

## תכונות עיקריות

### צד לקוח (React)
- ✅ עיצוב מקצועי ורספונסיבי עם Tailwind CSS
- ✅ מערכת התחברות והרשמה מאובטחת
- ✅ חיפוש וסינון ספרים מתקדם
- ✅ מערכת מועדפים עם שמירה במאגר
- ✅ תצוגת כרטיסיות ורשימה
- ✅ עמוד פרטי ספר דינמי
- ✅ ממשק ניהול למנהלים
- ✅ ניהול מלאי ספרים
- ✅ ניהול משתמשים

### צד שרת (Node.js + Express)
- ✅ REST API מלא
- ✅ אימות והרשאות עם JWT
- ✅ הצפנת סיסמאות עם Bcrypt
- ✅ Validation מלא עם Joi
- ✅ MongoDB למאגר נתונים
- ✅ Morgan logger
- ✅ Rate limiting למניעת התקפות
- ✅ Auto logout אחרי 4 שעות

## התקנה והרצה

### דרישות מקדימות
- Node.js 16+ מותקן
- MongoDB מותקן ומופעל (או חיבור ל-MongoDB Atlas)

### שלבי התקנה

1. **התקנת תלויות ראשיות:**
```bash
pnpm install
```

2. **התקנת תלויות צד לקוח:**
```bash
cd client
npm install
cd ..
```

3. **הגדרת משתני סביבה:**
ערוך את קובץ `.env` בשורש הפרויקט:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nesher-bookstore
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=4h
NODE_ENV=development
```

4. **הרצת הפרויקט:**
```bash
npm run dev
```

הפרויקט יפעל על:
- צד לקוח: http://localhost:3000
- צד שרת: http://localhost:5000

## מבנה הפרויקט

```
nesher-bookstore/
├── client/                 # צד לקוח (React)
│   ├── public/
│   ├── src/
│   │   ├── components/    # קומפוננטים
│   │   ├── context/       # Context API
│   │   ├── pages/         # דפים
│   │   ├── utils/         # כלי עזר
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── server/                # צד שרת (Node.js)
│   ├── middleware/        # Middleware
│   ├── models/           # MongoDB Models
│   ├── routes/           # API Routes
│   ├── validators/       # Joi Validators
│   └── server.js
├── .env
├── package.json
└── README.md
```

## API Endpoints

### Auth
- `POST /api/auth/register` - הרשמה
- `POST /api/auth/login` - התחברות

### Books
- `GET /api/books` - קבלת כל הספרים (עם סינון וחיפוש)
- `GET /api/books/:id` - קבלת ספר לפי ID
- `POST /api/books` - הוספת ספר (מנהלים בלבד)
- `PUT /api/books/:id` - עדכון ספר (מנהלים בלבד)
- `DELETE /api/books/:id` - מחיקת ספר (מנהלים בלבד)

### Users
- `GET /api/users` - קבלת כל המשתמשים (מנהלים בלבד)
- `GET /api/users/:id` - קבלת משתמש לפי ID
- `PUT /api/users/:id` - עדכון הרשאות משתמש (מנהלים בלבד)
- `DELETE /api/users/:id` - מחיקת משתמש (מנהלים בלבד)

### Favorites
- `GET /api/favorites` - קבלת המועדפים של המשתמש
- `POST /api/favorites/:bookId` - הוספה/הסרה ממועדפים

## תכונות אבטחה

- הצפנת סיסמאות עם Bcrypt
- אימות JWT
- Rate limiting (1000 בקשות ליום)
- Auto logout אחרי 4 שעות
- Validation מלא של קלט משתמשים
- הרשאות משתמש ומנהל

## דרישות סיסמה

- לפחות 8 תווים
- אות גדולה אחת לפחות
- אות קטנה אחת לפחות
- לפחות 4 מספרים
- סימן מיוחד אחד לפחות (!@#$%^&*-_)

## משתמש מנהל ברירת מחדל

לאחר התקנה, צור משתמש ראשון והפוך אותו למנהל ידנית ב-MongoDB:
```javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { isAdmin: true } }
)
```

## טכנולוגיות

- **Frontend:** React 18, Vite, TailwindCSS, Axios, React Router, SweetAlert2
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Security:** JWT, Bcrypt, Joi, Express Rate Limit
- **DevOps:** Morgan (logging), Nodemon, Concurrently

## תיעוד נוסף

לפרטים נוספים על השימוש באתר, בקר בדף "אודות" באתר.

## רישיון

פרויקט גמר למטרות לימודיות

---

**פותח עם ❤️ על ידי Biela.dev**
