import SingleExperience from "./SingleExperience";

const experiences = [
  {
    job: "Java Intern",
    company: "Cognifyz Technologies",
    date: "",
    responsibilities: [" I worked on Core java projects and also strengthened my java fundamentals and worked on File handling and string manipulation problems. Also sharpened my logical thinking and problem solving skills"],
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
