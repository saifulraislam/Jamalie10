import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

interface StoryItem {
  id: number;
  image: string;
  caption: string;
}

const InstagramStoryGallery: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const stories: StoryItem[] = [
    { id: 1, image: "storyofjamalie1.webp", caption: "First Light" },
    { id: 2, image: "storyofjamalie2.webp", caption: "Handbound" },
    { id: 3, image: "storyofjamalie3.webp", caption: "Sheer Contemplation" },
    { id: 4, image: "storyofjamalie4.webp", caption: "Nightfall Pages" },
    { id: 5, image: "storyofjamalie5.webp", caption: "Garden Sanctuary" },
    { id: 6, image: "storyofjamalie6.webp", caption: "Craftsmanship" }
  ];

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setProgress(0);
    } else {
      setIsOpen(false);
      setCurrentIndex(0);
      setProgress(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setProgress(0);
    }
  };

  const openStory = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
    setProgress(0);
    setIsPaused(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setCurrentIndex(0);
    setProgress(0);
    setIsPaused(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const handleScreenClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    if (x < width / 3) {
      handlePrev();
    } else if (x > (width * 2) / 3) {
      handleNext();
    }
  };

  useEffect(() => {
    if (!isOpen || isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + 1;
      });
    }, 50);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isOpen, isPaused, currentIndex]);

  return (
    <section 
      id="gallery" 
      className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 relative overflow-hidden"
      style={{ backgroundColor: '#F8F4ED' }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#5A1E2B]/10 via-transparent to-[#E2725B]/10" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#5A1E2B] mb-4 sm:mb-6 tracking-tight leading-tight">
            Jamaliè
            <span className="text-[#D6C1A9] block mt-1 sm:mt-2">Aesthetics</span>
          </h2>
          
          <p className="text-sm sm:text-base md:text-lg text-[#5A1E2B]/80 max-w-2xl mx-auto px-4 leading-relaxed">
            A glimpse into our creative process and the inspiration behind our timeless collections.
          </p>
          
          <div className="w-16 sm:w-20 md:w-24 h-px bg-gradient-to-r from-transparent via-[#D6C1A9] to-transparent my-6 sm:my-8 mx-auto" />
        </motion.div>

        {/* Story Strip - Horizontal Scroll */}
        <div className="relative -mx-4 sm:mx-0">
          {/* Scrollable Container */}
          <div 
            className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 px-4 sm:px-0 snap-x snap-mandatory scrollbar-hide max-w-7xl mx-auto"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {stories.map((story, index) => (
              <motion.button
                key={story.id}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openStory(index)}
                className="relative flex-shrink-0 w-28 h-48 sm:w-32 sm:h-56 md:w-36 md:h-64 lg:w-40 lg:h-72 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#E2725B] focus:ring-offset-2 focus:ring-offset-[#F8F4ED] snap-start"
              >
                {/* Gradient Ring Border */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-[#E2725B] via-[#D6C1A9] to-[#5A1E2B] p-[2px] sm:p-[3px] group-hover:p-[3px] sm:group-hover:p-[4px] transition-all duration-300">
                  <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-white relative">
                    <img
                      src={story.image}
                      alt={story.caption}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    
                    {/* Caption */}
                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4">
                      <p className="text-white text-xs sm:text-sm md:text-base font-medium text-center drop-shadow-lg">
                        {story.caption}
                      </p>
                    </div>

                    {/* Play Indicator */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Play size={20} className="text-white ml-1" fill="white" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Story Viewer Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            style={{ touchAction: 'pan-y' }}
          >
            {/* Progress Bars */}
            <div className="absolute top-0 left-0 right-0 flex gap-1 sm:gap-1.5 p-2 sm:p-3 md:p-4 z-30 max-w-2xl mx-auto w-full">
              {stories.map((_, index) => (
                <div key={index} className="flex-1 h-0.5 sm:h-1 bg-white/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white rounded-full"
                    style={{
                      width: index < currentIndex ? '100%' : index === currentIndex ? `${progress}%` : '0%'
                    }}
                    transition={{ duration: 0.05, ease: "linear" }}
                  />
                </div>
              ))}
            </div>

            {/* Header */}
            <div className="absolute top-0 left-0 right-0 pt-10 sm:pt-12 md:pt-14 pb-4 px-3 sm:px-4 md:px-6 bg-gradient-to-b from-black/60 to-transparent z-20 max-w-2xl mx-auto w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#E2725B] to-[#D6C1A9] p-[2px]">
                    <div className="w-full h-full rounded-full bg-[#5A1E2B] flex items-center justify-center text-white font-serif font-bold text-xs sm:text-sm">
                      J
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm sm:text-base">Jamaliè</p>
                    <p className="text-white/80 text-xs sm:text-sm">{stories[currentIndex].caption}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 sm:gap-2">
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="text-white p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors active:scale-95"
                    aria-label={isPaused ? "Play" : "Pause"}
                  >
                    {isPaused ? <Play size={18} className="sm:w-5 sm:h-5" /> : <Pause size={18} className="sm:w-5 sm:h-5" />}
                  </button>
                  <button
                    onClick={handleClose}
                    className="text-white p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors active:scale-95"
                    aria-label="Close"
                  >
                    <X size={22} className="sm:w-6 sm:h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Story Content Container */}
            <div 
              className="relative w-full h-full max-w-2xl mx-auto flex items-center justify-center"
              onClick={handleScreenClick}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={currentIndex}
                  src={stories[currentIndex].image}
                  alt={stories[currentIndex].caption}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="w-full h-full object-contain select-none"
                  draggable={false}
                />
              </AnimatePresence>

              {/* Click Zone Indicators (Desktop Only) */}
              <div className="hidden md:flex absolute inset-0 pointer-events-none">
                <div className="w-1/3 h-full" />
                <div className="w-1/3 h-full" />
                <div className="w-1/3 h-full" />
              </div>
            </div>

            {/* Desktop Navigation Buttons */}
            <div className="hidden md:flex absolute inset-y-0 left-0 right-0 items-center justify-between px-4 lg:px-6 pointer-events-none z-20 max-w-3xl mx-auto w-full">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`pointer-events-auto p-2 lg:p-3 rounded-full backdrop-blur-md transition-all ${
                  currentIndex === 0
                    ? 'opacity-0 cursor-not-allowed'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
                aria-label="Previous story"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button
                onClick={handleNext}
                className="pointer-events-auto p-2 lg:p-3 rounded-full backdrop-blur-md bg-white/10 hover:bg-white/20 text-white transition-all"
                aria-label="Next story"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Caption Overlay */}
            <div className="absolute bottom-0 left-0 right-0 pb-6 sm:pb-8 md:pb-10 px-4 sm:px-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 pointer-events-none max-w-2xl mx-auto w-full">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={currentIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-semibold text-center drop-shadow-2xl"
                >
                  {stories[currentIndex].caption}
                </motion.h3>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hide Scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default InstagramStoryGallery;
