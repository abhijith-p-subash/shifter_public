import { spiral } from "ldrs";

spiral.register();

const Loader: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-70 flex items-center justify-center z-50">
      <l-spiral size="100" speed="0.9" color="#3b82f6"></l-spiral>
    </div>
  );
};

export default Loader;
