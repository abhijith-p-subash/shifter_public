import { spiral } from "ldrs";

spiral.register();

const Loader = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <l-spiral size="100" speed="0.9" color="#3b82f6"></l-spiral>
    </div>
  );
};

export default Loader;
