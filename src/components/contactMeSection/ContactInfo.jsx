import { HiOutlineMail } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import SingleInfo from "./SingleInfo";

const ContactInfo = () => {
  return (
    <div className="flex flex-col gap-4">
      <SingleInfo text="ojeshmundale@gmail.com" Image={HiOutlineMail} />
      <SingleInfo text="Mumbai , India" Image={IoLocationOutline} />
    </div>
  );
};

export default ContactInfo;
