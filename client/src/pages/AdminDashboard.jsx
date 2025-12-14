import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { booksAPI, usersAPI } from '../utils/api';
import { BookOpen, Users, Heart, TrendingUp } from 'lucide-react';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
    outOfStock: 0,
    topFavorites: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [booksRes, usersRes] = await Promise.all([
        booksAPI.getAll(),
        usersAPI.getAll(),
      ]);

      const books = booksRes.data.books;
      const users = usersRes.data.users;

      const outOfStock = books.filter(book => book.stock === 0).length;
      const topFavorites = books
        .sort((a, b) => b.favoriteCount - a.favoriteCount)
        .slice(0, 5);

      setStats({
        totalBooks: books.length,
        totalUsers: users.length,
        outOfStock,
        topFavorites,
      });
    } catch (error) {
      console.error('שגיאה בטעינת הנתונים:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading font-black text-4xl mb-8">לוח בקרה - ניהול</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">סה״כ ספרים</p>
                <p className="text-3xl font-bold text-primary-600">{stats.totalBooks}</p>
              </div>
              <BookOpen className="h-12 w-12 text-primary-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">סה״כ משתמשים</p>
                <p className="text-3xl font-bold text-secondary-600">{stats.totalUsers}</p>
              </div>
              <Users className="h-12 w-12 text-secondary-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">אזל מהמלאי</p>
                <p className="text-3xl font-bold text-red-600">{stats.outOfStock}</p>
              </div>
              <TrendingUp className="h-12 w-12 text-red-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">הכי פופולרי</p>
                <p className="text-3xl font-bold text-pink-600">
                  {stats.topFavorites[0]?.favoriteCount || 0}
                </p>
              </div>
              <Heart className="h-12 w-12 text-pink-600 fill-current" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="font-heading font-bold text-2xl mb-4">פעולות מהירות</h2>
            <div className="space-y-3">
              <Link
                to="/admin/books"
                className="block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors text-center font-bold"
              >
                ניהול ספרים
              </Link>
              <Link
                to="/admin/users"
                className="block bg-secondary-600 text-white px-6 py-3 rounded-lg hover:bg-secondary-700 transition-colors text-center font-bold"
              >
                ניהול משתמשים
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="font-heading font-bold text-2xl mb-4">הספרים הפופולריים</h2>
            <div className="space-y-3">
              {stats.topFavorites.map((book, index) => (
                <div key={book._id} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-400">#{index + 1}</span>
                    <div>
                      <p className="font-semibold">{book.title}</p>
                      <p className="text-sm text-gray-600">{book.author}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-pink-600">
                    <Heart className="h-4 w-4 fill-current" />
                    <span className="font-bold">{book.favoriteCount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
