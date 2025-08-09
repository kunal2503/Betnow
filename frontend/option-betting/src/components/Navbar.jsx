import React, { useState } from 'react';
import {
  CgLogOut,
  CgProfile,
  CgHome,
  CgLogIn
} from 'react-icons/cg';
import { FaHistory, FaCartPlus } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxCross2 } from 'react-icons/rx';
import { Link, useNavigate } from 'react-router'; // ✅ Use react-router-dom
import { useUser } from '../context/UserProvider';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {user} = useUser();
  const profileImage = JSON.parse(localStorage.getItem('profileImage'));
  const navigate = useNavigate();


  const handleClick = () => setIsOpen(prev => !prev);
  const handleClickOnLink = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsOpen(false);
    navigate('/');

  };

  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm border border-gray-100 px-6 py-4 rounded-lg mx-4 mt-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold text-cyan-900">BetNow</h1>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-6 text-lg font-semibold">
        <Link to="/" className="hover:text-cyan-700 px-4 py-2 rounded-full transition ">Home</Link>
        <Link to="/orders" className="hover:text-cyan-700 px-4 py-2 rounded-full transition">Orders</Link>
        <Link to="/history" className="hover:text-cyan-700 px-4 py-2 rounded-full transition">History</Link>
        <Link to={`/profile/${user?._id}`} >
        {profileImage ? (<img src={user.profileImage} alt="Profile" className="w-8 h-8 rounded-full object-cover" /> ) : (<CgProfile className="w-8 h-8" />)
        }
        </Link>
      </div>

      {/* Mobile Toggle Icon */}
      <div className="md:hidden flex items-center" onClick={handleClick}>
        {isOpen ? (
          <RxCross2 className="text-3xl" />
        ) : (
          <GiHamburgerMenu className="text-3xl" />
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-20 right-4 bg-white rounded-lg shadow-lg w-56 z-50">
          <ul className="flex flex-col text-center font-semibold text-lg overflow-hidden">
            <li className="hover:bg-gray-100 px-6 py-3">
              <Link to="/" onClick={handleClickOnLink} className="flex items-center justify-center gap-2">
                <CgHome /> Home
              </Link>
            </li>
            <li className="hover:bg-gray-100 px-6 py-3">
              <Link to="/orders" onClick={handleClickOnLink} className="flex items-center justify-center gap-2">
                <FaCartPlus /> Orders
              </Link>
            </li>
            <li className="hover:bg-gray-100 px-6 py-3">
              <Link to="/history" onClick={handleClickOnLink} className="flex items-center justify-center gap-2">
                <FaHistory /> History
              </Link>
            </li>
            <li className="hover:bg-gray-100 px-6 py-3">
              <Link to={`/profile/${user._id}`} onClick={handleClickOnLink} className="flex items-center justify-center gap-2">
                <CgProfile /> Profile
              </Link>
            </li>
            {user ? (
              <li
                onClick={handleLogout}
                className="hover:bg-gray-100 px-6 py-3 flex items-center justify-center gap-2 cursor-pointer text-red-600 font-semibold"
              >
                <CgLogOut /> Logout
              </li>
            ) : (
              <li className="hover:bg-gray-100 px-6 py-3">
                <Link to="/login" onClick={handleClickOnLink} className="flex items-center justify-center gap-2">
                  <CgLogIn /> Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
