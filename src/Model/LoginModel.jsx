// login.js
import { useState, useEffect } from 'react';

const useLoginModel = () => {
  const [loginData, setLoginData] = useState(() => {
    const savedLoginData = localStorage.getItem('loginData');
    return savedLoginData ? JSON.parse(savedLoginData) : { username: '', password: '', message: '' };
  });

  useEffect(() => {
    localStorage.setItem('loginData', JSON.stringify(loginData));
  }, [loginData]);

  return {
    loginData,
    setLoginData,
  };
};

export default useLoginModel;
