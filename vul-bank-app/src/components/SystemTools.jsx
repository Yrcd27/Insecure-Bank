import React, { useState } from 'react';
import { Wifi, AlertTriangle, Info } from 'lucide-react';

const SystemTools = () => {
  const [pingHost, setPingHost] = useState('');
  const [pingResult, setPingResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePing = async (e) => {
    e.preventDefault();
    if (!pingHost.trim()) return;

    setLoading(true);
    setPingResult('');

    try {
      // VULNERABLE: Command injection - no input validation
      const response = await fetch('http://localhost:5000/api/system/ping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ host: pingHost })
      });

      const data = await response.json();

      if (response.ok) {
        setPingResult(data.output || data.error || 'No output received');
      } else {
        setPingResult(data.error || 'Ping failed');
      }
    } catch {
      setPingResult('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">System Tools</h2>

      {/* Command Injection Vulnerability Demo */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="font-semibold text-red-800 mb-2 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          Command Injection Vulnerability Demo
        </h3>
        <p className="text-sm text-red-700 mb-3">
          This ping tool is vulnerable to command injection. Try these payloads:
        </p>
        <div className="text-sm text-red-700 bg-red-100 p-2 rounded font-mono space-y-1">
          <div>127.0.0.1; ls -la</div>
          <div>127.0.0.1 && whoami</div>
          <div>127.0.0.1 | echo "HACKED"</div>
          <div>127.0.0.1; cat /etc/passwd</div>
        </div>
        <p className="text-sm text-red-700 mt-2">
          The server executes commands without proper input sanitization.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Network Ping Tool</h3>
        
        <form onSubmit={handlePing} className="space-y-4">
          <div>
            <label htmlFor="pingHost" className="block text-sm font-medium text-gray-700">
              Host to Ping
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                id="pingHost"
                className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter hostname or IP address (e.g., google.com, 8.8.8.8)"
                value={pingHost}
                onChange={(e) => setPingHost(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Wifi className="w-4 h-4 mr-1" />
                    Ping
                  </>
                )}
              </button>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              This tool executes: ping -c 4 [your_input]
            </p>
          </div>
        </form>

        {pingResult && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Ping Results:</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-md text-sm overflow-x-auto font-mono">
              {pingResult}
            </pre>
          </div>
        )}
      </div>

      {/* Quick Test Suggestions */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-2">Quick Test Suggestions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            'localhost',
            '127.0.0.1',
            'google.com',
            '8.8.8.8'
          ].map((host) => (
            <button
              key={host}
              onClick={() => setPingHost(host)}
              className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-100 transition duration-300"
            >
              {host}
            </button>
          ))}
        </div>
      </div>

      {/* Malicious Payloads (for educational purposes) */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-800 mb-2 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          Command Injection Examples
        </h3>
        <p className="text-sm text-yellow-700 mb-2">
          Click to test command injection vulnerabilities (Educational purposes only):
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            '127.0.0.1; echo "Command injection successful"',
            '127.0.0.1 && date',
            '127.0.0.1 | echo "Pipe injection"',
            '127.0.0.1; whoami'
          ].map((payload, index) => (
            <button
              key={index}
              onClick={() => setPingHost(payload)}
              className="bg-yellow-200 border border-yellow-300 text-yellow-800 px-3 py-2 rounded text-sm hover:bg-yellow-300 transition duration-300 text-left font-mono"
            >
              {payload}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
          <Info className="w-5 h-5 mr-2" />
          About This Tool
        </h3>
        <p className="text-sm text-blue-700">
          This ping tool demonstrates command injection vulnerabilities. In a real application,
          all user input should be properly validated and sanitized before being passed to system commands.
          Consider using parameterized commands, input whitelisting, or avoiding system calls altogether.
        </p>
      </div>
    </div>
  );
};

export default SystemTools;