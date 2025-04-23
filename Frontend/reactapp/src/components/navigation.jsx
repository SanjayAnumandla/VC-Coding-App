import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/navigation.module.css';

const Navigation = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  // Hide/show on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
      
      // Close menu on any scroll
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, isMenuOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Disable scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
    
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isMenuOpen]);

  // Active link styling
  const isActive = (path) => location.pathname === path;

  return (
    <nav 
      className={`${styles.navbar} ${visible ? styles.visible : styles.hidden}`}
      ref={navRef}
    >
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          CodeCollab
        </Link>
        
        {/* Hamburger Button (only shown when menu is closed) */}
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
        
        {/* Navigation Links */}
        <div className={`${styles.links} ${isMenuOpen ? styles.show : ''}`}>
          <Link 
            to="/" 
            className={`${styles.link} ${isActive('/') ? styles.active : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/login" 
            className={`${styles.link} ${isActive('/login') ? styles.active : ''}`}
          >
            Login
          </Link>
          <Link 
            to="/dashboard" 
            className={`${styles.link} ${isActive('/dashboard') ? styles.active : ''}`}
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;