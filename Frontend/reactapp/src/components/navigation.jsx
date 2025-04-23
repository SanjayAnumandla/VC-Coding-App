import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/navigation.module.css';

const Navigation = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);
  const isLoginPage = location.pathname === '/login';

  // Hide/show on scroll (skip on login page)
  useEffect(() => {
    if (isLoginPage) return;
    
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
      
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, isMenuOpen, isLoginPage]);

  // Close menu when clicking outside (skip on login page)
  useEffect(() => {
    if (isLoginPage) return;
    
    const handleClickOutside = (event) => {
      if (isMenuOpen && navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, isLoginPage]);

  // Disable scroll when menu is open (skip on login page)
  useEffect(() => {
    if (isLoginPage) return;
    
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
    
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isMenuOpen, isLoginPage]);

  return (
    <nav 
      className={`${styles.navbar} 
        ${visible && !isLoginPage ? styles.visible : styles.hidden}
        ${isLoginPage ? styles.loginNav : ''}
      `}
      ref={navRef}
    >
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          CodeCollab
        </Link>
        
        {/* Only show hamburger and links if not on login page */}
        {!isLoginPage && (
          <>
            {!isMenuOpen && (
              <button 
                className={styles.hamburger}
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open menu"
              >
                <span className={styles.line}></span>
                <span className={styles.line}></span>
                <span className={styles.line}></span>
              </button>
            )}
            
            <div className={`${styles.links} ${isMenuOpen ? styles.show : ''}`}>
              <Link to="/" className={`${styles.link} ${location.pathname === '/' ? styles.active : ''}`}>
                Home
              </Link>
              <Link to="/login" className={`${styles.link} ${location.pathname === '/login' ? styles.active : ''}`}>
                Login
              </Link>
              <Link to="/dashboard" className={`${styles.link} ${location.pathname === '/dashboard' ? styles.active : ''}`}>
                Dashboard
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;