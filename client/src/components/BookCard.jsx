import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { favoritesAPI } from '../utils/api';
import Swal from 'sweetalert2';

function BookCard({ book, isFavorite, onFavoriteToggle }) {
  const { isAuthenticated } = useAuth();

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
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
      const response = await favoritesAPI.toggle(book._id);
      Swal.fire({
        icon: 'success',
        title: response.data.message,
        timer: 1500,
        showConfirmButton: false,
      });
      if (onFavoriteToggle) {
        onFavoriteToggle(book._id);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'שגיאה',
        text: error.response?.data?.message || 'שגיאה בעדכון המועדפים',
        confirmButtonColor: '#d68910',
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <Link to={`/books/${book._id}`} className="block">
        <div className="relative h-64 overflow-hidden bg-gray-100">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          {book.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold">
                אזל מהמלאי
              </span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-4 flex-grow flex flex-col">
        <Link to={`/books/${book._id}`}>
          <h3 className="font-heading font-bold text-lg mb-2 hover:text-primary-600 transition-colors line-clamp-2">
            {book.title}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-2">{book.author}</p>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">{book.description}</p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary-600">₪{book.price}</span>
            <span className="text-xs text-gray-500">{book.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full transition-colors ${
                isFavorite
                  ? 'bg-red-100 text-red-600 hover:bg-red-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={isFavorite ? 'הסר מהמועדפים' : 'הוסף למועדפים'}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            {book.stock > 0 && (
              <button
                className="bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors"
                title="הוסף לסל"
              >
                <ShoppingCart className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
