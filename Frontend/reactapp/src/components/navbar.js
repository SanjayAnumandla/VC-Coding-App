import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          MyApp
        </Link>
        <div className="links">
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
