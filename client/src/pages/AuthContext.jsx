// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

// Создаем контекст аутентификации
const AuthContext = createContext();

// Hook для использования контекста аутентификации
export const useAuth = () => useContext(AuthContext);

// Компонент-обертка для предоставления контекста аутентификации
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Функция для аутентификации пользователя
  const signIn = ({ email, password }) => {
    // Здесь можно добавить логику аутентификации, например, запрос к серверу
    // Если аутентификация успешна, устанавливаем текущего пользователя
    setCurrentUser({ email });
  };

  // Функция для выхода пользователя из системы
  const signOut = () => {
    // Здесь можно добавить логику выхода пользователя, например, запрос к серверу
    // Удаляем текущего пользователя
    setCurrentUser(null);
  };

  // Значения контекста аутентификации
  const value = {
    currentUser,
    signIn,
    signOut,
  };

  // Предоставляем контекст аутентификации дочерним компонентам
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
