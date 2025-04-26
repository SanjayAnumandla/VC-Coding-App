import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navigation'; // Adjust path as needed

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Navbar />
      <div className="content">
        <Outlet /> {/* This renders protected routes */}
      </div>
    </div>
  );
};

export default MainLayout;