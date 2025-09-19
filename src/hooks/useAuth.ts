import { useState, useEffect } from 'react';
import { useTokenCookies } from '@/utils/cookie';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const { accessToken, refreshToken, clearTokens } = useTokenCookies();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  useEffect(() => {
    setIsAuthenticated(!!accessToken);
    setIsLoading(false);
  }, [accessToken]);

  const logout = () => {
    clearTokens();
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const checkAuth = () => {
    return !!accessToken;
  };

  return {
    isAuthenticated,
    isLoading,
    accessToken,
    refreshToken,
    logout,
    checkAuth,
  };
};
