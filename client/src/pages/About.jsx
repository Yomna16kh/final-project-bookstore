import React from 'react';
import { BookOpen, Users, Award, Target } from 'lucide-react';

function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <BookOpen className="h-16 w-16 mx-auto mb-6" />
            <h1 className="font-heading font-black text-5xl md:text-6xl mb-6">
              אודות ספריית הנשר
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              חנות הספרים המקוונת המובילה בישראל - מאז 2024
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading font-bold text-3xl mb-6 text-center">הסיפור שלנו</h2>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                ספריית הנשר נוסדה מתוך אהבה עמוקה לספרים ורצון להנגיש את עולם הספרות לכל בית בישראל. 
                אנחנו מאמינים שכל ספר הוא חלון לעולם חדש, הזדמנות ללמוד, להתפתח ולהתרגש.
              </p>
              <p>
                המשימה שלנו היא לספק לכם את המבחר הרחב ביותר של ספרים איכותיים, מכל הז'אנרים והקטגוריות,
                במחירים הוגנים ושירות מעולה. אנחנו עובדים קשה כדי להבטיח שכל לקוח ימצא בדיוק את מה שהוא מחפש.
              </p>
              <p>
                בספריית הנשר, אנחנו לא רק מוכרים ספרים - אנחנו בונים קהילה של אוהבי קריאה, מחלקים המלצות,
                ויוצרים חוויית קניה מיוחדת שתגרום לכם לחזור אלינו שוב ושוב.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-bold text-3xl mb-12 text-center">הערכים שלנו</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-block p-4 bg-primary-100 rounded-full mb-4">
                <Users className="h-10 w-10 text-primary-600" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-3">שירות לקוחות מעולה</h3>
              <p className="text-gray-600">
                אנחנו כאן בשבילכם 24/7, מוכנים לעזור ולייעץ בכל שאלה או בעיה
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-block p-4 bg-secondary-100 rounded-full mb-4">
                <Award className="h-10 w-10 text-secondary-600" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-3">איכות ללא פשרות</h3>
              <p className="text-gray-600">
                כל ספר שאנחנו מוכרים עובר בדיקת איכות קפדנית לפני שהוא מגיע אליכם
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-block p-4 bg-primary-100 rounded-full mb-4">
                <Target className="h-10 w-10 text-primary-600" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-3">מחירים הוגנים</h3>
              <p className="text-gray-600">
                אנחנו מתחייבים לספק לכם את המחירים הטובים ביותר בשוק
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading font-bold text-3xl mb-6 text-center">איך להשתמש באתר</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-xl mb-3 text-primary-600">1. הרשמה והתחברות</h3>
                <p className="text-gray-700">
                  צרו חשבון משתמש חינם באמצעות הלחצן "הרשמה" בתפריט העליון. 
                  הסיסמה חייבת להכיל אות גדולה, אות קטנה, לפחות 4 מספרים וסימן מיוחד (!@#$%^&*-_).
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-xl mb-3 text-primary-600">2. חיפוש וסינון ספרים</h3>
                <p className="text-gray-700">
                  השתמשו בשדה החיפוש כדי למצוא ספרים לפי שם, מחבר או תיאור.
                  ניתן לסנן את התוצאות לפי קטגוריה, מחיר ולמיין לפי קריטריונים שונים.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-xl mb-3 text-primary-600">3. ניהול מועדפים</h3>
                <p className="text-gray-700">
                  לחצו על סמל הלב כדי להוסיף ספרים למועדפים. 
                  כל הספרים המועדפים שלכם נשמרים בחשבון שלכם ונגישים מכל מכשיר.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-xl mb-3 text-primary-600">4. לקוחות מנהלים</h3>
                <p className="text-gray-700">
                  משתמשים מורשים עם הרשאות מנהל יכולים להוסיף, לערוך ולמחוק ספרים.
                  כמו כן, מנהלים יכולים לנהל משתמשים, לעקוב אחר מלאי ולצפות בנתונים סטטיסטיים.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-xl mb-3 text-primary-600">5. אבטחה ופרטיות</h3>
                <p className="text-gray-700">
                  האתר משתמש בהצפנת JWT לאבטחת המשתמשים. 
                  התחברות פגה אוטומטית לאחר 4 שעות של חוסר פעילות.
                  כל הסיסמאות מוצפנות ולא נשמרות בטקסט פתוח.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl mb-6">פרטים טכניים</h2>
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">
              <strong>צד לקוח:</strong> React 18, Vite, TailwindCSS, Axios, React Router
            </p>
            <p className="text-gray-700 mb-4">
              <strong>צד שרת:</strong> Node.js, Express, MongoDB, JWT, Bcrypt, Joi
            </p>
            <p className="text-gray-700 mb-4">
              <strong>אבטחה:</strong> הצפנת סיסמאות, JWT tokens, Rate limiting, הרשאות משתמשים
            </p>
            <p className="text-gray-700">
              <strong>תכונות:</strong> CRUD מלא, מערכת מועדפים, חיפוש וסינון, ניהול מלאי, ממשק ניהול
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
