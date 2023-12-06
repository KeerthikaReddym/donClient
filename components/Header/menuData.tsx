import { Menu } from "@/types/menu";
import {
  FaPhone,
} from "react-icons/fa";
import {
  FaHouse,
  FaGrip,
  FaUser,
} from "react-icons/fa6";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    icon: FaHouse,
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Products",
    icon: FaGrip,
    path: "/product",
    newTab: false,
  },
  {
    id: 3,
    title: "About",
    icon: FaUser,
    path: "/about",
    newTab: false,
  },
  {
    id: 42,
    icon: FaPhone,
    title: "Contact Page",
    path: "/contact",
    newTab: false,
  },
  ];
export default menuData;
