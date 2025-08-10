import SingleExperience from "./SingleExperience";

const experiences = [
  {
    job: "Java Developer Intern",
    company: "Infosys-Springboard",
    date: "",
    responsibilities: [" I am currently working as a Java Developer Intern at Infosys-Springboard, where I am gaining hands-on experience in Java development and software engineering practices."],
  },
  {
    job: "Full Stack Developer Intern",
    company: "UptoSkills",
    date: "",
    responsibilities: [" I am currently working as a Full Stack Developer Intern at UptoSkills, where I am learning and growing in the field of web development."],
  },
  {
    job: "AI Intern",
    company: "Edunet Foundation",
    date: "",
    responsibilities: [" I developed a spam detection system using ML and NLP. I analyzed large datasets, and built classifiers like Naive Bayes models, working with over 5000 messages. This project sharpened my skills in data analysis, machine learning, and NLP."],
  },
  {
    job: "Cloud Training Intern",
    company: "ifuture Infotech",
    date: "",
    responsibilities: ["Completed a 30-hour internship at iFuture Technologies, gaining skills in Server Management, Cloud Computing, Red Hat basics, server/client installation, domain joining, and offline apps in private cloud."],
  },
];

const AllExperiences = () => {
  return (
    <div className="flex md:flex-row sm:flex-col items-center justify-between">
      {experiences.map((experience, index) => (
        <SingleExperience key={index} experience={experience} />
      ))}
    </div>
  );
};

export default AllExperiences;
