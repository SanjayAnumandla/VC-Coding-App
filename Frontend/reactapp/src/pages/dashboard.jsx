import React, { useState, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/dashboard.module.css';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.dashboardContent}>
        <header className={styles.dashboardHeader}>
          <h1>Welcome, {user ? user.name : 'Guest'}</h1>
          <div className={styles.userMenu} ref={dropdownRef}>
          </div>
        </header>
        
        <main className={styles.mainContent}>
          <h2>Your Dashboard</h2>
          <p>Here you can manage your projects, settings, and more.</p>
          {/* Dashboard content goes here */}
        </main>
      </div>
      
      <footer className={styles.dashboardFooter}>
        <p>&copy; 2023 CodeCollab. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;