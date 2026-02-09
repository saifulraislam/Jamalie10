import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  whatsappText: string;
}

const ProductShowcase: React.FC = () => {
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState<number | null>(null);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: parseInt(product.price.replace('BDT ', '')),
      image: product.image,
    });

    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const products: Product[] = [
    {
      id: 1,
      name: "Solace Time Keep Journal",
      price: "BDT 850",
      image: "bellydance.png",
      whatsappText: "I'm interested in Solace Time Keep Journal"
    },
    {
      id: 2,
      name: "Ember Time Keep Journal",
      price: "BDT 850",
      image: "jour (2).jpeg",
      whatsappText: "I'm interested in Ember Time Keep Journal"
    },
    {
      id: 3,
      name: "Écru Flower Journal",
      price: "BDT 850",
      image: "jour (3).jpeg",
      whatsappText: "I'm interested in Écru Flower Journal"
    },
    {
      id: 4,
      name: "Noir Red Heart Journal",
      price: "BDT 850",
      image: "jour (4).jpeg",
      whatsappText: "I'm interested in Noir Red Heart Journal"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 0.77, 0.47, 0.97]
      }
    }
  };

  return (
    <section 
      id="collection" 
      className="py-12 md:py-20 bg-[#F5F0E8]"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#5A1E2B] mb-4 tracking-tight">
            Our Curated
            <span className="text-[#D6C1A9] block mt-2">Collection</span>
          </h2>
          <p className="text-base md:text-lg font-inter font-light text-[#5A1E2B]/90 max-w-2xl mx-auto px-4">
            Timeless pieces crafted with intention
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D6C1A9] to-transparent my-6 mx-auto" />
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group bg-white rounded-lg overflow-hidden border border-[#D6C1A9]/30 hover:border-[#E2725B]/50 transition-all duration-300"
            >
              <Link to={`/product/${product.id}`}>
                <div className="relative overflow-hidden h-48 sm:h-56">
                  <motion.img
                    src={product.image}
                    alt={`${product.name} - Premium Artisan Handcrafted Journal`}
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(rgba(226, 114, 91, 0.08), rgba(90, 30, 43, 0.15))'
                    }}
                  />
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-4 text-center">
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-lg font-playfair font-semibold text-[#5A1E2B] mb-1 line-clamp-1 hover:text-[#E2725B] transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-base font-medium text-[#E2725B] mb-3">
                  {product.price}
                </p>

                <div className="flex gap-2">
                  <motion.button
                    onClick={() => handleAddToCart(product)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 inline-flex items-center justify-center gap-1 bg-[#5A1E2B] text-[#D6C1A9] py-1.5 px-3 rounded-full font-inter font-light text-sm hover:bg-[#5A1E2B]/90 transition-all relative overflow-hidden"
                  >
                    <AnimatePresence mode="wait">
                      {addedToCart === product.id ? (
                        <motion.span
                          key="added"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-1"
                        >
                          <Check size={14} />
                          <span>Added</span>
                        </motion.span>
                      ) : (
                        <motion.span
                          key="add"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-1"
                        >
                          <ShoppingBag size={14} />
                          <span>Add</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  <motion.a
                    href={`https://wa.me/8801881445154?text=${encodeURIComponent(product.whatsappText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center border border-[#D6C1A9] text-[#5A1E2B] p-1.5 rounded-full hover:bg-[#D6C1A9]/10 transition-all"
                    title="Order via WhatsApp"
                  >
                    <MessageCircle size={14} className="text-[#E2725B]" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 md:mt-16"
        >
          <p className="text-base md:text-lg font-inter font-light text-[#5A1E2B]/80 mb-4 max-w-2xl mx-auto px-4">
            For custom orders or special requests, we'd love to create something unique for you.
          </p>
          <motion.a
            href="https://wa.me/8801881445154?text=I'd like to make a custom order"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-2 bg-[#E2725B] text-white py-2.5 px-6 rounded-full font-inter font-medium text-sm md:text-base transition-all"
          >
            <MessageCircle size={16} />
            Discuss Custom Order
          </motion.a>
        </motion.div>

        {/* Scroll Indicator (gold line with pulse) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex justify-center mt-12 md:mt-16"
        >
          <motion.div
            animate={{ 
              scaleY: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-px h-10 bg-[#D6C1A9]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase;
