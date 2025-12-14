import React, { useEffect, useState } from 'react';
import { usersAPI } from '../utils/api';
import Swal from 'sweetalert2';
import { Shield, ShieldOff, Trash2, Crown } from 'lucide-react';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await usersAPI.getAll();
      setUsers(response.data.users);
    } catch (error) {
      console.error('שגיאה בטעינת המשתמשים:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAdmin = async (user) => {
    const result = await Swal.fire({
      title: 'שינוי הרשאות',
      text: `האם להפוך את ${user.name} ל${user.isAdmin ? 'משתמש רגיל' : 'מנהל'}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d68910',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'כן, שנה',
      cancelButtonText: 'ביטול',
    });

    if (result.isConfirmed) {
      try {
        await usersAPI.update(user._id, { isAdmin: !user.isAdmin });
        Swal.fire({
          icon: 'success',
          title: 'ההרשאות עודכנו בהצלחה!',
          timer: 1500,
          showConfirmButton: false,
        });
        loadUsers();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'שגיאה',
          text: error.response?.data?.message || 'שגיאה בעדכון ההרשאות',
          confirmButtonColor: '#d68910',
        });
      }
    }
  };

  const deleteUser = async (user) => {
    const result = await Swal.fire({
      title: 'האם אתה בטוח?',
      text: `האם למחוק את המשתמש ${user.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d68910',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'כן, מחק',
      cancelButtonText: 'ביטול',
    });

    if (result.isConfirmed) {
      try {
        await usersAPI.delete(user._id);
        Swal.fire({
          icon: 'success',
          title: 'המשתמש נמחק בהצלחה!',
          timer: 1500,
          showConfirmButton: false,
        });
        loadUsers();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'שגיאה',
          text: error.response?.data?.message || 'שגיאה במחיקת המשתמש',
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
        <div className="mb-8">
          <h1 className="font-heading font-black text-4xl">ניהול משתמשים</h1>
          <p className="text-gray-600 mt-2">סה״כ {users.length} משתמשים רשומים</p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-right text-sm font-bold text-gray-700">שם</th>
                <th className="px-6 py-3 text-right text-sm font-bold text-gray-700">אימייל</th>
                <th className="px-6 py-3 text-right text-sm font-bold text-gray-700">טלפון</th>
                <th className="px-6 py-3 text-right text-sm font-bold text-gray-700">סטטוס</th>
                <th className="px-6 py-3 text-right text-sm font-bold text-gray-700">תאריך הצטרפות</th>
                <th className="px-6 py-3 text-right text-sm font-bold text-gray-700">פעולות</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    <div className="flex items-center gap-2">
                      {user.name}
                      {user.isAdmin && <Crown className="h-4 w-4 text-yellow-500" title="מנהל" />}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.phone || '-'}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.isAdmin 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.isAdmin ? 'מנהל' : 'משתמש'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString('he-IL')}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleAdmin(user)}
                        className={`p-2 rounded hover:bg-opacity-10 ${
                          user.isAdmin 
                            ? 'text-orange-600 hover:bg-orange-600' 
                            : 'text-green-600 hover:bg-green-600'
                        }`}
                        title={user.isAdmin ? 'הסר הרשאות מנהל' : 'הפוך למנהל'}
                      >
                        {user.isAdmin ? <ShieldOff className="h-5 w-5" /> : <Shield className="h-5 w-5" />}
                      </button>
                      <button
                        onClick={() => deleteUser(user)}
                        className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded"
                        title="מחק משתמש"
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
      </div>
    </div>
  );
}

export default ManageUsers;
