'use client';

import { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle, Button, Input } from '@/components/ui';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

export default function SettingsPage() {
  const { isDark, toggleTheme } = useTheme();
  const { user, users, updateProfile, addUser } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [role, setRole] = useState<'admin' | 'user'>(user?.role ?? 'admin');
  const [message, setMessage] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'admin' | 'user'>('user');
  const [newUserPassword, setNewUserPassword] = useState('123456');
  const [newUserMessage, setNewUserMessage] = useState('');

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

  const handleSaveProfile = () => {
    updateProfile(name, email, user?.username || email.split('@')[0], role);
    setMessage('Profile updated successfully.');
    window.setTimeout(() => setMessage(''), 3000);
  };

  const handleAddUser = () => {
    if (!newUserName || !newUserEmail) {
      setNewUserMessage('Please enter name and email.');
      return;
    }
    const username = newUserEmail.split('@')[0];
    addUser(newUserName, newUserEmail, username, newUserRole, newUserPassword);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserRole('user');
    setNewUserPassword('123456');
    setNewUserMessage('User added successfully.');
    window.setTimeout(() => setNewUserMessage(''), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage your application preferences</p>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardBody className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Application Name
            </label>
            <Input type="text" defaultValue="Neo Commerce Dashboard" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Company Email
            </label>
            <Input type="email" defaultValue="admin@example.com" />
          </div>
          <Button variant="primary">Save Changes</Button>
        </CardBody>
      </Card>

      {/* Profile Settings */}
      <Card id="profile">
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardBody className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <Input type="text" value={name} onChange={(event) => setName(event.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Role
            </label>
            <select
              disabled={!isAdmin}
              className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                !isAdmin ? 'opacity-60 cursor-not-allowed' : ''
              }`}
              value={role}
              onChange={(event) => setRole(event.target.value as 'admin' | 'user')}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            {!isAdmin && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Only admins can change role settings.
              </p>
            )}
          </div>
          {message && <p className="text-sm text-green-600 dark:text-green-400">{message}</p>}
          <Button variant="primary" onClick={handleSaveProfile}>
            Save Profile
          </Button>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manage Users</CardTitle>
        </CardHeader>
        <CardBody className="space-y-4">
          {isAdmin ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  New User Name
                </label>
                <Input
                  type="text"
                  value={newUserName}
                  onChange={(event) => setNewUserName(event.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  New User Email
                </label>
                <Input
                  type="email"
                  value={newUserEmail}
                  onChange={(event) => setNewUserEmail(event.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Role
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newUserRole}
                  onChange={(event) => setNewUserRole(event.target.value as 'admin' | 'user')}
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  value={newUserPassword}
                  onChange={(event) => setNewUserPassword(event.target.value)}
                  placeholder="Default: 123456"
                />
              </div>
              {newUserMessage && (
                <p className="text-sm text-green-600 dark:text-green-400">{newUserMessage}</p>
              )}
              <Button variant="primary" onClick={handleAddUser}>
                Add User
              </Button>
              {users.length > 0 && (
                <div className="space-y-3">
                  <p className="font-semibold text-gray-900 dark:text-white">Existing Accounts</p>
                  <div className="grid gap-2">
                    {users.map((account) => (
                      <div
                        key={account.email}
                        className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-3"
                      >
                        <p className="font-medium text-gray-900 dark:text-white">{account.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{account.email}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Role: {account.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              You do not have permission to add users. Only admins can create new user accounts.
            </p>
          )}
        </CardBody>
      </Card>

      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isDark ? 'Currently enabled' : 'Currently disabled'}
              </p>
            </div>
            <Button variant="secondary" onClick={toggleTheme}>
              {isDark ? 'Switch to Light' : 'Switch to Dark'}
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardBody className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-gray-700 dark:text-gray-300">Email notifications</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-gray-700 dark:text-gray-300">New order alerts</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-4 h-4" />
            <span className="text-gray-700 dark:text-gray-300">Low stock warnings</span>
          </label>
          <Button variant="primary" className="w-full">
            Save Preferences
          </Button>
        </CardBody>
      </Card>

      {/* About */}
      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>
              <span className="font-medium text-gray-900 dark:text-white">Version:</span> 1.0.0
            </p>
            <p>
              <span className="font-medium text-gray-900 dark:text-white">Last Updated:</span> January 2024
            </p>
            <p>
              <span className="font-medium text-gray-900 dark:text-white">Tech Stack:</span> Next.js, TypeScript,
              Tailwind CSS
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
