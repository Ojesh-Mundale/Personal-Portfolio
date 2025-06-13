import SingleContactSocial from "./SingleContactSocial";
import { FaLinkedinIn } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const ContactSocial = () => {
  return (
    <div className="flex gap-4">
      <SingleContactSocial link="https://www.linkedin.com/in/ojesh-mundale/" Icon={FaLinkedinIn} />
      <SingleContactSocial link="https://github.com/Ojesh-Mundale" Icon={FiGithub} />
      <SingleContactSocial link="https://leetcode.com/u/dsawithojesh/" Icon={SiLeetcode} />
      <SingleContactSocial link="https://www.instagram.com/its.me.ojesh/" Icon={FaInstagram} />
    </div>
  );
};

export default ContactSocial;
