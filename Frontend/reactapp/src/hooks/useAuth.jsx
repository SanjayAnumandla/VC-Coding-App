import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check existing auth state
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Replace with actual API call
      const response = await mockAuthAPI(email, password);
      
      if (response.success) {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userData', JSON.stringify(response.user));
        setUser(response.user);
        setIsAuthenticated(true);
        navigate('/dashboard');
      }
      return response;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return {
    user,
    isAuthenticated,
    loading,
    login,
    logout
  };
};

// Mock function - replace with real API call
const mockAuthAPI = (email, password) => {
  return new Promise(resolve => {
    setTimeout(() => {
      if (email === 'demo@codecollab.com' && password === 'demo123') {
        resolve({
          success: true,
          token: 'mock-token-123',
          user: {
            name: 'Demo User',
            email: 'demo@codecollab.com'
          }
        });
      } else {
        resolve({ success: false, message: 'Invalid credentials' });
      }
    }, 1000);
  });
};

export default useAuth;