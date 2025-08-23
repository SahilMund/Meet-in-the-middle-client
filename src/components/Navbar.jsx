import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import locationimage from '../assets/locationimage.png';
import { MdNotificationsActive } from 'react-icons/md';
import { GoPerson } from 'react-icons/go';
import { IoSettingsOutline } from 'react-icons/io5';
import { PiSignOutBold } from 'react-icons/pi';
import { IoMdMenu } from 'react-icons/io';
import { logoutUser } from '../services/authentication';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSignOut() {
    try {
      setIsLogoutLoading(true);
      const data = await logoutUser();
      toast.success(data.data.message);
      setTimeout(()=>navigate('/login'),1000);
    } catch (error) {
      toast.error(error.response.message || 'Failed Action');
    } finally {
      setIsLogoutLoading(false);
    }
  }

  return (
    <div className="relative">
      {/* NAVBAR */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between px-6 py-3 bg-white shadow-md relative"
      >
        {/* Left Section - Logo + Title */}
        <div className="flex items-center space-x-3">
          <img src={locationimage} height={30} width={30} alt="logo" />
          <h1 className="text-lg font-semibold">Meet in Middle</h1>
        </div>

        {/* Middle Section - Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 cursor-pointer hover:bg-[#FF4C61] hover:text-white  rounded-md"
          >
            Dashboard
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 cursor-pointer hover:bg-[#FF4C61] hover:text-white  rounded-md"
          >
            Your Invitations
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 cursor-pointer hover:bg-[#FF4C61] hover:text-white rounded-md"
          >
            Create Meeting
          </motion.button>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <MdNotificationsActive className="text-xl cursor-pointer" />

          {/* User Button */}
          <motion.button
            onClick={() => setOpen(!open)}
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 flex items-center justify-center bg-gray-300 rounded-full font-semibold text-sm">
              KD
            </div>
            <span className="text-sm font-medium hidden sm:inline">
              Kushal Deep
            </span>
          </motion.button>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <IoMdMenu size={20} />
          </motion.button>
        </div>

        {/* User Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-6 mt-2 w-45 bg-white shadow-lg rounded-md border z-50"
            >
              <ul className="flex flex-col">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex gap-5">
                  <GoPerson /> Profile
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex gap-5">
                  <IoSettingsOutline /> Settings
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500 flex gap-5"
                  onClick={handleSignOut}
                >
                  <PiSignOutBold /> Sign Out
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col md:hidden overflow-hidden z-40"
          >
            <button className="px-4 py-2 hover:bg-gray-100">Dashboard</button>
            <button className="px-4 py-2 hover:bg-gray-100">
              Create Meeting
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
