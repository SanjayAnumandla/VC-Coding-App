import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/privateroute';
import Navigation from './components/navigation';
import Home from './pages/home';
import Login from './pages/login';
import Dashboard from './pages/dashboard';

// CSS Imports (verified working paths)
import './styles/base.css';
import './styles/variables.css';

function App() {
  return (
    <BrowserRouter>
    <Navigation />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Route */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;