import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import styles from '../styles/login.module.css';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const { login, loading: authLoading, error: authError, setError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Pre-fill email if coming from Get Started button
  useState(() => {
    if (location.state?.fromHome) {
      setFormData(prev => ({ ...prev, email: location.state.email || '' }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Clear error when user types
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
    if (authError) setError(null);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const { email, password } = formData;
    const result = await login(email, password);
    
    if (result.success) {
      navigate(location.state?.from?.pathname || '/dashboard');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Welcome</h1>
          <p>Sign in to continue to CodeCollab</p>
        </div>
        
        {authError && <div className={styles.authError}>{authError}</div>}
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className={`${styles.input} ${errors.email ? styles.error : ''}`}
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className={`${styles.input} ${errors.password ? styles.error : ''}`}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
            <div className={styles.forgotPassword}>
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
          </div>
          
          <div className={styles.actions}>
            <button 
              type="submit" 
              className={styles.primaryButton}
              disabled={authLoading}
            >
              {authLoading ? (
                <>
                  <span className={styles.spinner}></span>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>
        
        <div className={styles.divider}>
          <span>OR</span>
        </div>
        
        <div className={styles.socialAuth}>
          <button type="button" className={styles.socialButton}>
            <img src="/icons/google.svg" alt="Google" />
            Continue with Google
          </button>
          <button type="button" className={styles.socialButton}>
            <img src="/icons/github.svg" alt="GitHub" />
            Continue with GitHub
          </button>
        </div>
        
        <div className={styles.signupLink}>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}