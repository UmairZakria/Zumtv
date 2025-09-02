"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { LoaderCircle } from 'lucide-react';


const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    primaryColor: '#203540',
    secondaryColor: '#203540',
    accentColor: '#203540',
    backgroundColor: '#203540',
    textColor: '#1F2937'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTheme();
  }, []);

  const fetchTheme = async () => {
    try {
      const response = await fetch('/api/themes');
      const data = await response.json();
      
      if (data.status === 'success' && data.data && data.data.length > 0) {
        const activeTheme = data.data.find(t => t.isActive) || data.data[0];
        setTheme({
          primaryColor: activeTheme.primaryColor,
          secondaryColor: activeTheme.secondaryColor,
          accentColor: activeTheme.accentColor,
          backgroundColor: activeTheme.backgroundColor,
          textColor: activeTheme.textColor
        });
        
        // Apply theme to CSS custom properties
        applyThemeToCSS(activeTheme);
      }
    } catch (error) {
      console.error('Error fetching theme:', error);
      // Apply default theme
      applyThemeToCSS(theme);
    } finally {
      setLoading(false);
    }
  };

  const applyThemeToCSS = (themeData) => {
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', themeData.primaryColor);
    root.style.setProperty('--theme-secondary', themeData.secondaryColor);
    root.style.setProperty('--theme-accent', themeData.accentColor);
    root.style.setProperty('--theme-background', themeData.backgroundColor);
    root.style.setProperty('--theme-text', themeData.textColor);
  };

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    applyThemeToCSS(newTheme);
  };

  const value = {
    theme,
    loading,
    updateTheme,
    refreshTheme: fetchTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {loading && (
        <div className='flex items-center justify-center h-screen w-full bg-gray-50' >
          <LoaderCircle className="animate-spin transition-all duration-300 ease-in " />
        </div>
     )}
     
     {!loading ? (

        children
     ):""
      
     }
    </ThemeContext.Provider>
  );
};
