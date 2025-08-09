import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { toggleMenu } from "../../state/menuSlice";

const NavbarToggler = () => {
  const dispatch = useDispatch();
  const [showText, setShowText] = useState(true);
  const [showHamburger, setShowHamburger] = useState(true);

  const setToggleMenu = () => {
    dispatch(toggleMenu());
  };

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollTop = window.scrollY;

      if (scrollTop === 0) {
        // At the very top → show both
        setShowText(true);
        setShowHamburger(true);
        lastScrollTop = 0;
        return;
      }

      if (scrollTop > lastScrollTop) {
        // Scrolling down → hide both
        setShowText(false);
        setShowHamburger(false);
      } else {
        // Scrolling up → show both
        setShowText(true);
        setShowHamburger(true);
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {showHamburger && (
        <button
          className="fixed top-[75px] left-6 text-2xl p-3 border border-orange rounded-full z-50"
          onClick={setToggleMenu}
        >
          <GiHamburgerMenu />
        </button>
      )}

      {showText && (
        <div className="relative w-full flex items-center justify-center bg-gray-100 left-5 py-2 gap-5 mt-[7px]">
          <span className="text-2xl font-medium">Welcome to my Portfolio</span>
        </div>
      )}
    </>
  );
};

export default NavbarToggler;
