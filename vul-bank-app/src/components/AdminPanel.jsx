import React, { useState, useEffect, useCallback } from 'react';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');

  const fetchAllUsers = useCallback(async () => {
    try {
      setLoading(true);
      // VULNERABLE: No authentication check - IDOR
      const response = await fetch('http://localhost:5000/api/admin/users', {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        setError('Failed to fetch users');
      }
    } catch {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const handleDeleteUser = async (userId, username) => {
    if (!window.confirm(`Are you sure you want to delete user "${username}"?`)) {
      return;
    }

    try {
      // VULNERABLE: No CSRF protection
      const response = await fetch(`http://localhost:5000/api/admin/user/${userId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      const result = await response.json();

      if (response.ok) {
        setDeleteMessage(`User "${username}" deleted successfully!`);
        // Refresh user list
        fetchAllUsers();
        // Clear message after 3 seconds
        setTimeout(() => setDeleteMessage(''), 3000);
      } else {
        setDeleteMessage(result.message || 'Delete failed');
      }
    } catch {
      setDeleteMessage('Network error occurred');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Admin Panel</h2>
        <button
          onClick={fetchAllUsers}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {deleteMessage && (
        <div className={`px-4 py-3 rounded ${
          deleteMessage.includes('successfully') 
            ? 'bg-green-50 border border-green-200 text-green-700'
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          {deleteMessage}
        </div>
      )}

      {/* IDOR Vulnerability Demo */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="font-semibold text-red-800 mb-2">🚨 IDOR Vulnerability Demo</h3>
        <p className="text-sm text-red-700 mb-3">
          This admin panel is accessible to anyone without proper authentication checks:
        </p>
        <div className="text-sm text-red-700 bg-red-100 p-2 rounded">
          Anyone can access /api/admin/users to view all user data including balances
        </div>
        <p className="text-sm text-red-700 mt-2">
          This demonstrates Insecure Direct Object Reference (IDOR) and missing authorization.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            All Users ({users.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Balance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <span className="text-sm">👤</span>
                      </div>
                      {user.username}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {/* VULNERABLE: Displaying user input without sanitization - XSS */}
                    <span dangerouslySetInnerHTML={{ __html: user.full_name }} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span dangerouslySetInnerHTML={{ __html: user.email }} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className={`font-bold ${
                      user.balance > 10000 ? 'text-green-600' : 
                      user.balance > 1000 ? 'text-blue-600' : 'text-red-600'
                    }`}>
                      ${user.balance?.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900 text-xs bg-blue-100 px-2 py-1 rounded">
                      View
                    </button>
                    <button className="text-green-600 hover:text-green-900 text-xs bg-green-100 px-2 py-1 rounded">
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteUser(user.id, user.username)}
                      className="text-red-600 hover:text-red-900 text-xs bg-red-100 hover:bg-red-200 px-2 py-1 rounded transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Total Users</h4>
          <div className="text-2xl font-bold text-blue-900">{users.length}</div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-2">Total Balance</h4>
          <div className="text-2xl font-bold text-green-900">
            ${users.reduce((sum, user) => sum + (parseFloat(user.balance) || 0), 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">Average Balance</h4>
          <div className="text-2xl font-bold text-yellow-900">
            ${users.length > 0 ? (users.reduce((sum, user) => sum + (parseFloat(user.balance) || 0), 0) / users.length).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
          </div>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <h3 className="font-semibold text-orange-800 mb-2">⚠️ Security Issues Demonstrated</h3>
        <ul className="text-sm text-orange-700 space-y-1">
          <li>• <strong>Missing Authentication:</strong> Anyone can access admin endpoints</li>
          <li>• <strong>IDOR:</strong> Direct access to user data without authorization checks</li>
          <li>• <strong>Information Disclosure:</strong> Sensitive user data exposed</li>
          <li>• <strong>Stored XSS:</strong> User input displayed without sanitization</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;