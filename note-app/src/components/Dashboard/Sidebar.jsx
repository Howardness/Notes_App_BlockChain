import React from 'react';
import { Home, Briefcase, GraduationCap, Heart, AlertCircle, Wallet, LogOut } from 'lucide-react';

const Sidebar = ({ user, currentCategory, onCategoryChange, onLogout, onShowWallet }) => {
  const categories = [
    { id: 'all', label: 'All Notes', icon: Home },
    { id: 'work', label: 'Work', icon: Briefcase },
    { id: 'personal', label: 'Personal', icon: Heart },
    { id: 'ideas', label: 'Ideas', icon: AlertCircle },
    { id: 'learning', label: 'Learning', icon: GraduationCap }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">📝</div>
          <span>NoteFlow</span>
        </div>
      </div>

      <div className="user-profile">
        <div className="user-avatar">{user?.avatar || 'U'}</div>
        <div className="user-info">
          <div className="user-name">{user?.name || 'User'}</div>
          <div className="user-email">{user?.email || 'user@email.com'}</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <div className="nav-label">Categories</div>
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                className={`nav-item ${currentCategory === category.id ? 'active' : ''}`}
                onClick={() => onCategoryChange(category.id)}
              >
                <Icon size={20} />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>

        <div className="nav-section">
          <button className="nav-item" onClick={onShowWallet}>
            <Wallet size={20} />
            <span>Wallet</span>
          </button>
          <button className="nav-item logout" onClick={onLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;