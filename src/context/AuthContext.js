import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../services/BookService'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      axios.defaults.headers.common['Authorization'] = `${token}`;
    }
  }, [token]);

  const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    const token = response.data.data.accessToken;
    localStorage.setItem('token', token);
    setToken(token);
    setIsAuthenticated(true);
  };

  const register = async (first_name, last_name, email, password) => {
    await axios.post(`${API_URL}/auth/register`, { first_name, last_name, email, password });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setIsAuthenticated(false);
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

