import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as backendLogin, fetchUserByEmail } from '../bridge.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email, password) => {
    const success = await backendLogin(email, password);
    if (success) {
      const userData = await fetchUserByEmail(email);
      if (userData) {
        setUser(userData);
        return true;
      } else {
        console.error("Login succeeded, but failed to get user data");
        return false;
      }
    } else {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}