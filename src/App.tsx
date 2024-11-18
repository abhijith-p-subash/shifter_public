import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import AuthLayout from "./layouts/AuthLayout";
import PublicRoute from "./core/routes/PublicRoutes";
import Login from "./pages/auth/login/Login.page";
import Signup from "./pages/auth/signup/Signup.page";
import About from "./pages/about/About.page";
import Home from "./pages/home/Home.page";
import NotFound from "./pages/notFound/NotFound.page";
import Shifter from "./pages/shiter/Shifter.page";
import GetPrice from "./pages/getPrice/GetPrice.page";
import Loader from "./components/common/Loader";
import ProtectedRoute from "./core/routes/ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboard.page";
import DashboardLayout from "./layouts/DashboardLayout";
import { useLoader } from "./context/LoaderContext";

const App: React.FC = () => {
  // const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const { loading } = useLoader();
  const { hideLoader, showLoader } = useLoader();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    showLoader();
    setTimeout(() => hideLoader(), 1000); // Simulate loading state
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        {/* Redirect root to home */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Public Routes: Apply PublicRoute only for login and signup */}
        <Route
          element={
            <PublicRoute>
              <AuthLayout />
            </PublicRoute>
          }
        >
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Default Layout: Accessible to all users */}
        <Route element={<DefaultLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/help-me-to-shift" element={<Shifter />} />
          <Route path="/get-price" element={<GetPrice />} />
        </Route>

        {/* Protected Routes: Only accessible when authenticated */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
