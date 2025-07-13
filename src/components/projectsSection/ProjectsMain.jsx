import ProjectsText from "./ProjectsText";
import SingleProject from "./SingleProject";
import { motion } from "framer-motion";
import { fadeIn } from "../../framerMotion/variants";

const projects = [
  {
    name: "AI Chatbot",
    align: "right",
    image: "/images/aiChatbot.png",
    link: "https://github.com/Ojesh-Mundale/AI-Chatbot",
  },
  {
    name: "E-Commerce Website",
    align: "left",
    image: "/images/website-img-2.webp",
    link: "https://github.com/Ojesh-Mundale/Ecommerce-Website",
  },
  {
    name: "Student Record Management",
    align: "right",
    image: "/images/StudentRecordManagement.png",
    link: "https://github.com/Ojesh-Mundale/Student-Record-Management",
  },
];

const ProjectsMain = () => {
  return (
    <div id="projects" className="max-w-[1200px] mx-auto px-4">
      <motion.div
        variants={fadeIn("top", 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.7 }}
      >
        <ProjectsText />
      </motion.div>
      <div className="flex flex-col gap-20 max-w-[900px] mx-auto mt-12">
        {projects.map((project, index) => {
          return (
            <SingleProject
              key={index}
              name={project.name}
              year={project.year}
              align={project.align}
              image={project.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsMain;
