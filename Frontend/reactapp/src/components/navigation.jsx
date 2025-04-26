import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from '../styles/navigation.module.css';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mock user authentication status
  useEffect(() => {
    // Replace with actual auth check
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setUser({
        name: 'You',
        avatar: 'YO',
        isOnline: true
      });
    }
  }, [location]);

  const handleLogout = () => {
    // Replace with actual logout logic
    localStorage.removeItem('authToken');
    setUser(null);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;
  const isDashboard = location.pathname.startsWith('/dashboard');

  // Return null early for login page after all hooks
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''} ${isDashboard ? styles.dashboardNav : ''}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          CodeCollab
        </Link>
        
        <div className={styles.links}>
          {!user ? (
            <>
              <Link 
                to="/" 
                className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
              >
                Home
              </Link>
              <Link 
                to="/login" 
                className={`${styles.navLink} ${isActive('/login') ? styles.active : ''}`}
              >
                Login
              </Link>
            </>
          ) : (
            <>
              {!isDashboard && (
                <Link 
                  to="/" 
                  className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
                >
                  Home
                </Link>
              )}
              <Link 
                to="/dashboard" 
                className={`${styles.navLink} ${isActive('/dashboard') ? styles.active : ''}`}
              >
                Dashboard
              </Link>
              <Link 
                to="/realtime" 
                className={`${styles.navLink} ${isActive('/realtime') ? styles.active : ''}`}
              >
                Code Editor
              </Link>
            </>
          )}
        </div>
        
        {user && (
          <div className={styles.userSection}>
            <div className={styles.userBadge}>
              <span className={`${styles.userAvatar} ${user.isOnline ? styles.online : ''}`}>
                {user.avatar}
              </span>
              <span className={styles.userName}>{user.name}</span>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;