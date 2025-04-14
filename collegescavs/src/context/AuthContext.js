import React, { createContext, useContext, useState } from 'react';
import { login as bridgeLogin } from '../bridge.js'

/*
This page contains functionality for logging in a user and searching the
database for existing users and their matching information
Utilized in App.js to allow for the user to be stored across the entire
application
*/

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    const user = bridgeLogin(email, password);
    if (user) {
      setUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
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
