import React, { useState } from "react";
import {
  CgLogOut,
  CgProfile,
  CgHome,
  CgLogIn
} from "react-icons/cg";
import { FaHistory, FaCartPlus } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router";
import { useUser } from "../context/UserProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const handleClick = () => setIsOpen(prev => !prev);
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200 px-6 py-3 flex justify-between items-center rounded-xl mx-4 mt-4">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-extrabold bg-gradient-to-l from-cyan-600 to-blue-800 bg-clip-text text-transparent">
          BetNow
        </h1>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-6 text-lg font-medium">
        <NavItem to="/" icon={<CgHome />} label="Home" />
        <NavItem to="/orders" icon={<FaCartPlus />} label="Orders" />
        <NavItem to="/history" icon={<FaHistory />} label="History" />
        <Link
          to={`/profile/${user?._id}`}
          className="hover:scale-105 transition-transform duration-200"
        >
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover border-2 border-cyan-500"
            />
          ) : (
            <CgProfile className="w-8 h-8 text-gray-700" />
          )}
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center" onClick={handleClick}>
        {isOpen ? (
          <RxCross2 className="text-3xl text-gray-700" />
        ) : (
          <GiHamburgerMenu className="text-3xl text-gray-700" />
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-20 right-4 overflow-hidden bg-white rounded-lg shadow-xl w-60 z-50 animate-slideDown">
          <ul className="flex flex-col text-center font-semibold text-lg">
            <MobileNavItem to="/" icon={<CgHome />} label="Home" onClick={() => setIsOpen(false)} />
            <MobileNavItem to="/orders" icon={<FaCartPlus />} label="Orders" onClick={() => setIsOpen(false)} />
            <MobileNavItem to="/history" icon={<FaHistory />} label="History" onClick={() => setIsOpen(false)} />
            <MobileNavItem to={`/profile/${user?._id}`} icon={<CgProfile />} label="Profile" onClick={() => setIsOpen(false)} />
            {user ? (
              <li
                onClick={handleLogout}
                className="hover:bg-red-50 px-6 py-3 flex items-center justify-center gap-2 cursor-pointer text-red-600 font-bold"
              >
                <CgLogOut /> Logout
              </li>
            ) : (
              <MobileNavItem to="/login" icon={<CgLogIn />} label="Login" onClick={() => setIsOpen(false)} />
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

/* Desktop Nav Item */
const NavItem = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center gap-2 hover:text-blue-900 transition-colors duration-200 relative group"
  >
    {icon}
    {label}
    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-900 transition-all duration-300 group-hover:w-full"></span>
  </Link>
);

/* Mobile Nav Item */
const MobileNavItem = ({ to, icon, label, onClick }) => (
  <li className="hover:bg-gray-100 px-6 py-3 ">
    <Link to={to} onClick={onClick} className="flex items-center justify-center gap-2">
      {icon} {label}
    </Link>
  </li>
);

export default Navbar;
