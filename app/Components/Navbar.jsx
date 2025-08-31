"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";


import {
  ChevronLeft,
  ChevronRight,
  MoveRight,
  MenuIcon,

  ArrowDownToLine,
  X,
} from "lucide-react";
import Download from "./Download";

const Navbar = () => {
  const sections = ["Home", "Download", "About", "FAQ","Contact"];
  const [selectedOption, setSelectedOption] = useState("intro");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setSelectedOption(sectionId);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="w-full h-fit bg-prime  ">
      <div className="relative w-full md:px-0 px-4  text-white h-[100px]  z-[1000]  container mx-auto flex items-center justify-between   ">
        <a href="/" className="">
          <img src="/logo.png" alt="" className="w-[120px] " />
        </a>
        <div>
          <ul className="hidden absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 md:flex  items-center  gap-1     ">
            {sections.map((section) => (
              <li
                key={section}
                onClick={() => handleNavClick(section)}
                className={` font-poppins py-[8px] hover:text-prime hover:bg-white hover:shadow-lg px-6 cursor-pointer   text-white transition-all duration-300 ease-in-out ${
                  selectedOption === section ? " text-prime bg-prime2" : ""
                }`}
              >
                <span className="text-sm">
                  {/* <Word> */}
                  {section}
                  {/* </Word> */}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className=" md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full text-prime bg-white "
          >
            {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>

          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ zIndex: 10000 }}
              className="absolute top-full right-0 mt-2 w-48 !z-[10000] bg-prime  rounded-lg backdrop-blur-lg py-2"
            >
              {sections.map((section) => (
                <div
                  key={section}
                  onClick={() => handleNavClick(section)}
                  className={`px-4 py-3 text-sm cursor-pointer text-white hover:bg-white hover:text-black transition-all ${
                    selectedOption === section ? "bg-white !text-black" : ""
                  }`}
                >
                  {/* <Word> */}

                  {section}

                  {/* </Word> */}
                </div>
              ))}
            </motion.div>
          )}
        </div>
          <Download style="hidden" />
      </div>
    </div>
  );
};

export default Navbar;
