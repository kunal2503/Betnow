import React, { useState, useEffect, useRef } from "react";
import {
  CgLogOut,
  CgProfile,
  CgHome,
  CgLogIn
} from "react-icons/cg";
import { FaHistory, FaCartPlus } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate, useLocation } from "react-router";
import { useUser } from "../context/UserProvider";
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleClick = () => setIsOpen(prev => !prev);
  
  const handleLogout = () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      setIsOpen(false);
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200 px-6 py-3 flex justify-between items-center rounded-xl mx-4 mt-4">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <h1 className="text-2xl font-extrabold bg-gradient-to-l from-cyan-600 to-blue-800 bg-clip-text text-transparent">
          BetNow
        </h1>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-6 text-lg font-medium">
        <NavItem to="/" icon={<CgHome />} label="Home" active={location.pathname === "/"} />
        <NavItem to="/orders" icon={<FaCartPlus />} label="Orders" active={location.pathname === "/orders"} />
        <NavItem to="/history" icon={<FaHistory />} label="History" active={location.pathname === "/history"} />
        <Link
          to={`/profile/${user?._id}`}
          className="hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
          aria-label="Profile"
        >
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt={`${user.name}'s profile`}
              className="w-9 h-9 rounded-full object-cover border-2 border-cyan-500"
            />
          ) : (
            <CgProfile className="w-8 h-8 text-gray-700" />
          )}
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden flex items-center p-2 hover:bg-gray-100 rounded-lg transition-colors"
        onClick={handleClick}
        aria-expanded={isOpen}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <RxCross2 className="text-3xl text-gray-700" />
        ) : (
          <GiHamburgerMenu className="text-3xl text-gray-700" />
        )}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div 
          ref={menuRef}
          className="absolute top-20 right-4 overflow-hidden bg-white rounded-lg shadow-xl w-60 z-50 animate-slideDown"
          role="dialog"
          aria-label="Mobile menu"
        >
          <ul className="flex flex-col text-center font-semibold text-lg">
            <MobileNavItem 
              to="/" 
              icon={<CgHome />} 
              label="Home" 
              onClick={() => setIsOpen(false)}
              active={location.pathname === "/"}
            />
            <MobileNavItem 
              to="/orders" 
              icon={<FaCartPlus />} 
              label="Orders" 
              onClick={() => setIsOpen(false)}
              active={location.pathname === "/orders"}
            />
            <MobileNavItem 
              to="/history" 
              icon={<FaHistory />} 
              label="History" 
              onClick={() => setIsOpen(false)}
              active={location.pathname === "/history"}
            />
            <MobileNavItem 
              to={`/profile/${user?._id}`} 
              icon={<CgProfile />} 
              label="Profile" 
              onClick={() => setIsOpen(false)}
              active={location.pathname.includes("/profile")}
            />
            {user ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full hover:bg-red-50 px-6 py-3 flex items-center justify-center gap-2 cursor-pointer text-red-600 font-bold transition-colors"
                >
                  <CgLogOut /> Logout
                </button>
              </li>
            ) : (
              <MobileNavItem 
                to="/login" 
                icon={<CgLogIn />} 
                label="Login" 
                onClick={() => setIsOpen(false)}
                active={location.pathname === "/login"}
              />
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

const NavItem = ({ to, icon, label, active }) => (
  <Link
    to={to}
    className={`flex items-center gap-2 transition-colors duration-200 relative group focus:outline-none focus:text-blue-900
      ${active ? 'text-indigo-600' : 'hover:text-indigo-600'}`}
  >
    {icon}
    {label}
    <span className={`absolute bottom-0 left-0 h-[2px] bg-indigo-600 transition-all duration-300
      ${active ? 'w-full' : 'w-0 group-hover:w-full'}`}
    />
  </Link>
);

const MobileNavItem = ({ to, icon, label, onClick, active }) => (
  <li>
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-6 py-3 w-full transition-colors
        ${active ? 'bg-gray-100 text-blue-900' : 'hover:bg-gray-100'}`}
    >
      {icon} {label}
    </Link>
  </li>
);
// Add these PropTypes and component enhancements:

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

MobileNavItem.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool,
};



export default Navbar;