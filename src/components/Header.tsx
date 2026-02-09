import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Track scroll position for header style
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll lock when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  const { getCartItemCount } = useCart();
  const cartItemCount = getCartItemCount();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/collection', label: 'Collection' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActiveRoute = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-[#D6C1A9]/20'
          : 'bg-transparent py-4 md:py-6'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="text-2xl md:text-3xl font-playfair font-bold text-[#5A1E2B] tracking-tight"
            >
              Jamaliè
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div key={item.href} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to={item.href}
                  className={`relative font-inter font-medium transition-colors duration-200 ${
                    isActiveRoute(item.href)
                      ? 'text-[#5A1E2B]'
                      : 'text-[#5A1E2B]/80 hover:text-[#5A1E2B]'
                  }`}
                >
                  {item.label}
                  {isActiveRoute(item.href) && (
                    <motion.span
                      layoutId="navUnderline"
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#E2725B]"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/cart"
                className="relative inline-flex items-center justify-center text-[#5A1E2B]"
              >
                <ShoppingBag size={22} />
                {cartItemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-[#E2725B] text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </Link>
            </motion.div>
          </nav>

          <div className="lg:hidden flex items-center gap-4">
            <motion.div whileTap={{ scale: 0.9 }}>
              <Link
                to="/cart"
                className="relative inline-flex items-center justify-center text-[#5A1E2B] p-2"
              >
                <ShoppingBag size={22} />
                {cartItemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-[#E2725B] text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </Link>
            </motion.div>

            <motion.button
              ref={buttonRef}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="text-[#5A1E2B] p-2 relative z-50"
              aria-label="Toggle menu"
              style={{
                minWidth: '44px',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isMenuOpen ? (
                <X size={24} className="text-[#5A1E2B]" />
              ) : (
                <Menu size={24} className="text-[#5A1E2B]" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                onClick={toggleMenu}
              />

              {/* Sidebar */}
              <motion.div
                ref={menuRef}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="fixed top-0 right-0 h-screen w-full max-w-xs bg-[#F5F0E8] shadow-xl z-50 border-l border-[#D6C1A9]/30 flex flex-col"
              >
                <div className="p-6 pt-20 flex flex-col flex-1 overflow-y-auto">
                  <nav className="flex-1 space-y-1">
                    {navItems.map((item) => (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          to={item.href}
                          onClick={toggleMenu}
                          className={`block px-4 py-3 text-lg font-inter rounded-lg transition-all ${
                            isActiveRoute(item.href)
                              ? 'text-[#5A1E2B] bg-[#D6C1A9]/20'
                              : 'text-[#5A1E2B]/80 hover:bg-[#D6C1A9]/10'
                          }`}
                          style={{
                            minHeight: '48px',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  <div className="pt-6 mt-auto border-t border-[#D6C1A9]/30">
                    <div className="flex justify-center gap-4 mb-4">
                      <motion.a
                        href="https://instagram.com/jamalie"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-full border border-[#5A1E2B] text-[#5A1E2B] hover:bg-[#5A1E2B] hover:text-[#D6C1A9] transition-colors"
                        style={{
                          minWidth: '44px',
                          minHeight: '44px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Instagram size={18} />
                      </motion.a>
                    </div>
                    <p className="text-center text-sm text-[#5A1E2B]/60 font-inter">
                      © {new Date().getFullYear()} Jamaliè
                    </p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
