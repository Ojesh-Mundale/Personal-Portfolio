import NavbarLinks from "./NavbarLinks";
import NavbarBtn from "./NavbarBtn";
import NavbarToggler from "./NavbarToggler";
import { useSelector } from "react-redux";
import { FaLinkedinIn } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const NavbarMain = () => {
  const menuOpen = useSelector((state) => state.menu.menuOpen);
  return (
    <nav className="max-w-[1300px] mx-auto w-full  px-4 fixed left-[50%] -translate-x-[50%] z-20 flex flex-col gap-2 mt-2 items-center">
      <div className="flex justify-between w-full max-w-[900px] mx-auto bg-black items-center p-3 rounded-r-full rounded-l-full border-orange border-[0.5px] ">
        <span className="text-3xl font-bold text-white select-none ml-4">Welcome</span>
        <div className="flex gap-6 justify-center max-w-[900px] mx-auto -mt-2">
          <a href="https://www.linkedin.com/in/ojesh-mundale/" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:text-cyan transition-colors duration-300">
            <FaLinkedinIn />
          </a>
          <a href="https://github.com/Ojesh-Mundale" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:text-cyan transition-colors duration-300">
            <FiGithub />
          </a>
          <a href="https://leetcode.com/u/dsawithojesh/" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:text-cyan transition-colors duration-300">
            <SiLeetcode />
          </a>
          <a href="https://www.instagram.com/its.me.ojesh/" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:text-cyan transition-colors duration-300">
            <FaInstagram />
          </a>
        </div>
        <div className={`${menuOpen ? "sm:block" : "sm:hidden"} lg:block`}>
          <NavbarLinks />
        </div>

        <NavbarBtn />
      </div>
      <div className="flex lg:hidden sm:block p-6 items-center justify-center">
        <NavbarToggler />
      </div>
    </nav>
  );
};

export default NavbarMain;
