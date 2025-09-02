"use client";
import { useState, useEffect } from "react";

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(4);
  const [movies, setMovies] = useState([]);

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_KEY;
  const IMG_BASE = "https://image.tmdb.org/t/p/w500";
  
  // Build a "family-friendly" Discover URL (PG-13 or below)
  const discoverURL = (page = 1) => {
    const thisYear = new Date().getFullYear();
    return (
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}` +
      `&sort_by=popularity.desc` +
      `&include_adult=false&include_video=false` +
      `&region=US&with_original_language=en` +
      `&certification_country=US&certification.lte=PG-13` +
      `&primary_release_date.gte=${thisYear}-01-01` + // 👈 Only movies from this year
      `&page=${page}`
    );
  };
  
  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(discoverURL(1));
        const data = await res.json();
  
        // extra safety: remove any adult flags + missing posters
        const safe = (data.results || []).filter(
          (m) => !m.adult && m.poster_path && (m.vote_count ?? 0) > 20
        );
  
        setMovies(safe);
      } catch (e) {
        console.error("TMDb fetch failed:", e);
      }
    }
    fetchMovies();
  }, [API_KEY]);

  const totalSlides = movies.length;

  // Adjust slides per view
  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(4);
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
        prev >= totalSlides - slidesPerView ? 0 : prev + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [totalSlides, slidesPerView]);

  return (
    <div className="container mx-auto py-24 md:px-0 px-2">
      <h1 className="text-3xl lg:text-5xl font-poppins font-semibold text-center text-gray-900 mb-12">
        Join now and watch our Service on any device!
      </h1>

      <div className="relative overflow-hidden">
        <div
          className="flex gap-4 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)` }}
        >
          {movies.map((movie, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 flex justify-center"
            >
              <img
                src={`${IMG_BASE}${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-[550px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
