import { useState } from "react";
import { useAppContext } from "../context/appContext";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import Logo from "./Logo";

const AdminNavbar = () => {
  // const [showLogout, setShowLogout] = useState(false);
  const { toggleSidebar, logoutUser } = useAppContext();

  return (
    <nav className="flex h-24 items-center justify-center shadow-custom-shadow-2 bg-white">
      <div className="flex w-[80vw] items-center justify-between">
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
          <Logo />
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
