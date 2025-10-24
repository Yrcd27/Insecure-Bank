import React, { useState } from 'react';

const UserSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setHasSearched(true);

    try {
      // VULNERABLE: Query parameter not sanitized - XSS vulnerability
      const response = await fetch(`http://localhost:5000/api/search?query=${encodeURIComponent(searchQuery)}`, {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.results || []);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Search Users</h2>

      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label htmlFor="searchQuery" className="block text-sm font-medium text-gray-700">
            Search by username or name
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              id="searchQuery"
              className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter username or name to search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                '🔍 Search'
              )}
            </button>
          </div>
        </div>
      </form>

      {/* XSS Vulnerability Demo */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <h3 className="font-semibold text-orange-800 mb-2">🚨 XSS Vulnerability Demo</h3>
        <p className="text-sm text-orange-700 mb-3">
          This search is vulnerable to Cross-Site Scripting (XSS). Try searching for:
        </p>
        <div className="text-sm text-orange-700 bg-orange-100 p-2 rounded font-mono space-y-1">
          <div>&lt;script&gt;alert('XSS')&lt;/script&gt;</div>
          <div>&lt;img src=x onerror=alert('XSS')&gt;</div>
          <div>&lt;svg onload=alert('XSS')&gt;</div>
        </div>
        <p className="text-sm text-orange-700 mt-2">
          The server reflects user input without proper sanitization, allowing script injection.
        </p>
      </div>

      {hasSearched && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Search Results ({searchResults.length})
            </h3>
            {searchQuery && (
              <div className="text-sm text-gray-500">
                Searched for: "<span 
                  className="font-mono bg-gray-100 px-2 py-1 rounded"
                  dangerouslySetInnerHTML={{ __html: searchQuery }} // VULNERABLE: XSS
                />"
              </div>
            )}
          </div>

          {searchResults.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <span className="text-4xl block mb-2">🔍</span>
              No users found matching your search
            </div>
          ) : (
            <div className="grid gap-4">
              {searchResults.map((user) => (
                <div key={user.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <span className="text-2xl">👤</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          <span dangerouslySetInnerHTML={{ __html: user.full_name }} /> {/* VULNERABLE: XSS */}
                        </h4>
                        <p className="text-sm text-gray-600">
                          @<span dangerouslySetInnerHTML={{ __html: user.username }} /> {/* VULNERABLE: XSS */}
                        </p>
                        <p className="text-xs text-gray-500">
                          User ID: {user.id}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                        Send Money
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Quick Search Suggestions */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-2">Quick Search Suggestions</h3>
        <div className="flex flex-wrap gap-2">
          {['admin', 'john', 'jane', 'bob', 'smith', 'doe'].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setSearchQuery(suggestion)}
              className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-100 transition duration-300"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserSearch;