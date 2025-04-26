import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from '../styles/navigation.module.css';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check if user is authenticated (replace with your actual auth check)
    const authToken = localStorage.getItem('authToken');
    setUser(authToken ? { name: 'User', avatar: 'U', isOnline: true } : null);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  // Don't render on login page
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoPrimary}>Code</span>
          <span className={styles.logoSecondary}>Collab</span>
        </Link>
        
        <div className={styles.links}>
          {user ? (
            // Authenticated user links
            <>
              <Link to="/dashboard" className={`${styles.navLink} ${isActive('/dashboard') ? styles.active : ''}`}>
                Dashboard
              </Link>
              <Link to="/editor" className={`${styles.navLink} ${isActive('/editor') ? styles.active : ''}`}>
                Editor
              </Link>
              <Link to="/projects" className={`${styles.navLink} ${isActive('/projects') ? styles.active : ''}`}>
                Projects
              </Link>
              
              <div className={styles.userDropdown} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <div className={styles.userBadge}>
                  <span className={`${styles.userAvatar} ${user.isOnline ? styles.online : ''}`}>
                    {user.avatar}
                  </span>
                  <span className={styles.userName}>{user.name}</span>
                  <span className={styles.dropdownIcon}>{isMenuOpen ? '▲' : '▼'}</span>
                </div>
                
                {isMenuOpen && (
                  <div className={styles.dropdownMenu}>
                    <Link to="/profile" className={styles.dropdownItem} onClick={() => setIsMenuOpen(false)}>
                      Profile
                    </Link>
                    <Link to="/settings" className={styles.dropdownItem} onClick={() => setIsMenuOpen(false)}>
                      Settings
                    </Link>
                    <div className={styles.divider} />
                    <button className={styles.dropdownItem} onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            // Non-authenticated links
            <>
              <Link to="/" className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}>
                Home
              </Link>
              <Link to="/features" className={styles.navLink}>
                Features
              </Link>
              <Link to="/contact" className={styles.navLink}>
                Contact
              </Link>
              <Link to="/login" className={styles.loginButton}>
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;