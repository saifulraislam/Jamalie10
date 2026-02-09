import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SlideData {
  id: number;
  image: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
  title: string;
  subtitle: string;
}

const ImageSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slides: SlideData[] = [
    {
      id: 1,
      image: {
        desktop: "mood (2).jpeg",
        tablet: "mood (2).jpeg",
        mobile: "mood (2).jpeg"
      },
      title: "Artisan Craftsmanship",
      subtitle: "Handcrafted with precision and passion"
    },
    {
      id: 2,
      image: {
        desktop: "mood (3).jpeg",
        tablet: "mood (3).jpeg",
        mobile: "mood (3).jpeg"
      },
      title: "Premium Materials",
      subtitle: "Only the finest materials make the cut"
    },
    {
      id: 3,
      image: {
        desktop: "mood(4).jpeg",
        tablet: "mood(4).jpeg",
        mobile: "mood(4).jpeg"
      },
      title: "Timeless Design",
      subtitle: "Elegance that transcends trends"
    },
    {
      id: 4,
      image: {
        desktop: "mood (1).jpeg",
        tablet: "mood (1).jpeg",
        mobile: "mood (1).jpeg"
      },
      title: "Luxury Collection",
      subtitle: "Discover our signature pieces"
    }
  ];

  // Enhanced auto-play with progress tracking
  useEffect(() => {
    if (!isAutoPlaying) return;

    let startTime = Date.now();
    const duration = 5000; // 5 seconds

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progressPercent = Math.min((elapsed / duration) * 100, 100);
      setProgress(progressPercent);

      if (progressPercent >= 100) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setDirection(1);
        startTime = Date.now();
        setProgress(0);
      }
    };

    intervalRef.current = setInterval(updateProgress, 50);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying, currentSlide, slides.length]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Navigation functions
  const goToSlide = useCallback((index: number) => {
    const newDirection = index > currentSlide ? 1 : -1;
    setDirection(newDirection);
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setProgress(0);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  }, [currentSlide]);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setProgress(0);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setProgress(0);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  }, [slides.length]);

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
    if (isAutoPlaying) setProgress(0);
  };

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.05
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95
    })
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#F5F0E8] to-[#F0E8D8]">
      {/* Enhanced Image Slider */}
      <div 
        ref={containerRef}
        className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh] max-h-[600px]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 },
              scale: { duration: 0.6 }
            }}
            className="absolute inset-0"
          >
            {/* Enhanced Responsive Images */}
            <div className="relative w-full h-full overflow-hidden">
              <picture>
                <source media="(min-width: 1200px)" srcSet={slides[currentSlide].image.desktop} />
                <source media="(min-width: 768px)" srcSet={slides[currentSlide].image.tablet} />
                <img
                  src={slides[currentSlide].image.mobile}
                  alt={`${slides[currentSlide].title} - ${slides[currentSlide].subtitle}`}
                  className="w-full h-full object-cover transition-transform duration-[8s] ease-out hover:scale-105"
                  loading="lazy"
                  onLoad={() => setIsLoading(false)}
                />
              </picture>

              {/* Enhanced Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#5A1E2B]/70 via-[#5A1E2B]/50 to-[#5A1E2B]/70" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#5A1E2B]/60 via-transparent to-[#5A1E2B]/30" />

              {/* Loading State */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#5A1E2B]/20 backdrop-blur-sm flex items-center justify-center"
                  >
                    <div className="w-8 h-8 border-2 border-[#D6C1A9] border-t-transparent rounded-full animate-spin" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Enhanced Slide Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
                  <motion.div
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    key={`content-${currentSlide}`}
                  >
                    <motion.h2 
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 
                                font-playfair font-bold mb-3 md:mb-6 text-[#D6C1A9] 
                                drop-shadow-lg leading-tight"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      {slides[currentSlide].title}
                    </motion.h2>
                    
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="w-16 sm:w-20 md:w-24 h-px bg-[#D6C1A9] mx-auto mb-4 md:mb-6"
                    />
                    
                    <motion.p 
                      className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 
                                text-[#F5F0E8] font-light tracking-wide sm:tracking-wider 
                                leading-relaxed drop-shadow-md max-w-2xl mx-auto"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                    >
                      {slides[currentSlide].subtitle}
                    </motion.p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Enhanced Navigation Arrows */}
        <motion.button
          onClick={prevSlide}
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.9 }}
          className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 
                    w-10 h-10 sm:w-12 sm:h-12 bg-[#5A1E2B]/80 backdrop-blur-md 
                    rounded-full flex items-center justify-center text-[#D6C1A9] 
                    hover:bg-[#5A1E2B] transition-all duration-300 z-20 
                    border border-[#D6C1A9]/30 shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
        </motion.button>
        
        <motion.button
          onClick={nextSlide}
          whileHover={{ scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 
                    w-10 h-10 sm:w-12 sm:h-12 bg-[#5A1E2B]/80 backdrop-blur-md 
                    rounded-full flex items-center justify-center text-[#D6C1A9] 
                    hover:bg-[#5A1E2B] transition-all duration-300 z-20 
                    border border-[#D6C1A9]/30 shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight size={20} className="sm:w-6 sm:h-6" />
        </motion.button>

        {/* Enhanced Controls Bar */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center space-x-4 bg-[#5A1E2B]/80 backdrop-blur-md 
                         rounded-full px-4 py-2 border border-[#D6C1A9]/20">
            {/* Play/Pause Button */}
            <motion.button
              onClick={toggleAutoPlay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 flex items-center justify-center text-[#D6C1A9] 
                        hover:text-[#F5F0E8] transition-colors duration-200"
              aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
            </motion.button>

            {/* Enhanced Slide Indicators */}
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-[#D6C1A9]' 
                      : 'bg-[#D6C1A9]/40 hover:bg-[#D6C1A9]/70'
                  }`} />
                  
                  {/* Progress Ring for Current Slide */}
                  {index === currentSlide && isAutoPlaying && (
                    <div className="absolute inset-0 w-2 h-2 sm:w-2.5 sm:h-2.5">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 20 20">
                        <circle
                          cx="10"
                          cy="10"
                          r="8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray={`${2 * Math.PI * 8}`}
                          strokeDashoffset={`${2 * Math.PI * 8 * (1 - progress / 100)}`}
                          className="text-[#D6C1A9] transition-all duration-75 ease-linear"
                        />
                      </svg>
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Brand Section */}
      <div className="bg-gradient-to-b from-[#F5F0E8] to-[#F0E8D8] py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Enhanced Brand Identity */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-12 sm:mb-16 md:mb-20"
          >
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-[#5A1E2B] mb-6 sm:mb-8 leading-none"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              JAMALIÈ
            </motion.h1>
            
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative mb-6 sm:mb-8"
            >
              <div className="h-px bg-gradient-to-r from-transparent via-[#D6C1A9] to-transparent max-w-xs mx-auto" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                             w-2 h-2 bg-[#D6C1A9] rounded-full" />
            </motion.div>
            
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-[#5A1E2B] tracking-widest uppercase font-light mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Timeless Elegance
            </motion.p>
            
            <motion.p 
              className="text-sm sm:text-base text-[#5A1E2B]/70 tracking-wider"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              EST. 2018
            </motion.p>
          </motion.div>

          {/* Enhanced Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 justify-center items-center max-w-2xl mx-auto mb-12 sm:mb-16"
          >
            <Link to="/collection" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 30px rgba(90, 30, 43, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full sm:w-auto bg-[#5A1E2B] text-[#F5F0E8] 
                          px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-medium 
                          overflow-hidden transition-all duration-300 hover:shadow-xl
                          border border-[#5A1E2B]"
              >
                <span className="relative z-10 tracking-wider">SHOP COLLECTION</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#3A121D] to-[#5A1E2B] 
                               transform -translate-x-full group-hover:translate-x-0 
                               transition-transform duration-300" />
              </motion.button>
            </Link>
            
            <Link to="/about" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: "#5A1E2B",
                  color: "#F5F0E8"
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto border-2 border-[#5A1E2B] text-[#5A1E2B] 
                          px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-medium 
                          transition-all duration-300 hover:shadow-lg tracking-wider"
              >
                OUR STORY
              </motion.button>
            </Link>
          </motion.div>

          {/* Enhanced Decorative Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center items-center space-x-6 sm:space-x-8"
          >
            <motion.div 
              className="w-12 sm:w-16 md:w-20 h-px bg-gradient-to-r from-transparent to-[#D6C1A9]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            />
            <motion.div 
              className="w-3 h-3 bg-[#D6C1A9] rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="w-12 sm:w-16 md:w-20 h-px bg-gradient-to-l from-transparent to-[#D6C1A9]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImageSlider;
