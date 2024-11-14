import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <div>
      <Outlet /> {/* This will render the matched child route */}
    </div>
  );
};

export default AuthLayout;
