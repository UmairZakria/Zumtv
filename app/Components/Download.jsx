import React, { useState, useRef, useEffect } from "react";
import { ArrowDownToLine, ChevronDown } from "lucide-react";
import { FlowGraphUnaryOperationBlock } from "@babylonjs/core/FlowGraph/Blocks/Data/flowGraphUnaryOperationBlock";

const Download = ({ style = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const downloadOptions = [
    { platform: "Windows", icon: "https://img.icons8.com/?size=40&id=TuXN3JNUBGOT&format=png&color=000000", downloadUrl: "https://www.filehorse.com/download-iptv-smarters-pro/download/" },
    { platform: "Mac", icon: "https://img.icons8.com/?size=40&id=122959&format=png&color=000000", downloadUrl: "https://www.filehorse.com/download-iptv-smarters-pro/download/" },
    { platform: "Android", icon: "https://img.icons8.com/?size=40&id=L1ws9zn2uD01&format=png&color=000000", downloadUrl: "https://apps.apple.com/pk/app/smarters-player-lite/id1628995509" },
    { platform: "iOS", icon: "https://img.icons8.com/?size=40&id=fKXXelWgP1B6&format=png&color=000000", downloadUrl: "https://apps.apple.com/pk/app/smarters-player-lite/id1628995509" },
  ];


  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${style} px-6 font-poppins md:flex group  transition-all duration-300 ease-in-out  cursor-pointer bg-white text-prime text-background items-center justify-around gap-4 py-3 relative z-10`}
      >
        Download Now
        <div className="flex items-center gap-1">
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1  bg-white  border !border-gray-200 rounded-md shadow-xl z-20 overflow-hidden">
          {downloadOptions.map((option, index) => (
            <a
              key={option.platform}
              href={option.downloadUrl}
              target="_blank"
              title={`Download For ${option.platform}`}
              className="w-full px-4 py-3 text-left hover:bg-gray-100 cursor-pointer transition-colors duration-150 flex items-center gap-3 text-gray-700 hover:text-gray-900"
            >
              {/* <span className="text-lg">{option.icon}</span> */}
              <img src={option.icon} className="" alt="" />
              <span className="font-medium uppercase">For {option.platform}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Download;