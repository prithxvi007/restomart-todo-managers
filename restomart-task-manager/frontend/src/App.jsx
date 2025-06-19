import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';
import './index.css';

const App = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <Router>
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/add">Add Task</Link>
        </div>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/edit/:id" element={<EditTask />} />
      </Routes>
    </Router>
  );
};

export default App;
