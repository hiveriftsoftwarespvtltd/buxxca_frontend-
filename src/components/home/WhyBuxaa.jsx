import React from 'react';
import { 
  Laptop, 
  Droplets, 
  Plane, 
  LayoutGrid, 
  Zap, 
  Award 
} from 'lucide-react';

export default function WhyBuxaa() {
  const usps = [
    {
      title: 'Dedicated Laptop Compartments',
      desc: 'Shock-absorbing sleeves designed to safely house laptops up to 16 inches.',
      icon: Laptop
    },
    {
      title: 'Water-Resistant Materials',
      desc: 'High-grade hydrophobic fabrics that shield your essentials from unexpected downpours.',
      icon: Droplets
    },
    {
      title: 'Airline-Friendly Designs',
      desc: 'Sized to comply with global carry-on regulations and fits easily under cabin seats.',
      icon: Plane
    },
    {
      title: 'Smart Organizer Pockets',
      desc: 'Thoughtfully placed internal slots for chargers, tablets, keys, and passports.',
      icon: LayoutGrid
    },
    {
      title: 'Premium Zippers & Hardware',
      desc: 'Heavy-duty custom alloy zippers engineered for smooth, long-lasting reliability.',
      icon: Zap
    },
    {
      title: '1-Year Warranty',
      desc: 'Our commitment to premium craftsmanship. Built to accompany you on every journey.',
      icon: Award
    }
  ];

  return (
    <section className="py-10 md:py-12 bg-gradient-to-b from-[#FFFDF7] to-[#FAF8F2] relative overflow-hidden">
      {/* Premium background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D4A23A]/5 rounded-full blur-[120px] pointer-events-none z-0" />
      
      <div className="max-w-[1600px] mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-left max-w-2xl mb-16 md:mb-20">
          <span className="text-[#D4A23A] font-semibold tracking-[0.25em] text-xs sm:text-sm uppercase font-sans block mb-3">
            WHY BUXAA?
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#0A234D] leading-tight">
            Built for Modern Professionals
          </h2>
          <div className="w-12 h-1 bg-[#D4A23A] mt-5 rounded-full"></div>
        </div>

        {/* USP Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {usps.map((usp, index) => {
            const Icon = usp.icon;
            return (
              <div 
                key={index}
                className="bg-gradient-to-br from-white to-[#FAF8F2]/40 border border-[#E8DFC8]/40 p-8 rounded-xl shadow-sm hover:shadow-[0_20px_45px_-15px_rgba(212,162,58,0.15)] hover:border-[#D4A23A]/40 hover:-translate-y-1.5 transition-all duration-500 ease-out group text-left flex flex-col justify-between"
              >
                <div>
                  {/* Icon Container */}
                  <div className="w-14 h-14 rounded-2xl bg-[#0A234D]/5 flex items-center justify-center text-[#0A234D] group-hover:bg-[#0A234D] group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out mb-8 shadow-sm">
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  {/* Content */}
                  <h3 className="text-lg md:text-xl font-bold font-serif text-[#0A234D] mb-4 group-hover:text-[#D4A23A] transition-colors duration-300 tracking-wide">
                    {usp.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-sans leading-relaxed">
                    {usp.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
