// login.js
import { useState } from 'react';

const useLoginModel = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  return {
    loginData,
    setLoginData,
  };
};

export default useLoginModel;
