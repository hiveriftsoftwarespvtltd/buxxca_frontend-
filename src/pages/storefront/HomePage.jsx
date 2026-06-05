import React from "react";
import { SEO } from "../../components/common/SEO";
import { HeroSlider } from "../../components/storefront/home/HeroSlider";
import { CategoryGrid } from "../../components/storefront/home/CategoryGrid";
import { FeaturedProducts } from "../../components/storefront/home/FeaturedProducts";
import { BannerRow } from "../../components/storefront/home/BannerRow";
import { DealOfDay } from "../../components/storefront/home/DealOfDay";
import { BrandShowcase } from "../../components/storefront/home/BrandShowcase";
import { PopularCategories } from "../../components/storefront/home/PopularCategories";
import { RecentProducts } from "../../components/storefront/home/RecentProducts";
import { TestimonialSlider } from "../../components/storefront/home/TestimonialSlider";
import { BlogPreview } from "../../components/storefront/home/BlogPreview";
import { Newsletter } from "../../components/storefront/home/Newsletter";

export const HomePage = () => {
  return (
    <>
      <SEO
        title="BUXAA - Travel in Style"
        description="BUXAA E-Commerce Storefront - Premium marketplace, electronics catalog, smartphones, laptops, smartwatches and accessories."
      />

      {/* 1. Main Swiper Banners Slider & Side Promos */}
      <HeroSlider />

      {/* 2. Brand Logos List & Featured Categories Card Grid */}
      <CategoryGrid />

      {/* 3. Best Sellers Tabbed Section */}
      <FeaturedProducts />

      {/* 4. iPhone, Samsung TV & DJI Drone Promotion Row */}
      <BannerRow />

      {/* 5. Latest Deals Countdown & Related Products Grid */}
      <DealOfDay />

      {/* 5.1. Brand Image Showcase */}
      <BrandShowcase />

      {/* 6. Xbox & Metaverse collections galleries */}
      <PopularCategories />

      {/* 7. Trending This Week Tabbed Section */}
      <RecentProducts />

      {/* 8. Delivery & Payment Features List */}
      <TestimonialSlider />

      {/* 9. Latest News & Events Blog Cards */}
      <BlogPreview />

      {/* 10. Subscribe Newsletter Block */}
      <Newsletter />
    </>
  );
};
export default HomePage;
