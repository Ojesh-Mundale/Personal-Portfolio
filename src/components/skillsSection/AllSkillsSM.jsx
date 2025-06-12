
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { FaReact, FaJava, FaNodeJs } from "react-icons/fa";
import { SiSpringboot, SiPython } from "react-icons/si";
import { motion } from "framer-motion";
import { fadeIn } from "../../framerMotion/variants";

const skills = [
  {
    skill: "HTML",
    icon: FaHtml5,
  },
  {
    skill: "CSS",
    icon: FaCss3Alt,
  },
  {
    skill: "JavaScript",
    icon: IoLogoJavascript,
  },
  {
    skill: "Java",
    icon: FaJava,
  },
  {
    skill: "Node.js",
    icon: FaNodeJs,
  },
  {
    skill: "Spring Boot",
    icon: SiSpringboot,
  },
  {
    skill: "ReactJS",
    icon: FaReact,
  },
  {
    skill: "Python",
    icon: SiPython,
  },
];

const AllSkillsSM = () => {
  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-12 my-12">
      {skills.map((item, index) => {
        return (
          <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.7 }}
            key={index}
            className="flex flex-col items-center"
          >
            <div className="bg-white text-cyan h-[100px] w-[100px] flex items-center justify-center rounded-full border-4 border-orange hover:text-darkGrey hover:scale-105 transform transition-all duration-500 text-6xl">
              <item.icon className="text-orange" />
            </div>
            <p className="text-white font-bold mt-4">{item.skill}</p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default AllSkillsSM;
