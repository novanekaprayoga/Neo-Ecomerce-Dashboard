"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { useFilters } from '@/context/FilterContext';
import { useSidebar } from '@/context/SidebarContext';

export const Navbar: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { filters, updateFilter } = useFilters();
  const { isOpen } = useSidebar();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const notifications = [
    { id: 1, message: 'New order received', time: '5 min ago' },
    { id: 2, message: 'Stock low for item #123', time: '1 hour ago' },
    { id: 3, message: 'Payment received', time: '2 hours ago' },
  ];

  if (!isMounted) {
    return (
      <header 
        style={{ left: isOpen ? '256px' : '80px' }}
        className="fixed top-0 right-0 h-16 bg-white dark:bg-secondary border-b border-gray-200 dark:border-gray-700 px-6 flex items-center justify-between z-30 transition-all duration-300"
      >
        <div className="flex-1 max-w-xs">
          <Input
            type="text"
            placeholder="Search..."
            className="py-2 px-3"
            value={filters.searchQuery}
            onChange={(e) => updateFilter('searchQuery', e.target.value)}
            disabled
          />
        </div>
      </header>
    );
  }

  return (
    <header 
      style={{ left: isOpen ? '256px' : '80px' }}
      className="fixed top-0 right-0 h-16 bg-white dark:bg-secondary border-b border-gray-200 dark:border-gray-700 px-6 flex items-center justify-between z-30 transition-all duration-300"
    >
      {/* Search */}
      <div className="flex-1 max-w-xs">
        <Input
          type="text"
          placeholder="Search..."
          className="py-2 px-3"
          value={filters.searchQuery}
          onChange={(e) => updateFilter('searchQuery', e.target.value)}
        />
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4 ml-6">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          title={isDark ? 'Light mode' : 'Dark mode'}
        >
          {isDark ? '☀️' : '🌙'}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            🔔
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-secondary rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    <p className="text-sm text-gray-900 dark:text-white">{notif.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            👤
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-secondary rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <p className="font-semibold text-gray-900 dark:text-white">{user?.name ?? 'Admin User'}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email ?? 'admin@example.com'}</p>
              </div>
              <div className="p-2">
                <Link
                  href="/dashboard/settings#profile"
                  onClick={() => setShowProfile(false)}
                  className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-sm"
                >
                  Profile Settings
                </Link>
                <Link
                  href="/dashboard/support"
                  onClick={() => setShowProfile(false)}
                  className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-sm"
                >
                  Help & Support
                </Link>
                <hr className="my-2 border-gray-200 dark:border-gray-700" />
                <button
                  onClick={logout}
                  className="w-full text-left px-3 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
