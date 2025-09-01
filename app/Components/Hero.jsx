"use client"
import React from "react";
import { motion } from "framer-motion";

import Download from "./Download";

const Hero = () => {
  return (
    <div 
    id="hero"
      className="relative bg-prime shadow-xl !text-white"

    >
      <motion.div
        style={{
          background: `
            radial-gradient(circle at 0% 100%, rgba(255, 255, 255, 0.1) 10%, transparent 30%),
            radial-gradient(circle at 100% 80%, rgba(255, 255, 255, 0.2) 5%, transparent 35%)
          `,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
      />
      
      <div className="container relative mx-auto w-full min-h-[calc(100vh-100px)] px-4 py-8 md:py-0 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
        {/* Content Section */}
        <div className="space-y-12 lg:space-y-24 text-center lg:text-left order-2 lg:order-1">
          <motion.div 
            className="space-y-4 lg:space-y-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.p 
              className="text-sm md:text-base font-semibold uppercase"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              The Best TV Watching Experience
            </motion.p>
            
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-poppins leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              ZumTV IPTV Player APP
            </motion.h1>
            
            <motion.p 
              className="text-sm sm:text-base lg:text-lg text-gray-300 font-poppins max-w-full lg:w-[500px] px-4 lg:px-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              ZumTV is a IPTV player that allows users to stream content by
              loading M3U Playlist URLs or Xtream Codes API from various IPTV
              providers.
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
        
        {/* Image Section */}
        <motion.div
          className="order-1 lg:order-2 w-full lg:w-auto flex justify-center"
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.img 
            className="w-[280px] sm:w-[350px] md:w-[400px] lg:w-[500px] h-auto" 
            src="/hero_side.png" 
            alt="ZumTV App Preview"
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