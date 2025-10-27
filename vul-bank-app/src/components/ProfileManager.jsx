import React, { useState } from 'react';
import { useAuth } from '../contexts/useAuth';
import { User, AlertTriangle, Info } from 'lucide-react';

const ProfileManager = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // VULNERABLE: No input sanitization - Stored XSS
      const response = await fetch(`http://localhost:5000/api/profile/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Profile updated successfully!');
        // Update local user data
        updateUser({
          ...user,
          fullName: formData.fullName,
          email: formData.email
        });
      } else {
        setMessage(result.message || 'Update failed');
      }
    } catch {
      setMessage('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Profile Management</h2>

      {/* Stored XSS Vulnerability Demo */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h3 className="font-semibold text-purple-800 mb-2 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          Stored XSS Vulnerability Demo
        </h3>
        <p className="text-sm text-purple-700 mb-3">
          Profile fields are vulnerable to stored XSS. Try entering malicious scripts:
        </p>
        <div className="text-sm text-purple-700 bg-purple-100 p-2 rounded font-mono space-y-1">
          <div>&lt;script&gt;alert('Stored XSS')&lt;/script&gt;</div>
          <div>&lt;img src=x onerror=alert('XSS in name')&gt;</div>
          <div>&lt;svg onload=confirm('XSS executed')&gt;</div>
        </div>
        <p className="text-sm text-purple-700 mt-2">
          These scripts will be stored in the database and executed when other users view profiles.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-blue-100 p-4 rounded-full">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {/* VULNERABLE: Displaying user input without sanitization */}
              <span dangerouslySetInnerHTML={{ __html: user?.fullName || 'User' }} />
            </h3>
            <p className="text-gray-600">@{user?.username}</p>
            <p className="text-sm text-gray-500">User ID: {user?.id}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {message && (
            <div className={`p-4 rounded-md ${
              message.includes('successfully') 
                ? 'bg-green-50 border border-green-200 text-green-700'
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              {message}
            </div>
          )}

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="bg-gray-50 p-3 rounded-md">
            <div className="text-sm text-gray-600">
              <strong>Username:</strong> {user?.username} (cannot be changed)
            </div>
            <div className="text-sm text-gray-600">
              <strong>Account Balance:</strong> ${user?.balance?.toLocaleString()}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>

      {/* XSS Test Examples */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-800 mb-2 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          Stored XSS Test Examples
        </h3>
        <p className="text-sm text-yellow-700 mb-3">
          Click to populate fields with XSS payloads (Educational purposes only):
        </p>
        <div className="grid grid-cols-1 gap-2">
          {[
            {
              name: 'Script Alert',
              fullName: '<script>alert("XSS in Full Name")</script>',
              email: 'test@example.com'
            },
            {
              name: 'Image Onerror',
              fullName: '<img src=x onerror=alert("Image XSS")>John Doe',
              email: '<img src=x onerror=alert("Email XSS")>@test.com'
            },
            {
              name: 'SVG Onload',
              fullName: '<svg onload=confirm("SVG XSS")>Jane Smith</svg>',
              email: 'jane@example.com'
            }
          ].map((payload, index) => (
            <button
              key={index}
              onClick={() => setFormData({ fullName: payload.fullName, email: payload.email })}
              className="bg-yellow-200 border border-yellow-300 text-yellow-800 px-3 py-2 rounded text-sm hover:bg-yellow-300 transition duration-300 text-left"
            >
              <strong>{payload.name}:</strong> {payload.fullName.substring(0, 50)}...
            </button>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
          <Info className="w-5 h-5 mr-2" />
          Security Note
        </h3>
        <p className="text-sm text-blue-700">
          In a secure application, all user input should be sanitized before storage and escaped before display.
          This prevents stored XSS attacks where malicious scripts are permanently stored and executed for all users.
        </p>
      </div>
    </div>
  );
};

export default ProfileManager;