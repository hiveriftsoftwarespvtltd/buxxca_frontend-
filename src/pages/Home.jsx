import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSlider from '../components/home/HeroSlider';
import WhyBuxaa from '../components/home/WhyBuxaa';
import CategoriesGrid from '../components/home/CategoriesGrid';
import CollectionBanners from '../components/home/CollectionBanners';
import TrendingProducts from '../components/home/TrendingProducts';
import SplitFeature from '../components/home/SplitFeature';
import TrustBadges from '../components/home/TrustBadges';
import StoriesBlog from '../components/home/StoriesBlog';

export default function Home() {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="page-transition min-h-screen bg-[#F5F5F5]">
      <Helmet>
        <title>BUXAA | Premium Bags, Suitcases & Luggage</title>
        <meta name="description" content="Discover BUXAA premium backpacks, travel duffels, executive laptop bags, and hardshell suitcases. Crafted with German polycarbonate, waxed canvas, and YKK zippers." />
        <link rel="canonical" href="https://buxaa.com/" />
      </Helmet>
      
      {/* 1. Hero Slider Section */}
      <HeroSlider />

      {/* Why BUXAA USP Section */}
      {/* <WhyBuxaa /> */}

      {/* 2. Premium Collection (8-Column Categories Grid) */}
      <CategoriesGrid />

      {/* 3. Collection Banners Grid (3-Column) */}
      <CollectionBanners />

      {/* 4. Trending Products (4-Column Best Sellers) */}
      <TrendingProducts />

      {/* 5. Split Feature Luggage Banner Block */}
      <SplitFeature />

      {/* 6. Trust Badges Row */}
      <TrustBadges />

      {/* 7. BUXAA Stories (Blog/PR) */}
      <StoriesBlog />

    </div>
  );
}
