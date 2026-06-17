import React from 'react';
import { Link } from 'react-router-dom';

export default function StoriesBlog() {
  const stories = [
    {
      date: 'May 28, 2026',
      title: 'How to Pack Smarter for Business Trips',
      img: '/images/Buxaa1.png',
      link: '/about'
    },
    {
      date: 'May 20, 2026',
      title: 'Best Laptop Bags for Professionals',
      img: '/images/Buxaa2.png',
      link: '/about'
    },
    {
      date: 'May 13, 2026',
      title: 'Travel Essentials Every Explorer Needs',
      img: '/images/Buxaa3.png',
      link: '/about'
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1600px] mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="text-left">
            <span className="block text-[#0A234D] font-semibold tracking-[0.2em] text-xs font-sans uppercase mb-2">
              BUXAA STORIES
            </span>
            <h2 className="text-2xl md:text-4xl font-bold font-serif text-[#1E1E1E]">
              Explore Travel Inspiration
            </h2>
            <p className="text-xs md:text-sm text-gray-500 font-sans mt-1">
              Explore travel inspiration, product highlights, and customer experiences.
            </p>
          </div>
          <Link
            to="/about"
            className="text-xs font-bold uppercase tracking-wider text-[#0A234D] hover:text-[#D4A23A] transition-colors duration-300"
          >
            View All Stories &rarr;
          </Link>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((story, idx) => (
            <Link
              key={idx}
              to={story.link}
              className="group relative flex flex-col justify-between h-[220px] sm:h-[240px] md:h-[200px] lg:h-[230px] rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 bg-cover bg-center text-left"
              style={{ backgroundImage: `url('${story.img}')` }}
            >
              {/* Dark Overlay with vertical gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/35 group-hover:from-black/90 group-hover:via-black/55 group-hover:to-black/40 transition-colors duration-500 z-0" />

              {/* Date (Floating Top Left) */}
              <div className="relative p-5 z-10">
                <span className="text-[10px] sm:text-xs text-white/70 font-semibold tracking-wide font-sans">
                  {story.date}
                </span>
              </div>

              {/* Title and Action (Bottom) */}
              <div className="relative p-5 space-y-2.5 z-10 mt-auto">
                <h3 className="font-sans font-bold text-base md:text-lg text-white leading-snug group-hover:text-[#D4A23A] transition-colors duration-300">
                  {story.title}
                </h3>
                <span className="inline-flex items-center text-xs font-bold tracking-wider text-white/90 group-hover:text-[#D4A23A] uppercase transition-colors duration-300 gap-1">
                  Read More <span className="text-sm font-sans font-normal">&rarr;</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
