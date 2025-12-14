import React, { useEffect, useState } from 'react';
import { favoritesAPI } from '../utils/api';
import BookCard from '../components/BookCard';
import { Heart } from 'lucide-react';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const response = await favoritesAPI.getAll();
      setFavorites(response.data.favorites);
    } catch (error) {
      console.error('שגיאה בטעינת המועדפים:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = (bookId) => {
    setFavorites(prev => prev.filter(book => book._id !== bookId));
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
        <div className="mb-8">
          <h1 className="font-heading font-black text-4xl md:text-5xl mb-4 flex items-center gap-3">
            <Heart className="h-10 w-10 text-red-600 fill-current" />
            הספרים המועדפים שלי
          </h1>
          <p className="text-gray-600 text-lg">כל הספרים ששמרת למועדפים</p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-md">
            <Heart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-600">עדיין לא הוספת ספרים למועדפים</p>
            <a
              href="/books"
              className="inline-block mt-6 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-bold"
            >
              גלה ספרים חדשים
            </a>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-gray-600">יש לך {favorites.length} ספרים מועדפים</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favorites.map((book) => (
                <BookCard
                  key={book._id}
                  book={book}
                  isFavorite={true}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Favorites;
