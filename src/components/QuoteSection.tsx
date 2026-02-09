import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const QuoteSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-maroon-50 to-terracotta-50">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <Quote className="w-12 h-12 md:w-16 md:h-16 text-maroon-800 mx-auto mb-6 opacity-60" />
          
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-playfair font-medium text-maroon-800 italic leading-relaxed mb-8">
            "Fashion fades, but style is eternal. We create pieces that transcend trends and become part of your personal story."
          </blockquote>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-600"
          >
            — The Jamaliè Team
          </motion.div>

          {/* Decorative Elements */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <div className="w-8 h-0.5 bg-maroon-800 opacity-60" />
            <div className="w-2 h-2 bg-maroon-800 rounded-full opacity-60" />
            <div className="w-8 h-0.5 bg-maroon-800 opacity-60" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuoteSection;