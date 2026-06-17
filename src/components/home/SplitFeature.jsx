import React from 'react';
import { Link } from 'react-router-dom';
import {
  Folder,
  Plane,
  Droplet,
  Shield,
  Backpack,
  Lock
} from 'lucide-react';

export default function SplitFeature() {
  const features = [
    { title: 'Smart Organization', desc: 'Effortless packing solutions', icon: Folder },
    { title: 'Travel Ready', desc: 'Designed for journeys', icon: Plane },
    { title: 'Water Resistant', desc: 'Protects what matters', icon: Droplet },
    { title: 'Durable Materials', desc: 'Built to last long', icon: Shield },
    { title: 'Comfort Carry', desc: 'Ergonomic & lightweight', icon: Backpack },
    { title: 'Secure Storage', desc: 'Keep belongings safe', icon: Lock }
  ];

  return (
    <section className="py-8 bg-white">
      <div className="max-w-[1600px] mx-auto px-6">
        <div
          className="relative bg-[#0A234D] rounded-xl overflow-hidden shadow-xl text-left bg-cover bg-center"
          style={{ backgroundImage: "url('/images/pm.png')" }}
        >
          {/* Overlay: Reduced opacity as requested */}
          <div className="absolute inset-0 bg-[#0A234D]/50 lg:bg-[#0A234D]/20 z-0" />

          <div className="relative flex flex-col lg:flex-row items-center justify-between px-6 py-10 md:px-10 md:py-16 lg:px-12 lg:py-20 gap-10 lg:gap-8 z-10 w-full">

            {/* Left Content column */}
            <div className="space-y-4 md:space-y-5 w-full lg:w-[35%] flex-shrink-0 text-left">
              <span className="block text-[#D4A23A] font-semibold tracking-[0.15em] text-[10px] sm:text-xs font-sans uppercase">
                PREMIUM STORAGE SOLUTIONS
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white leading-tight">
                Travel Smart <br className="hidden lg:block" />with BUXAA
              </h2>
              <p className="text-sm md:text-base text-gray-300 font-sans leading-relaxed max-w-sm">
                Designed for modern travelers.<br className="hidden lg:block" />Built for everyday adventures.
              </p>
              <div className="pt-2">
                <Link
                  to="/shop?cat=travel-bags"
                  className="inline-flex items-center gap-2 bg-[#D4A23A] hover:bg-[#E3B85A] text-[#0A234D] font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-sm transition-all duration-300"
                >
                  Shop Collection &rarr;
                </Link>
              </div>
            </div>

            {/* Middle Spacer for the Center Bag Image (Hidden on mobile) */}
            <div className="hidden lg:block lg:flex-1 lg:min-h-[300px]"></div>

            {/* Right Features Grid */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 w-full lg:w-[45%] xl:w-[40%] flex-shrink-0">
              {features.map((feat, idx) => {
                const IconComponent = feat.icon;
                return (
                  <div key={idx} className="flex gap-3 lg:gap-4 items-start group">
                    <div className="flex-shrink-0 w-8 h-8 lg:w-12 lg:h-12 rounded-lg border border-[#D4A23A]/40 bg-transparent flex items-center justify-center text-[#D4A23A] group-hover:bg-[#D4A23A]/10 transition-colors duration-300">
                      <IconComponent className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={1.5} />
                    </div>
                    <div className="space-y-0.5 pt-0.5">
                      <h4 className="font-bold text-xs lg:text-sm text-white font-sans tracking-wide">
                        {feat.title}
                      </h4>
                      <p className="text-[10px] lg:text-xs text-gray-400 font-sans hidden sm:block">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
