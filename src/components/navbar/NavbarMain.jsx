import NavbarLinks from "./NavbarLinks";
import NavbarBtn from "./NavbarBtn";
import NavbarToggler from "./NavbarToggler";
import { useSelector } from "react-redux";

const NavbarMain = () => {
  const menuOpen = useSelector((state) => state.menu.menuOpen);
  return (
    <nav className="max-w-[1300px] mx-auto w-full  px-4 fixed left-[50%] -translate-x-[50%] z-20 flex gap-4 mt-2">
      <div className="flex justify-between w-full max-w-[900px] mx-auto bg-black items-center p-3 rounded-r-full rounded-l-full border-orange border-[0.5px] ">
        <span className="text-3xl font-bold text-white select-none ml-4">Welcome</span>
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
