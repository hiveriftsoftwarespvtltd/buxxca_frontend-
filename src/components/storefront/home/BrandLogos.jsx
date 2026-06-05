import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export const BrandLogos = () => {
  const logos = [
    { name: "Acer", path: "/assets/imgs/slider/logo/acer.svg" },
    { name: "Nokia", path: "/assets/imgs/slider/logo/nokia.svg" },
    { name: "Asus", path: "/assets/imgs/slider/logo/assus.svg" },
    { name: "Casio", path: "/assets/imgs/slider/logo/casio.svg" },
    { name: "Dell", path: "/assets/imgs/slider/logo/dell.svg" },
    { name: "Panasonic", path: "/assets/imgs/slider/logo/panasonic.svg" },
    { name: "Vaio", path: "/assets/imgs/slider/logo/vaio.svg" }
  ];

  return (
    <section className="py-8 bg-gray-50 border-y border-brand-border">
      <div className="container mx-auto px-4">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          spaceBetween={40}
          slidesPerView={3}
          loop={true}
          breakpoints={{
            480: { slidesPerView: 4 },
            768: { slidesPerView: 5 },
            1024: { slidesPerView: 6 }
          }}
          className="flex items-center"
        >
          {logos.map((logo, idx) => (
            <SwiperSlide key={idx} className="flex justify-center items-center">
              <div className="h-10 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                {/* SVG path if it doesn't exist, we fallback to text */}
                <img
                  src={logo.path}
                  alt={logo.name}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    // Fallback if image fails
                    e.target.style.display = "none";
                  }}
                />
                <span className="text-xs font-bold tracking-wider text-brand-muted uppercase text-center block sm:hidden">
                  {logo.name}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
export default BrandLogos;
