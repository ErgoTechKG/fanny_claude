'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

// User role type
export type UserRole = 'student' | 'instructor' | 'admin' | null;

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Auth context interface
interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
}

// Mock user data
const mockUsers: Record<string, User> = {
  student: {
    id: '1',
    name: 'Zhang Wei',
    email: 'zhang.wei@hust.edu.cn',
    role: 'student'
  },
  instructor: {
    id: '2',
    name: 'Prof. Li Ming',
    email: 'li.ming@hust.edu.cn',
    role: 'instructor'
  },
  admin: {
    id: '3',
    name: 'Admin Wang Chen',
    email: 'admin@hust.edu.cn',
    role: 'admin'
  }
};

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userRole: null,
  user: null,
  login: async () => false,
  logout: () => {},
});

// Auth provider component
export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [user, setUser] = useState<User | null>(null);

  // Login function (mock implementation)
  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // In a real app, this would make an API call to validate credentials
    // For now, we'll just mock a successful login
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsAuthenticated(true);
        setUserRole(role);
        
        // Set the user based on role
        setUser(mockUsers[role as keyof typeof mockUsers] || null);
        
        resolve(true);
      }, 500); // Simulate API delay
    });
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext); 