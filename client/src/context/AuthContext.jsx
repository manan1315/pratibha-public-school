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

  useEffect(() => { checkAuth(); }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) { setLoading(false); return; }
    try {
      const res = await authAPI.verify();
      setUser(res.data.user);
    } catch { localStorage.removeItem('adminToken'); }
    setLoading(false);
  };

  const login = async (email, password, captchaToken, captchaAnswer) => {
    const { data } = await authAPI.login({ email, password, captchaToken, captchaAnswer });
    localStorage.setItem('adminToken', data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => { localStorage.removeItem('adminToken'); setUser(null); };

  return <AuthContext.Provider value={{ user, login, logout, loading, setUser }}>{children}</AuthContext.Provider>;
};
