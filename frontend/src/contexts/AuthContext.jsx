import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Configure axios defaults
  axios.defaults.baseURL = 'http://localhost:5000';
  axios.defaults.withCredentials = true;

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Helper function to decode base64url
  const base64UrlDecode = (str) => {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) {
      str += '=';
    }
    return atob(str);
  };

  const checkAuthStatus = async () => {
    try {
      // Try to get current user profile to check if authenticated
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      if (!token) {
        setLoading(false);
        return;
      }

      // Decode token to get role (simple decode, not verify)
      const payload = JSON.parse(base64UrlDecode(token.split('.')[1]));
      const role = payload.role;

      if (role === 'doctor') {
        const res = await axios.get('/api/doctors/profile');
        setUser({ ...res.data, role: 'doctor' });
      } else if (role === 'patient') {
        const res = await axios.get('/api/patients/profile');
        setUser({ ...res.data, role: 'patient' });
      }
    } catch (error) {
      console.log('Not authenticated:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password, role) => {
    const url = role === 'doctor' ? '/api/doctors/login' : '/api/patients/login';
    const res = await axios.post(url, { email, password }, { withCredentials: true });

    // Set user state immediately with basic info from response
    const userData = res.data.patient || res.data.doctor;
    setUser({ ...userData, role });

    // Update user state asynchronously with full profile data
    checkAuthStatus();
    return res.data;
  };

  const register = async (userData, role) => {
    const url = role === 'doctor' ? '/api/doctors/register' : '/api/patients/register';
    const res = await axios.post(url, userData, { withCredentials: true });

    // Set user state immediately with basic info from response
    const userResponseData = res.data.patient || res.data.doctor;
    setUser({ ...userResponseData, role });

    // Update user state asynchronously with full profile data
    checkAuthStatus();
    return res.data;
  };

  const logout = async () => {
    try {
      const url = user?.role === 'doctor' ? '/api/doctors/logout' : '/api/patients/logout';
      await axios.post(url, {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      // Even if the API call fails, clear the user state
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};