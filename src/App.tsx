import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import AuthLayout from './layouts/AuthLayout';
import PublicRoute from './core/routes/PublicRoutes';
import Login from './pages/auth/login/Login.page';
import Signup from './pages/auth/signup/Signup.page';
import ProtectedRoute from './core/routes/ProtectedRoute';
import About from './pages/about/About.page';
import Home from './pages/home/Home.page';


const App: React.FC = () => {
  return (
  
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        {/* Public Routes */}
        <Route element={<PublicRoute><AuthLayout /></PublicRoute>}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute><DefaultLayout /></ProtectedRoute>}>
          <Route path="/about" element={<About />} />
        </Route>

        {/* Default Layout */}
        <Route element={<DefaultLayout />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>

  );
};

export default App;
