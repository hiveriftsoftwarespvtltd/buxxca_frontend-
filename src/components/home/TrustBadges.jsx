import React from 'react';
import { Truck, Phone, ShieldCheck, RotateCcw, Sparkles } from 'lucide-react';

export default function TrustBadges() {
  const trustBadges = [
    { title: 'Free Shipping', desc: 'On eligible orders nationwide', icon: Truck },
    { title: '24/7 Support', desc: 'Shop with an expert', icon: Phone },
    { title: 'Premium Quality', desc: 'Crafted with durable materials', icon: ShieldCheck },
    { title: 'Easy Returns', desc: 'Hassle-free return process', icon: RotateCcw },
    { title: 'Secure Payments', desc: '100% safe transactions', icon: Sparkles }
  ];

  return (
    <section className="py-12 bg-[#F5F5F5] border-y border-gray-200">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {trustBadges.map((badge, idx) => {
            const IconComponent = badge.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-4 text-left p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0A234D]/5 flex items-center justify-center text-[#0A234D]">
                  <IconComponent size={22} strokeWidth={1.5} />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-bold font-sans text-sm text-[#1E1E1E]">
                    {badge.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 font-sans leading-snug max-w-[140px]">
                    {badge.desc}
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
