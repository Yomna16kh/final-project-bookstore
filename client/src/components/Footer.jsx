import React from 'react';
import { BookOpen, Mail, Phone, MapPin } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-8 w-8 text-primary-400" />
              <span className="font-heading font-bold text-2xl">ספריית הנשר</span>
            </div>
            <p className="text-gray-400">
              חנות הספרים המקוונת המובילה בישראל. מגוון רחב של ספרים בכל הז'אנרים.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg mb-4">קישורים מהירים</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/books" className="hover:text-primary-400 transition-colors">הספרים שלנו</a></li>
              <li><a href="/about" className="hover:text-primary-400 transition-colors">אודות</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">תנאי שימוש</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">מדיניות פרטיות</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg mb-4">צור קשר</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary-400" />
                <span>info@nesher-books.co.il</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary-400" />
                <span>03-1234567</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary-400" />
                <span>תל אביב, ישראל</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="text-center text-gray-400 text-sm">
            <p className="mb-2">
              AI vibe coded development by{' Yomna Khashan'}


            </p>
            <p>&copy; {new Date().getFullYear()} ספריית הנשר. כל הזכויות שמורות.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
