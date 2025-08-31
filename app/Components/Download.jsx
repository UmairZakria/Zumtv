import React from "react";
import { ArrowDownToLine } from "lucide-react";

const Download = ({style=""}) => {

  return (
    <button
    //   onClick={() => {
    //     contact.scrollIntoView({ behavior: "smooth" });
    //   }}
      className={`${style} px-6 font-poppins  hidden md:flex group shadow-white  transition-all duration-300 ease-in-out hover:shadow-md cursor-pointer  bg-white text-prime text-background  items-center justify-around gap-2  py-3 `}
    >
      Download Now
      <ArrowDownToLine
        size={18}
        className="  transition-all duration-300 ease-in-out"
      />
    </button>
  );
};

export default Download;
