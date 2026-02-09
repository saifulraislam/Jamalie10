import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#5A1E2B] text-[#D6C1A9] pt-12 pb-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Footer Content */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {/* Brand Column */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-playfair font-bold mb-4 tracking-tight">Jamaliè</h3>
            <p className="font-inter font-light text-sm md:text-base leading-relaxed max-w-xs mx-auto md:mx-0">
              Timeless craftsmanship and elegant design for the discerning individual.
            </p>
          </div>

          {/* Contact Column */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-playfair font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 font-inter font-light text-sm md:text-base">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Mail size={16} className="text-[#E2725B]" />
                contact@Jamaliè.com
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <MapPin size={16} className="text-[#E2725B]" />
                Dhaka, Bangladesh
              </li>
            </ul>
          </div>

          {/* Social Column */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-playfair font-semibold mb-4">Connect</h4>
            <div className="flex justify-center md:justify-start gap-4">
              <motion.a
                href="https://instagram.com/joyfeesh"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full border border-[#D6C1A9] text-[#D6C1A9] hover:bg-[#D6C1A9]/10 transition-colors"
              >
                <Instagram size={18} />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="w-full h-px bg-[#D6C1A9]/30 my-8"></div>

        {/* Copyright */}
        <div className="text-center font-inter font-light text-xs md:text-sm">
          <p>© {new Date().getFullYear()} Jamaliè. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;