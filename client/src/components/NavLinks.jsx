import { NavLink } from "react-router-dom";
import links from "../utils/Links";

const NavLinks = ({ toggleSidebar }) => {
  return (
    <div className="pt-8 flex flex-col">
      {links.map((link) => {
        const { text, path, id, icon } = link;

        return (
          <NavLink
            to={path}
            key={id}
            onClick={toggleSidebar} end
            className={({ isActive }) =>
              `flex items-center  py-4 capitalize  transition-all duration-500 ease-in lg:pl-10 lg:text-2xl lg:hover:bg-yellow-100 lg:hover:pl-12 hover:text-yellow-500  ${isActive ? 'text-gray-800':'text-gray-500'}`
            }
          >
            <span className="text-2xl text-yellow-500 mr-4 grid place-items-center transition-all duration-500 ease-linear">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
