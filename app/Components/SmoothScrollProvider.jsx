'use client'
import Lenis from 'lenis'
import { useEffect, useRef, useState } from "react";

const SmoothScrollProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      return window.innerWidth <= 768 || 
             /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };
    
    const handleResize = () => {
      setIsMobile(checkMobile());
    };
    
    setIsMobile(checkMobile());
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Always clean up previous instances first
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    
    if (lenisRef.current) {
      lenisRef.current.destroy();
      lenisRef.current = null;
    }

    // Always reset CSS properties first
    document.documentElement.style.scrollBehavior = '';
    document.body.style.scrollBehavior = '';
    document.body.style.webkitOverflowScrolling = '';
    document.documentElement.style.webkitOverflowScrolling = '';

    if (isMobile) {
      // Mobile: Use CSS smooth scrolling
      document.documentElement.style.scrollBehavior = 'smooth';
      document.body.style.scrollBehavior = 'smooth';
      document.body.style.webkitOverflowScrolling = 'touch';
      document.documentElement.style.webkitOverflowScrolling = 'touch';
      
      return;
    }

    // Desktop: Use Lenis
    // Small delay to ensure CSS is cleared
    const timeoutId = setTimeout(() => {
      const lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
        smoothTouch: false,
        wheelMultiplier: 1.2,
        touchMultiplier: 0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        duration: 1.2,
        syncTouch: false,
      });

      lenisRef.current = lenis;

      function raf(time) {
        lenis.raf(time);
        rafRef.current = requestAnimationFrame(raf);
      }
      rafRef.current = requestAnimationFrame(raf);
    }, 10);

    return () => {
      clearTimeout(timeoutId);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, [isMobile]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      // Reset CSS on unmount
      document.documentElement.style.scrollBehavior = '';
      document.body.style.scrollBehavior = '';
      document.body.style.webkitOverflowScrolling = '';
      document.documentElement.style.webkitOverflowScrolling = '';
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScrollProvider;