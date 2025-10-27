import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      // VULNERABLE: No rate limiting - brute force possible
      const response = await fetch('http://localhost:5000/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
        // VULNERABLE: Exposing username
        if (result.username) {
          setMessage(`${result.message} (Username: ${result.username})`);
        }
      } else {
        // VULNERABLE: User enumeration - reveals if email exists
        setError(result.message);
      }
    } catch {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link to="/" className="flex justify-center">
            <h2 className="text-3xl font-bold text-white">InsecureBank</h2>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-blue-100">
            Remember your password?{' '}
            <Link
              to="/login"
              className="font-medium text-blue-300 hover:text-blue-200"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
          {/* Vulnerability Warning */}
          <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded mb-6">
            <h3 className="font-semibold mb-1">🚨 Security Vulnerabilities:</h3>
            <ul className="text-xs space-y-1">
              <li>• User enumeration attack possible</li>
              <li>• Username exposed in response</li>
              <li>• No rate limiting for brute force</li>
              <li>• Email existence disclosure</li>
            </ul>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {message && (
              <div className="bg-green-500/20 border border-green-500/50 text-green-100 px-4 py-3 rounded">
                {message}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="mt-1 text-xs text-blue-200">
                Try testing with: admin@insecurebank.com, john@example.com, jane@example.com
              </p>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Reset Instructions'}
              </button>
            </div>
          </form>

          {/* Educational Note */}
          <div className="mt-6 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-md">
            <h4 className="text-sm font-medium text-yellow-100 mb-2">Educational Demo:</h4>
            <p className="text-xs text-yellow-200">
              In a real application, the same success message should be shown regardless of whether 
              the email exists, and no user information should be disclosed. Rate limiting and CAPTCHA 
              should also be implemented.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
