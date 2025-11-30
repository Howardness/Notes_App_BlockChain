import React, { useState, useEffect } from 'react';
import Login from './components/Auth/Login.jsx';
import Register from './components/Auth/Register.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  const [, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('currentUser');
    
    if (authStatus === 'true' && userData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(userData));
      setCurrentView('dashboard');
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    setCurrentView('login');
  };

  const handleSwitchToRegister = () => {
    setCurrentView('register');
  };

  const handleSwitchToLogin = () => {
    setCurrentView('login');
  };

  return (
    <div className="app">
      {currentView === 'login' && (
        <Login 
          onLogin={handleLogin}
          onSwitchToRegister={handleSwitchToRegister}
        />
      )}
      {currentView === 'register' && (
        <Register 
          onRegister={handleLogin}
          onSwitchToLogin={handleSwitchToLogin}
        />
      )}
      {currentView === 'dashboard' && (
        <Dashboard 
          user={currentUser}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;