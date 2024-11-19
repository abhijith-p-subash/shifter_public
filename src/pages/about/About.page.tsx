import MetaTags from "../../components/MetaTags";

const About = () => {
  const pageData = {
    title: "About Us - Reliable House Shifting Services",
    description:
      "Learn more about our house shifting services and how we can help you with a stress-free move.",
    imageUrl: "/assets/img/couple-sorting-carton-boxes.webp", // Ensure the image is in the public folder
    url: window.location.href,
    keywords: "house shifting, moving services, reliable movers, stress-free move, house relocation",
    hashtags: "#HouseShifting #MovingServices #StressFreeMove #ReliableMovers", // Add relevant hashtags
  };
  
  return (
   <>
   <MetaTags {...pageData} />
    <div className="relative w-full min-h-screen py-8 px-4 md:px-8 mt-20 overflow-hidden bg-gray-50">
      {/* Background Shapes */}
      <div className="absolute inset-0">
        {/* Static Blurry Shapes */}
        <div className="absolute top-10 left-1/4 w-80 h-80 bg-blue-400 rounded-full filter blur-2xl opacity-30"></div>
        <div className="absolute bottom-20 right-1/3 w-96 h-96 bg-yellow-200 rounded-full filter blur-3xl opacity-40"></div>
        <div className="absolute top-1/3 left-1/5 w-72 h-72 bg-red-300 rounded-full filter blur-2xl opacity-20"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-extrabold text-blue-700 mb-6">
              About Us
            </h2>
            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              We are a dedicated team with a shared vision of transforming the way house shifting is done in India, offering a service that prioritizes safety, accountability, and professionalism, all while ensuring a smooth and affordable experience for our customers.
            </p>
            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              Launched with a passion to simplify the relocation process, our service platform is designed to provide personalized solutions for all your moving needs. Our goal is to make every house move stress-free, ensuring a positive experience from start to finish.
            </p>
            <p className="text-lg text-gray-800 leading-relaxed">
              Unlike typical marketplaces that pass your request to random vendors, we personally manage your move with a specially trained team, equipped to handle packing, unpacking, loading, and unloading with the utmost care and professionalism.
            </p>
          </div>
          {/* Image Section */}
          <div className="flex justify-center md:justify-end">
            <img
              src="src/assets/moving_re.svg"
              alt="Moving illustration"
              className="w-full max-w-md transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </div>
   </>
  );
};

export default About;
