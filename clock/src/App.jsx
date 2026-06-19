import React, { useState } from 'react';
import Clock from './components/Clock';
import './App.css';

function App() {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`app ${theme}`}>
      <div className="theme-toggle">
        <button onClick={toggleTheme} className="toggle-btn">
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
      <Clock />
    </div>
  );
}

export default App;
