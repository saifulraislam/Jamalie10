import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden font-sans">
      {/* Background Video with enhanced overlay */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/jamalie.mp4" type="video/mp4" />
        </video>
        {/* Enhanced gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(rgba(90, 30, 43, 0.1), rgba(0, 0, 0, 0.6))'
          }}
        />
      </div>

      {/* Original hero content - completely unchanged */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold tracking-wide leading-tight mb-6 drop-shadow-lg"
        >
          Elegance isn't loud,<br />
          <span className="text-[#D6C1A9] mt-1 block">it lingers.</span>
        </motion.h1>

        {/* Elegant decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-[#D6C1A9] to-transparent mx-auto mb-6"
        >
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#D6C1A9] rounded-full" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-white/90 leading-relaxed mb-10 drop-shadow-sm"
        >
          The art of timeless craftsmanship.
        </motion.p>

        <motion.a
          href="https://www.instagram.com/joyfeesh"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ 
            scale: 1.05, 
            y: -3,
            boxShadow: "0 10px 30px rgba(214, 193, 169, 0.3)"
          }}
          whileTap={{ scale: 0.98 }}
          className="group relative inline-flex items-center gap-2 border border-[#D6C1A9] px-8 py-3 rounded-full text-[#D6C1A9] font-medium tracking-wide transition-all duration-300 hover:bg-[#D6C1A9] hover:text-[#5A1E2B] shadow-lg backdrop-blur-sm bg-black/10 overflow-hidden"
        >
          <span className="relative z-10">Visit Our Instagram</span>
          <ExternalLink size={18} className="relative z-10" />
          
          {/* Elegant fill animation */}
          <div className="absolute inset-0 bg-[#D6C1A9] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
        </motion.a>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-transparent via-[#D6C1A9] to-transparent rounded-full"
        />
      </motion.div>

      {/* Subtle corner elements */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-[#D6C1A9]/20 hidden md:block" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-[#D6C1A9]/20 hidden md:block" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-[#D6C1A9]/20 hidden md:block" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-[#D6C1A9]/20 hidden md:block" />
    </section>
  );
};

export default Hero;
