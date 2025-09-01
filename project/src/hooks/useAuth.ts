import { useState, useEffect } from 'react';
import { User, AuthState } from '../types';
import { apiService } from '../services/api';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false
  });

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      // In a real app, you'd validate the token with the server
      // For now, we'll just check if it exists
      setAuthState({ user: null, isAuthenticated: true });
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await apiService.login(email, password);
      setAuthState({ user: response.user, isAuthenticated: true });
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const response = await apiService.register(email, password, name);
      setAuthState({ user: response.user, isAuthenticated: true });
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const logout = () => {
    apiService.logout();
    setAuthState({ user: null, isAuthenticated: false });
  };

  const updateUser = (updatedUser: User) => {
    setAuthState({ user: updatedUser, isAuthenticated: true });
  };

  return {
    ...authState,
    login,
    register,
    logout,
    updateUser
  };
};