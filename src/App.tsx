import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import AuthLayout from './layouts/AuthLayout';
import PublicRoute from './core/routes/PublicRoutes';
import Login from './pages/auth/login/Login.page';
import Signup from './pages/auth/signup/Signup.page';

import About from './pages/about/About.page';
import Home from './pages/home/Home.page';
import NotFound from './pages/notFound/NotFound.page';
import Shifter from './pages/shiter/Shifter.page';
import GetPrice from './pages/getPrice/GetPrice.page';
import Loader from './components/common/Loader';



const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  
  return loading ? <Loader/> : (
  
     <> <Routes>
     <Route path="/" element={<Navigate to="/home" />} />
     {/* Public Routes */}
     <Route element={<PublicRoute><AuthLayout /></PublicRoute>}>
       <Route path="/login" element={<Login />} />
       <Route path="/signup" element={<Signup />} />
     </Route>

     {/* Protected Routes */}
     <Route element={<PublicRoute><DefaultLayout /></PublicRoute>}>
       <Route path="/about" element={<About />} />
     </Route>

     {/* Default Layout */}
     <Route element={<PublicRoute><DefaultLayout /></PublicRoute>}>
       <Route path="/home" element={<Home />} />
     </Route>

      {/* Default Layout */}
      <Route element={<PublicRoute><DefaultLayout /></PublicRoute>}>
       <Route path="/help-me-to-shift" element={<Shifter />} />
     </Route>

     {/* Get Price */}
     <Route element={<PublicRoute><DefaultLayout /></PublicRoute>}>
       <Route path="/get-price" element={<GetPrice />} />
     </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
   </Routes></>

  );
};

export default App;
