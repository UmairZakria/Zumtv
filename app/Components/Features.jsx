"use client"
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export default function Features() {
  const features = [
    "Simple UI",
    "Supports Xtream Codes API",
    "Supports loading M3U File / URL",
    "Supports Stalker Portal Connectivity",
    "Parental Control",
    "Select subtitles in movies and series",
    "Select languages in movies and series",
    "Add channels & movies/series favorites",
    "User-Friendly Interface",
    "Multi-Device Compatible",
  ];

  return (
    <motion.div
    id="features"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className=" container mx-auto font-poppins  py-8 md:px-0 px-2">
        {/* Main Features Section */}
          {/* Left side - Features List */}
        <div className="  grid grid-cols-1 lg:grid-cols-2 place-items-end !items-center  gap-12  mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h1 
              className=" text-3xl lg:text-5xl font-semibold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Features of ZumTV
            </motion.h1>

            <motion.p 
              className="text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              ZumTV offers a variety of useful features. The features
              listed below can be found by going to the application setting.
            </motion.p>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                >
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - App Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.img 
              src="/logo.png" 
              className="h-[400px] rounded-4xl shadow-2xl bg-black mx-" 
              alt=""
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            />
          </motion.div>
          
        </div>

      </div>
        {/* Trustpilot Reviews Section */}
      <motion.div 
        className="bg-gray-50 rounded-lg p-8  text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
          <motion.span 
            className="text-gray-700 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            Our customers say
          </motion.span>

          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.9 }}
          >
            <span className="text-2xl font-bold text-gray-900">Excellent</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 1.0 + i * 0.1 }}
                >
                  <Star
                    className="w-6 h-6 fill-green-500 text-green-500"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 1.1 }}
          >
            <span className="text-2xl font-bold text-gray-900">4.7</span>
            <span className="text-gray-600">out of 5 based on</span>
            <span className="font-bold text-gray-900">+100 reviews</span>
          </motion.div>

          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 1.2 }}
          >
            <Star className="w-6 h-6 fill-green-500 text-green-500" />
            <span className="font-bold text-green-600 text-lg">Trustpilot</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
