import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signup';
import Dashboard from './pages/dashboard';
import Realtimeeditor from './pages/realtime';
import useAuth from './hooks/useAuth'; 

// CSS Imports
import './styles/base.css';
import './styles/variables.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Your authentication logic
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/home" replace />} />
      
        
        {/* Public routes with navbar */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/realtime" element={<Realtimeeditor />} />
        </Route>

        {/* Protected routes with navbar */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
          {/* Add other protected routes here */}
        </Route>
        
        {/* Auth routes without navbar */}
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* 404 Catch-all */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;