import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderTimer = useRef(null);

  const slides = [
    {
      img: '/images/slide1.png',
      eyebrow: 'PREMIUM COLLECTION',
      title: 'TRAVEL SMARTER. PACK BETTER.',
      desc: 'Premium storage solutions  designed to keep every journey organized and stress-free.', 

      btnLink: '/shop?cat=travel-bags',
      btnText: 'Shop Collection →',
      luggageImg: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=600&auto=format&fit=crop&q=80'
    },
    {
      img: '/images/slide2.png',
      eyebrow: 'BUSINESS & DAILY',
      title: 'BUILD FOR WORK. & TRAVEL.',
      desc: 'Thoughtfully engineered bags for professionals, commuters, and frequent travelers.',
      btnLink: '/shop?cat=laptop-bags',
      btnText: 'Explore Bags →',
      luggageImg: 'https://images.unsplash.com/photo-1581553674786-636eaa2f1a6b?w=600&auto=format&fit=crop&q=80'
    },
    {
      img: '/images/slide3.png',
      eyebrow: 'ORGANIZED TRAVEL',
      title: 'DESIGNED FOR MORDERN LIVING.', 
      desc: ' Crafted in India for everyday work, travel,  to and life on the move. ',
      btnLink: '/shop?cat=organizers',
      btnText: 'Shop Organizers →',
      luggageImg: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&auto=format&fit=crop&q=80'
    }
  ];

  const startSlideShow = () => {
    stopSlideShow();
    sliderTimer.current = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % slides.length);
    }, 6000);
  };

  const stopSlideShow = () => {
    if (sliderTimer.current) clearInterval(sliderTimer.current);
  };

  useEffect(() => {
    startSlideShow();
    return () => stopSlideShow();
  }, []);

  const moveSlide = (delta) => {
    setActiveSlide(prev => (prev + delta + slides.length) % slides.length);
  };

  return (
    <section
      onMouseEnter={stopSlideShow}
      onMouseLeave={startSlideShow}
      className="relative w-full h-[50vh] sm:h-[70vh] lg:h-[85vh] overflow-hidden bg-[#04152F]"
      aria-label="Hero Slider"
    >
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-[82%_center] sm:bg-center transition-transform duration-10000 ease-linear scale-105"
              style={{ backgroundImage: `url('${slide.img}')` }}
            />
            {/* Gradient overlay: Dark on left for text readability, clear on right to showcase slide graphics */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#04152F]/90 via-[#04152F]/50 to-transparent" />

            {/* Content Container */}
            <div className="absolute inset-0 flex items-center">
              <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12">

                {/* Text content Card */}
                <div className="w-full md:w-1/2 text-left space-y-4 md:space-y-6">
                  <span className="inline-block text-[#D4A23A] font-semibold tracking-[0.2em] text-xs md:text-sm font-sans uppercase animate-fade-in">
                    {slide.eyebrow}
                  </span>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight">
                    {slide.title.includes('. ') ? (
                      <>
                        <span className="text-white block">{slide.title.split('. ')[0]}.</span>
                        <span className="text-[#D4A23A] block">{slide.title.split('. ')[1]}</span>
                      </>
                    ) : (
                      <span className="text-white">{slide.title}</span>
                    )}
                  </h1>
                  <p
                    className="text-sm md:text-lg text-[#F5F5F5]/80 font-sans max-w-lg leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: slide.desc }}
                  />
                  <div className="flex flex-wrap gap-4 pt-2">
                    <Link
                      to={slide.btnLink}
                      className="inline-block bg-[#D4A23A] hover:bg-[#E3B85A] text-[#04152F] font-bold text-xs md:text-sm tracking-widest uppercase px-6 py-3.5 rounded-sm transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg"
                    >
                      {slide.btnText}
                    </Link>
                    <Link
                      to="/shop"
                      className="inline-block bg-white border border-white hover:bg-transparent hover:text-white text-[#04152F] font-bold text-xs md:text-sm tracking-widest uppercase px-6 py-3.5 rounded-sm transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      Explore More
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slider Controls */}
      <button
        onClick={() => moveSlide(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-10 md:w-12 h-10 md:h-12 rounded-full border border-white/20 bg-[#04152F]/40 hover:bg-[#D4A23A] hover:border-transparent text-white hover:text-[#04152F] transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => moveSlide(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-10 md:w-12 h-10 md:h-12 rounded-full border border-white/20 bg-[#04152F]/40 hover:bg-[#D4A23A] hover:border-transparent text-white hover:text-[#04152F] transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Navigation dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === activeSlide ? 'bg-[#D4A23A] w-8' : 'bg-white/40 hover:bg-white/60'
              }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
