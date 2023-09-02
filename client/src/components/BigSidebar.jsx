import { useAppContext } from "../context/appContext";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

const BigSidebar = () => {
  const { showSideBar } = useAppContext();
  return (
    <aside className="hidden lg:block shadow-custom-shadow-1">
      <div className={`bg-white min-h-screen h-full w-60  transition-all duration-500 ease-in ${showSideBar ? '-ml-60':'ml-0'}`}>
        <div className="sticky top-0">
          <header className="h-24 flex items-center pl-10 ">
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </aside>
  );
};

export default BigSidebar;
