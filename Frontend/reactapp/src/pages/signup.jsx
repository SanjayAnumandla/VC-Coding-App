import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/signup.module.css';

const SignUp = () => {
  console.log("SignUp component rendering"); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setApiError('');

    try {
      const response = await mockSignUpAPI({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (response.success) {
        localStorage.setItem('authToken', response.token);
        navigate('/dashboard');
      } else {
        setApiError(response.message || 'Sign up failed');
      }
    } catch (error) {
      setApiError('An error occurred. Please try again.');
      console.error('SignUp error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const mockSignUpAPI = (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          success: true, 
          token: 'mock-signup-token-123',
          user: {
            id: 'user123',
            name: userData.name,
            email: userData.email
          }
        });
      }, 3000);
    });
  };

  return (
    <div className={styles.page}>
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingContent}>
            <div className={styles.loadingSpinner}></div>
            <p>Creating your account...</p>
          </div>
        </div>
      )}
      
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Create Your Account</h1>
          <p>Join CodeCollab to start collaborating</p>
        </div>

        {apiError && <div className={styles.apiError}>{apiError}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              className={`${styles.input} ${errors.name ? styles.error : ''}`}
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
          </div>

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
            <div className={styles.passwordInputContainer}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className={`${styles.input} ${errors.password ? styles.error : ''}`}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className={styles.showPasswordButton}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <svg className={styles.eyeIcon} viewBox="0 0 24 24">
                    <path d="M12 9a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0 0 17.64 0 9.821 9.821 0 0 0-17.64 0z"/>
                  </svg>
                ) : (
                  <svg className={styles.eyeIcon} viewBox="0 0 24 24">
                    <path d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3h-.17m-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22 21 20.73 3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7z"/>
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              className={`${styles.input} ${errors.confirmPassword ? styles.error : ''}`}
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className={styles.errorMessage}>{errors.confirmPassword}</span>
            )}
          </div>

          <div className={styles.actions}>
            <button 
              type="submit" 
              className={styles.primaryButton}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className={styles.spinner}></span>
                  Creating Account...
                </>
              ) : (
                'Sign Up'
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

        <div className={styles.loginLink}>
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;