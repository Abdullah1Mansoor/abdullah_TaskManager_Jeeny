import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center bg-cover bg-center">
      <div className="bg-white/60 backdrop-blur-lg shadow-2xl rounded-2xl p-10 w-[90%] sm:w-[400px] max-w-lg border border-white/30">
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center text-2xl text-blue-600 mb-4">
            ⏎
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Sign in with email</h2>
          <p className="text-sm text-gray-500 text-center mt-1">
            Make a new doc to bring your words, data, and teams together. For free
          </p>
        </div>

        {error && (
          <p className="bg-red-100 text-red-700 text-sm text-center p-2 mb-4 rounded">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FaUser className="absolute top-3.5 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Email"
              className="w-full pl-10 pr-3 py-3 bg-white/70 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute top-3.5 left-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-3 py-3 bg-white/70 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-blue-600 hover:bg-blue-100 py-3 rounded-lg font-semibold tracking-wide transition duration-200 border border-blue-600"
          >
            Get Started
          </button>

          <p className="text-sm text-center text-gray-500">
            Demo login: <strong>admin / password</strong>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
