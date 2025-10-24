import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/useAuth';
import { useNavigate } from 'react-router-dom';
import TransferMoney from './TransferMoney';
import TransactionHistory from './TransactionHistory';
import UserSearch from './UserSearch';
import SystemTools from './SystemTools';
import ProfileManager from './ProfileManager';
import AdminPanel from './AdminPanel';

const Dashboard = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [userBalance, setUserBalance] = useState(user?.balance || 0);

  const refreshUserData = useCallback(async () => {
    try {
      // VULNERABLE: Direct user ID access - IDOR
      const response = await fetch(`http://localhost:5000/api/user/${user.id}`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUserBalance(userData.balance);
        updateUser({
          ...user,
          balance: userData.balance
        });
      }
    } catch (error) {
      console.error('Failed to refresh user data:', error);
    }
  }, [user, updateUser]);

  useEffect(() => {
    // Refresh user data when dashboard loads
    refreshUserData();
  }, [refreshUserData]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '🏠' },
    { id: 'transfer', name: 'Transfer Money', icon: '💸' },
    { id: 'history', name: 'Transaction History', icon: '📋' },
    { id: 'search', name: 'Search Users', icon: '🔍' },
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'system', name: 'System Tools', icon: '🔧' }
  ];

  // Add admin tab for admin users
  if (user?.username === 'admin') {
    tabs.push({ id: 'admin', name: 'Admin Panel', icon: '⚙️' });
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-linear-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-2">Welcome back, {user.fullName}!</h2>
              <p className="text-blue-100 mb-4">Account Balance</p>
              <div className="text-4xl font-bold">${userBalance?.toLocaleString() || '0'}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Account Number</p>
                    <p className="text-2xl font-bold text-gray-900">****{user.id.toString().padStart(4, '0')}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <span className="text-2xl">💳</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Account Type</p>
                    <p className="text-2xl font-bold text-gray-900">Checking</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <span className="text-2xl">✅</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Status</p>
                    <p className="text-2xl font-bold text-green-600">Active</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <span className="text-2xl">⭐</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-center">
                <span className="text-2xl mr-3">⚠️</span>
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800">Educational Demo</h3>
                  <p className="text-yellow-700">This application contains intentional security vulnerabilities for learning purposes.</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'transfer':
        return <TransferMoney onTransferComplete={refreshUserData} />;
      case 'history':
        return <TransactionHistory userId={user.id} />;
      case 'search':
        return <UserSearch />;
      case 'profile':
        return <ProfileManager />;
      case 'system':
        return <SystemTools />;
      case 'admin':
        return user?.username === 'admin' ? <AdminPanel /> : null;
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-900">InsecureBank</h1>
              <span className="ml-4 text-gray-500">Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Hello, {user.username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <ul className="space-y-2">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-900'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-3 text-lg">{tab.icon}</span>
                      {tab.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;