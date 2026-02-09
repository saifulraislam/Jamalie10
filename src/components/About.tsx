import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Award, Users } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: Heart,
      title: "Passionate Craftsmanship",
      description: "Every piece is created with love and attention to detail, ensuring the highest quality."
    },
    {
      icon: Award,
      title: "Timeless Quality",
      description: "We believe in creating products that stand the test of time, both in style and durability."
    },
    {
      icon: Users,
      title: "Community Focused",
      description: "Building relationships with our customers and creating a community around shared values."
    }
  ];

  return (
    <section id="about" className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4">
            Who We
            <span className="gradient-text block mt-2">Are</span>
          </h2>
          <div className="w-16 md:w-24 h-1 bg-maroon-800 mx-auto rounded-full" />
        </motion.div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed mb-6 md:mb-8 px-2">
              Jamaliè is a manifestation of timeless elegance. Our philosophy blends tradition, 
              minimalism, and soulful craftsmanship into every curated drop. With each product, 
              we aim to inspire identity, sophistication, and aesthetic harmony.
            </p>
            
            <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed mb-8 md:mb-12 px-2">
              Founded in 2018, our brand has grown from a small boutique to an internationally 
              recognized name, while maintaining our commitment to quality and attention to detail. 
              Every piece tells a story of passion and dedication.
            </p>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold gradient-text mb-12 md:mb-16"
            >
              Jamaliè
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="text-center p-4 md:p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 touch-manipulation"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-maroon-800 text-white rounded-full mb-4 md:mb-6">
                  <feature.icon size={20} className="md:w-7 md:h-7" />
                </div>
                <h3 className="text-lg md:text-xl font-playfair font-semibold text-gray-900 mb-2 md:mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed px-2">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Quote Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12 md:mt-16 p-6 md:p-8 bg-gradient-to-r from-maroon-50 to-terracotta-50 rounded-2xl"
          >
            <blockquote className="text-lg md:text-2xl lg:text-3xl font-playfair font-medium text-maroon-800 italic leading-relaxed px-2">
              "Fashion fades, but style is eternal. We create pieces that transcend trends and become part of your personal story."
            </blockquote>
            <cite className="block mt-4 md:mt-6 text-base md:text-lg text-gray-600">
              — The Jamaliè Team
            </cite>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;