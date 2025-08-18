import React from "react";
import { FaGithub, FaYoutube, FaInstagram } from "react-icons/fa";

const socialLinks = [
  {
    href: "https://github.com",
    icon: <FaGithub />,
    label: "GitHub",
    hoverClass: "hover:text-black",
  },
  {
    href: "https://youtube.com",
    icon: <FaYoutube />,
    label: "YouTube",
    hoverClass: "hover:text-red-600",
  },
  {
    href: "https://instagram.com",
    icon: <FaInstagram />,
    label: "Instagram",
    hoverClass: "hover:text-pink-500",
  },
];

const Footer = () => {
  return (
    <footer className="w-full bg-white shadow-inner py-6 px-4 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
        
        {/* Text */}
        <p className="text-sm text-gray-600 text-center">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex gap-5 text-xl text-gray-700">
          {socialLinks.map(({ href, icon, label, hoverClass }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={`${hoverClass} transition-colors duration-200`}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
