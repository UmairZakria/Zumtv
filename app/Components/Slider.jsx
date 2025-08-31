"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(4); // Default desktop

  const shows = [
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEmHN3GJj5FwwdXGRGgcobyHeF41NDMJyo7w&s",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5o1xI_HM9qIHfnOhJuTD027XPM5ihqUOXsA&s",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq-nmAi-josdg_AUhzjux6A0dMcFLxDm2TTw&s",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfRLf-xxTWf-6JseTR7wnv-IRd8RnEB6XS4A&s",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7bLfOhHbxAH_21BUvVjjJjpmeyu-Fr-oC3A&s",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt8VyfW6IzCZBeKuRFWKxqPYVnAB03ZWnmyw&s",
    },
  ];

  const totalSlides = shows.length;

  // Detect screen size and adjust slides per view
  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2); // Tablet
      } else {
        setSlidesPerView(4); // Desktop
      }
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === totalSlides - slidesPerView ? 0 : prev + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [totalSlides, slidesPerView]);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? totalSlides - slidesPerView : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === totalSlides - slidesPerView ? 0 : prev + 1
    );
  };

  return (
    <div className="container mx-auto py-24 ">
      {/* Header */}
      <h1 className="text-5xl font-poppins font-semibold text-center text-gray-900 mb-12">
        Join now and watch our Service on any device!
      </h1>

      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        {/* Slides */}
        <div
          className="flex gap-4 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)` }}
        >
          {shows.map((show, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 flex justify-center`}
            >
              <img
                src={show.image}
                alt={`Slide ${index}`}
                className="w-full h-[550px] object-cover "
              />
            </div>
          ))}
        </div>

        {/* Arrows */}

      </div>
    </div>
  );
}
