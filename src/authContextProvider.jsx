import { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);


const AuthContextProvider = ({ children }) => {

  const [isLogin, setIsLogin] = useState(window.localStorage.getItem('token') || false);
  const navigate = useNavigate();

  const checkIsUsersLogin = useCallback(() => {
    const token = window.localStorage.getItem('token');
    return isLogin || token || false
  }, [isLogin]);

  const signIn = useCallback(
    (token) => {
      window.localStorage.setItem('token', token);
      setIsLogin(true);
      navigate('/products');
    }, [navigate]);

  const logout = useCallback(() => {
    window.localStorage.removeItem('token');
    setIsLogin(false);
    navigate('/');
  }, [navigate]);

  return (
    <AuthContext.Provider value={{signIn, logout, isLogin, checkIsUsersLogin}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
