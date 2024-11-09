import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const DefaultLayout: React.FC = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet /> {/* This will render the matched child route */}
      </main>
    </div>
  );
};

export default DefaultLayout;
