import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import './Auth.css';

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

    // Demo credentials
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

    // Check registered users
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
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo">
            <div className="logo-icon"></div>
            <h1>Notes App</h1>
          </div>
          <p className="auth-subtitle">Welcome back! Please login to your account.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=""
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=""
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="btn-primary btn-full"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="auth-demo">
            <p>Demo credentials:</p>
            <p><strong>Email:</strong> demo@notes.com</p>
            <p><strong>Password:</strong> demo123</p>
          </div>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <button onClick={onSwitchToRegister} className="link-button">Sign Up</button></p>
        </div>
      </div>
    </div>
  );
};

export default Login;