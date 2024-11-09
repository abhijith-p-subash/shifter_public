import { Button } from 'flowbite-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulating authentication
    localStorage.setItem('authToken', 'my-token');
    navigate('/home');
  };

  return (
    <div>
      <h1>Login Page</h1>
      <Button  color="primary" onClick={handleLogin}>Login</Button>
     
    </div>
  );
};

export default Login;
