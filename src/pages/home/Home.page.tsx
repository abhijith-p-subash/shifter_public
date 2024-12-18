/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";

import { Card } from "flowbite-react";
import { motion } from "framer-motion";
import { FaHouse } from "react-icons/fa6";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { LuPackageOpen } from "react-icons/lu";
import { FaTruckLoading, FaTruckMoving, FaWarehouse } from "react-icons/fa";
import MetaTags from "../../components/MetaTags";
import { useLoader } from "../../core/context/LoaderContext";
import { useEffect } from "react";
import coupleSortingCartonBoxes from "../../assets/img/couple-sorting-carton-boxes.webp";
import deliveryTruck from "../../assets/delivery_truck.svg";

const Home = () => {
  const navigate = useNavigate();
  const { hideLoader, showLoader } = useLoader();

  const pageData = {
    title: "House Shifting Services - Get an Instant Moving Quote",
    description:
      "Need help with moving? Get an instant quote for your house shifting with transparent pricing and reliable service.",
    imageUrl: '/assets/img/couple-sorting-carton-boxes.webp', // Replace with the correct image URL (use absolute path)
    url: window.location.href,
    keywords:
      "house shifting, moving services, affordable movers, transparent pricing, relocation services, home moving quote, professional movers",
    hashtags:
      "#HouseShifting, #MovingServices, #AffordableMovers, #Relocation, #PriceEstimate, #MovingQuotes",
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const backgroundImages = [
    coupleSortingCartonBoxes,
    deliveryTruck,
  ];

  // Function to preload images
  const preloadImages = (imageUrls: any[]) => {
    return Promise.all(
      imageUrls.map(
        (url) =>
          new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;

            // Resolve when the image is loaded
            img.onload = () => resolve(url);

            // Reject if an error occurs
            img.onerror = () =>
              reject(new Error(`Failed to load image: ${url}`));
          })
      )
    );
  };

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  };

  // Button Hover Animation
  const buttonHover = {
    hover: { scale: 1.05, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)" },
    tap: { scale: 0.95 },
  };

  useEffect(() => {
    showLoader(); // Display the loader when the component mounts

    // Preload all images
    // preloadImages(backgroundImages)
    //   .then(() => {
    //     console.log("All images loaded successfully!");
    //     hideLoader(); // Hide the loader when images are loaded
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     hideLoader(); // Hide the loader even if some images fail to load
    //   });

    try {
      preloadImages(backgroundImages);
      console.log("All images loaded successfully!");
      hideLoader();
      console.log("All images loaded successfully! loader hidden");
    } catch (error) {
      console.error(error);
      hideLoader();
      console.log("All images loaded failed loader hidden");
    }
  }, [backgroundImages, hideLoader, showLoader]); // Dependency array includes the image URLs to handle dynamic changes

  return (
    <>
      <MetaTags {...pageData} />
      <motion.div initial="hidden" animate="visible">
        <div>
          {/* FRIST SECTION */}
          <div className="relative w-full min-h-screen flex items-center justify-center ">
            {/* Background Image with Fade to White */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  `url(${coupleSortingCartonBoxes})`,
              }}
            >
              {/* Blue Transparent Overlay */}
              <div className="absolute inset-0 bg-brightBlue-900 bg-opacity-50"></div>

              {/* White fade at the bottom */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-darkBlue-700"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col lg:flex-row justify-center items-center h-full container mx-auto p-4 mt-20">
              {/* Left Side Content */}
              <motion.div
                variants={staggerContainer}
                className="lg:w-1/2 p-8"
                initial="hidden"
                animate="visible"
              >
                {/* Header Section */}
                <motion.div variants={fadeInUp} className=" mb-8">
                  <motion.div
                    className="hover:cursor-pointer inline-block group"
                    onClick={() => navigate("/help-me-to-shift")}
                  >
                    <h1 className="text-5xl md:text-8xl font-bold ">
                      <span className="group-hover:text-white text-softYellow-500 transition-colors duration-300">
                        #
                      </span>
                      <span className="group-hover:text-softYellow-500 text-white transition-colors duration-300">
                        SHIFT
                      </span>
                    </h1>
                  </motion.div>

                  <motion.div
                    className="text-white text-lg md:text-xl mt-4"
                    variants={fadeIn}
                  >
                    <p className="text-white">Shift Anything, Shift Anywhere</p>
                    <p className="text-white">
                      We are here to make your relocation stress-free
                    </p>
                  </motion.div>
                </motion.div>

                {/* Feature Boxes */}
                <motion.div
                  variants={staggerContainer}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {/* Feature 1 */}
                  <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    className="bg-white rounded-lg p-6 flex flex-col justify-between h-full shadow-md"
                  >
                    <h1 className="text-xl font-bold bg-gradient-to-r from-darkBlue-500 to-brightBlue-500 inline-block text-transparent bg-clip-text">
                      24x7 Availability
                    </h1>
                    <p className="mt-4 text-gray-600">
                      We are available around the clock to assist with your
                      house-shifting needs, no matter the time or day. Our team
                      is always ready to help you move with ease.
                    </p>
                  </motion.div>

                  {/* Feature 2 */}
                  <motion.div
                    variants={fadeInUp}
                    className="bg-white rounded-lg p-6 flex flex-col justify-between h-full shadow-md"
                  >
                    <h1 className="text-xl font-bold bg-gradient-to-r from-brightBlue-500 via-darkBlue-500 to-brightBlue-500 inline-block text-transparent bg-clip-text">
                      Affordable Rates
                    </h1>
                    <p className="mt-4 text-gray-600">
                      We offer competitive pricing to ensure our services fit
                      within your budget. Quality moving services shouldn’t
                      break the bank.
                    </p>
                  </motion.div>

                  {/* Feature 3 */}
                  <motion.div
                    variants={fadeInUp}
                    className="bg-white rounded-lg p-6 flex flex-col justify-between h-full shadow-md md:col-span-2"
                  >
                    <h1 className="text-xl font-bold bg-gradient-to-r from-softYellow-500 via-darkBlue-500 to-brightBlue-500 inline-block text-transparent bg-clip-text">
                      Quick Delivery Services
                    </h1>
                    <p className="mt-4 text-gray-600">
                      Our efficient team ensures that your belongings are
                      packed, transported, and delivered quickly without
                      compromising on safety.
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Right Side Content */}
              <motion.div
                variants={fadeInUp}
                className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0"
              >
                <h1 className="text-4xl font-bold text-white md:text-5xl">
                  Simplifying House Shifting
                </h1>
                <p className="mt-4 text-lg text-white max-w-lg">
                  Moving to a new home is stressful, but it doesn’t have to be.
                  We’re here to make the experience seamless and worry-free with
                  our professional house shifting service.
                </p>
                <p className="mt-4 text-lg text-white max-w-lg">
                  From packing your items with care to delivering them safely,
                  we ensure your move is smooth and hassle-free. We’re committed
                  to handling every aspect of your relocation with
                  professionalism and respect for your belongings.
                </p>
                {/* <button
            className="mt-8 px-6 py-3 bg-softYellow-500 text-white font-bold rounded-full hover:bg-softYellow-700 transition duration-300"
            onClick={() => navigate("/get-price")}
          >
            Get Price
          </button> */}
                <motion.div
                  variants={fadeInUp}
                  className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0"
                >
                  <motion.button
                    variants={buttonHover}
                    whileHover="hover"
                    whileTap="tap"
                    className="mt-8 px-6 py-3 bg-gradient-to-r from-softYellow-500 to-brightBlue-500 text-white font-bold rounded-full shadow-lg transition-all duration-300"
                    onClick={() => navigate("/get-price")}
                  >
                    Get Price
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </div>
          {/* SECTION-02 */}
          <motion.div
            variants={staggerContainer}
            className="w-full h-full p-4 container mx-auto my-10 "
          >
            <motion.div variants={fadeInUp} className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4">
                How Shifter Makes Moving Easy
              </h1>
              <p>
                At Shifter, we’ve reimagined the moving experience to make it
                smooth, affordable, and stress-free. Our simple, streamlined
                process ensures that your move is not only easy but also
                budget-friendly. Let us take the hassle out of your relocation
                every step of the way!
              </p>
            </motion.div>
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="max-w-sm group relative overflow-hidden">
                <div className="absolute inset-0 bg-darkBlue-500 transition-all duration-500 ease-in-out transform translate-y-full group-hover:translate-y-0 z-0"></div>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white inline-block group-hover:text-softYellow-500 transition-colors duration-300 z-10">
                  1. Tell Us Your Moving Needs
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400 z-10 group-hover:text-white">
                  Let us know your specific shifting needs whether it’s moving a
                  few items or an entire home. We’re here to assist you!
                </p>
              </Card>

              <Card className="max-w-sm group relative overflow-hidden">
                <div className="absolute inset-0 bg-darkBlue-500 transition-all duration-500 ease-in-out transform translate-y-full group-hover:translate-y-0 z-0"></div>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white inline-block group-hover:text-softYellow-500 transition-colors duration-300 z-10">
                  2. Get Your Instant, Free Quote
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400 z-10 group-hover:text-white">
                  Receive an immediate, no-obligation quote based on your
                  requirements. Transparent pricing with no hidden costs.
                </p>
              </Card>

              <Card className="max-w-sm group relative overflow-hidden">
                <div className="absolute inset-0 bg-darkBlue-500 transition-all duration-500 ease-in-out transform translate-y-full group-hover:translate-y-0 z-0"></div>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white inline-block group-hover:text-softYellow-500 transition-colors duration-300 z-10">
                  3. Pick Your Moving Date
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400 z-10 group-hover:text-white">
                  Choose a convenient date and time for your move. Once
                  confirmed, we’ll take care of the rest.
                </p>
              </Card>

              <Card className="max-w-sm group relative overflow-hidden">
                <div className="absolute inset-0 bg-darkBlue-500 transition-all duration-500 ease-in-out transform translate-y-full group-hover:translate-y-0 z-0"></div>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white inline-block group-hover:text-softYellow-500 transition-colors duration-300 z-10">
                  4. We Take Care of the Rest
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400 z-10 group-hover:text-white">
                  Relax as our professional team handles everything, ensuring a
                  seamless and worry-free move.
                </p>
              </Card>
            </div>
          </motion.div>
          {/* SECTION-03 */}
          <div className="bg-softYellow-500 text-darkBlue-900">
            <div className="w-full h-full py-10 container mx-auto px-4">
              <div className=" mb-8">
                <h1 className="text-3xl text-center font-bold mb-4">
                  Choose Shifter - Trusted Shifting Experts Across Kerala
                </h1>
              </div>
              <div className="grid grid-cols-1 md;grid-cols-2 lg:grid-cols-2  gap-4">
                <div>
                  <img src={deliveryTruck} alt="" />
                </div>
                <div>
                  <p className="text-gray-900">
                    Make your house shifting experience effortless by choosing
                    the right professionals. From delicate artwork and furniture
                    to your everyday essentials, every item in your home
                    deserves careful handling and damage-free transportation.
                    With today’s fast-paced lives, delays can disrupt your
                    schedule, making an efficient move essential.
                  </p>
                  <br />
                  <p className="text-gray-900">
                    {" "}
                    At Shifter, our skilled team, modern equipment, and a long
                    list of happy clients speak for themselves. We are your
                    reliable house shifting partner across Kerala, committed to
                    delivering a seamless, on-time, and stress-free moving
                    experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* SECTION-04 */}

          <div className="w-full h-full py-10 container mx-auto px-4">
            <div className="mb-8">
              <h1 className="text-3xl text-center font-bold mb-4">
                Shifter's Relocation Services Include
              </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Card Components */}

              <Card
                className="max-w-sm hover:shadow-lg transform transition-all duration-300 group relative overflow-hidden"
                horizontal
              >
                <div className="flex flex-col justify-center items-center gap-2 text-brightBlue-500 group-hover:text-softYellow-500">
                  <FaHouse className="text-5xl transform group-hover:rotate-60 transition-transform duration-500  group-hover:rotate-12" />
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Home Shifting
                  </h5>
                </div>
                <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
                  Safe and efficient transportation of all your household items,
                  from furniture to fragile belongings.
                </p>
              </Card>

              <Card
                className="max-w-sm hover:shadow-lg transform transition-all duration-300 group"
                horizontal
              >
                <div className="flex flex-col justify-center items-center gap-2 text-brightBlue-500 group-hover:text-softYellow-500">
                  <HiBuildingOffice2 className="text-5xl transform group-hover:rotate-60 transition-transform duration-500  group-hover:rotate-12" />
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Office Relocation
                  </h5>
                </div>
                <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
                  Hassle-free office moves, ensuring minimal downtime and smooth
                  transitions.
                </p>
              </Card>

              <Card
                className="max-w-sm hover:shadow-lg transform transition-all duration-300 group"
                horizontal
              >
                <div className="flex flex-col justify-center items-center gap-2 text-brightBlue-500 group-hover:text-softYellow-500">
                  <LuPackageOpen className="text-5xl transform group-hover:rotate-60 transition-transform duration-500  group-hover:rotate-12" />
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Packing and Unpacking
                  </h5>
                </div>
                <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
                  Professional packing services to secure your items and
                  organized unpacking at your new location.
                </p>
              </Card>

              <Card
                className="max-w-sm hover:shadow-lg transform transition-all duration-300 group"
                horizontal
              >
                <div className="flex flex-col justify-center items-center gap-2 text-brightBlue-500 group-hover:text-softYellow-500">
                  <FaTruckLoading className="text-5xl transform group-hover:rotate-60 transition-transform duration-500  group-hover:rotate-12" />
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Loading and Unloading
                  </h5>
                </div>
                <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
                  Trained staff handle the heavy lifting with care, ensuring no
                  damage during transit.
                </p>
              </Card>

              <Card
                className="max-w-sm hover:shadow-lg transform transition-all duration-300 group"
                horizontal
              >
                <div className="flex flex-col justify-center items-center gap-2 text-brightBlue-500 group-hover:text-softYellow-500">
                  <FaTruckMoving className="text-5xl transform group-hover:rotate-60 transition-transform duration-500  group-hover:rotate-12" />
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Vehicle Transportation
                  </h5>
                </div>
                <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
                  Safe and reliable transport for your car or bike, no matter
                  the distance.
                </p>
              </Card>

              <Card
                className="max-w-sm hover:shadow-lg transform transition-all duration-300 group"
                horizontal
              >
                <div className="flex flex-col justify-center items-center gap-2 text-brightBlue-500 group-hover:text-softYellow-500">
                  <FaWarehouse className="text-5xl transform group-hover:rotate-60 transition-transform duration-500 group-hover:rotate-12" />
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Storage Solutions
                  </h5>
                </div>
                <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
                  Safe and secure storage options for your belongings,
                  short-term or long-term.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Home;
