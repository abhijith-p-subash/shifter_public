/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import moment from "moment";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput, Button, Label } from "flowbite-react";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import DOMPurify from "dompurify";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../core/firebase/firebase.config";

import { tailChase } from "ldrs";
import MetaTags from "../../components/MetaTags";
tailChase.register();

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

// Define validation schema using Zod
const schema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Maximum 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^\d+$/, "Phone number must contain only numbers")
    .min(10, "Enter a valid phone number")
    .max(10, "Enter a valid phone number"),
  locationFrom: z
    .string()
    .min(1, "Starting location is required")
    .max(50, "Maximum 50 characters"),
  locationTo: z
    .string()
    .min(1, "Destination is required")
    .max(50, "Maximum 50 characters"),
  date: z.string().min(1, "Date is required"),
});

type FormData = z.infer<typeof schema>;

const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const GetPrice: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const minDate = moment().format("YYYY-MM-DD");
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const pageData = {
    title: "Get an Instant House Shifting Quote - Quick & Accurate Pricing",
    description:
      "Fill out the form to get an instant price estimate for your house move. No hidden fees, just transparent and affordable pricing.",
    imageUrl: "/assets/img/couple-sorting-carton-boxes.webp", // Ensure the image is in the public folder
    url: window.location.href,
    keywords: "house shifting, moving quote, instant price estimate, affordable pricing, moving services",
    hashtags: "#HouseShifting #MovingQuote #InstantEstimate #AffordablePricing #StressFreeMove",
  };
  

  const handleCaptchaChange = (value: string | null) => {
    if (value) {
      setCaptchaVerified(true);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = debounce(async (data: FormData) => {
    if (!captchaVerified) {
      toast.error("Please verify you are not a robot.");
      return;
    }

    const sanitizedData = {
      name: DOMPurify.sanitize(data.name),
      email: DOMPurify.sanitize(data.email),
      phone: DOMPurify.sanitize(data.phone),
      locationFrom: DOMPurify.sanitize(data.locationFrom),
      locationTo: DOMPurify.sanitize(data.locationTo),
      date: DOMPurify.sanitize(data.date),
      created_at: moment().toISOString(), // Current timestamp for created_at
      updated_at: moment().toISOString(), // Current timestamp for updated_at
      status: "pending", // Default status
    };

    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, "quotes"), sanitizedData);
      console.log("Document written with ID: ", docRef.id);
      toast.success("We will get back to you soon 👍", { autoClose: 5000 });
      reset();
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("An error occurred while submitting the form.", {
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  }, 500);

  return (
    <>
      <MetaTags {...pageData} />
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-r from-primary to-darkBlue-500 py-10 mt-20 ">
      {/* Background animated shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute top-0 left-0 w-full h-full animate-pulse opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#FFCF54"
            fillOpacity="0.6"
            d="M0,256L1440,160L1440,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Background blurry effect */}
      <div className="absolute inset-0 bg-white opacity-40 backdrop-blur-md"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side: Form and Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-darkBlue-500 mb-4">
              Get an Instant Moving Quote
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-md">
              Planning your move? Fill out the form below and get a quick
              estimate for your upcoming shift. It's fast, simple, and
              transparent!
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white p-8 rounded-lg shadow-xl w-full space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
                <div className="col-span-6">
                  <Label htmlFor="name" value="Name" />
                  <TextInput
                    id="name"
                    placeholder="Enter your name"
                    {...register("name")}
                    color={errors.name ? "failure" : "primary"}
                    helperText={errors.name?.message}
                    disabled={loading}
                  />
                </div>

                <div className="col-span-6">
                  <Label htmlFor="email" value="Email" />
                  <TextInput
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                    color={errors.email ? "failure" : "primary"}
                    helperText={errors.email?.message}
                    disabled={loading}
                  />
                </div>

                <div className="col-span-6">
                  <Label htmlFor="phone" value="Phone" />
                  <TextInput
                    id="phone"
                    type="tel"
                    max={10}
                    placeholder="Enter your phone number"
                    {...register("phone")}
                    color={errors.phone ? "failure" : "primary"}
                    helperText={errors.phone?.message}
                    disabled={loading}
                  />
                </div>

                <div className="lg:col-span-2 col-span-6">
                  <Label htmlFor="locationFrom" value="Location From" />
                  <TextInput
                    id="locationFrom"
                    placeholder="Enter starting location"
                    {...register("locationFrom")}
                    color={errors.locationFrom ? "failure" : "primary"}
                    helperText={errors.locationFrom?.message}
                    disabled={loading}
                  />
                </div>

                <div className="lg:col-span-2 col-span-6">
                  <Label htmlFor="locationTo" value="Location To" />
                  <TextInput
                    id="locationTo"
                    placeholder="Enter destination location"
                    {...register("locationTo")}
                    color={errors.locationTo ? "failure" : "primary"}
                    helperText={errors.locationTo?.message}
                    disabled={loading}
                  />
                </div>

                <div className="lg:col-span-2 col-span-6">
                  <Label htmlFor="date" value="Date" />
                  <TextInput
                    id="date"
                    type="date"
                    {...register("date")}
                    color={errors.date ? "failure" : "primary"}
                    helperText={errors.date?.message}
                    min={minDate}
                    disabled={loading}
                  />
                </div>
              </div>
             <div>
             <ReCAPTCHA
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={handleCaptchaChange}
              />
             </div>
              <Button
                type="submit"
                color="primary"
                gradientDuoTone="purpleToBlue" size="lg"
                className="w-full text-white"
                disabled={loading}
              >
                {loading ? (
                  <l-tail-chase
                    size="20"
                    speed="1.75"
                    color="white"
                  ></l-tail-chase>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </div>

          {/* Right Side: Image and Additional Content */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <img
                className="w-full h-auto max-w-md opacity-80"
                src="src/assets/informed_decision.svg"
                alt="Informed Decision"
              />
            </div>
            <h2 className="text-3xl font-bold text-darkBlue-500">
              Stress-Free Moving, Simplified!
            </h2>
            <p className="text-lg text-gray-600 mt-4 max-w-md">
              With our transparent pricing and hassle-free process, your moving
              experience will be seamless and worry-free. Let us take the stress
              off your shoulders!
            </p>

            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-softYellow-500 mb-4">
                Why Choose Us?
              </h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>Fast and accurate pricing estimates</li>
                <li>Professional and experienced movers</li>
                <li>Comprehensive and transparent pricing</li>
                <li>Stress-free moving experience</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default GetPrice;
