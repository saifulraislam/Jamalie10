import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MessageCircle, Truck, Check, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { usePageMeta } from '../hooks/usePageMeta';

const CheckoutPage: React.FC = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const [checkoutMethod, setCheckoutMethod] = useState<'whatsapp' | 'cod' | null>(null);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    birthday: '',
    isGift: false,
    giftRecipientName: ''
  });

  usePageMeta({
    title: 'Checkout',
    description: 'Complete your Jamaliè order - choose WhatsApp ordering or Cash on Delivery.',
    keywords: 'checkout, payment, order confirmation'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    const orderSummary = cart
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} (x${item.quantity}) – ${item.price * item.quantity} BDT`
      )
      .join('\n');

    const total = getCartTotal();
    const message = `Hello Jamaliè, I'd like to order the following items:\n\n${orderSummary}\n\nTotal: ${total} BDT\n\nPlease confirm availability.`;

    const whatsappUrl = `https://wa.me/8801881445154?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCODSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phoneNumber || !formData.address || !formData.birthday) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    const orderDetails = {
      method: 'cod',
      customerName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      birthday: formData.birthday,
      isGiftOrder: formData.isGift,
      giftRecipientName: formData.isGift ? formData.giftRecipientName : null,
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.price * item.quantity
      })),
      totalAmount: getCartTotal(),
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderDetails)
      });

      if (!response.ok) {
        let errorMessage = `Server error: ${response.status}`;
        try {
          const errorData = await response.json() as { error?: string };
          errorMessage = errorData?.error ?? errorMessage;
        } catch {
          const text = await response.text();
          errorMessage = text || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('Order submitted successfully:', result);

      setShowToast(true);
      setOrderSubmitted(true);
      clearCart();

      // Auto-redirect after 5 seconds
      setTimeout(() => {
        window.location.href = '/';
      }, 5000);
    } catch (error) {
      console.error('Error submitting order:', error);
      const message = error instanceof Error ? error.message : 'Network error. Please check your connection.';
      alert(`Order submission failed: ${message}`);
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="pt-20 bg-[#F5F0E8] min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <h2 className="text-2xl md:text-3xl font-playfair font-semibold text-[#5A1E2B] mb-4">
            Your cart is empty
          </h2>
          <p className="text-base font-inter text-[#5A1E2B]/80 mb-8">
            Add items before proceeding to checkout
          </p>
          <Link
            to="/collection"
            className="inline-flex items-center gap-2 bg-[#5A1E2B] text-[#D6C1A9] px-6 py-3 rounded-full font-inter font-medium hover:bg-[#5A1E2B]/90 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-[#F5F0E8] min-h-screen">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4"
          >
            <motion.div 
              className="bg-gradient-to-r from-[#E2725B] to-[#D45A45] rounded-2xl p-5 shadow-2xl border border-white/20 backdrop-blur-sm"
              animate={{ 
                boxShadow: [
                  '0 20px 25px -5px rgba(226, 114, 91, 0.4)',
                  '0 25px 30px -5px rgba(226, 114, 91, 0.6)',
                  '0 20px 25px -5px rgba(226, 114, 91, 0.4)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 25 }}
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, delay: 0.4, repeat: 1 }}
                  >
                    <Check className="w-5 h-5 text-[#E2725B] font-bold" />
                  </motion.div>
                </motion.div>
                <motion.div 
                  className="flex-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <h3 className="text-white font-playfair font-semibold text-lg">
                    Order Confirmed! ✓
                  </h3>
                  <p className="text-white/95 font-inter text-sm mt-1">
                    Your order has been successfully submitted
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {!checkoutMethod && !orderSubmitted ? (
            <motion.div
              key="checkout-methods"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Back Button */}
              <Link
                to="/cart"
                className="inline-flex items-center gap-2 text-[#5A1E2B] hover:text-[#E2725B] transition-colors mb-8"
              >
                <ArrowLeft size={20} />
                <span className="font-inter text-sm">Back to Cart</span>
              </Link>

              <h1 className="text-4xl md:text-5xl font-playfair font-bold text-[#5A1E2B] mb-4 tracking-tight">
                Choose Checkout Method
              </h1>
              <p className="text-base font-inter text-[#5A1E2B]/80 mb-12">
                Select how you'd like to complete your order
              </p>

              {/* Order Summary */}
              <div className="bg-white rounded-xl p-6 border border-[#D6C1A9]/30 mb-12">
                <h2 className="text-xl font-playfair font-semibold text-[#5A1E2B] mb-4">
                  Order Summary
                </h2>
                <div className="space-y-3 mb-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="font-inter text-[#5A1E2B]/80">
                        {item.name} (x{item.quantity})
                      </span>
                      <span className="font-inter font-medium text-[#5A1E2B]">
                        {item.price * item.quantity} BDT
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#D6C1A9]/30 pt-4">
                  <div className="flex justify-between">
                    <span className="font-playfair font-semibold text-[#5A1E2B]">
                      Total
                    </span>
                    <span className="font-playfair font-semibold text-[#E2725B] text-lg">
                      {getCartTotal()} BDT
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Methods */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* WhatsApp Method */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    handleWhatsAppCheckout();
                    setCheckoutMethod('whatsapp');
                  }}
                  className="group relative text-left p-8 rounded-2xl border-2 border-[#E2725B] bg-white hover:bg-[#FFF8F3] transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E2725B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-[#E2725B]/10 flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-[#E2725B]" />
                      </div>
                      <h3 className="text-xl font-playfair font-semibold text-[#5A1E2B]">
                        WhatsApp Order
                      </h3>
                    </div>
                    <p className="text-sm font-inter text-[#5A1E2B]/70 mb-4">
                      Send your order directly to our WhatsApp. We'll confirm availability and arrange delivery.
                    </p>
                    <div className="text-xs font-inter text-[#E2725B] font-medium">
                      Click to start →
                    </div>
                  </div>
                </motion.button>

                {/* COD Method */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCheckoutMethod('cod')}
                  className="group relative text-left p-8 rounded-2xl border-2 border-[#5A1E2B] bg-white hover:bg-[#F8F3E9] transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#5A1E2B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-[#5A1E2B]/10 flex items-center justify-center">
                        <Truck className="w-6 h-6 text-[#5A1E2B]" />
                      </div>
                      <h3 className="text-xl font-playfair font-semibold text-[#5A1E2B]">
                        Cash on Delivery
                      </h3>
                    </div>
                    <p className="text-sm font-inter text-[#5A1E2B]/70 mb-4">
                      Fill out your details and pay when your order arrives. Quick and secure.
                    </p>
                    <div className="text-xs font-inter text-[#5A1E2B]/60 font-medium">
                      Continue to form →
                    </div>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          ) : checkoutMethod === 'cod' && !orderSubmitted ? (
            <motion.div
              key="cod-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              {/* Back Button */}
              <button
                onClick={() => setCheckoutMethod(null)}
                className="inline-flex items-center gap-2 text-[#5A1E2B] hover:text-[#E2725B] transition-colors mb-8"
              >
                <ArrowLeft size={20} />
                <span className="font-inter text-sm">Change Method</span>
              </button>

              <h1 className="text-4xl md:text-5xl font-playfair font-bold text-[#5A1E2B] mb-2 tracking-tight">
                Delivery Details
              </h1>
              <p className="text-base font-inter text-[#5A1E2B]/80 mb-8">
                Complete your order information
              </p>

              {/* COD Form */}
              <form
                onSubmit={handleCODSubmit}
                className="space-y-6 bg-white rounded-2xl p-8 border border-[#D6C1A9]/30"
              >

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-playfair font-semibold text-[#5A1E2B] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 border border-[#D6C1A9]/50 rounded-xl font-inter text-[#5A1E2B] placeholder-[#5A1E2B]/40 focus:outline-none focus:border-[#E2725B] focus:ring-2 focus:ring-[#E2725B]/20 transition-all"
                    required
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-playfair font-semibold text-[#5A1E2B] mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="+880 1234 567890"
                    className="w-full px-4 py-3 border border-[#D6C1A9]/50 rounded-xl font-inter text-[#5A1E2B] placeholder-[#5A1E2B]/40 focus:outline-none focus:border-[#E2725B] focus:ring-2 focus:ring-[#E2725B]/20 transition-all"
                    required
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-playfair font-semibold text-[#5A1E2B] mb-2">
                    Delivery Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Street address, building, apartment, etc."
                    rows={3}
                    className="w-full px-4 py-3 border border-[#D6C1A9]/50 rounded-xl font-inter text-[#5A1E2B] placeholder-[#5A1E2B]/40 focus:outline-none focus:border-[#E2725B] focus:ring-2 focus:ring-[#E2725B]/20 transition-all resize-none"
                    required
                  />
                </div>

                {/* Birthday */}
                <div>
                  <label className="block text-sm font-playfair font-semibold text-[#5A1E2B] mb-2">
                    Birthday (MM/DD/YYYY) *
                  </label>
                  <input
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#D6C1A9]/50 rounded-xl font-inter text-[#5A1E2B] focus:outline-none focus:border-[#E2725B] focus:ring-2 focus:ring-[#E2725B]/20 transition-all"
                    required
                  />
                </div>

                {/* Gift Option */}
                <div className="bg-[#F5F0E8] p-4 rounded-xl">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isGift"
                      checked={formData.isGift}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded accent-[#E2725B] cursor-pointer"
                    />
                    <span className="text-sm font-inter text-[#5A1E2B]">
                      This is a gift for someone else
                    </span>
                  </label>
                </div>

                {/* Gift Recipient Name */}
                {formData.isGift && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="block text-sm font-playfair font-semibold text-[#5A1E2B] mb-2">
                      Gift Recipient's Name
                    </label>
                    <input
                      type="text"
                      name="giftRecipientName"
                      value={formData.giftRecipientName}
                      onChange={handleInputChange}
                      placeholder="Recipient's full name"
                      className="w-full px-4 py-3 border border-[#D6C1A9]/50 rounded-xl font-inter text-[#5A1E2B] placeholder-[#5A1E2B]/40 focus:outline-none focus:border-[#E2725B] focus:ring-2 focus:ring-[#E2725B]/20 transition-all"
                    />
                  </motion.div>
                )}

                {/* Order Summary */}
                <div className="border-t border-[#D6C1A9]/30 pt-6 mt-6">
                  <h3 className="text-sm font-playfair font-semibold text-[#5A1E2B] mb-3">
                    Order Summary
                  </h3>
                  <div className="space-y-2 mb-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between text-xs">
                        <span className="font-inter text-[#5A1E2B]/70">
                          {item.name} (x{item.quantity})
                        </span>
                        <span className="font-inter font-medium text-[#5A1E2B]">
                          {item.price * item.quantity} BDT
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between border-t border-[#D6C1A9]/20 pt-3">
                    <span className="font-playfair font-semibold text-[#5A1E2B]">
                      Total
                    </span>
                    <span className="font-playfair font-semibold text-[#E2725B]">
                      {getCartTotal()} BDT
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#5A1E2B] text-[#D6C1A9] py-3 rounded-full font-inter font-medium hover:bg-[#5A1E2B]/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Check size={20} />
                  {isSubmitting ? 'Submitting...' : 'Complete Order'}
                </motion.button>

                <p className="text-xs font-inter text-[#5A1E2B]/60 text-center">
                  We'll send your order confirmation to jamalimahmudjoy@gmail.com
                </p>
              </form>
            </motion.div>
          ) : orderSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-xl mx-auto text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 bg-[#E2725B] rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Check className="w-10 h-10 text-white" />
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-[#5A1E2B] mb-4">
                Order Confirmed
              </h2>

              <p className="text-base font-inter text-[#5A1E2B]/80 mb-2">
                Thank you for your purchase, {formData.fullName}.
              </p>

              <p className="text-base font-inter text-[#5A1E2B]/70 mb-8">
                We've received your order details. Our team will contact you shortly at {formData.phoneNumber} to confirm and arrange delivery.
              </p>

              <div className="bg-[#F5F0E8] rounded-xl p-6 mb-8">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#E2725B] flex-shrink-0 mt-1" />
                  <div className="text-left">
                    <p className="text-sm font-inter font-semibold text-[#5A1E2B]">
                      Confirmation Email Sent
                    </p>
                    <p className="text-xs font-inter text-[#5A1E2B]/70 mt-1">
                      Order details have been sent to jamalimahmudjoy@gmail.com
                    </p>
                  </div>
                </div>
              </div>

              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-[#5A1E2B] text-[#D6C1A9] px-6 py-3 rounded-full font-inter font-medium hover:bg-[#5A1E2B]/90 transition-colors"
              >
                Return to Home
              </Link>

              <p className="text-xs font-inter text-[#5A1E2B]/50 mt-6">
                Redirecting in 5 seconds...
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CheckoutPage;
