import React from "react";
import { FaGithub, FaYoutube, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import PropTypes from 'prop-types';

const socialLinks = [
  {
    href: "https://github.com/yourusername",
    icon: <FaGithub size={24} />,
    label: "GitHub Profile",
    hoverClass: "hover:text-gray-900",
  },
  {
    href: "https://youtube.com/@yourchannel",
    icon: <FaYoutube size={24} />,
    label: "YouTube Channel",
    hoverClass: "hover:text-red-600",
  },
  {
    href: "https://instagram.com/yourusername",
    icon: <FaInstagram size={24} />,
    label: "Instagram Profile",
    hoverClass: "hover:text-pink-600",
  },
  {
    href: "https://twitter.com/yourusername",
    icon: <FaTwitter size={24} />,
    label: "Twitter Profile",
    hoverClass: "hover:text-blue-400",
  },
  {
    href: "https://linkedin.com/in/yourusername",
    icon: <FaLinkedin size={24} />,
    label: "LinkedIn Profile",
    hoverClass: "hover:text-blue-700",
  },
];

const SocialLink = ({ href, icon, label, hoverClass }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className={`transform transition-all duration-200 ${hoverClass} hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full p-2`}
  >
    {icon}
  </a>
);

SocialLink.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  hoverClass: PropTypes.string.isRequired,
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white shadow-inner py-8 px-4 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            BetNow
          </h2>
          <p className="text-sm text-gray-600 text-center md:text-left">
            Making betting more transparent and fair.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 text-gray-600">
          {socialLinks.map((link) => (
            <SocialLink key={link.label} {...link} />
          ))}
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-500 text-center md:text-right">
          <p>&copy; {currentYear} BetNow. All rights reserved.</p>
          <p className="mt-1">
            <a 
              href="/privacy" 
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Privacy Policy
            </a>
            {" • "}
            <a 
              href="/terms" 
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;