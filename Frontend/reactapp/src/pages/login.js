import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login() 
{
  return (
    <div className="page login-page">
      <div className="login-card">
        <div className="login-header">
          <h1>Login</h1>
          <p>Please enter your details</p>
        </div>
        
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className="input-field" />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" className="input-field" />
            <div className="forgot-password">
              <a href="/forgot-password">Forgot password?</a>
            </div>
          </div>
          
          <div className="login-actions">
            <button type="submit" className="btn btn-primary">Sign In</button>
          </div>
        </form>
        
        <div className="divider">OR</div>
        
        <div className="social-login">
          <button className="social-btn">
            <img src="/google-icon.svg" alt="Google" />
          </button>
          <button className="social-btn">
            <img src="/github-icon.svg" alt="GitHub" />
          </button>
        </div>
        
        <div className="signup-link">
          Don't have an account? <a href="/signup">Sign up</a>
        </div>
      </div>
    </div>
  );
}