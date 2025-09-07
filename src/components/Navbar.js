import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <a href="/" className="text-indigo-600 font-bold text-lg">
        Me-API Playground
      </a>
      <div className="space-x-6">
        <a href="#profile" className="text-gray-700 hover:text-indigo-600">
          Profile
        </a>
        <a href="#skills" className="text-gray-700 hover:text-indigo-600">
          Skills
        </a>
        <a href="#projects" className="text-gray-700 hover:text-indigo-600">
          Projects
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
