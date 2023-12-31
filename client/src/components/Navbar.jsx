import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
// import { FaBars } from "react-icons/fa";

import Logo from "./Logo";

const Navbar = () => {
  let [open, setOpen] = useState(false);
  let [dropdown, setDropdown] = useState(false);

  const { cart } = useAppContext();

  return (
    <header className=" lg:shadow-md w-full fixed top-0 left-0 z-10">
      <nav className="flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute left-3 top-6 cursor-pointer md:hidden"
        >
          <ion-icon name={open ? "close" : "menu"}></ion-icon>
        </div>
        <Link to={"/"} className="ml-5">
          <Logo />
        </Link>
        <ul
          className={`md:flex md:items-center md:py-0 py-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-5/6  md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-10 h-screen" : "top-[-490px]"
          }`}
        >
          <li className="md:ml-8 m-0 text-base lg:text-lg md:my-0 my-7">
            <Link to={`/`} className="text-black hover:text-yellow-400 ">
              Home
            </Link>
          </li>
          <li className="md:ml-8 m-0 text-base lg:text-lg md:my-0 my-7">
            <Link to={`/`} className="text-black hover:text-yellow-400 ">
              About Us
            </Link>
          </li>
          <li className="md:ml-8 m-0 text-base lg:text-lg md:my-0 my-7">
            <Link to={`/`} className="text-black hover:text-yellow-400 ">
              Contact Us
            </Link>
          </li>
          <li className="md:ml-8 m-0 text-base lg:text-lg md:my-0 my-7">
            <div onClick={() => setDropdown(!dropdown)}>
              Categories <ion-icon name="chevron-down-outline"></ion-icon>
            </div>
            {dropdown && (
              <div className="absolute top-56 left-20  md:top-11 md:left-3/4 xl:left-[900px] bg-white border border-gray-200">
                <Link
                  to="/"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Contact
                </Link>
              </div>
            )}
          </li>
        </ul>
        <div>
          <Link className="transition duration-300 hover:text-yellow-400 md:mr-3">
            <ion-icon name="person-outline" size="large"></ion-icon>
          </Link>
          

          <Link className="transition duration-300 hover:text-yellow-400" to={"/cart"}>
            <ion-icon name="cart-outline" size="large"></ion-icon>
          </Link>
          <div className="absolute top-3 right-6 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
            {cart.cartItems.length}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
