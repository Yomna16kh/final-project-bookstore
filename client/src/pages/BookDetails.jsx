import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { booksAPI, favoritesAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { Heart, ShoppingCart, ArrowRight, BookOpen, Calendar, Languages, FileText } from 'lucide-react';

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [book, setBook] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBook();
    if (isAuthenticated) {
      checkFavorite();
    }
  }, [id, isAuthenticated]);

  const loadBook = async () => {
    try {
      const response = await booksAPI.getById(id);
      setBook(response.data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'שגיאה',
        text: 'הספר לא נמצא',
        confirmButtonColor: '#d68910',
      });
      navigate('/books');
    } finally {
      setLoading(false);
    }
  };

  const checkFavorite = async () => {
    try {
      const response = await favoritesAPI.getAll();
      setIsFavorite(response.data.favorites.some(fav => fav._id === id));
    } catch (error) {
      console.error('שגיאה בבדיקת מועדפים:', error);
    }
  };

  const handleFavoriteClick = async () => {
    if (!isAuthenticated) {
      Swal.fire({
        icon: 'warning',
        title: 'נדרשת התחברות',
        text: 'יש להתחבר כדי להוסיף ספרים למועדפים',
        confirmButtonColor: '#d68910',
      });
      return;
    }

    try {
      const response = await favoritesAPI.toggle(id);
      setIsFavorite(!isFavorite);
      Swal.fire({
        icon: 'success',
        title: response.data.message,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'שגיאה',
        text: error.response?.data?.message || 'שגיאה בעדכון המועדפים',
        confirmButtonColor: '#d68910',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600"></div>
      </div>
    );
  }

  if (!book) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/books')}
          className="flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-6 transition-colors"
        >
          <ArrowRight className="h-5 w-5" />
          <span>חזרה לספרים</span>
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <div className="relative">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-auto rounded-lg shadow-md"
              />
              {book.stock === 0 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                  <span className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold text-xl">
                    אזל מהמלאי
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <h1 className="font-heading font-black text-4xl mb-4 text-gray-900">
                {book.title}
              </h1>
              <p className="text-xl text-gray-600 mb-6">{book.author}</p>

              <div className="bg-primary-50 rounded-lg p-4 mb-6">
                <p className="text-4xl font-bold text-primary-600">₪{book.price}</p>
                <p className="text-sm text-gray-600 mt-1">כולל מע״מ</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-700">
                  <BookOpen className="h-5 w-5 text-primary-600" />
                  <span className="font-semibold">קטגוריה:</span>
                  <span>{book.category}</span>
                </div>

                {book.publishYear && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar className="h-5 w-5 text-primary-600" />
                    <span className="font-semibold">שנת הוצאה:</span>
                    <span>{book.publishYear}</span>
                  </div>
                )}

                {book.language && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <Languages className="h-5 w-5 text-primary-600" />
                    <span className="font-semibold">שפה:</span>
                    <span>{book.language}</span>
                  </div>
                )}

                {book.pages && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <FileText className="h-5 w-5 text-primary-600" />
                    <span className="font-semibold">עמודים:</span>
                    <span>{book.pages}</span>
                  </div>
                )}

                <div className="flex items-center gap-3 text-gray-700">
                  <span className="font-semibold">מלאי:</span>
                  <span className={book.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                    {book.stock > 0 ? `${book.stock} יחידות` : 'אזל'}
                  </span>
                </div>
              </div>

              <div className="flex gap-4 mt-auto">
                <button
                  onClick={handleFavoriteClick}
                  className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                    isFavorite
                      ? 'bg-red-100 text-red-600 hover:bg-red-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`inline h-5 w-5 ml-2 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'הוסר מהמועדפים' : 'הוסף למועדפים'}
                </button>

                {book.stock > 0 && (
                  <button className="flex-1 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-bold">
                    <ShoppingCart className="inline h-5 w-5 ml-2" />
                    הוסף לסל
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="border-t p-8">
            <h2 className="font-heading font-bold text-2xl mb-4">תיאור הספר</h2>
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
              {book.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
