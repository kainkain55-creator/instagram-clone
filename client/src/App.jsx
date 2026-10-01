import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import MessagesPage from './components/MessagesPage';
import PhotoShare from './components/PhotoShare';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/messages" />}
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/messages" />}
        />
        <Route
          path="/messages"
          element={isAuthenticated ? <MessagesPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/photos"
          element={isAuthenticated ? <PhotoShare /> : <Navigate to="/login" />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/messages" /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
