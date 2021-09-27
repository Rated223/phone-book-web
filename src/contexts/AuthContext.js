import React, { createContext, useState } from 'react';
import { isAuth as defaultValue } from '../utils';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [isAuth, setAuth] = useState(defaultValue());

  return (
    <AuthContext.Provider value={{ isAuth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
