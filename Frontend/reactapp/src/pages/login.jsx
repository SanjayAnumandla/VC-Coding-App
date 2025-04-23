import React from 'react';
import { Link } from 'react-router-dom';
import styles from 'styles/login.module.css';

export default function Login() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Welcome Back</h1>
          <p>Sign in to continue to CodeCollab</p>
        </div>
        
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              className={styles.input} 
              placeholder="you@example.com" 
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              className={styles.input} 
              placeholder="••••••••" 
            />
            <div className={styles.forgotPassword}>
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
          </div>
          
          <div className={styles.actions}>
            <button type="submit" className={styles.primaryButton}>
              Sign In
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