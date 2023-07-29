import { useAppContext } from "../context/appContext";
import { FaTimes } from 'react-icons/fa';
import Logo from "./Logo";
import NavLinks from "./NavLinks";



const SmallSidebar = () => {
  const { showSideBar, toggleSidebar } = useAppContext();

  return (
    <aside className="lg:hidden">
      <div className={`fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center  transition-all duration-500 ease-in ${showSideBar ? 'z-50 opacity-100': 'opacity-0 -z-10'}`}>

        <div className="bg-white w-[90vw] h-[95vh] rounded-md p-12 relative flex items-center flex-col">
          <button className="close-btn absolute top-3 left-3 text-4xl text-red-700 cursor-pointer" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <div>
            <Logo />
          </div>
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </aside>
  );
};

export default SmallSidebar;
