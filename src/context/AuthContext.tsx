'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type UserRole = 'admin' | 'user';

export interface AppUser {
  name: string;
  email: string;
  username: string;
  role: UserRole;
}

interface AuthUser extends AppUser {
  password: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AppUser | null;
  users: AuthUser[];
  login: (identifier: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  addUser: (name: string, email: string, username: string, role: UserRole, password: string) => void;
  updateProfile: (name: string, email: string, username: string, role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialUsers: AuthUser[] = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    username: 'admin',
    role: 'admin',
    password: '083007',
  },
  {
    name: 'Standard User',
    email: 'user@example.com',
    username: 'user',
    role: 'user',
    password: '123456',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<AppUser | null>(null);
  const [users, setUsers] = useState<AuthUser[]>([]);

  useEffect(() => {
    const savedAuth = localStorage.getItem('neo-auth');
    if (savedAuth) {
      const parsed = JSON.parse(savedAuth);
      setIsAuthenticated(parsed.isAuthenticated);
      setUser(parsed.user);
    }

    const savedUsers = localStorage.getItem('neo-users');
    if (savedUsers) {
      try {
        const parsedUsers = JSON.parse(savedUsers) as Partial<AuthUser>[];
        const normalizedUsers: AuthUser[] = parsedUsers.map((item) => {
          const username = item.username || item.email?.split('@')[0] || item.name?.toLowerCase().replace(/\s+/g, '-') || 'user';
          const email = item.email || `${username}@example.com`;
          
          // Determine role: preserve explicit role, or infer from username
          let role: UserRole = 'user';
          if (item.role === 'admin') {
            role = 'admin';
          } else if (username.toLowerCase() === 'admin' || email.toLowerCase() === 'admin@example.com') {
            role = 'admin';
          }
          
          const password = item.password ??
            (username.toLowerCase() === 'admin' || email.toLowerCase() === 'admin@example.com' ? '083007' :
            username.toLowerCase() === 'user' || email.toLowerCase() === 'user@example.com' ? '123456' :
            '123456');
          return {
            name: item.name || username,
            email,
            username,
            role,
            password,
          };
        });

        const mergedUsers = [...normalizedUsers];
        initialUsers.forEach((seed) => {
          const found = mergedUsers.find(
            (item) => item.username.toLowerCase() === seed.username || item.email.toLowerCase() === seed.email,
          );
          if (!found) mergedUsers.push(seed);
        });

        setUsers(mergedUsers);
        localStorage.setItem('neo-users', JSON.stringify(mergedUsers));
      } catch (error) {
        setUsers(initialUsers);
        localStorage.setItem('neo-users', JSON.stringify(initialUsers));
      }
    } else {
      setUsers(initialUsers);
      localStorage.setItem('neo-users', JSON.stringify(initialUsers));
    }

    setIsLoading(false);
  }, []);

  const login = async (identifier: string, password: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const normalized = identifier.trim().toLowerCase();
    const existingUser = users.find(
      (item) => item.username.toLowerCase() === normalized || item.email.toLowerCase() === normalized,
    );

    if (!existingUser || existingUser.password !== password) {
      setIsLoading(false);
      throw new Error('Invalid credentials');
    }

    const { password: _password, ...userProfile } = existingUser;
    setIsAuthenticated(true);
    setUser(userProfile);
    localStorage.setItem('neo-auth', JSON.stringify({ isAuthenticated: true, user: userProfile }));
    setIsLoading(false);
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const username = email.split('@')[0];
    const userProfile: AuthUser = { name, email, username, role: 'user', password };
    setUsers((prevUsers) => {
      const nextUsers = [...prevUsers, userProfile];
      localStorage.setItem('neo-users', JSON.stringify(nextUsers));
      return nextUsers;
    });
    setIsLoading(false);
  };

  const addUser = (name: string, email: string, username: string, role: UserRole, password: string) => {
    const newUser: AuthUser = { name, email, username, role, password };
    setUsers((prevUsers) => {
      const nextUsers = [...prevUsers, newUser];
      localStorage.setItem('neo-users', JSON.stringify(nextUsers));
      return nextUsers;
    });
  };

  const updateProfile = (name: string, email: string, username: string, role: UserRole) => {
    if (!user) return;
    const updatedUser = { ...user, name, email, username, role };
    setUser(updatedUser);
    setUsers((prevUsers) => {
      const nextUsers = prevUsers.map((item) =>
        item.email === user.email || item.username === user.username ? { ...item, name, email, username, role } : item,
      );
      localStorage.setItem('neo-users', JSON.stringify(nextUsers));
      return nextUsers;
    });
    localStorage.setItem('neo-auth', JSON.stringify({ isAuthenticated, user: updatedUser }));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('neo-auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, users, login, register, addUser, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
