import { useState } from "react";
import { useAppContext } from "../context/appContext";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import Logo from "./Logo";

const AdminNavbar = () => {
  // const [showLogout, setShowLogout] = useState(false);
  const { toggleSidebar, logoutUser } = useAppContext();

  return (
    <nav className="flex h-24 items-center justify-center shadow-custom-shadow-2 bg-white">
      <div className="flex w-[90vw] lg:w-11/12 items-center justify-between">
        <button type="button" className="toggle-btn text-3xl"  onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div className="lg:hidden">
          <Logo />
        </div>
        <div className="text-4xl hidden lg:block">
          Dashboard
        </div>
        <div className="relative">
          <button type="button" className="flex items-center justify-center gap-x-1 md:gap-x-3 gap-y-0 relative cursor-pointer text-white bg-yellow-400 border-transparent rounded py-2 px-3  transition-all duration-500 ease-in ">
            <FaUserCircle />
            Philip M..........
            <FaCaretDown />
          </button>
          <div className="dropdown hidden">
             <button className="" type="button">
               Logout
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
