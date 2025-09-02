"use client"
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

import Download from "./Download";

const Hero = () => {
  const { theme } = useTheme();
  const [heroContent, setHeroContent] = useState({
    subtitle: "The Best TV Watching Experience",
    title: "ZumTV IPTV Player APP",
    description: "ZumTV is a IPTV player that allows users to stream content by loading M3U Playlist URLs or Xtream Codes API from various IPTV providers."
  });
  const [heroImgSrc, setHeroImgSrc] = useState('/hero_side.png');

  // Fetch hero content from backend
  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const response = await fetch('/api/content?component=Hero&section=main');
        const data = await response.json();
        
        if (data.status === 'success' && data.data && data.data.length > 0) {
          const content = data.data[0];
          setHeroContent({
            subtitle: content.subtitle || heroContent.subtitle,
            title: content.title || heroContent.title,
            description: content.description || heroContent.description
          });
        }
      } catch (error) {
        console.error('Error fetching hero content:', error);
        // Keep default content if API fails
      }
    };

    fetchHeroContent();
  }, []);

  useEffect(() => {
    fetch('/api/admin/image?name=hero_side.png')
      .then(res => res.json())
      .then(data => {
        if (data.images && data.images.data && data.images.type) {
          setHeroImgSrc(`data:${data.images.type};base64,${data.images.data}`);
        }
      });
  }, []);

  return (
    <div 
    id="hero"
      className="relative shadow-xl bg-[#000000a9] p !text-white"
      // style={{ backgroundColor: theme.primaryColor }}

    >
      <motion.div
        style={{
          background: `
            radial-gradient(circle at 0% 100%, rgba(0, 0, 0, 0.7) 10%, transparent 30%),
            radial-gradient(circle at 100% 80%, rgba(0, 0, 0, 0.7) 5%, transparent 35%)
          `,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
      />
      <div className="absolute inset-0 overflow-hidden -z-1">
        <img src="/bg.jpg" alt="" className="object-cover origin-center blur-sm" />
      </div>
      
      <div className="container relative mx-auto w-full min-h-screen px-4   md:py-0 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
        {/* Content Section */}
        <div className="space-y-12 lg:space-y-24 text-center lg:text-left order-2 lg:order-1">
          <motion.div 
            className="space-y-4 lg:space-y-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div>

            <motion.p 
              className="text-sm md:text-base mb-4 font-semibold uppercase"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {heroContent.subtitle}
            </motion.p>
            
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-poppins leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {heroContent.title}
            </motion.h1>
            
            </div>

            <motion.p 
              className="text-sm sm:text-base lg:text-lg text-gray-300 font-poppins max-w-full lg:w-[500px] px-4 lg:px-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {heroContent.description}
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <motion.a 
            href="#features"
              className="px-6 py-3 font-poppins group shadow-white transition-all duration-300 ease-in-out hover:shadow-md cursor-pointer border-white !border text-white text-background items-center justify-around gap-2 w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Learn More
            </motion.a>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="w-full sm:w-auto"
            >
              <Download style="text- flex w-full !justify-center !bg-" />
            </motion.div>
          </motion.div>
        </div>

        {/* Right side - App Preview */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="order-1 lg:order-2"
        >
          <motion.img 
            src={heroImgSrc} 
            className= "lg:w-[400px] object-cover object-center xl:w-[550px] " 
            alt=""
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;