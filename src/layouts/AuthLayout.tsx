import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <div>
      <h1>Auth Pages</h1>
      <Outlet /> {/* This will render the matched child route */}
    </div>
  );
};

export default AuthLayout;
