import React, { createContext } from 'react';
import AppRouter from './routers/AppRouter';
import AuthContextProvider from './contexts/AuthContext';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AuthContext = createContext();

function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <AppRouter />
      </div>
    </AuthContextProvider>
  );
}

export default App;
