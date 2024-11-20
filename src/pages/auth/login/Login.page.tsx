/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Label, TextInput, Button, Checkbox } from "flowbite-react";
import { auth } from "../../../core/firebase/firebase";
import MetaTags from "../../../components/MetaTags";
import DOMPurify from "dompurify";
import { toast } from "react-toastify";
import { HiMail, HiLockClosed } from "react-icons/hi";

// Utility: Debounce function for performance optimization
const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

// Zod schema for form validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const pageData = {
  title: "Login",
  description: "Login to access your dashboard and manage your account.",
  imageUrl: "/assets/img/couple-sorting-carton-boxes.webp",
  url: window.location.href,
};

const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: { rememberMe: false },
  });

  // Prefill email from localStorage on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    if (storedEmail) {
      setValue("email", storedEmail);
    }
  }, [setValue]);

  // Login submission handler
  const onSubmit = debounce(async (data: LoginFormInputs) => {
    const { email, password, rememberMe } = data;

    try {
      setLoading(true);
      setError(null);

      // Save or clear email in localStorage based on "Remember Me"
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      // Sanitize user inputs
      const sanitizedEmail = DOMPurify.sanitize(email);
      const sanitizedPassword = DOMPurify.sanitize(password);

      // Authenticate user
      const userCredential = await signInWithEmailAndPassword(
        auth,
        sanitizedEmail,
        sanitizedPassword
      );

      localStorage.setItem("authToken", userCredential.user.refreshToken);

      toast.success("Login successful", { autoClose: 5000 });
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to log in. Please check your credentials.");
      toast.error("Failed to log in. Please check your credentials.", {
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  }, 500);

  return (
    <>
      <MetaTags keywords={""} hashtags={""} {...pageData} />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md mx-4">
          <h2 className="text-3xl font-semibold text-center text-darkBlue-500">
            Login
          </h2>
          {error && <p className="text-red-600 text-center">{error}</p>}

          <form onSubmit={handleSubmit(onSubmit)} noValidate >
            <div className="mb-4">
              <Label htmlFor="email" value="Email" />
              <TextInput
                id="email"
                type="email"
                sizing="lg"
                icon={HiMail}
                placeholder="name@example.com"
                {...register("email")}
                aria-invalid={!!errors.email}
                color={errors.email ? "failure" : ""}
                helperText={errors.email?.message}
                disabled={loading}
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="password" value="Password" />
              <TextInput
                id="password"
                type="password"
                sizing="lg"
                icon={HiLockClosed}
                placeholder="••••••••"
                {...register("password")}
                aria-invalid={!!errors.password}
                color={errors.password ? "failure" : ""}
                helperText={errors.password?.message}
                disabled={loading}
              />
            </div>

            <div className="mb-4 flex items-center">
              <Checkbox
                id="rememberMe"
                {...register("rememberMe")}
                disabled={loading}
              />
              <Label htmlFor="rememberMe" className="ml-2">
                Remember Me
              </Label>
            </div>

            <Button type="submit" size="lg" className="w-full" color="primary">
              {loading ? (
                <span className="flex items-center justify-center">
                  <l-tail-chase size="20" speed="1.75" color="white" />
                  <span className="ml-2">Loading...</span>
                </span>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
