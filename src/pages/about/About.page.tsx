const About = () => {
  return (
    <div className="w-full h-full py-8 container mx-auto p-4 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Text Content */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-semibold text-blue-600 mb-4">
            About Us
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            We are a dedicated team with a shared vision of transforming the way
            house shifting is done in India, offering a service that prioritizes
            safety, accountability, and professionalism, all while ensuring a
            smooth and affordable experience for our customers.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Launched with a passion to simplify the relocation process, our
            service platform is designed to provide personalized solutions for
            all your moving needs. Our goal is to make every house move
            stress-free, ensuring a positive experience from start to finish.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            What sets us apart is our commitment to transparency and customer
            satisfaction. Our innovative instant pricing system provides a quick
            and clear estimate based on your unique moving requirements. You
            also have the flexibility to customize your quote online, putting
            you in control every step of the way.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Unlike typical marketplaces that pass your request to random
            vendors, we personally manage your move with a specially trained
            team, equipped to handle packing, unpacking, loading, and unloading
            with the utmost care and professionalism. Whether it's house
            shifting or vehicle transport, we ensure your belongings are treated
            with respect throughout the entire process.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Our mission is to be your reliable, go-to partner for all house
            shifting needs, delivering not only a service but peace of mind.
          </p>
        </div>
        {/* Image Section */}
        <div className="flex justify-end md:justify-start">
          <img
            src="src/assets/moving_re.svg"
            alt="Moving illustration"
            className="w-full max-w-md"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
