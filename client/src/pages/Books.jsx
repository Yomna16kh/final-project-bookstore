import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { booksAPI, favoritesAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import BookCard from '../components/BookCard';
import { Search, Filter, Grid, List } from 'lucide-react';

function Books() {
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: 'הכל',
    sort: 'newest',
    minPrice: '',
    maxPrice: '',
  });

  const categories = ['הכל', 'ספרות', 'מדע', 'היסטוריה', 'ילדים', 'פנטזיה', 'ביוגרפיה', 'עסקים', 'אחר'];

  useEffect(() => {
    loadBooks();
    if (isAuthenticated) {
      loadFavorites();
    }
  }, [filters, isAuthenticated]);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const params = {
        ...filters,
        category: filters.category === 'הכל' ? undefined : filters.category,
      };
      const response = await booksAPI.getAll(params);
      setBooks(response.data.books);
    } catch (error) {
      console.error('שגיאה בטעינת הספרים:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    try {
      const response = await favoritesAPI.getAll();
      setFavorites(response.data.favorites.map(book => book._id));
    } catch (error) {
      console.error('שגיאה בטעינת המועדפים:', error);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleFavoriteToggle = (bookId) => {
    setFavorites(prev => 
      prev.includes(bookId)
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-heading font-black text-4xl md:text-5xl mb-4">הספרים שלנו</h1>
          <p className="text-gray-600 text-lg">גלו את המגוון הרחב של ספרים באוסף שלנו</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Search className="inline h-4 w-4 ml-1" />
                חיפוש
              </label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="חפש ספר, מחבר..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Filter className="inline h-4 w-4 ml-1" />
                קטגוריה
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                מיון
              </label>
              <select
                value={filters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="newest">החדשים ביותר</option>
                <option value="price-asc">מחיר: נמוך לגבוה</option>
                <option value="price-desc">מחיר: גבוה לנמוך</option>
                <option value="title">שם הספר</option>
              </select>
            </div>

            <div className="flex items-end gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                title="תצוגת כרטיסיות"
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                title="תצוגת רשימה"
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600"></div>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">לא נמצאו ספרים התואמים לחיפוש</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-gray-600">נמצאו {books.length} ספרים</p>
            </div>
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
              : 'space-y-4'
            }>
              {books.map((book) => (
                <BookCard
                  key={book._id}
                  book={book}
                  isFavorite={favorites.includes(book._id)}
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

export default Books;
