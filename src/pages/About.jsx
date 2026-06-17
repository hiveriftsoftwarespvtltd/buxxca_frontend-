import React from 'react';
import { Sparkles, Award, Heart, ShieldCheck, Star, Lightbulb, Pencil, ShoppingBag, Globe, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function About() {
  return (
    <div className="min-h-screen bg-[#FFFDF7] py-5 page-transition">
      <Helmet>
        <title>Our Story & Heritage | BUXAA</title>
        <meta name="description" content="Learn about the craftsmanship, materials, and design philosophy behind BUXAA premium travel accessories and suitcases." />
      </Helmet>
      <div className="max-w-[1600px] mx-auto px-6">
        
        {/* Header Hero Section (Only Image, fully responsive, max-width 1600px) */}
        <div className="max-w-[1600px] mx-auto mb-16 overflow-hidden rounded-2xl border border-[#E8DFC8]/60 shadow-md">
          <img 
            src="/images/about.png" 
            alt="BUXAA - To the person reading this" 
            className="w-full h-auto block"
          />
        </div>

        {/* Our Story & Timeline Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24 mt-8">
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-4 flex flex-col text-left">
            <span className="text-xs tracking-[0.2em] uppercase font-bold text-[#D4A23A] mb-3 block">
              OUR STORY
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0A234D] mb-4 font-bold tracking-tight leading-tight">
              The Story
              <br />
              Behind BUXAA
            </h2>
            <div className="w-10 h-[2px] bg-[#D4A23A] mb-6"></div>
            <div className="text-sm sm:text-[13px] text-[#4A3B1F] leading-[1.65] font-sans">
              BUXAA didn't begin in a big office
              <br />
              or with a big team.
              <br />
              It began with a <strong>simple belief</strong> that
              <br />
              bags should be more than just something
              <br />
              you carry. They should carry meaning.
              <br />
              <br />
              Designed with purpose.
              <br />
              Made to move with you.
              <br />
              <br />
              BUXAA is for the everyday,
              <br />
              and the moments that stay with you.
            </div>
          </div>

          {/* Right Column: Timeline Component */}
          <div className="lg:col-span-8 relative pt-12 pb-6">
            {/* Desktop Horizontal Line */}
            <div className="timeline-desktop-only absolute left-[12.5%] right-[12.5%] h-[2px] bg-[#D4A23A] z-[5]" style={{ top: '150px' }}></div>
            {/* Mobile Vertical Line */}
            <div className="md:hidden absolute top-[40px] bottom-[40px] left-[32px] w-[2px] bg-[#D4A23A] z-[5]"></div>

            <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-2 relative z-10">
              
              {/* Step 1: 2021 - The Idea */}
              <div className="flex flex-row md:flex-col items-center md:items-center text-left md:text-center gap-4 md:gap-0 flex-1 relative">
                {/* Icon circle */}
                <div className="w-16 h-16 rounded-full bg-[#FFFBF4] border border-solid border-[#E8DFC8]/60 flex items-center justify-center text-[#A4822B] z-10 shadow-sm transition-transform duration-300 hover:scale-105">
                  <Lightbulb size={24} strokeWidth={1.5} />
                </div>
                {/* Connector dot (desktop) */}
                <div className="timeline-desktop-only w-3 h-3 rounded-full bg-[#A4822B] border border-solid border-white mt-8 mb-6 z-10 shadow-sm"></div>
                {/* Connector dot (mobile) */}
                <div className="md:hidden w-3 h-3 rounded-full bg-[#A4822B] border border-solid border-[#FFFDF7] z-10 shadow-sm absolute left-[26px] top-[26px]"></div>

                {/* Text description */}
                <div className="flex-1 md:mt-2 pl-4 md:pl-0">
                  <span className="text-[13px] font-bold text-[#D4A23A] tracking-wider block">2021</span>
                  <h4 className="font-sans text-[15px] font-extrabold text-[#1A1208] mt-1.5 mb-1.5">The Idea</h4>
                  <p className="text-xs text-[#666666] leading-relaxed m-0 max-w-[150px] md:mx-auto">
                    It started with
                    <br />
                    a thought —
                    <br />
                    a bag that feels
                    <br />
                    different.
                  </p>
                </div>
              </div>

              {/* Step 2: 2022 - The First Step */}
              <div className="flex flex-row md:flex-col items-center md:items-center text-left md:text-center gap-4 md:gap-0 flex-1 relative">
                {/* Icon circle */}
                <div className="w-16 h-16 rounded-full bg-[#FFFBF4] border border-solid border-[#E8DFC8]/60 flex items-center justify-center text-[#A4822B] z-10 shadow-sm transition-transform duration-300 hover:scale-105">
                  <Pencil size={22} strokeWidth={1.5} />
                </div>
                {/* Connector dot (desktop) */}
                <div className="timeline-desktop-only w-3 h-3 rounded-full bg-[#A4822B] border border-solid border-white mt-8 mb-6 z-10 shadow-sm"></div>
                {/* Connector dot (mobile) */}
                <div className="md:hidden w-3 h-3 rounded-full bg-[#A4822B] border border-solid border-[#FFFDF7] z-10 shadow-sm absolute left-[26px] top-[26px]"></div>

                {/* Text description */}
                <div className="flex-1 md:mt-2 pl-4 md:pl-0">
                  <span className="text-[13px] font-bold text-[#D4A23A] tracking-wider block">2022</span>
                  <h4 className="font-sans text-[15px] font-extrabold text-[#1A1208] mt-1.5 mb-1.5">The First Step</h4>
                  <p className="text-xs text-[#666666] leading-relaxed m-0 max-w-[150px] md:mx-auto">
                    Sketches, samples,
                    <br />
                    and a lot of
                    <br />
                    learning.
                  </p>
                </div>
              </div>

              {/* Step 3: 2023 - BUXAA is Born */}
              <div className="flex flex-row md:flex-col items-center md:items-center text-left md:text-center gap-4 md:gap-0 flex-1 relative">
                {/* Icon circle */}
                <div className="w-16 h-16 rounded-full bg-[#FFFBF4] border border-solid border-[#E8DFC8]/60 flex items-center justify-center text-[#A4822B] z-10 shadow-sm transition-transform duration-300 hover:scale-105">
                  <ShoppingBag size={22} strokeWidth={1.5} />
                </div>
                {/* Connector dot (desktop) */}
                <div className="timeline-desktop-only w-3 h-3 rounded-full bg-[#A4822B] border border-solid border-white mt-8 mb-6 z-10 shadow-sm"></div>
                {/* Connector dot (mobile) */}
                <div className="md:hidden w-3 h-3 rounded-full bg-[#A4822B] border border-solid border-[#FFFDF7] z-10 shadow-sm absolute left-[26px] top-[26px]"></div>

                {/* Text description */}
                <div className="flex-1 md:mt-2 pl-4 md:pl-0">
                  <span className="text-[13px] font-bold text-[#D4A23A] tracking-wider block">2023</span>
                  <h4 className="font-sans text-[15px] font-extrabold text-[#1A1208] mt-1.5 mb-1.5">BUXAA is Born</h4>
                  <p className="text-xs text-[#666666] leading-relaxed m-0 max-w-[150px] md:mx-auto">
                    The first collection
                    <br />
                    goes live with
                    <br />
                    a promise of
                    <br />
                    quality.
                  </p>
                </div>
              </div>

              {/* Step 4: Today - The Journey */}
              <div className="flex flex-row md:flex-col items-center md:items-center text-left md:text-center gap-4 md:gap-0 flex-1 relative">
                {/* Icon circle */}
                <div className="w-16 h-16 rounded-full bg-[#FFFBF4] border border-solid border-[#E8DFC8]/60 flex items-center justify-center text-[#A4822B] z-10 shadow-sm transition-transform duration-300 hover:scale-105">
                  <Globe size={22} strokeWidth={1.5} />
                </div>
                {/* Connector dot (desktop) */}
                <div className="timeline-desktop-only w-3 h-3 rounded-full bg-[#A4822B] border border-solid border-white mt-8 mb-6 z-10 shadow-sm"></div>
                {/* Connector dot (mobile) */}
                <div className="md:hidden w-3 h-3 rounded-full bg-[#A4822B] border border-solid border-[#FFFDF7] z-10 shadow-sm absolute left-[26px] top-[26px]"></div>

                {/* Text description */}
                <div className="flex-1 md:mt-2 pl-4 md:pl-0">
                  <span className="text-[13px] font-bold text-[#D4A23A] tracking-wider block">Today</span>
                  <h4 className="font-sans text-[15px] font-extrabold text-[#1A1208] mt-1.5 mb-1.5">The Journey</h4>
                  <p className="text-xs text-[#666666] leading-relaxed m-0 max-w-[150px] md:mx-auto">
                    Still growing.
                    <br />
                    Still listening.
                    <br />
                    Still building
                    <br />
                    for you.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Built for Real Moments Section */}
        <div className="max-w-[1600px] mx-auto  mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Column 1: Product Image */}
            <div className="lg:col-span-4 rounded-xl overflow-hidden shadow-md border border-solid border-[#E8DFC8]/60 h-[240px] sm:h-[300px] lg:h-auto lg:min-h-[350px]">
              <img 
                src="/images/discover1.png" 
                alt="Built for Real Moments" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Column 2: What Drives Us & Features */}
            <div className="lg:col-span-4 flex flex-col justify-center text-left bg-white p-6 sm:p-8 rounded-xl border border-solid border-[#E8DFC8]/40 shadow-sm">
              <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#C9A84C] block mb-2">
                WHAT DRIVES US
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-[#0A234D] mb-3 font-bold tracking-tight leading-tight">
                Built for Real Moments
              </h2>
              <div className="w-10 h-[2px] bg-[#C9A84C] mb-5"></div>
              
              <p className="text-sm text-[#4A3B1F] leading-relaxed mb-8">
                Every stitch, every detail, every decision is made with one thought in mind — to create bags that fit real lives and real journeys.
              </p>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-4">
                <div className="flex items-start gap-3">
                  <div className="text-[#C9A84C] shrink-0 mt-0.5">
                    <Pencil size={18} strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-bold text-[#1A1208] leading-tight">
                    Thoughtful<br />Design
                  </span>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="text-[#C9A84C] shrink-0 mt-0.5">
                    <ShoppingBag size={18} strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-bold text-[#1A1208] leading-tight">
                    Everyday<br />Functionality
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="text-[#C9A84C] shrink-0 mt-0.5">
                    <Star size={18} strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-bold text-[#1A1208] leading-tight">
                    Premium<br />Materials
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="text-[#C9A84C] shrink-0 mt-0.5">
                    <ShieldCheck size={18} strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-bold text-[#1A1208] leading-tight">
                    Made to<br />Last
                  </span>
                </div>
              </div>
            </div>

            {/* Column 3: Navy Quote Card */}
            <div className="lg:col-span-4 bg-[#0A234D] text-white p-6 sm:p-8 lg:p-10 rounded-xl shadow-md border border-solid border-[#E8DFC8]/20 flex flex-col justify-between relative overflow-hidden">
              {/* Decorative large quote mark */}
              <span className="text-7xl text-[#C9A84C]/30 font-serif absolute top-4 left-6 pointer-events-none select-none">
                “
              </span>
              
              {/* Quote text */}
              <div className="pt-10 mb-8 relative z-10">
                <p className="font-serif text-xl md:text-2xl text-[#FFFBF4] italic leading-relaxed font-semibold">
                  BUXAA is not just what I make, it's what we build together.
                </p>
              </div>

              {/* Quote author footer */}
              <div className="relative z-10">
                <div className="w-12 h-[1px] bg-[#C9A84C] mb-4"></div>
                <span className="text-xs tracking-[0.25em] font-bold text-[#C9A84C] uppercase block">
                  TARUN BHARDWAJ
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Connected Separator */}
        <div className="relative max-w-[1600px] mx-auto px-6 my-16">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-solid border-[#E8DFC8]/60"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="w-12 h-12 rounded-full bg-white border border-solid border-[#E8DFC8] flex items-center justify-center text-[#C9A84C] shadow-sm">
              <Mail size={20} strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Let's Stay Connected Section */}
        <div className="max-w-[1600px] mx-auto px-6 text-center mb-16">
          <h2 className="font-serif text-2xl md:text-3xl text-[#0A234D] font-bold mb-2">
            Let's Stay Connected
          </h2>
          <p className="text-sm text-[#666666] mb-6">
            I'd love to hear from you.
          </p>
          <Link 
            to="/contact" 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'transparent',
              border: '1px solid #C9A84C',
              color: '#C9A84C',
              padding: '0.75rem 2rem',
              borderRadius: '4px',
              fontSize: '0.8rem',
              fontWeight: '600',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            className="hover:bg-[#C9A84C] hover:text-white hover:-translate-y-0.5 hover:shadow-sm"
          >
            CONNECT WITH ME
          </Link>


        </div>

      </div>
    </div>
  );
}
