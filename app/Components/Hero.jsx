"use client"
import React from "react";
import { motion } from "framer-motion";

import Download from "./Download";

const Hero = () => {
  return (
    <motion.div 
      className="relative bg-prime shadow-xl !text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
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
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
      />
      
      <div className="container relative mx-auto w-full h-[calc(100vh-100px)] flex items-center justify-between gap-4">
        <div className="space-y-24">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.p 
              className="text- font-semibold uppercase"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              The Best TV Watching Experience
            </motion.p>
            
            <motion.h1 
              className="text-6xl font-poppins"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              ZumTV IPTV Player APP
            </motion.h1>
            
            <motion.p 
              className="w-[500px] text-gray-300 text-lg font-poppins"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              ZumTV is a IPTV player that allows users to stream content by
              loading M3U Playlist URLs or Xtream Codes API from various IPTV
              providers.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <motion.button 
              className="px-6 font-poppins hidden md:flex group shadow-white transition-all duration-300 ease-in-out hover:shadow-md cursor-pointer border-white !border text-white text-background items-center justify-around gap-2 py-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Learn More
            </motion.button>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Download style="text- !bg-" />
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.img 
            className="w-[500px]" 
            src="/hero_side.png" 
            alt=""
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;