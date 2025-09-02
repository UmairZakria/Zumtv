"use client";
import {
  Tv,
  Smartphone,
  Laptop,
  Wifi,
  Flame,
  Monitor,
  Users,
  Settings,
  Star
} from "lucide-react";
import { motion } from "framer-motion";

export default function Compatibility() {
  const devices = [
    { icon: Tv, name: "Smart TV" },
    { icon: Smartphone, name: "Smart phones" },
    { icon: Laptop, name: "Laptop PC" },
    { icon: Settings, name: "IPTV Devices (Receivers)" },
    { icon: Flame, name: "Firestick & Fire" },
    { icon: Monitor, name: "TV MAG Device" },
    { icon: Users, name: "Android box Apple tv" },
    { icon: Wifi, name: "STB Emulator" },
  ];

  return (
    <div className="relative">
      <div className=" absolute inset-0 -z-1 flex items-end justify-start">
        <img src="logo.png" className="grayscale-70  scale-120 px-30  opacity-10 brightness-50"  alt="" />
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
                  <Star className="w-6 h-6 fill-green-500 text-green-500" />
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
      <motion.div
        className="container mx-auto py-18 md:px-0 px-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid font-poppins grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h1
              className="text-3xl lg:text-5xl font-semibold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              ZumTV is compatible with all devices
            </motion.h1>

            <motion.p
              className="text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Support for simultaneous viewing on multiple screens: Users of
              ZumTV can enjoy watching multiple channels or programs
              simultaneously on various screens.
            </motion.p>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {devices.map((device, index) => {
                const IconComponent = device.icon;
                return (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  >
                    <IconComponent className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    <span className="text-gray-700">{device.name}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right side - Multi-screen Setup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.img
              src="/com_side.png"
              alt=""
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
