"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Banner } from "@/lib/types";

interface HeroSliderProps {
  banners: Banner[];
  settings: {
    autoPlay: boolean;
    interval: number;
    transition: 'slide' | 'fade';
    showArrows: boolean;
    showDots: boolean;
  };
}

export default function HeroSlider({ banners, settings }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === banners.length - 1 ? 0 : prevIndex + 1));
  }, [banners.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (settings.autoPlay && banners.length > 1) {
      const timer = setInterval(nextSlide, settings.interval);
      return () => clearInterval(timer);
    }
  }, [settings.autoPlay, settings.interval, nextSlide, banners.length]);

  if (!banners || banners.length === 0) return null;

  return (
    <div className="relative h-[80vh] md:h-[90vh] w-full overflow-hidden group">
      {/* Slides */}
      <div 
        className={`w-full h-full flex ${settings.transition === 'slide' ? 'transition-transform duration-700 ease-out' : ''}`}
        style={{ transform: settings.transition === 'slide' ? `translateX(-${currentIndex * 100}%)` : 'none' }}
      >
        {banners.map((banner, index) => {
          const isActive = index === currentIndex;
          return (
            <div 
              key={banner.id} 
              className={`w-full h-full flex-shrink-0 relative ${
                settings.transition === 'fade' 
                  ? `absolute top-0 left-0 transition-opacity duration-1000 ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}` 
                  : ''
              }`}
            >
              <div className="absolute inset-0 z-0 bg-slate-950">
                <Image
                  src={banner.imageUrl}
                  alt={banner.title}
                  fill
                  className="object-cover opacity-60"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950/90" />
              </div>

              <div className={`relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center justify-center h-full transition-all duration-700 delay-300 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-6 leading-[1.1]">
                  {banner.title}
                </h1>
                <p className="text-lg md:text-2xl text-slate-300 mb-10 max-w-2xl font-light">
                  {banner.subtitle}
                </p>
                <Link
                  href={banner.buttonLink}
                  className="bg-white text-slate-950 px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-200 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center"
                >
                  {banner.buttonText}
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      {settings.showArrows && banners.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/40"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/40"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Pagination Dots */}
      {settings.showDots && banners.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
