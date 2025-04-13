import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/privateroute'; // Note: Capitalized component name
import Home from './pages/home';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import '/Users/sanjayanumandla/Desktop/Projects/VC-Coding-App/Frontend/reactapp/src/styles/pages.css'; // Import CSS styles

// Default export (remove curly braces from import in index.js)
function App() 
{
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
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

export default App;  // This is crucial