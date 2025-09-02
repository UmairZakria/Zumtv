"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
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
  const sections = ["Home", "Download", "About", "Reviews", "Contact"];
  const [selectedOption, setSelectedOption] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoSrc, setLogoSrc] = useState('/logo.png');
  
  const router = useRouter();
  const pathname = usePathname();

  // Define which sections are pages vs scroll targets
  const pageRoutes = {
    "Contact": "/contact",
    "About": "/about"
  };

  // Define scroll target IDs for home page sections
  const scrollTargets = {
    "Home": "hero", // or "intro"
    "Download": "download",
    "Reviews": "reviews"
  };

  // Update selected option based on current pathname
  useEffect(() => {
    if (pathname === "/") {
      setSelectedOption("Home");
    } else if (pathname === "/contact") {
      setSelectedOption("Contact");
    } else if (pathname === "/about") {
      setSelectedOption("About");
    }
  }, [pathname]);

  useEffect(() => {
    fetch('/api/admin/image?name=logo.png')
      .then(res => res.json())
      .then(data => {
        if (data.images && data.images.data && data.images.type) {
          setLogoSrc(`data:${data.images.type};base64,${data.images.data}`);
        }
      });
  }, []);

  const handleNavClick = (sectionName) => {
    setIsMenuOpen(false);
    setSelectedOption(sectionName);

    // Check if it's a page route
    if (pageRoutes[sectionName]) {
      router.push(pageRoutes[sectionName]);
      return;
    }

    // Check if it's a scroll target
    if (scrollTargets[sectionName]) {
      // If we're not on home page, navigate to home first then scroll
      if (pathname !== "/") {
        router.push("/");
        // Wait for navigation to complete, then scroll
        setTimeout(() => {
          const section = document.getElementById(scrollTargets[sectionName]);
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        // We're already on home page, just scroll
        const section = document.getElementById(scrollTargets[sectionName]);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
      return;
    }

    // Fallback: try to find element by section name as ID
    const section = document.getElementById(sectionName.toLowerCase());
    if (section) {
      if (pathname !== "/") {
        router.push("/");
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Alternative version using window.location if you prefer
  const handleNavClickWithLocation = (sectionName) => {
    setIsMenuOpen(false);
    setSelectedOption(sectionName);

    // Check if it's a page route
    if (pageRoutes[sectionName]) {
      window.location.href = pageRoutes[sectionName];
      return;
    }

    // For scroll targets
    if (scrollTargets[sectionName]) {
      if (pathname !== "/") {
        window.location.href = `/#${scrollTargets[sectionName]}`;
      } else {
        const section = document.getElementById(scrollTargets[sectionName]);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <div className="w-full h-fit bg-prime">
      <div className="relative w-full md:px-0 px-4 text-white h-[100px] z-[1000] container mx-auto flex items-center justify-between">
        <a href="/" className="">
          <img src={logoSrc} alt="" className="w-[120px]" />
        </a>
        <div>
          <ul className="hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:flex items-center gap-1">
            {sections.map((section) => (
              <li
                key={section}
                onClick={() => handleNavClick(section)}
                className={`font-poppins py-[8px] hover:text-prime hover:bg-white hover:shadow-lg px-6 cursor-pointer text-white transition-all duration-300 ease-in-out ${
                  selectedOption === section ? "!text-black bg-white" : ""
                }`}
              >
                <span className="text-sm">{section}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full text-prime bg-white"
          >
            {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>

          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ zIndex: 10000 }}
              className="absolute top-full right-0 mt-2 w-48 !z-[10000] bg-prime rounded-lg backdrop-blur-lg py-2"
            >
              {sections.map((section) => (
                <div
                  key={section}
                  onClick={() => handleNavClick(section)}
                  className={`px-4 py-3 text-sm cursor-pointer text-white hover:bg-white hover:text-black transition-all ${
                    selectedOption === section ? "bg-white !text-black" : ""
                  }`}
                >
                  {section}
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