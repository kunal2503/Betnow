import React from 'react';
import { FaGithub, FaYoutube, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-white shadow-inner py-6 px-4 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col  justify-center items-center gap-4">
        
        {/* Text */}
        <div > 
        <p className="text-sm text-gray-600 text-center md:text-left">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-5 text-xl text-gray-700">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-black transition">
            <FaGithub />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition">
            <FaYoutube />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
            <FaInstagram />
          </a>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
