import { FiBell, FiUser } from "react-icons/fi";

const Navbar = () => {
  return (
      <nav className="container border border-gray-100 shadow-md rounded-lg w-[95%] md:w-[95%]">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="ml-8 text-2xl font-extrabold text-gray-800 tracking-wide">
          Cashvio
        </div>

        <div className="flex items-center space-x-6">
          <button className="text-gray-600 hover:text-black transition">
            <FiBell size={24} />
          </button>
          <button className="text-gray-600 hover:text-black transition">
            <FiUser size={26} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
