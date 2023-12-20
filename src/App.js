import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/" element={<Navigate to="/login" />} /> {/* Redirige de la ruta raíz a /login */}
        {/* Aquí puedes agregar más rutas si lo necesitas */}
      </Routes>
    </Router>
  );
};

export default App;