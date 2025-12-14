import React, { useEffect, useState } from 'react';
import { booksAPI } from '../utils/api';
import Swal from 'sweetalert2';
import { Plus, Edit, Trash2, X } from 'lucide-react';

function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    category: 'ספרות',
    image: '',
    stock: '',
    isbn: '',
    publishYear: '',
    language: 'עברית',
    pages: '',
  });

  const categories = ['ספרות', 'מדע', 'היסטוריה', 'ילדים', 'פנטזיה', 'ביוגרפיה', 'עסקים', 'אחר'];

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const response = await booksAPI.getAll();
      setBooks(response.data.books);
    } catch (error) {
      console.error('שגיאה בטעינת הספרים:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      author: '',
      description: '',
      price: '',
      category: 'ספרות',
      image: '',
      stock: '',
      isbn: '',
      publishYear: '',
      language: 'עברית',
      pages: '',
    });
    setEditingBook(null);
    setShowModal(false);
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      description: book.description,
      price: book.price,
      category: book.category,
      image: book.image || '',
      stock: book.stock,
      isbn: book.isbn || '',
      publishYear: book.publishYear || '',
      language: book.language || 'עברית',
      pages: book.pages || '',
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const bookData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        publishYear: formData.publishYear ? Number(formData.publishYear) : null,
        pages: formData.pages ? Number(formData.pages) : null,
      };

      if (editingBook) {
        await booksAPI.update(editingBook._id, bookData);
        Swal.fire({
          icon: 'success',
          title: 'הספר עודכן בהצלחה!',
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await booksAPI.create(bookData);
        Swal.fire({
          icon: 'success',
          title: 'הספר נוסף בהצלחה!',
          timer: 1500,
          showConfirmButton: false,
        });
      }

      resetForm();
      loadBooks();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'שגיאה',
        text: error.response?.data?.message || 'שגיאה בשמירת הספר',
        confirmButtonColor: '#d68910',
      });
    }
  };

  const handleDelete = async (book) => {
    const result = await Swal.fire({
      title: 'האם אתה בטוח?',
      text: `האם למחוק את "${book.title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d68910',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'כן, מחק',
      cancelButtonText: 'ביטול',
    });

    if (result.isConfirmed) {
      try {
        await booksAPI.delete(book._id);
        Swal.fire({
          icon: 'success',
          title: 'הספר נמחק בהצלחה!',
          timer: 1500,
          showConfirmButton: false,
        });
        loadBooks();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'שגיאה',
          text: error.response?.data?.message || 'שגיאה במחיקת הספר',
          confirmButtonColor: '#d68910',
        });
      }
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-heading font-black text-4xl">ניהול ספרים</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-bold flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            הוסף ספר חדש
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-right text-sm font-bold text-gray-700">כותרת</th>
                <th className="px-6 py-3 text-right text-sm font-bold text-gray-700">מחבר</th>
                <th className="px-6 py-3 text-right text-sm font-bold text-gray-700">קטגוריה</th>
                <th className="px-6 py-3 text-right text-sm font-bold text-gray-700">מחיר</th>
                <th className="px-6 py-3 text-right text-sm font-bold text-gray-700">מלאי</th>
                <th className="px-6 py-3 text-right text-sm font-bold text-gray-700">פעולות</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {books.map((book) => (
                <tr key={book._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{book.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{book.author}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{book.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">₪{book.price}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded ${book.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {book.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(book)}
                        className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded"
                        title="ערוך"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(book)}
                        className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded"
                        title="מחק"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
                <h2 className="font-heading font-bold text-2xl">
                  {editingBook ? 'ערוך ספר' : 'הוסף ספר חדש'}
                </h2>
                <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">כותרת</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">מחבר</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">תיאור</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">מחיר</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">מלאי</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">קטגוריה</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">תמונה (URL)</label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">ISBN</label>
                    <input
                      type="text"
                      name="isbn"
                      value={formData.isbn}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">שנת הוצאה</label>
                    <input
                      type="number"
                      name="publishYear"
                      value={formData.publishYear}
                      onChange={handleInputChange}
                      min="1000"
                      max={new Date().getFullYear() + 1}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">שפה</label>
                    <input
                      type="text"
                      name="language"
                      value={formData.language}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">עמודים</label>
                    <input
                      type="number"
                      name="pages"
                      value={formData.pages}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-bold"
                  >
                    {editingBook ? 'עדכן ספר' : 'הוסף ספר'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-bold"
                  >
                    ביטול
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageBooks;
