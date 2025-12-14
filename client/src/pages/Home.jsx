import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Star, TrendingUp, ArrowLeft, Search } from 'lucide-react';
import { booksAPI } from '../utils/api';
import BookCard from '../components/BookCard';

function Home() {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadFeaturedBooks();
  }, []);

  const loadFeaturedBooks = async () => {
    try {
      const response = await booksAPI.getAll({ sort: 'newest' });
      setFeaturedBooks(response.data.books.slice(0, 3));
    } catch (error) {
      console.error('שגיאה בטעינת הספרים:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/books?search=${searchTerm}`;
    }
  };

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-secondary-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="font-heading font-black text-5xl md:text-7xl mb-6 text-gray-900">
              ברוכים הבאים ל
              <span className="text-primary-600"> ספריית הנשר</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              גלו עולם של ספרים מרתקים. אלפי כותרים במבחר קטגוריות מחכים לכם.
            </p>

            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="חפש ספר, מחבר או קטגוריה..."
                  className="w-full px-6 py-4 pr-14 rounded-full border-2 border-gray-200 focus:border-primary-500 focus:outline-none text-lg shadow-lg"
                />
                <button
                  type="submit"
                  className="absolute left-2 top-2 bg-primary-600 text-white p-3 rounded-full hover:bg-primary-700 transition-colors"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/books"
                className="bg-primary-600 text-white px-8 py-4 rounded-full hover:bg-primary-700 transition-all transform hover:scale-105 shadow-lg font-bold text-lg flex items-center gap-2"
              >
                גלה את כל הספרים
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="bg-white text-primary-600 px-8 py-4 rounded-full hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg font-bold text-lg border-2 border-primary-600"
              >
                קרא עלינו
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-primary-50 to-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-block p-4 bg-primary-100 rounded-full mb-4">
                <BookOpen className="h-10 w-10 text-primary-600" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">מגוון עצום</h3>
              <p className="text-gray-600">אלפי ספרים בכל הז'אנרים והקטגוריות</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-secondary-50 to-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-block p-4 bg-secondary-100 rounded-full mb-4">
                <Star className="h-10 w-10 text-secondary-600" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">איכות מובטחת</h3>
              <p className="text-gray-600">רק ספרים איכותיים ומומלצים</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-primary-50 to-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-block p-4 bg-primary-100 rounded-full mb-4">
                <TrendingUp className="h-10 w-10 text-primary-600" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">מחירים הוגנים</h3>
              <p className="text-gray-600">המחירים הטובים ביותר בשוק</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-black text-4xl md:text-5xl mb-4">
              הספרים החדשים שלנו
            </h2>
            <p className="text-xl text-gray-600">הספרים האחרונים שהתווספו לאוסף שלנו</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/books"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-bold"
            >
              צפה בכל הספרים
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
