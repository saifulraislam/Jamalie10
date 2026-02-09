import React from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import Hero from '../components/Hero';
import ProductShowcase from '../components/ProductShowcase';
import ImageSlider from '../components/ImageSlider';
import Gallery from '../components/Gallery';
import QuoteSection from '../components/QuoteSection';

const HomePage: React.FC = () => {
  usePageMeta({
    title: 'Timeless Luxury & Handcrafted Elegance',
    description: 'Discover Jamaliè\'s artisan-crafted collection of premium journals, accessories, and timeless pieces. Where quiet elegance and sustainable craftsmanship converge.',
    keywords: 'luxury journals, artisan crafts, handmade accessories, premium lifestyle, timeless elegance',
    ogImage: '/jamaliepage.png'
  });

  return (
    <>
      <Hero />
      <ProductShowcase />
      <ImageSlider />
      <Gallery />
      <QuoteSection />
    </>
  );
};

export default HomePage;