// login.js
import { useState, useEffect } from 'react';

const useLoginModel = () => {
  const [loginData, setLoginData] = useState(() => {
    const savedLoginData = localStorage.getItem('loginData');
    return savedLoginData ? JSON.parse(savedLoginData) : { username: '', password: '', message: '' };
  });

  useEffect(() => {
    if (loginData) { // Solo guarda en localStorage si loginData no es null
      localStorage.setItem('loginData', JSON.stringify(loginData));
    }
  }, [loginData]);


  return {
    loginData,
    setLoginData,
  };
};

export default useLoginModel;
