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
    <div className="w-72 bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 flex items-center gap-3 text-2xl font-bold">
        <div className="text-3xl">📝</div>
        <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">NoteFlow</span>
      </div>

      {/* User Profile */}
      <div className="p-6 border-b border-gray-200 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg">
          {user?.avatar || 'U'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-gray-900 truncate">{user?.name || 'User'}</div>
          <div className="text-sm text-gray-500 truncate">{user?.email || 'user@email.com'}</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col justify-between p-4">
        <div className="space-y-4">
          <div className="text-xs font-semibold text-gray-400 uppercase px-3 tracking-wide">Categories</div>
          {categories.map(category => {
            const Icon = category.icon;
            const active = currentCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition ${
                  active
                    ? 'bg-indigo-100 text-indigo-600 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>

        <div className="space-y-2 mt-4">
          <button
            onClick={onShowWallet}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <Wallet size={20} />
            <span>Wallet</span>
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-100"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
