import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Label, TextInput, Button, Checkbox } from 'flowbite-react';
import { auth } from '../../../core/firebase/firebase';

// Zod schema for form validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // React Hook Form setup with Zod validation
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    console.log(data);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      
      // Handle successful login
      console.log('Login successful');
      alert('Login successful');
      
      // Check if "Remember Me" is selected and store token accordingly
      if (data.rememberMe) {
        // Store in localStorage to persist even after closing the browser
        localStorage.setItem('authToken', userCredential.user.refreshToken);
      } else {
        // Store in sessionStorage to persist only during the session
        sessionStorage.setItem('authToken', userCredential.user.refreshToken);
      }
      navigate("/dashboard")
    } catch (err) {
      console.error("ERROR", err);
      setError('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold text-center">Login</h2>
        {error && <p className="text-red-600">{error}</p>}
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Label htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              placeholder="name@example.com"
              {...register('email')}
              color={errors.email ? 'failure' : ''}
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <Label htmlFor="password" value="Password" />
            <TextInput
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
              color={errors.password ? 'failure' : ''}
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div className="mb-4 flex items-center">
            <Checkbox id="rememberMe" {...register('rememberMe')} />
            <Label htmlFor="rememberMe" className="ml-2">Remember Me</Label>
          </div>

          <Button type="submit" className="w-full" color='primary'>
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
