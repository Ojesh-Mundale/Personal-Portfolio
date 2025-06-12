import AboutMeText from "./AboutMeText";
// import AboutMeImage from "./AboutMeImage";
import { motion } from "framer-motion";
import { fadeIn } from "../../framerMotion/variants";
const AboutMeMain = () => {
  return (
    <div
      id="about"
      className="flex md:flex-row sm:flex-col md:gap-12 sm:gap-4 md:px-4 max-w-[1200px] mx-auto md:mt-[100px] sm:mt-0 md:justify-between sm:justify-center items-center"
    >
      <motion.div
        variants={fadeIn("right", 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.7 }}
      >
        <AboutMeText />
      </motion.div>
      {/* <motion.div
        variants={fadeIn("left", 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.7 }}
      >
        <AboutMeImage />
      </motion.div> */}
    </div>
  );
};

export default AboutMeMain;
