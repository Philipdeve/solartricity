import { IoBarChartSharp } from "react-icons/io5";
import { MdCategory } from "react-icons/md";
import { FaProductHunt } from "react-icons/fa";

const links = [
  {
    id: 1,
    text: "stats",
    path: "/admin-dashboard",
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    text: "products",
    path: "products",
    icon: <FaProductHunt />,
  },
  {
    id: 3,
    text: "categories",
    path: "categories",
    icon: <MdCategory />,
  },
];

export default links;
