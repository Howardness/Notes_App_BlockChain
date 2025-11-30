import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login = ({ onLogin, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (email === 'demo@notes.com' && password === 'demo123') {
      setTimeout(() => {
        const demoUser = {
          id: 1,
          name: 'Demo User',
          email: 'demo@notes.com',
          avatar: 'DU'
        };
        onLogin(demoUser);
        setIsLoading(false);
      }, 800);
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    setTimeout(() => {
      if (user) {
        onLogin(user);
      } else {
        setError('Invalid email or password');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-5">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-10 animate-slideUp">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="text-4xl animate-bounce">📝</div>
            <h1 className="text-2xl font-bold bg-gradient-to-br from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Notes App
            </h1>
          </div>
          <p className="text-gray-500 text-sm">Welcome back! Please login to your account.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label htmlFor="email" className="block mb-2 text-gray-700 font-semibold text-sm">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-3 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 transition"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-gray-700 font-semibold text-sm">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm border-l-4 border-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-1 py-3 bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold rounded-lg transition hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="bg-blue-50 border border-blue-200 text-blue-800 text-xs rounded-lg p-3 mt-4">
            <p>Demo credentials:</p>
            <p><strong>Email:</strong> demo@notes.com</p>
            <p><strong>Password:</strong> demo123</p>
          </div>
        </form>

        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>
            Don't have an account?{' '}
            <button onClick={onSwitchToRegister} className="text-indigo-500 font-semibold underline hover:text-purple-600">
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
