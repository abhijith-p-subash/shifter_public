import { useNavigate } from "react-router-dom";

import { Card } from "flowbite-react";

import { FaHouse } from "react-icons/fa6";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { LuPackageOpen } from "react-icons/lu";
import { FaTruckLoading, FaTruckMoving, FaWarehouse } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* FRIST SECTION */}
      <div className="relative w-full min-h-screen flex items-center justify-center">
        {/* Background Image with Fade to White */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('src/assets/img/couple-sorting-carton-boxes.webp')",
          }}
        >
          {/* Blue Transparent Overlay */}
          <div className="absolute inset-0 bg-brightBlue-900 bg-opacity-50"></div>

          {/* White fade at the bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-darkBlue-700"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col lg:flex-row justify-center items-center h-full container mx-auto p-4">
          {/* Left Side Content */}
          <div className="lg:w-1/2 p-8">
            {/* Header Section */}
            <div className=" mb-8">
              {/* <div className="hover:cursor-pointer inline-block">
                <h1 className="text-5xl md:text-8xl font-bold text-white ">
                  <span>#</span>
                  <span>SHIFT</span>
                </h1>
              </div> */}
              <div
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
              </div>

              <div className="text-white text-lg md:text-xl mt-4">
                <p>Shift Anything, Shift Anywhere</p>
                <p>We are here to make your relocation stress-free</p>
              </div>
            </div>

            {/* Feature Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Feature 1 */}
              <div className="bg-white rounded-lg p-6 flex flex-col justify-between h-full shadow-md">
                <h1 className="text-xl font-bold bg-gradient-to-r from-darkBlue-500 to-brightBlue-500 inline-block text-transparent bg-clip-text">
                  24x7 Availability
                </h1>
                <p className="mt-4 text-gray-600">
                  We are available around the clock to assist with your
                  house-shifting needs, no matter the time or day. Our team is
                  always ready to help you move with ease.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-lg p-6 flex flex-col justify-between h-full shadow-md">
                <h1 className="text-xl font-bold bg-gradient-to-r from-brightBlue-500 via-darkBlue-500 to-brightBlue-500 inline-block text-transparent bg-clip-text">
                  Affordable Rates
                </h1>
                <p className="mt-4 text-gray-600">
                  We offer competitive pricing to ensure our services fit within
                  your budget. Quality moving services shouldn’t break the bank.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-lg p-6 flex flex-col justify-between h-full shadow-md md:col-span-2">
                <h1 className="text-xl font-bold bg-gradient-to-r from-softYellow-500 via-darkBlue-500 to-brightBlue-500 inline-block text-transparent bg-clip-text">
                  Quick Delivery Services
                </h1>
                <p className="mt-4 text-gray-600">
                  Our efficient team ensures that your belongings are packed,
                  transported, and delivered quickly without compromising on
                  safety.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side Content */}
          <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              Simplifying House Shifting
            </h1>
            <p className="mt-4 text-lg text-white max-w-lg">
              Moving to a new home is stressful, but it doesn’t have to be.
              We’re here to make the experience seamless and worry-free with our
              professional house shifting service.
            </p>
            <p className="mt-4 text-lg text-white max-w-lg">
              From packing your items with care to delivering them safely, we
              ensure your move is smooth and hassle-free. We’re committed to
              handling every aspect of your relocation with professionalism and
              respect for your belongings.
            </p>
            <button
              className="mt-8 px-6 py-3 bg-softYellow-500 text-white font-bold rounded-full hover:bg-softYellow-700 transition duration-300"
              onClick={() => navigate("/get-price")}
            >
              Get Prices
            </button>
          </div>
        </div>
      </div>
      {/* SECTION-02 */}
      <div className="w-full h-full p-4 container mx-auto my-10 ">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">
            How Shifter Makes Moving Easy
          </h1>
          <p>
            At Shifter, we’ve reimagined the moving experience to make it
            smooth, affordable, and stress-free. Our simple, streamlined process
            ensures that your move is not only easy but also budget-friendly.
            Let us take the hassle out of your relocation every step of the way!
          </p>
        </div>
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="max-w-sm group relative overflow-hidden">
            <div className="absolute inset-0 bg-darkBlue-500 transition-all duration-500 ease-in-out transform translate-y-full group-hover:translate-y-0 z-0"></div>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white inline-block group-hover:text-softYellow-500 transition-colors duration-300 z-10">
              1. Tell Us Your Moving Needs
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400 z-10 group-hover:text-white">
              Let us know your specific shifting needs whether it’s moving a few
              items or an entire home. We’re here to assist you!
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
              Choose a convenient date and time for your move. Once confirmed,
              we’ll take care of the rest.
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
      </div>
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
              <img src="src/assets/delivery_truck.svg" alt="" />
            </div>
            <div>
              <p>
                Make your house shifting experience effortless by choosing the
                right professionals. From delicate artwork and furniture to your
                everyday essentials, every item in your home deserves careful
                handling and damage-free transportation. With today’s fast-paced
                lives, delays can disrupt your schedule, making an efficient
                move essential.
              </p>
              <br />
              <p>
                {" "}
                At Shifter, our skilled team, modern equipment, and a long list
                of happy clients speak for themselves. We are your reliable
                house shifting partner across Kerala, committed to delivering a
                seamless, on-time, and stress-free moving experience.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* SECTION-04 */}
      <div className="w-full h-full py-10 container mx-auto px-4">
        <div className=" mb-8">
          <h1 className="text-3xl text-center font-bold mb-4">
            Shifter's Relocation Services Include
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
          <Card className="max-w-sm" horizontal>
            <div className="flex flex-col justify-center items-center gap-2 text-brightBlue-500">
              <FaHouse className="text-center text-5xl" />
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Home Shifting
              </h5>
            </div>
            <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
              Safe and efficient transportation of all your household items,
              from furniture to fragile belongings.
            </p>
          </Card>

          <Card className="max-w-sm" horizontal>
            <div className="flex flex-col justify-center items-center gap-2 text-brightBlue-500">
              <HiBuildingOffice2 className="text-center text-5xl" />
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Office Relocation
              </h5>
            </div>
            <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
              Hassle-free office moves, ensuring minimal downtime and smooth
              transitions.
            </p>
          </Card>

          <Card className="max-w-sm" horizontal>
            <div className="flex flex-col justify-center items-center gap-2 text-brightBlue-500">
              <LuPackageOpen className="text-center text-5xl" />
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Packing and Unpacking
              </h5>
            </div>
            <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
              Professional packing services to secure your items and organized
              unpacking at your new location.
            </p>
          </Card>

          <Card className="max-w-sm" horizontal>
            <div className="flex flex-col justify-center items-center gap-2 text-brightBlue-500">
              <FaTruckLoading className="text-center text-5xl" />
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Loading and Unloading
              </h5>
            </div>
            <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
              Trained staff handle the heavy lifting with care, ensuring no
              damage during transit.
            </p>
          </Card>
          <Card className="max-w-sm" horizontal>
            <div className="flex flex-col justify-center items-center gap-2 text-brightBlue-500">
              <FaTruckMoving className="text-center text-5xl" />
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Vehicle Transportation
              </h5>
            </div>
            <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
              Safe and reliable transport for your car or bike, no matter the
              distance.
            </p>
          </Card>

          <Card className="max-w-sm" horizontal>
            <div className="flex flex-col justify-center items-center gap-2 text-brightBlue-500">
              <FaWarehouse className="text-center text-5xl" />
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Storage Solutions
              </h5>
            </div>
            <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
              Short or long-term storage options in secure, monitored facilities
              for your belongings.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
