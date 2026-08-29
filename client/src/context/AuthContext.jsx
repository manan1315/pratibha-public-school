import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const { data } = await authAPI.verify();
      setUser(data.user);
    } catch (error) {
      localStorage.removeItem('adminToken');
    }
    setLoading(false);
  };

  const login = async (email, password, captchaToken, captchaAnswer) => {
    try {
      const res = await authAPI.login({ email, password, captchaToken, captchaAnswer });
      localStorage.setItem('adminToken', res.data.token);
      setUser(res.data.user);
      return res.data;
    } catch (err) {
      // always throw so caller can handle
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setUser(null);
  };

  const value = { user, login, logout, loading, setUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
