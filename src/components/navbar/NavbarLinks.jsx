import { Link } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../../state/menuSlice";

const links = [
  { link: "About Me", section: "about" },
  { link: "Skills", section: "skills" },
  { link: "Experience", section: "experience" },
  { link: "Projects", section: "projects" },
  // {
  //   link: "Resume",
  //   url: "https://drive.google.com/file/d/1MQ1oNMlQ5vVNaRBAzc2dmxJY_T9LChXJ/view?usp=sharing", // Replace with your real PDF link
  //   isResume: true,
  // },
  { link: "Contact", section: "contact" },
];

const NavbarLinks = () => {
  const dispatch = useDispatch();
  const menuOpen = useSelector((state) => state.menu.menuOpen);

  const handleClick = () => {
    if (menuOpen) {
      dispatch(toggleMenu());
    }
  };

  return (
    <ul className="flex lg:flex-row sm:flex-col gap-6 text-white font-body lg:relative sm:absolute sm:top-[120%] text-center left-[50%] -translate-x-[50%] lg:text-md sm:text-xl sm:bg-cyan/30 backdrop-blur-lg lg:bg-black sm:w-full py-4">
      {links.map((link, index) => (
        <li key={index} className="group">
          {link.isResume ? (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cyan text-black px-4 py-2 rounded-full font-semibold hover:bg-white transition-all duration-300"
            >
              {link.link}
            </a>
          ) : (
            <>
              <Link
                to={link.section}
                spy={true}
                smooth={true}
                duration={500}
                offset={-130}
                onClick={handleClick}
                className="cursor-pointer text-white hover:text-cyan transition-all duration-500"
              >
                {link.link}
              </Link>
              <div className="mx-auto bg-cyan w-0 group-hover:w-full h-[1px] transition-all duration-500"></div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default NavbarLinks;
