import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <Outlet /> {/* This renders child routes (SignUp/Login) */}
    </div>
  );
};

export default AuthLayout;