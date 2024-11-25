/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "flowbite-react";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../core/firebase/firebase.config";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import DOMPurify from "dompurify";
import { tailChase } from "ldrs";
import MetaTags from "../../components/MetaTags";
tailChase.register();

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

// Validation schema using Zod
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
  currentFloor: z.string().min(1, "Current floor is required"),
  serviceLiftFrom: z.enum(["Available", "Not Available"]),
  destinationFloor: z.string().min(1, "Destination floor is required"),
  serviceLiftTo: z.enum(["Available", "Not Available"]),
  propertyType: z.enum([
    "1BHK",
    "2BHK",
    "3BHK",
    "3+BHK",
    "Deluxe Villa",
    "Vehicle",
    "Others",
  ]),
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

const Shifter: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const minDate = moment().add(3, "days").format("YYYY-MM-DD");
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const pageData = {
    title: "House Shifting Details - Transparent Pricing & Reliable Movers",
    description:
      "Learn more about the house shifting process, our services, and how we make your move stress-free and easy. Transparent pricing and professional movers ensure a seamless experience.",
    imageUrl: "/assets/img/couple-sorting-carton-boxes.webp", // Ensure the image is in the public folder
    url: window.location.href,
    keywords: "house shifting, moving process, reliable movers, transparent pricing, stress-free moving, professional movers",
    hashtags: "#HouseShifting #ReliableMovers #MovingDetails #StressFreeMove #TransparentPricing",
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
      currentFloor: DOMPurify.sanitize(data.currentFloor),
      serviceLiftFrom: DOMPurify.sanitize(data.serviceLiftFrom),
      destinationFloor: DOMPurify.sanitize(data.destinationFloor),
      serviceLiftTo: DOMPurify.sanitize(data.serviceLiftTo),
      propertyType: DOMPurify.sanitize(data.propertyType),
      created_at: moment().toISOString(), // Current timestamp for created_at
      updated_at: moment().toISOString(), // Current timestamp for updated_at
      status: "pending", // Default status
    };

    try {
      setLoading(true);
      const docRef = await addDoc(
        collection(db, "shifterRequests"),
        sanitizedData
      );
      console.log("Document written with ID: ", docRef.id);
      toast.success("We will get back to you soon 👍",  );
      reset();
      navigate("/home");
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("An error occurred while submitting the form.", {
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  }, 500);

  const arr: string[] = [
    "Ground",
    ...Array.from({ length: 120 }, (_, i) => (i + 1).toString()),
  ];

  return (
   <>
    <MetaTags {...pageData} />
    <div className="relative overflow-x-hidden">
      {/* Blurry Animated Background Shapes */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-darkBlue-500 opacity-50 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-softYellow-500 opacity-50 blur-3xl rounded-full animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-brightBlue-500 opacity-40 blur-2xl rounded-full animate-pulse-fast"></div>
      </div>
      <div className="container mx-auto p-4 my-10 mt-20">
        <h1 className="text-3xl mt-10 font-bold text-center mb-8 text-darkBlue-500">
          House Shifting Details
        </h1>
        <div className="">
          {/* ERROR SECTION */}
          <div>
            {Object.keys(errors).length > 0 &&
              Object.entries(errors).map(([field, error]) => (
                <Alert
                  className="mb-2"
                  color="failure"
                  icon={HiInformationCircle}
                  key={field}
                >
                  {error.message}
                </Alert>
              ))}
          </div>
          {/* <div>
          <img src="src/assets/best_place_re.svg" alt="Relocation" />
        </div> */}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-lg lg:text-xl"
          >
            <div className="md:flex md:flex-wrap items-center gap-2 my-10 shadow-lg p-10 rounded-lg bg-white">
              <div className="mt-5 md:mt-0">
                <span className="hidden md:inline">My name is</span>
                <span className="inline md:hidden">Name</span>
              </div>

              <div className="">
                <input
                  id="name"
                  type="text"
                  className="border-t-0 border-r-0 border-l-0 outline-none focus:outline-none focus:ring-0 m-0 pl-0 w-full placeholder:text-gray-300"
                  placeholder="Enter your name"
                  {...register("name")}
                  color={errors.name ? "failure" : "primary"}
                  disabled={loading}
                />
              </div>
              <div className="mt-5 md:mt-0">
                <span className="hidden md:inline">my phone number is</span>
                <span className="inline md:hidden">Phone Number</span>
              </div>
              <div>
                <input
                  id="phone"
                  type="tel"
                  className="border-t-0 border-r-0 border-l-0 outline-none focus:outline-none focus:ring-0 m-0 pl-0 w-full placeholder:text-gray-300"
                  placeholder="Enter your phone number"
                  {...register("phone")}
                  color={errors.phone ? "failure" : "primary"}
                  disabled={loading}
                />
              </div>
              <div className="mt-5 md:mt-0">
                <span className="hidden md:inline">and my email is</span>
                <span className="inline md:hidden">Email</span>
              </div>
              <div>
                <input
                  id="email"
                  type="email"
                  className="border-t-0 border-r-0 border-l-0 outline-none focus:outline-none focus:ring-0 m-0 pl-0 w-full placeholder:text-gray-300"
                  placeholder="Enter your email"
                  {...register("email")}
                  color={errors.email ? "failure" : "primary"}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="relative my-10">
              <hr className="border-t-2 border-dashed border-gray-300" />
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-white px-4 -mt-3">
                <span className="text-gray-500 text-sm font-semibold">
                  Shifting Details
                </span>
              </div>
            </div>

            <div className="md:flex md:flex-wrap   items-center gap-2 shadow-lg mb-10 rounded-lg p-10 bg-white">
              <div className="mt-5 md:mt-0">I am shifting my</div>

              <div>
                <select
                  {...register("propertyType")}
                  className="border-t-0 border-r-0 border-l-0 outline-none focus:outline-none focus:ring-0 w-full pl-1"
                  disabled={loading}
                >
                  <option value="1BHK">1BHK</option>
                  <option value="2BHK">2BHK</option>
                  <option value="3BHK">3BHK</option>
                  <option value="3+BHK">3+BHK</option>
                  <option value="Deluxe Villa">Deluxe Villa</option>
                  <option value="Vehicle">Vehicle</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div className="mt-5 md:mt-0">from</div>
              <div>
                <input
                  type="text"
                  className="border-t-0 border-r-0 border-l-0 outline-none focus:outline-none focus:ring-0 m-0 pl-0 w-full placeholder:text-gray-300"
                  placeholder="Starting location"
                  {...register("locationFrom")}
                  color={errors.locationFrom ? "failure" : "primary"}
                  disabled={loading}
                />
              </div>
              <div className="mt-5 md:mt-0">to</div>
              <div>
                <input
                  type="text"
                  className="border-t-0 border-r-0 border-l-0 outline-none focus:outline-none focus:ring-0 m-0 pl-0 w-full placeholder:text-gray-300"
                  placeholder="Destination location"
                  {...register("locationTo")}
                  color={errors.locationTo ? "failure" : "primary"}
                  disabled={loading}
                />
              </div>
              <div className="mt-5 md:mt-0">on</div>
              <div>
                <input
                  type="date"
                  className="border-t-0 border-r-0 border-l-0 outline-none focus:outline-none focus:ring-0 m-0 pl-0 w-full placeholder:text-gray-300"
                  {...register("date")}
                  color={errors.date ? "failure" : "primary"}
                  disabled={loading}
                  min={minDate}
                />
              </div>
            </div>

            <div className="md:flex md:flex-wrap items-center gap-2 shadow-lg mb-10 rounded-lg p-10 bg-white">
              <div className="mt-5 md:mt-0">I currently live on</div>
              <div>
                <select
                  {...register("currentFloor")}
                  className="border-t-0 border-r-0 border-l-0 outline-none focus:outline-none focus:ring-0 w-full pl-1"
                  disabled={loading}
                >
                  {arr.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-5 md:mt-0">with service lift</div>
              <div>
                <select
                  {...register("serviceLiftFrom")}
                  className="border-t-0 border-r-0 border-l-0 outline-none focus:outline-none focus:ring-0 w-full pl-1"
                  disabled={loading}
                >
                  <option value="Available">Available</option>
                  <option value="Not Available">Not Available</option>
                </select>
              </div>
              <div className="mt-5 md:mt-0">for shifting. I'm moving to</div>

              <div>
                <select
                  {...register("destinationFloor")}
                  className="border-t-0 border-r-0 border-l-0 outline-none focus:outline-none focus:ring-0 w-full pl-1"
                  disabled={loading}
                >
                  {arr.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-5 md:mt-0">floor with service lift</div>
              <div>
                <select
                  {...register("serviceLiftTo")}
                  className="border-t-0 border-r-0 border-l-0 outline-none focus:outline-none focus:ring-0 w-full pl-1"
                  disabled={loading}
                >
                  <option value="Available">Available</option>
                  <option value="Not Available">Not Available</option>
                </select>
              </div>
              <div>for shifting.</div>
            </div>

            <div className="mb-6">
              <ReCAPTCHA
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={handleCaptchaChange}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              color="primary"
              gradientDuoTone="purpleToBlue"
              size="xl"
              disabled={loading}
              className="w-28"
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
      </div>
    </div>
   </>
  );
};

export default Shifter;
