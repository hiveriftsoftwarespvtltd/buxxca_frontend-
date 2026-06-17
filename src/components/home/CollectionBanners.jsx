import React from 'react';
import { Link } from 'react-router-dom';

export default function CollectionBanners() {
  const bannerCards = [
    {
      eyebrow: 'Pack Light',
      title: 'TRAVEL ESSENTIALS',
      desc: 'Everything you need for seamless travel and organized adventures.',
      img: '/images/discover1.png',
      link: '/shop?cat=travel-bags'
    },
    {
      eyebrow: 'Carry Confidence Daily.',
      title: 'BUSINESS COLLECTION',
      desc: 'Professional essentials designed for productivity and style',
      img: '/images/Discover2.png',
      link: '/shop?cat=laptop-bags'
    },
    {
      eyebrow: 'Gift Better. Impress More',
      title: 'CORPORATE GIFTING',
      desc: 'Premium corporate gifts that strengthen business relationships.',
      img: '/images/Discover3.png',
      link: '/shop?cat=corporate-gifting'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1600px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="block text-[#0A234D] font-semibold tracking-[0.2em] text-xs font-sans uppercase mb-2">
              CURATED FOR YOU
            </span>
            <h2 className="text-2xl md:text-4xl font-bold font-serif text-[#1E1E1E]">
              Discover Collections
            </h2>
            <p className="text-sm text-gray-500 font-sans mt-2 max-w-xl">
              Explore purpose-built collections designed for work, travel, and gifting.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bannerCards.map((banner, idx) => (
            <div
              key={idx}
              className="relative group h-[320px] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
            >
              {/* Background Image */}
              <img
                src={banner.img}
                alt={banner.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#04152F]/90 via-[#04152F]/40 to-transparent group-hover:via-[#04152F]/50 transition-all duration-300" />
              
              {/* Content Box */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-left space-y-2">
                <span className="text-[#D4A23A] font-sans font-bold tracking-[0.15em] text-[11px]">
                  {banner.eyebrow}
                </span>
                <h3 className="text-xl font-bold font-serif text-white tracking-wide">
                  {banner.title}
                </h3>
                <p className="text-xs text-gray-300 font-sans leading-relaxed max-w-[240px]">
                  {banner.desc}
                </p>
                <div className="pt-2">
                  <Link
                    to={banner.link}
                    className="inline-block text-white text-xs font-semibold tracking-wider border-b border-white hover:border-[#D4A23A] hover:text-[#D4A23A] pb-1 transition-all duration-300"
                  >
                    Shop Now &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
