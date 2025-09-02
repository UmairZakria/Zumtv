"use client"
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";

export default function Features() {
  const { theme } = useTheme();
  const [featuresContent, setFeaturesContent] = useState({
    title: "Features of ZumTV",
    description: "ZumTV offers a variety of useful features. The features listed below can be found by going to the application setting.",
    features: [
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
    ]
  });

  // Fetch features content from backend
  useEffect(() => {
    const fetchFeaturesContent = async () => {
      try {
        const response = await fetch('/api/content?component=Features&section=main');
        const data = await response.json();
        
        if (data.status === 'success' && data.data && data.data.length > 0) {
          const content = data.data[0];
          
          // Update content if available from backend
          if (content.title) setFeaturesContent(prev => ({ ...prev, title: content.title }));
          if (content.description) setFeaturesContent(prev => ({ ...prev, description: content.description }));
          if (content.content) {
            // Parse content as features list if it's a string
            try {
              const parsedFeatures = JSON.parse(content.content);
              if (Array.isArray(parsedFeatures)) {
                setFeaturesContent(prev => ({ ...prev, features: parsedFeatures }));
              }
            } catch {
              // If content is not JSON, split by newlines or commas
              const featuresList = content.content.split(/[\n,]+/).filter(f => f.trim());
              if (featuresList.length > 0) {
                setFeaturesContent(prev => ({ ...prev, features: featuresList }));
              }
            }
          }
        }
      } catch (error) {
        console.error('Error fetching features content:', error);
        // Keep default content if API fails
      }
    };

    fetchFeaturesContent();
  }, []);

  return (
    <div
    id="features"
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
              className=" text-3xl lg:text-5xl font-semibold mb-6"
              style={{ color: theme.textColor }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {featuresContent.title}
            </motion.h1>

            <motion.p 
              className="mb-8 leading-relaxed"
              style={{ color: theme.textColor, opacity: 0.7 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {featuresContent.description}
            </motion.p>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {featuresContent.features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                >
                  <div 
                    className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: theme.primaryColor }}
                  ></div>
                  <span 
                    className="text-sm"
                    style={{ color: theme.textColor, opacity: 0.8 }}
                  >{feature}</span>
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

        {/* Additional Features Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
                     <motion.h2 
             className="text-2xl lg:text-4xl font-semibold mb-8"
             style={{ color: theme.textColor }}
             initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.5 }}
          >
             Why Choose ZumTV?
           </motion.h2>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
                         {/* Feature Card 1 */}
             <motion.div 
               className="p-6 rounded-lg shadow-md border"
               style={{ 
                //  backgroundColor: theme.backgroundColor,
                 borderColor: theme.primaryColor + '20'
               }}
               whileHover={{ y: -5, transition: { duration: 0.3 } }}
             >
               <div 
                 className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
                 style={{ backgroundColor: theme.primaryColor + '20' }}
               >
                 <Star 
                   className="w-6 h-6" 
                   style={{ color: theme.primaryColor }}
                 />
               </div>
               <h3 
                 className="text-lg font-semibold mb-2"
                 style={{ color: theme.textColor }}
               >High Quality Streaming</h3>
               <p 
                 className="text-sm"
                 style={{ color: theme.textColor, opacity: 0.7 }}
               >Experience crystal clear streaming with support for multiple resolutions and formats.</p>
             </motion.div>

                         {/* Feature Card 2 */}
             <motion.div 
               className="p-6 rounded-lg shadow-md border"
               style={{ 
                //  backgroundColor: theme.backgroundColor,
                 borderColor: theme.secondaryColor + '20'
               }}
               whileHover={{ y: -5, transition: { duration: 0.3 } }}
             >
               <div 
                 className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
                 style={{ backgroundColor: theme.secondaryColor + '20' }}
               >
                 <Star 
                   className="w-6 h-6" 
                   style={{ color: theme.secondaryColor }}
                 />
               </div>
               <h3 
                 className="text-lg font-semibold mb-2"
                 style={{ color: theme.textColor }}
               >Multi-Platform Support</h3>
               <p 
                 className="text-sm"
                 style={{ color: theme.textColor, opacity: 0.7 }}
               >Available on Windows, Mac, Android, iOS, and more platforms for your convenience.</p>
             </motion.div>

             {/* Feature Card 3 */}
             <motion.div 
               className="p-6 rounded-lg shadow-md border"
               style={{ 
                //  backgroundColor: theme.backgroundColor,
                 borderColor: theme.accentColor + '20'
               }}
               whileHover={{ y: -5, transition: { duration: 0.3 } }}
             >
               <div 
                 className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
                 style={{ backgroundColor: theme.accentColor + '20' }}
               >
                 <Star 
                   className="w-6 h-6" 
                   style={{ color: theme.accentColor }}
                 />
               </div>
               <h3 
                 className="text-lg font-semibold mb-2"
                 style={{ color: theme.textColor }}
               >Easy to Use</h3>
               <p 
                 className="text-sm"
                 style={{ color: theme.textColor, opacity: 0.7 }}
               >Intuitive interface designed for both beginners and advanced users.</p>
             </motion.div>
          </motion.div>
          </motion.div>
        </div>
    </div>
  );
}
